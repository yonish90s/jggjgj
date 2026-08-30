let userBalance = 50000;
let offers = [];
let activeFilter = 'all';

// DOM Elements
const userBalanceDisplay = document.getElementById('userBalanceDisplay');
const heroBalanceText = document.getElementById('heroBalanceText');
const bidsFeedList = document.getElementById('bidsFeedList');
const filterAllBids = document.getElementById('filterAllBids');
const filterMyBids = document.getElementById('filterMyBids');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function initTradingPage() {
    setupTheme();
    loadBalance();
    loadOffers();
    renderBidsFeed();
    setupEventListeners();
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    userBalance = saved ? parseInt(saved, 10) : 50000;
    updateBalanceDisplays();
}

function updateBalanceDisplays() {
    if (userBalanceDisplay) userBalanceDisplay.textContent = '₪ ' + userBalance.toLocaleString('he-IL');
    if (heroBalanceText) heroBalanceText.textContent = '₪ ' + userBalance.toLocaleString('he-IL');
}

function addFunds() {
    userBalance += 10000;
    localStorage.setItem('news_user_balance', userBalance.toString());
    updateBalanceDisplays();
    showToast('יתרת הארנק שלך עודכנה ב-+₪10,000! 💰');
}

function loadOffers() {
    const saved = localStorage.getItem('news_offers');
    if (saved) {
        try {
            offers = JSON.parse(saved);
        } catch (e) {
            offers = getInitialRentalOffers();
        }
    } else {
        offers = getInitialRentalOffers();
        localStorage.setItem('news_offers', JSON.stringify(offers));
    }
}

function getInitialRentalOffers() {
    return [
        {
            id: 'off-101',
            articleId: 'rent-1',
            articleTitle: 'מצלמת Sony A7 IV + עדשת 24-70mm f/2.8 GM',
            bidder: 'מיכאל א.',
            amount: 300,
            date: 'היום, 14:20',
            status: 'הצעה מובילה להשכרה 🔥',
            isMyBid: false
        },
        {
            id: 'off-102',
            articleId: 'rent-2',
            articleTitle: 'מקרן 4K עוצמתי 5000 Lumens + מסך 120 אינץ׳',
            bidder: 'אורח (אתה)',
            amount: 400,
            date: 'היום, 13:45',
            status: 'הצעה מובילה להשכרה 🔥',
            isMyBid: true
        },
        {
            id: 'off-103',
            articleId: 'rent-3',
            articleTitle: 'אופניים חשמליים Ninebot MAX G30 (השכרה חודשית)',
            bidder: 'יונתן ש.',
            amount: 1350,
            date: 'אתמול, 19:10',
            status: 'הצעה מובילה להשכרה 🔥',
            isMyBid: false
        },
        {
            id: 'off-104',
            articleId: 'rent-5',
            articleTitle: 'אוהל קמפינג משפחתי ל-8 נפשות + מזרנים לסופ״ש',
            bidder: 'אורח (אתה)',
            amount: 220,
            date: 'אתמול, 17:30',
            status: 'הצעה נמוכה יותר',
            isMyBid: true
        }
    ];
}

function renderBidsFeed() {
    if (!bidsFeedList) return;

    let filtered = offers;
    if (activeFilter === 'my') {
        filtered = offers.filter(o => o.isMyBid);
    }

    if (filtered.length === 0) {
        bidsFeedList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-gavel fa-3x"></i>
                <h3>אין הצעות להצגה בקטגוריה זו</h3>
                <p>היכנס למוצרים להשכרה והגש את הצעת המחיר הראשונה שלך!</p>
            </div>
        `;
        return;
    }

    bidsFeedList.innerHTML = filtered.map(bid => `
        <div class="bid-card-item">
            <div class="bid-card-header">
                <div>
                    <h3 class="bid-item-title">${bid.articleTitle}</h3>
                    <span class="bid-status-pill">${bid.status}</span>
                </div>
                <div class="bid-amount-tag">₪ ${bid.amount.toLocaleString('he-IL')} / ליום</div>
            </div>
            
            <div class="bid-card-body">
                <div class="bid-meta-info">
                    <span><i class="fa-regular fa-user"></i> מציע: <strong>${bid.bidder}</strong></span>
                    <span>•</span>
                    <span><i class="fa-regular fa-clock"></i> ${bid.date}</span>
                </div>
                
                <div class="bid-card-actions">
                    <button class="btn btn-primary" onclick="outbidItem('${bid.id}', '${bid.articleId}', '${escapeQuote(bid.articleTitle)}', ${bid.amount})">
                        <i class="fa-solid fa-arrow-up"></i> הגש הצעה (+₪50)
                    </button>
                    <a href="article.html?id=${bid.articleId}" class="btn btn-outline">
                        <i class="fa-solid fa-eye"></i> צפה במוצר
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function outbidItem(bidId, articleId, articleTitle, currentAmount) {
    const newAmount = currentAmount + 50;

    if (userBalance < newAmount) {
        showToast('אין לך מספיק יתרה בארנק להציע ₪' + newAmount.toLocaleString('he-IL'));
        return;
    }

    // Deduct token fee and update
    userBalance -= 20;
    localStorage.setItem('news_user_balance', userBalance.toString());
    updateBalanceDisplays();

    const newOffer = {
        id: 'off-' + Date.now(),
        articleId: articleId,
        articleTitle: articleTitle,
        bidder: 'אורח (אתה)',
        amount: newAmount,
        date: 'כרגע',
        status: 'הצעה מובילה להשכרה 🔥',
        isMyBid: true
    };

    offers.forEach(o => {
        if (o.articleId === articleId) {
            o.status = 'הצעה נמוכה יותר';
        }
    });

    offers.unshift(newOffer);
    localStorage.setItem('news_offers', JSON.stringify(offers));

    renderBidsFeed();
    showToast(`הגשת הצעה חדשה בסך ₪${newAmount.toLocaleString('he-IL')} להשכרת המוצר! 🥳`);
}

function filterBids(type) {
    activeFilter = type;
    if (type === 'all') {
        filterAllBids.classList.add('btn-primary');
        filterAllBids.classList.remove('btn-outline');
        filterMyBids.classList.remove('btn-primary');
        filterMyBids.classList.add('btn-outline');
    } else {
        filterMyBids.classList.add('btn-primary');
        filterMyBids.classList.remove('btn-outline');
        filterAllBids.classList.remove('btn-primary');
        filterAllBids.classList.add('btn-outline');
    }
    renderBidsFeed();
}

function escapeQuote(str) {
    return str.replace(/'/g, "\\'");
}

function setupTheme() {
    const darkMode = localStorage.getItem('news_theme') === 'dark';
    if (darkMode) {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function setupEventListeners() {
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('news_theme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }
}

function showToast(message) {
    if (!toastMessage || !toast) return;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', initTradingPage);
