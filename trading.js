// Trading / Bids Page State
let tradingState = {
    bids: [],
    filterType: 'all', // 'all', 'outgoing' (הצעות שאני הצעתי), 'incoming' (הצעות שהציעו לי על מוצרים שלי)
    userBalance: 50000
};

// Initial Bids Dataset
const INITIAL_BIDS = [
    {
        id: "bid-1",
        articleId: "rent-1",
        title: "MacBook Pro 16\" M3 Max 64GB RAM",
        category: "מחשבים",
        price: 200,
        currentBid: 180,
        bidder: "רוני חסון (חולון)",
        owner: "אני",
        type: "incoming", // הצעות שהציעו לי על מוצרים שלי
        timeLeft: "04:12:30",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        summary: "מחשב עוצמתי לעריכת וידאו 8K. מגיע מותקן עם תוכנות Adobe.",
        tags: ["64GB RAM", "M3 Max", "עריכת 8K"]
    },
    {
        id: "bid-2",
        articleId: "rent-2",
        title: "קונסולת Xbox Series X + 2 שלטים",
        category: "אקסבוקס וגיימינג",
        price: 110,
        currentBid: 125,
        bidder: "אני",
        owner: "עומר אביב (גבעתיים)",
        type: "outgoing", // הצעות שאני הצעתי
        timeLeft: "12:45:00",
        imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
        summary: "ערכת גיימינג 4K מלאה כוללת מנוי Game Pass Ultimate אקטיבי.",
        tags: ["Xbox Series X", "Game Pass", "2 שלטים"]
    },
    {
        id: "bid-3",
        articleId: "rent-3",
        title: "אייפון 15 Pro Max 512GB Natural Titanium",
        category: "פלאפונים",
        price: 95,
        currentBid: 90,
        bidder: "דניאל כהן (רמת גן)",
        owner: "אני",
        type: "incoming", // הצעות שהציעו לי על מוצרים שלי
        timeLeft: "08:20:15",
        imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        summary: "מכשיר דגל שמור כחדש לחלוטין כולל מגן מסך ומטען מהיר.",
        tags: ["iPhone 15 Pro", "512GB", "זמין 24/7"]
    },
    {
        id: "bid-4",
        articleId: "rent-4",
        title: "פטישון עוצמתי BOSCH GBH 2-28",
        category: "כלי עבודה",
        price: 85,
        currentBid: 95,
        bidder: "אני",
        owner: "רוני חסון (חולון)",
        type: "outgoing", // הצעות שאני הצעתי
        timeLeft: "18:10:00",
        imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        summary: "כלי עבודה מקצועי לקידוח וחציבה בבטון, מגיע עם מזוודה.",
        tags: ["BOSCH מקצועי", "קידוח בבטון", "זמין עכשיו"]
    },
    {
        id: "bid-5",
        articleId: "rent-5",
        title: "מצלמת Sony A7 IV + עדשת 24-70mm",
        category: "מצלמות",
        price: 250,
        currentBid: 230,
        bidder: "יוסי לוי (תל אביב)",
        owner: "אני",
        type: "incoming", // הצעות שהציעו לי על מוצרים שלי
        timeLeft: "02:50:40",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        summary: "ערכת צילום מקצועית מלאה כוללת 2 סוללות ומטען כפול.",
        tags: ["השכרה יומית", "Sony 4K", "זמין מיידית"]
    }
];

function initTradingPage() {
    loadTradingState();
    renderTradingPage();
}

function loadTradingState() {
    const savedBal = localStorage.getItem('news_user_balance');
    tradingState.userBalance = savedBal ? parseInt(savedBal, 10) : 50000;

    const savedBids = localStorage.getItem('news_live_bids');
    if (savedBids) {
        try {
            tradingState.bids = JSON.parse(savedBids);
        } catch (e) {
            tradingState.bids = INITIAL_BIDS;
        }
    } else {
        tradingState.bids = INITIAL_BIDS;
        saveBidsToStorage();
    }
}

function saveBidsToStorage() {
    localStorage.setItem('news_live_bids', JSON.stringify(tradingState.bids));
}

function addFunds() {
    tradingState.userBalance += 10000;
    localStorage.setItem('news_user_balance', tradingState.userBalance.toString());
    renderTradingPage();
    showToast('נטענו ₪10,000 בהצלחה לארנק!');
}

function filterBids(type) {
    tradingState.filterType = type;
    
    // Update active tab styling
    const allBtn = document.getElementById('filterAllBids');
    const outBtn = document.getElementById('filterOutgoingBids');
    const incBtn = document.getElementById('filterIncomingBids');

    [allBtn, outBtn, incBtn].forEach(b => {
        if (b) {
            b.classList.remove('pill-tab');
            b.classList.add('nav-tab');
        }
    });

    if (type === 'all' && allBtn) allBtn.classList.add('pill-tab');
    if (type === 'outgoing' && outBtn) outBtn.classList.add('pill-tab');
    if (type === 'incoming' && incBtn) incBtn.classList.add('pill-tab');

    renderTradingPage();
}

// Toggle "עוד..." Read More Description Toggle Helper
function toggleReadMore(event, el) {
    event.stopPropagation();
    const parent = el.parentElement;
    const textEl = parent.querySelector('.cube-subtitle-text');
    if (!textEl) return;

    if (textEl.style.webkitLineClamp === 'none' || textEl.style.display === 'block') {
        textEl.style.display = '-webkit-box';
        textEl.style.webkitLineClamp = '2';
        el.textContent = 'עוד...';
    } else {
        textEl.style.display = 'block';
        textEl.style.webkitLineClamp = 'none';
        el.textContent = 'פחות';
    }
}

window.filterBids = filterBids;
window.addFunds = addFunds;
window.toggleReadMore = toggleReadMore;

// Accept Incoming Offer
function acceptBid(bidId) {
    const bid = tradingState.bids.find(b => b.id === bidId);
    if (!bid) return;

    tradingState.userBalance += bid.currentBid;
    localStorage.setItem('news_user_balance', tradingState.userBalance.toString());
    
    tradingState.bids = tradingState.bids.filter(b => b.id !== bidId);
    saveBidsToStorage();

    renderTradingPage();
    showToast(`אישרת בהצלחה את ההצעה על ${bid.title}! היתרה עודכנה ב-₪${bid.currentBid}. 🎉`);
}

// Outbid / Increase Offer
function placeHigherBid(bidId) {
    const bid = tradingState.bids.find(b => b.id === bidId);
    if (!bid) return;

    const increase = 20;
    if (tradingState.userBalance < increase) {
        showToast('אין מספיק יתרה בארנק! לחץ טען לארנק.');
        return;
    }

    bid.currentBid += increase;
    bid.bidder = "אני";
    bid.type = "outgoing";
    
    tradingState.userBalance -= increase;
    localStorage.setItem('news_user_balance', tradingState.userBalance.toString());
    saveBidsToStorage();

    renderTradingPage();
    showToast(`הגדלת את ההצעה ל-₪${bid.currentBid}/יום בהצלחה! 🔨`);
}

window.acceptBid = acceptBid;
window.placeHigherBid = placeHigherBid;

function renderTradingPage() {
    // Update Wallet Balances
    const userBalDisplay = document.getElementById('userBalanceDisplay');
    const heroBalText = document.getElementById('heroBalanceText');
    if (userBalDisplay) userBalDisplay.textContent = '₪ ' + tradingState.userBalance.toLocaleString('he-IL');
    if (heroBalText) heroBalText.textContent = '₪ ' + tradingState.userBalance.toLocaleString('he-IL');

    // Filter Bids
    let filtered = tradingState.bids;
    if (tradingState.filterType === 'outgoing') {
        filtered = tradingState.bids.filter(b => b.type === 'outgoing' || b.bidder === 'אני');
    } else if (tradingState.filterType === 'incoming') {
        filtered = tradingState.bids.filter(b => b.type === 'incoming' || b.owner === 'אני');
    }

    const container = document.getElementById('bidsFeedList');
    if (!container) return;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-gavel fa-3x" style="margin-bottom: 12px;"></i>
                <h3 style="font-size: 1.4rem; color: var(--text-primary); margin-bottom: 6px;">אין הצעות בקטגוריה זו</h3>
                <p>השתמש בלשוניות למעלה כדי להציג את כל ההצעות באתר</p>
            </div>
        `;
        return;
    }

    // Render 100% Symmetrical 5-Column Cube Cards Grid for Bids with Redesigned Premium Buttons
    container.className = "cube-cards-grid";
    container.innerHTML = filtered.map(bid => {
        const isMyOutgoing = bid.type === 'outgoing' || bid.bidder === 'אני';
        const badgeLabel = isMyOutgoing ? '📤 הצעה שאני הצעתי' : '📥 הצעה שהציעו לי';
        const summaryText = bid.summary || 'ציוד איכותי זמין להשכרה מיידית מפרטי.';
        const hasLongSummary = summaryText.length > 55;
        const pills = bid.tags || [bid.category, "זמין מיידית", "איסוף מהיר"];

        return `
            <div class="cube-card-box">
                
                <!-- Image Header with Badges -->
                <div class="cube-image-wrapper">
                    <img src="${bid.imageUrl}" alt="${bid.title}">
                    <span class="cube-badge-tag">${badgeLabel}</span>
                    <div class="cube-heart-btn active" title="הצעה שמורה">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>

                <!-- Card Body -->
                <div class="cube-card-body">
                    <div class="cube-price-tag">
                        ₪ ${bid.currentBid} / ליום <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600; margin-right:4px;">(מבוקש: ₪${bid.price})</span>
                    </div>

                    <h3 class="cube-title-text">${bid.title}</h3>

                    <div class="cube-subtitle-wrapper">
                        <p class="cube-subtitle-text">${summaryText}</p>
                        ${hasLongSummary ? `<button class="cube-read-more-btn" onclick="toggleReadMore(event, this)">עוד...</button>` : ''}
                    </div>

                    <div class="cube-meta-row">
                        <span><i class="fa-solid fa-user"></i> ${isMyOutgoing ? ('בעלים: ' + bid.owner) : ('מציע: ' + bid.bidder)}</span>
                        <span>•</span>
                        <span><i class="fa-regular fa-clock"></i> ${bid.timeLeft}</span>
                    </div>

                    <div class="cube-spec-pills">
                        ${pills.map(p => `<span class="cube-pill-item">${p}</span>`).join('')}
                    </div>

                    ${isMyOutgoing ? `
                        <button class="btn-trade-action btn-bid-dark" onclick="placeHigherBid('${bid.id}')">
                            <i class="fa-solid fa-gavel"></i> הגדל הצעה (+₪20)
                        </button>
                    ` : `
                        <button class="btn-trade-action btn-accept-green" onclick="acceptBid('${bid.id}')">
                            <i class="fa-solid fa-circle-check"></i> אישור הצעה (₪${bid.currentBid})
                        </button>
                    `}
                </div>

            </div>
        `;
    }).join('');
}

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
