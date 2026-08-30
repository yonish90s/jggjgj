// Default Initial Bids if empty
const INITIAL_OFFERS = [
    {
        id: "off-101",
        articleId: "art-1",
        articleTitle: "אנבידיה מציגה את טכנולוגיית הזיכרון NVHBM עם 30% יותר רוחב פס",
        bidder: "ישראל ישראלי",
        amount: 3200,
        date: new Date(Date.now() - 3600000).toISOString(),
        status: "הצעה מובילה 🔥"
    },
    {
        id: "off-102",
        articleId: "art-2",
        articleTitle: "סמסונג מציגה את כונני ה-SSD החיצוניים P9 ו-P7 במהירות 4,000MB/s",
        bidder: "דני כהן",
        amount: 1450,
        date: new Date(Date.now() - 7200000).toISOString(),
        status: "הצעה מובילה 🔥"
    },
    {
        id: "off-103",
        articleId: "art-3",
        articleTitle: "גוגל משדרגת את Gemini Live עם ביצוע משימות קוליות",
        bidder: "מיכל אברהם",
        amount: 2800,
        date: new Date(Date.now() - 14400000).toISOString(),
        status: "הצעה מובילה 🔥"
    }
];

let userBalance = 50000;
let offers = [];
let articles = [];
let activeFilter = 'all';
let darkMode = false;

// DOM Elements
const userBalanceDisplay = document.getElementById('userBalanceDisplay');
const heroBalanceText = document.getElementById('heroBalanceText');
const bidsFeedList = document.getElementById('bidsFeedList');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Init Trading Page
async function initTradingPage() {
    setupTheme();
    loadBalance();
    await loadArticlesAndOffers();
    renderBidsFeed();
}

function setupTheme() {
    darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            darkMode = !darkMode;
            localStorage.setItem('news_theme', darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function applyTheme() {
    if (darkMode) {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    if (saved !== null) {
        userBalance = parseInt(saved, 10);
    } else {
        userBalance = 50000;
        localStorage.setItem('news_user_balance', '50000');
    }
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    const formatted = '₪ ' + userBalance.toLocaleString('he-IL');
    if (userBalanceDisplay) userBalanceDisplay.textContent = formatted;
    if (heroBalanceText) heroBalanceText.textContent = formatted;
}

function addFunds() {
    userBalance += 10000;
    localStorage.setItem('news_user_balance', userBalance.toString());
    updateBalanceDisplay();
    showToast('נטענו ₪10,000 בהצלחה לארנק שלך! 💰');
}

async function loadArticlesAndOffers() {
    try {
        const response = await fetch('articles.json?t=' + Date.now());
        if (response.ok) {
            articles = await response.json();
        }
    } catch (e) {
        articles = [];
    }

    const savedOffers = localStorage.getItem('news_offers');
    if (savedOffers) {
        try {
            offers = JSON.parse(savedOffers);
        } catch (e) {
            offers = [...INITIAL_OFFERS];
        }
    } else {
        offers = [...INITIAL_OFFERS];
        localStorage.setItem('news_offers', JSON.stringify(offers));
    }
}

function filterBids(mode) {
    activeFilter = mode;
    document.getElementById('filterAllBids').classList.toggle('active', mode === 'all');
    document.getElementById('filterAllBids').classList.toggle('btn-primary', mode === 'all');
    document.getElementById('filterAllBids').classList.toggle('btn-outline', mode !== 'all');

    document.getElementById('filterMyBids').classList.toggle('active', mode === 'my');
    document.getElementById('filterMyBids').classList.toggle('btn-primary', mode === 'my');
    document.getElementById('filterMyBids').classList.toggle('btn-outline', mode !== 'my');

    renderBidsFeed();
}

function renderBidsFeed() {
    if (!bidsFeedList) return;

    let itemsToDisplay = offers;
    if (activeFilter === 'my') {
        itemsToDisplay = offers.filter(o => o.bidder.includes('אתה') || o.isMyBid);
    }

    if (itemsToDisplay.length === 0) {
        bidsFeedList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-gavel fa-3x"></i>
                <h3>אין הצעות מחיר להצגה</h3>
                <p>היה הראשון להציע מחיר על מודעות וכתבות באתר!</p>
                <a href="index.html" class="btn btn-primary" style="margin-top:15px;">למעבר למודעות</a>
            </div>
        `;
        return;
    }

    bidsFeedList.innerHTML = itemsToDisplay.map(offer => {
        const timeAgo = formatTimeAgo(offer.date);
        const amountFormatted = '₪ ' + offer.amount.toLocaleString('he-IL');

        return `
            <div class="bid-card-item">
                <div class="bid-card-header">
                    <span class="bid-item-title">${offer.articleTitle}</span>
                    <span class="bid-amount-tag">${amountFormatted}</span>
                </div>
                <div class="bid-card-body">
                    <div class="bid-meta-info">
                        <span><i class="fa-solid fa-user"></i> מציע: <strong>${offer.bidder}</strong></span>
                        <span>•</span>
                        <span><i class="fa-regular fa-clock"></i> ${timeAgo}</span>
                        <span>•</span>
                        <span class="bid-status-pill">${offer.status || 'הצעה פעילה'}</span>
                    </div>
                    <div class="bid-card-actions">
                        <button class="btn btn-primary" onclick="quickOutbid('${offer.articleId}', '${escapeQuote(offer.articleTitle)}', ${offer.amount})">
                            <i class="fa-solid fa-plus-circle"></i> הגש הצעה גבוהה יותר (+₪100)
                        </button>
                        <a href="article.html?id=${offer.articleId}" class="btn btn-outline">
                            <span>צפה במודעה</span>
                            <i class="fa-solid fa-arrow-left"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function quickOutbid(articleId, articleTitle, currentAmount) {
    const newBidAmount = currentAmount + 100;

    if (userBalance < newBidAmount) {
        showToast('אין לך מספיק יתרה בארנק להציע ₪' + newBidAmount.toLocaleString('he-IL'));
        return;
    }

    userBalance -= 100; // Deduct step cost or hold funds
    localStorage.setItem('news_user_balance', userBalance.toString());
    updateBalanceDisplay();

    const newOffer = {
        id: 'off-' + Date.now(),
        articleId: articleId,
        articleTitle: articleTitle,
        bidder: 'אורח (אתה)',
        amount: newBidAmount,
        date: new Date().toISOString(),
        status: 'הצעה מובילה 🔥',
        isMyBid: true
    };

    // Mark previous offers for this article as superseded
    offers.forEach(o => {
        if (o.articleId === articleId) {
            o.status = 'הצעה נמוכה יותר';
        }
    });

    offers.unshift(newOffer);
    localStorage.setItem('news_offers', JSON.stringify(offers));

    renderBidsFeed();
    showToast('הצעתך על סך ₪' + newBidAmount.toLocaleString('he-IL') + ' הוגשה בהצלחה! 🎉');
}

function escapeQuote(str) {
    return str.replace(/'/g, "\\'");
}

function showToast(message) {
    if (!toastMessage || !toast) return;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function formatTimeAgo(dateString) {
    try {
        const diff = Date.now() - new Date(dateString).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'ממש עכשיו';
        if (mins < 60) return `לפני ${mins} דקות`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `לפני ${hours} שעות`;
        return `לפני ${Math.floor(hours / 24)} ימים`;
    } catch (e) {
        return dateString;
    }
}

document.addEventListener('DOMContentLoaded', initTradingPage);
