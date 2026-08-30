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
            const parsed = JSON.parse(saved);
            // Purge old non-rental bids like "פסטיבל הקולנוע" or raw ISO dates
            const cleanOffers = parsed.filter(o => o.articleTitle && !o.articleTitle.includes('פסטיבל'));
            if (cleanOffers.length > 0) {
                // Clean dates
                cleanOffers.forEach(o => {
                    if (o.date && o.date.includes('T') && o.date.includes('Z')) {
                        o.date = 'היום, ' + o.date.split('T')[1].substring(0, 5);
                    }
                });
                offers = cleanOffers;
            } else {
                offers = getInitialRentalOffers();
            }
        } catch (e) {
            offers = getInitialRentalOffers();
        }
    } else {
        offers = getInitialRentalOffers();
    }
    localStorage.setItem('news_offers', JSON.stringify(offers));
}

function getInitialRentalOffers() {
    return [
        {
            id: 'off-101',
            articleId: 'rent-1',
            articleTitle: 'מחשב נייד MacBook Pro 16" M3 Max 64GB',
            bidder: 'אורח (אתה)',
            amount: 250,
            date: 'היום, 18:45',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
            isMyBid: true
        },
        {
            id: 'off-102',
            articleId: 'rent-2',
            articleTitle: 'מצלמת Sony A7 IV + עדשת 24-70mm f/2.8 GM',
            bidder: 'מיכאל א.',
            amount: 300,
            date: 'היום, 18:20',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
            isMyBid: false
        },
        {
            id: 'off-103',
            articleId: 'rent-3',
            articleTitle: 'אייפון iPhone 15 Pro Max 512GB Titanium',
            bidder: 'יונתן ש.',
            amount: 110,
            date: 'היום, 17:10',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            isMyBid: false
        },
        {
            id: 'off-104',
            articleId: 'rent-4',
            articleTitle: 'פטישון BOSCH GBH 2-28 עוצמתי + סט מקדחים',
            bidder: 'אורח (אתה)',
            amount: 120,
            date: 'היום, 16:30',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
            isMyBid: true
        },
        {
            id: 'off-105',
            articleId: 'rent-5',
            articleTitle: 'קונסולת Xbox Series X 1TB + 2 שלטים',
            bidder: 'דניאל כ.',
            amount: 140,
            date: 'היום, 15:15',
            status: 'הצעה מובילה 🔥',
            imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
            isMyBid: false
        }
    ];
}

// Render Modern High-End Grid Cards ("ריבועים מסודרים ויוקרתיים")
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
        const displayDate = (bid.date && bid.date.includes('T') && bid.date.includes('Z'))
            ? 'היום, ' + bid.date.split('T')[1].substring(0, 5)
            : (bid.date || 'היום');

        return `
            <div class="grid-card-box">
                
                <!-- Top Image Header & Badges -->
                <div class="grid-card-image-wrapper">
                    <img src="${image}" alt="${bid.articleTitle}" loading="lazy">
                    <span class="grid-badge-tag">${bid.status}</span>
                    <div class="grid-heart-btn ${bid.isMyBid ? 'active' : ''}" onclick="event.stopPropagation(); showToast('המוצר נשמר במועדפים ❤️')" title="שמור במועדפים">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>

                <!-- Content Body -->
                <div class="grid-card-body">
                    <div class="grid-price-tag">
                        ₪${bid.amount.toLocaleString('he-IL')} 
                        <span style="font-size:0.95rem; color:var(--yad2-pink); font-weight:800;">/ ליום</span>
                    </div>

                    <h3 class="grid-title-text">${bid.articleTitle}</h3>
                    <p class="grid-subtitle-text"><i class="fa-regular fa-user"></i> מציע: <strong>${bid.bidder}</strong> • ${displayDate}</p>

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

    const now = new Date();
    const timeStr = 'היום, ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const newOffer = {
        id: 'off-' + Date.now(),
        articleId: articleId,
        articleTitle: articleTitle,
        bidder: 'אורח (אתה)',
        amount: newAmount,
        date: timeStr,
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
