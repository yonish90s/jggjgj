// Trading & Bids State
let state = {
    offers: [],
    articles: [],
    userBalance: 50000,
    darkMode: false,
    activeBidFilter: 'all' // 'all', 'outgoing', 'incoming'
};

const CATEGORY_IMAGES = {
    "מחשבים": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "פלאפונים": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "כלי עבודה": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "אקסבוקס וגיימינג": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    "מצלמות": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
};

// Initial Mock Offers Data
const INITIAL_OFFERS = [
    {
        id: "off-1",
        articleId: "rent-1",
        articleTitle: "מחשב נייד MacBook Pro 16 M3 Max להשכרה",
        bidder: "אבי כהן",
        amount: 220,
        date: "לפני 10 דקות",
        status: "הצעה מובילה 🔥",
        isMyBid: false
    },
    {
        id: "off-2",
        articleId: "rent-1",
        articleTitle: "מחשב נייד MacBook Pro 16 M3 Max להשכרה",
        bidder: "אורח (אתה)",
        amount: 200,
        date: "לפני 25 דקות",
        status: "הצעה נמוכה יותר",
        isMyBid: true
    },
    {
        id: "off-3",
        articleId: "rent-2",
        articleTitle: "אייפון 15 פרו מקס 512GB תאורת סטודיו",
        bidder: "אורח (אתה)",
        amount: 140,
        date: "לפני 40 דקות",
        status: "הצעה מובילה 🔥",
        isMyBid: true
    },
    {
        id: "off-4",
        articleId: "rent-3",
        articleTitle: "סט כלי עבודה נטענים 18V BOSCH PRO",
        bidder: "דניאל ששון",
        amount: 110,
        date: "לפני שעה",
        status: "ממתין לאישור המשכיר",
        isMyBid: false
    },
    {
        id: "off-5",
        articleId: "rent-4",
        articleTitle: "קונסולת Xbox Series X + 2 שלטים ומשחקים",
        bidder: "מיכאל גולן",
        amount: 95,
        date: "לפני שעתיים",
        status: "הצעה מובילה 🔥",
        isMyBid: false
    }
];

function initTradingPage() {
    setupTheme();
    loadBalance();
    loadOffers();
    renderBidsFeed();
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    state.userBalance = saved ? parseInt(saved, 10) : 50000;
    
    const balDisplay = document.getElementById('userBalanceDisplay');
    const heroBalText = document.getElementById('heroBalanceText');
    if (balDisplay) balDisplay.textContent = 'yhsh ' + state.userBalance.toLocaleString('he-IL');
    if (heroBalText) heroBalText.textContent = 'yhsh ' + state.userBalance.toLocaleString('he-IL');
}

function addFundsGlobal() {
    state.userBalance += 10000;
    localStorage.setItem('news_user_balance', state.userBalance.toString());
    loadBalance();
    showToast('נטענו yhsh 10,000 בהצלחה לארנק! 💰');
}

function setupTheme() {
    state.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('news_theme', state.darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function applyTheme() {
    if (state.darkMode) {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function loadOffers() {
    const savedOffers = localStorage.getItem('news_offers');
    if (savedOffers) {
        try {
            state.offers = JSON.parse(savedOffers);
        } catch (e) {
            state.offers = INITIAL_OFFERS;
        }
    } else {
        state.offers = INITIAL_OFFERS;
        saveOffers();
    }
}

function saveOffers() {
    localStorage.setItem('news_offers', JSON.stringify(state.offers));
}

// 3 Filter Tabs Logic for Bids
function filterBids(filterType) {
    state.activeBidFilter = filterType;
    
    // Update Tab Classes
    const btnAll = document.getElementById('filterAllBids');
    const btnOut = document.getElementById('filterOutgoingBids');
    const btnIn = document.getElementById('filterIncomingBids');

    if (btnAll) btnAll.className = filterType === 'all' ? 'nav-tab pill-tab' : 'nav-tab';
    if (btnOut) btnOut.className = filterType === 'outgoing' ? 'nav-tab pill-tab' : 'nav-tab';
    if (btnIn) btnIn.className = filterType === 'incoming' ? 'nav-tab pill-tab' : 'nav-tab';

    renderBidsFeed();
}

// Render 5-Column Symmetrical Grid Cards for Bids Feed ("חמש על חמש")
function renderBidsFeed() {
    const container = document.getElementById('bidsFeedList');
    if (!container) return;

    let filteredOffers = state.offers;
    if (state.activeBidFilter === 'outgoing') {
        filteredOffers = state.offers.filter(o => o.isMyBid);
    } else if (state.activeBidFilter === 'incoming') {
        filteredOffers = state.offers.filter(o => !o.isMyBid);
    }

    if (filteredOffers.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-gavel fa-3x" style="margin-bottom: 12px; opacity: 0.5;"></i>
                <h3 style="font-weight: 900; color: var(--text-primary);">אין הצעות בקטגוריה זו</h3>
                <p>הגש הצעות מחיר בעמודי המוצרים כדי לראות אותן כאן!</p>
            </div>
        `;
        return;
    }

    container.className = "cube-cards-grid";
    container.innerHTML = filteredOffers.map(offer => {
        const isLeading = offer.status.includes('מובילה');
        const badgeClass = isLeading ? 'badge-rent-period' : 'cube-badge-tag';
        
        return `
            <div class="cube-card-box" onclick="window.location.href='article.html?id=${offer.articleId}'">
                
                <div class="cube-image-wrapper" style="height: 160px;">
                    <img src="${CATEGORY_IMAGES['מחשבים']}" alt="${offer.articleTitle}">
                    <span class="${badgeClass}">${offer.status}</span>
                </div>

                <div class="cube-card-body">
                    <div class="cube-price-tag">
                        <span class="rent-price">yhsh ${offer.amount.toLocaleString('he-IL')} / ליום</span>
                    </div>

                    <h3 class="cube-title-text">${offer.articleTitle}</h3>

                    <div class="cube-subtitle-wrapper" style="margin-bottom: 8px;">
                        <p class="cube-subtitle-text">מגיש ההצעה: <strong>${offer.bidder}</strong> (${offer.date})</p>
                    </div>

                    <div class="cube-dual-actions" style="margin-top: auto; flex-direction: column; gap: 6px;">
                        ${!offer.isMyBid ? `
                            <button class="btn btn-trade-action btn-accept-green" onclick="event.stopPropagation(); acceptBid('${offer.id}', ${offer.amount}, '${offer.articleTitle.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-check-circle"></i> קבל הצעה להשכרה
                            </button>
                        ` : ''}
                        
                        <button class="btn btn-trade-action btn-bid-dark" onclick="event.stopPropagation(); placeHigherBid('${offer.articleId}', '${offer.articleTitle.replace(/'/g, "\\'")}', ${offer.amount})">
                            <i class="fa-solid fa-gavel"></i> הגדל הצעה (+yhsh 20)
                        </button>
                    </div>
                </div>

            </div>
        `;
    }).join('');
}

function acceptBid(offerId, amount, title) {
    if (confirm(`האם לאשר ולסגור את ההשכרה עבור "${title}" בסך yhsh ${amount}?`)) {
        state.userBalance += amount;
        localStorage.setItem('news_user_balance', state.userBalance.toString());
        
        state.offers = state.offers.filter(o => o.id !== offerId);
        saveOffers();
        loadBalance();
        renderBidsFeed();
        
        showToast(`אישרת בהצלחה את ההצעה! yhsh ${amount} התווספו לארנק שלך 🎉`);
    }
}

function placeHigherBid(articleId, title, currentAmount) {
    const newAmount = currentAmount + 20;
    if (state.userBalance < newAmount) {
        showToast('אין לך מספיק יתרה בארנק להציע yhsh ' + newAmount);
        return;
    }

    state.userBalance -= 20;
    localStorage.setItem('news_user_balance', state.userBalance.toString());

    const newOffer = {
        id: 'off-' + Date.now(),
        articleId: articleId,
        articleTitle: title,
        bidder: 'אורח (אתה)',
        amount: newAmount,
        date: 'לפני רגע',
        status: 'הצעה מובילה 🔥',
        isMyBid: true
    };

    state.offers.forEach(o => {
        if (o.articleId === articleId) {
            o.status = 'הצעה נמוכה יותר';
        }
    });

    state.offers.unshift(newOffer);
    saveOffers();
    loadBalance();
    renderBidsFeed();

    showToast(`הצעתך להשכרה בסך yhsh ${newAmount} הוגשה בהצלחה! 🥳`);
}

window.filterBids = filterBids;
window.acceptBid = acceptBid;
window.placeHigherBid = placeHigherBid;
window.addFundsGlobal = addFundsGlobal;

function showToast(message) {
    const toastElem = document.getElementById('toast');
    const toastMsgElem = document.getElementById('toastMessage');
    if (!toastMsgElem || !toastElem) return;
    toastMsgElem.textContent = message;
    toastElem.classList.remove('hidden');
    setTimeout(() => {
        toastElem.classList.add('hidden');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', initTradingPage);
