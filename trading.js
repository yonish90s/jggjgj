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
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
            isMyBid: false
        },
        {
            id: 'off-102',
            articleId: 'rent-2',
            articleTitle: 'מחשב נייד MacBook Pro 16" M3 Max 64GB',
            bidder: 'אורח (אתה)',
            amount: 240,
            date: 'היום, 13:45',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
            isMyBid: true
        },
        {
            id: 'off-103',
            articleId: 'rent-3',
            articleTitle: 'אייפון iPhone 15 Pro Max 512GB Titanium',
            bidder: 'יונתן ש.',
            amount: 110,
            date: 'אתמול, 19:10',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            isMyBid: false
        },
        {
            id: 'off-104',
            articleId: 'rent-4',
            articleTitle: 'קונסולת Xbox Series X + 2 שלטים ו-5 משחקים',
            bidder: 'אורח (אתה)',
            amount: 130,
            date: 'אתמול, 17:30',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
            isMyBid: true
        }
    ];
}

// Render Modern Grid Box Bids Cards ("ריבועים מסודרים" - Matches Screenshot)
function renderBidsFeed() {
    if (!bidsFeedList) return;

    let filtered = offers;
    if (activeFilter === 'my') {
        filtered = offers.filter(o => o.isMyBid);
    }

    if (filtered.length === 0) {
        bidsFeedList.className = "";
        bidsFeedList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-gavel fa-3x"></i>
                <h3>אין הצעות להצגה בקטגוריה זו</h3>
                <p>היכנס למוצרים להשכרה והגש את הצעת המחיר הראשונה שלך!</p>
            </div>
        `;
        return;
    }

    bidsFeedList.className = "bids-grid-2col";
    bidsFeedList.innerHTML = filtered.map(bid => {
        const image = bid.imageUrl || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80';
        return `
            <div class="grid-card-box">
                
                <!-- Top Image & Badges -->
                <div class="grid-card-image-wrapper">
                    <img src="${image}" alt="${bid.articleTitle}">
                    <span class="grid-badge-tag">${bid.status}</span>
                    <div class="grid-heart-btn ${bid.isMyBid ? 'active' : ''}" onclick="event.stopPropagation(); showToast('המוצר נשמר במועדפים ❤️')" title="שמור במועדפים">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>

                <!-- Card Content Body -->
                <div class="grid-card-body">
                    <div class="grid-price-tag">
                        ₪${bid.amount.toLocaleString('he-IL')} 
                        <span style="font-size:0.95rem; color:var(--yad2-pink); font-weight:800;">/ ליום</span>
                    </div>

                    <h3 class="grid-title-text">${bid.articleTitle}</h3>
                    <p class="grid-subtitle-text"><i class="fa-regular fa-user"></i> מציע: <strong>${bid.bidder}</strong> • ${bid.date}</p>

                    <div class="grid-spec-pills">
                        <span class="grid-pill-item">הצעה בלייב</span>
                        <span class="grid-pill-item">זמין להשכרה</span>
                        <span class="grid-pill-item">ערבות מוגנת</span>
                    </div>

                    <button class="grid-action-btn" onclick="outbidItem('${bid.id}', '${bid.articleId}', '${escapeQuote(bid.articleTitle)}', ${bid.amount})">
                        <i class="fa-solid fa-gavel"></i> הגש הצעה גבוהה יותר (+₪50)
                    </button>
                </div>

            </div>
        `;
    }).join('');
}

function outbidItem(bidId, articleId, articleTitle, currentAmount) {
    const newAmount = currentAmount + 50;

    if (userBalance < newAmount) {
        showToast('אין לך מספיק יתרה בארנק להציע ₪' + newAmount.toLocaleString('he-IL'));
        return;
    }

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
        status: 'הצעה מובילה 🔥',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
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
