let storeState = {
    articles: [],
    currentSeller: "אבי כהן",
    activeTab: "all",
    userBalance: 50000,
    darkMode: false,
    selectedStarRating: 5
};

const CATEGORY_IMAGES = {
    "מחשבים": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "פלאפונים": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "כלי עבודה": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "אקסבוקס וגיימינג": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    "מצלמות": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
};

function initStorePage() {
    setupTheme();
    loadBalance();

    const urlParams = new URLSearchParams(window.location.search);
    const sellerParam = urlParams.get('seller');
    if (sellerParam) {
        storeState.currentSeller = sellerParam;
    }

    loadArticles();
    renderStoreHeader();
    renderStoreGrid();
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    storeState.userBalance = saved ? parseInt(saved, 10) : 50000;
    const balDisplay = document.getElementById('userBalanceDisplay');
    const heroBalText = document.getElementById('heroBalanceText');
    if (balDisplay) balDisplay.textContent = '₪ ' + storeState.userBalance.toLocaleString('he-IL');
    if (heroBalText) heroBalText.textContent = '₪ ' + storeState.userBalance.toLocaleString('he-IL');
}

function addFundsGlobal() {
    storeState.userBalance += 10000;
    localStorage.setItem('news_user_balance', storeState.userBalance.toString());
    loadBalance();
    showToast('נטענו ₪10,000 בהצלחה לארנק! 💰');
}

function setupTheme() {
    storeState.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            storeState.darkMode = !storeState.darkMode;
            localStorage.setItem('news_theme', storeState.darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function applyTheme() {
    if (storeState.darkMode) {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function loadArticles() {
    try {
        const custom = JSON.parse(localStorage.getItem('news_custom_articles') || '[]');
        const saved = JSON.parse(localStorage.getItem('news_articles') || '[]');
        
        const combined = [...custom];
        saved.forEach(item => {
            if (!combined.some(a => a.id === item.id)) {
                combined.push(item);
            }
        });
        storeState.articles = combined;
    } catch (e) {
        storeState.articles = [];
    }
}

function renderStoreHeader() {
    const titleElem = document.getElementById('storeNameTitle');
    if (titleElem) titleElem.textContent = `החנות של ${storeState.currentSeller} 🏪`;
    window.currentStoreSeller = storeState.currentSeller;

    // Find sample item for seller metadata
    const sellerItem = storeState.articles.find(a => a.author === storeState.currentSeller) || {};
    
    const ratingSpan = document.getElementById('storeRatingSpan');
    const tenureSpan = document.getElementById('storeTenureSpan');
    const dealsSpan = document.getElementById('storeDealsSpan');

    if (ratingSpan) ratingSpan.textContent = sellerItem.sellerRating || '4.9';
    if (tenureSpan) tenureSpan.textContent = sellerItem.sellerTenure || '3 שנים';
    if (dealsSpan) dealsSpan.textContent = (sellerItem.completedDeals || 58) + ' עסקאות';
}

function filterStoreItems(tab) {
    storeState.activeTab = tab;
    
    const btnAll = document.getElementById('storeTabAll');
    const btnRent = document.getElementById('storeTabRent');
    const btnBuy = document.getElementById('storeTabBuy');

    if (btnAll) btnAll.className = tab === 'all' ? 'store-tab-btn active' : 'store-tab-btn';
    if (btnRent) btnRent.className = tab === 'rent' ? 'store-tab-btn active' : 'store-tab-btn';
    if (btnBuy) btnBuy.className = tab === 'buy' ? 'store-tab-btn active' : 'store-tab-btn';

    renderStoreGrid();
}

function renderStoreGrid() {
    const grid = document.getElementById('storeProductsGrid');
    if (!grid) return;

    // Filter by seller
    let sellerItems = storeState.articles.filter(a => a.author === storeState.currentSeller);
    
    // If no specific seller match found, display custom user items or fallback items
    if (sellerItems.length === 0) {
        sellerItems = storeState.articles.slice(0, 4);
    }

    const countAll = document.getElementById('countStoreAll');
    const countRent = document.getElementById('countStoreRent');
    const countBuy = document.getElementById('countStoreBuy');

    if (countAll) countAll.textContent = sellerItems.length;
    if (countRent) countRent.textContent = sellerItems.length;
    if (countBuy) countBuy.textContent = sellerItems.length;

    grid.className = "cube-cards-grid";
    grid.innerHTML = sellerItems.map(article => {
        const rentalPeriod = article.rentalPeriod || (`🔑 ₪ ${article.price || 150} / ליום`);
        const buyPeriod = article.buyPeriod || (`🛒 ₪ ${(article.buyPrice || 3500).toLocaleString('he-IL')} לקנייה`);
        const image = article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים'];
        const buyPriceNum = article.buyPrice || 4000;
        const rentPriceNum = article.price || 150;

        return `
            <div class="cube-card-box" onclick="window.location.href='article.html?id=${article.id}'">
                
                <div class="cube-image-wrapper">
                    <img src="${image}" alt="${article.title}">
                    <span class="cube-badge-tag">${article.category}</span>
                </div>

                <div class="cube-card-body">
                    <div class="cube-price-tag">
                        <span class="rent-price">${rentalPeriod}</span>
                        <span class="buy-price">${buyPeriod}</span>
                    </div>

                    <h3 class="cube-title-text">${article.title}</h3>
                    
                    <div class="cube-subtitle-wrapper">
                        <p class="cube-subtitle-text">${article.summary}</p>
                    </div>

                    <div style="border-top: 1px solid var(--border-color); margin: 8px 0;"></div>

                    <div class="cube-spec-pills">
                        <span class="cube-pill-item" style="color: #16a34a; font-weight: 800;">⭐ ${article.sellerRating || 4.9} אמינות</span>
                        <span class="cube-pill-item">משלוח זמין 🛵</span>
                    </div>

                    <div class="cube-dual-actions">
                        <button class="btn-rent-option" onclick="event.stopPropagation(); window.location.href='article.html?id=${article.id}'">
                            <i class="fa-solid fa-key"></i> השכר/השאל
                        </button>
                        <button class="btn-buy-option" onclick="event.stopPropagation(); window.location.href='article.html?id=${article.id}'">
                            <i class="fa-solid fa-cart-shopping"></i> קנה עכשיו
                        </button>
                    </div>
                </div>

            </div>
        `;
    }).join('');
}

/* Modal Helpers */
function openRateUserModal(author, title) {
    const modal = document.getElementById('rateUserModal');
    const targetText = document.getElementById('rateTargetText');
    if (targetText) targetText.textContent = `דירוג חנות: ${author}`;
    if (modal) modal.classList.remove('hidden');
}

function closeRateUserModal() {
    const modal = document.getElementById('rateUserModal');
    if (modal) modal.classList.add('hidden');
}

function setStarRating(stars) {
    storeState.selectedStarRating = stars;
    const starIcons = document.querySelectorAll('#starPickerContainer i');
    starIcons.forEach((icon, idx) => {
        if (idx < stars) {
            icon.className = 'fa-solid fa-star';
        } else {
            icon.className = 'fa-regular fa-star';
        }
    });
}

function submitStoreRating(event) {
    event.preventDefault();
    closeRateUserModal();
    showToast(`תודה! הדירוג (${storeState.selectedStarRating} ⭐) נשמר בהצלחה! 🥳`);
}

function openReportModal(author, title) {
    const modal = document.getElementById('reportUserModal');
    const targetText = document.getElementById('reportTargetText');
    if (targetText) targetText.textContent = `דיווח על החנות: ${author}`;
    if (modal) modal.classList.remove('hidden');
}

function closeReportModal() {
    const modal = document.getElementById('reportUserModal');
    if (modal) modal.classList.add('hidden');
}

function submitReportFormStore(event) {
    event.preventDefault();
    closeReportModal();
    showToast('דיווח החנות נקלט בהצלחה 🛡️');
}

window.filterStoreItems = filterStoreItems;
window.openRateUserModal = openRateUserModal;
window.closeRateUserModal = closeRateUserModal;
window.setStarRating = setStarRating;
window.submitStoreRating = submitStoreRating;
window.openReportModal = openReportModal;
window.closeReportModal = closeReportModal;
window.submitReportFormStore = submitReportFormStore;
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

document.addEventListener('DOMContentLoaded', initStorePage);
