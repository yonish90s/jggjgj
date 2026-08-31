// Fallback images per category
const CATEGORY_IMAGES = {
    "מחשבים": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "פלאפונים": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "כלי עבודה": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "אקסבוקס וגיימינג": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    "מצלמות": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
};

// Application State
let state = {
    articles: [],
    bookmarks: [],
    likes: {},
    activeCategory: 'all',
    searchQuery: '',
    showBookmarksOnly: false,
    darkMode: false,
    userBalance: 50000,
    subscription: null,
    pendingRentalArticle: null,
    pendingReportTarget: null,
    selectedStarRating: 5,
    pendingRateTarget: null,
    currentSort: 'הנמכרים ביותר',
    onlyProServices: false,
    onlyOnlineNow: true
};

// DOM Elements Container
const elements = {
    articlesList: null,
    emptyState: null,
    favBtnLabel: null,
    userBalanceDisplay: null,
    guestUserText: null,
    toast: null,
    toastMessage: null,
    rentalContractModal: null,
    reportUserModal: null,
    rateUserModal: null,
    fiverrResultsCount: null
};

function bindDOMElements() {
    elements.articlesList = document.getElementById('articlesList');
    elements.emptyState = document.getElementById('emptyState');
    elements.favBtnLabel = document.getElementById('favBtnLabel');
    elements.userBalanceDisplay = document.getElementById('userBalanceDisplay');
    elements.guestUserText = document.getElementById('guestUserText');
    elements.toast = document.getElementById('toast');
    elements.toastMessage = document.getElementById('toastMessage');
    elements.rentalContractModal = document.getElementById('rentalContractModal');
    elements.reportUserModal = document.getElementById('reportUserModal');
    elements.rateUserModal = document.getElementById('rateUserModal');
    elements.fiverrResultsCount = document.getElementById('fiverrResultsCount');
}

// Initialize Application
async function initApp() {
    bindDOMElements();
    loadArticlesSync();
    setupEventListeners();
    renderApp();
    
    // Background async update
    await loadStateFromStorage();
    renderApp();
}

function loadArticlesSync() {
    try {
        const custom = JSON.parse(localStorage.getItem('news_custom_articles') || '[]');
        const saved = JSON.parse(localStorage.getItem('news_articles') || '[]');
        
        const combined = [...custom];
        saved.forEach(item => {
            if (!combined.some(a => a.id === item.id)) {
                combined.push(item);
            }
        });
        state.articles = combined;
    } catch (e) {
        state.articles = [];
    }

    try {
        state.bookmarks = JSON.parse(localStorage.getItem('news_bookmarks') || '[]');
    } catch (e) {
        state.bookmarks = [];
    }

    const savedBal = localStorage.getItem('news_user_balance');
    state.userBalance = savedBal ? parseInt(savedBal, 10) : 50000;
    updateBalanceDisplays();

    // Load Subscription State
    try {
        const subData = localStorage.getItem('news_user_subscription');
        if (subData) {
            state.subscription = JSON.parse(subData);
            if (elements.guestUserText && state.subscription && state.subscription.active) {
                elements.guestUserText.textContent = `👑 ${state.subscription.planName}`;
            }
        }
    } catch (e) {}

    state.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
}

function updateBalanceDisplays() {
    if (elements.userBalanceDisplay) {
        elements.userBalanceDisplay.textContent = 'yhsh ' + state.userBalance.toLocaleString('he-IL');
    }
    const heroBalText = document.getElementById('heroBalanceText');
    if (heroBalText) {
        heroBalText.textContent = 'yhsh ' + state.userBalance.toLocaleString('he-IL');
    }
}

function addFundsGlobal() {
    state.userBalance += 10000;
    localStorage.setItem('news_user_balance', state.userBalance.toString());
    updateBalanceDisplays();
    showToast('נטענו yhsh 10,000 בהצלחה לארנק! 💰');
}

// Load State from LocalStorage & articles.json file
async function loadStateFromStorage() {
    try {
        const response = await fetch('articles.json?t=' + Date.now());
        if (response.ok) {
            const fileArticles = await response.json();
            const localCustomArticles = JSON.parse(localStorage.getItem('news_custom_articles') || '[]');
            
            const combined = [...localCustomArticles];
            fileArticles.forEach(item => {
                if (!combined.some(a => a.id === item.id)) {
                    combined.push(item);
                }
            });
            state.articles = combined;
            localStorage.setItem('news_articles', JSON.stringify(fileArticles));
        }
    } catch (e) {
        // Keep cached
    }
}

/* =========================================================
   FIVERR-STYLE FILTER & SORT POPUP CONTROLS
   ========================================================= */
function toggleFilterMenu(menuName) {
    showToast(`סינון לפי ${menuName} פעיל!`);
}

function applyFiverrFilters() {
    const proChk = document.getElementById('switchProServices');
    const onlineChk = document.getElementById('switchOnlineNow');

    state.onlyProServices = proChk ? proChk.checked : false;
    state.onlyOnlineNow = onlineChk ? onlineChk.checked : true;

    renderApp();
}

function toggleSortMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('sortPopupMenu');
    if (menu) menu.classList.toggle('hidden');
}

function selectSortOption(sortOption) {
    state.currentSort = sortOption;
    const label = document.getElementById('currentSortLabel');
    if (label) label.textContent = sortOption;
    
    const menu = document.getElementById('sortPopupMenu');
    if (menu) menu.classList.add('hidden');

    renderApp();
}

// Close Sort Menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('sortPopupMenu');
    if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});

/* =========================================================
   USER RATING & TRUST PROFILE SYSTEM
   ========================================================= */
function openRateUserModal(author, title) {
    state.pendingRateTarget = { author, title };
    state.selectedStarRating = 5;
    
    const targetText = document.getElementById('rateTargetText');
    const reviewInput = document.getElementById('rateReviewInput');
    if (targetText) targetText.textContent = `דירוג וחוות דעת עבור המשכיר: ${author}`;
    if (reviewInput) reviewInput.value = '';
    
    setStarRating(5);

    const modal = document.getElementById('rateUserModal');
    if (modal) modal.classList.remove('hidden');
}

function closeRateUserModal() {
    const modal = document.getElementById('rateUserModal');
    if (modal) modal.classList.add('hidden');
    state.pendingRateTarget = null;
}

function setStarRating(stars) {
    state.selectedStarRating = stars;
    const starIcons = document.querySelectorAll('#starPickerContainer i');
    starIcons.forEach((icon, idx) => {
        if (idx < stars) {
            icon.className = 'fa-solid fa-star';
        } else {
            icon.className = 'fa-regular fa-star';
        }
    });
}

function submitUserRating(event) {
    event.preventDefault();
    if (!state.pendingRateTarget) return;

    closeRateUserModal();
    showToast(`תודה! הדירוג (${state.selectedStarRating} ⭐) והביקורת עבור ${state.pendingRateTarget.author} נשמרו בהצלחה! 🥳`);
}

/* =========================================================
   REPORT & APPEAL SYSTEM
   ========================================================= */
function openReportModal(author, title) {
    state.pendingReportTarget = { author, title };
    
    const targetText = document.getElementById('reportTargetText');
    const detailsInput = document.getElementById('reportDetailsInput');
    const chk = document.getElementById('reportDeclareChk');

    if (targetText) targetText.textContent = `דיווח על המשכיר/מוכר: ${author} (מודעה: "${title}")`;
    if (detailsInput) detailsInput.value = '';
    if (chk) chk.checked = false;

    const modal = document.getElementById('reportUserModal');
    if (modal) modal.classList.remove('hidden');
}

function closeReportModal() {
    const modal = document.getElementById('reportUserModal');
    if (modal) modal.classList.add('hidden');
    state.pendingReportTarget = null;
}

function submitReportForm(event) {
    event.preventDefault();

    const chk = document.getElementById('reportDeclareChk');
    if (!chk || !chk.checked) {
        showToast('יש לסמן V ולהצהיר על אמינות פרטי הערעור!');
        return;
    }

    const reason = document.getElementById('reportReasonSelect').value;
    const details = document.getElementById('reportDetailsInput').value.trim();

    if (!state.pendingReportTarget) return;

    const newReport = {
        id: 'report-' + Date.now(),
        targetAuthor: state.pendingReportTarget.author,
        targetTitle: state.pendingReportTarget.title,
        reason: reason,
        details: details,
        reporter: 'אורח (אתה)',
        date: new Date().toISOString(),
        status: 'בטיפול משפטי 🛡️'
    };

    try {
        const existingReports = JSON.parse(localStorage.getItem('news_user_reports') || '[]');
        existingReports.unshift(newReport);
        localStorage.setItem('news_user_reports', JSON.stringify(existingReports));
    } catch (e) {
        localStorage.setItem('news_user_reports', JSON.stringify([newReport]));
    }

    closeReportModal();
    showToast('דיווחך/ערעורך נקלט בהצלחה ויועבר לבדיקה משפטית 🛡️!');
}

/* =========================================================
   RENTAL DAMAGE CONTRACT & COURIER DELIVERY WORKFLOW
   ========================================================= */
function openRentalContractModal(id, title, price) {
    state.pendingRentalArticle = { id, title, price: price || 200 };
    
    const titleElem = document.getElementById('contractModalItemTitle');
    const chkElem = document.getElementById('modalContractCheckbox');
    if (titleElem) titleElem.textContent = `מוצר להשכרה: ${title} (yhsh ${price}/יום)`;
    if (chkElem) chkElem.checked = false;

    const modal = document.getElementById('rentalContractModal');
    if (modal) modal.classList.remove('hidden');
}

function closeRentalContractModal() {
    const modal = document.getElementById('rentalContractModal');
    if (modal) modal.classList.add('hidden');
    state.pendingRentalArticle = null;
}

function confirmRentalWithContract() {
    const chkElem = document.getElementById('modalContractCheckbox');
    if (!chkElem || !chkElem.checked) {
        showToast('יש לסמן V ולשאת באחריות חוזה הנזק/הרס כדי להשלים את ההשכרה!');
        return;
    }

    if (!state.pendingRentalArticle) return;

    const { title, price } = state.pendingRentalArticle;
    const deliverySelect = document.getElementById('modalDeliveryTypeSelect');
    const deliveryFee = deliverySelect ? parseInt(deliverySelect.value || '0', 10) : 0;
    const totalPrice = price + deliveryFee;

    if (state.userBalance < totalPrice) {
        showToast(`אין מספיק יתרה בארנק! סה"כ לתשלום (השכרה + משלוח): yhsh ${totalPrice}, יתרה: yhsh ${state.userBalance.toLocaleString('he-IL')}`);
        openSubscriptionModal();
        return;
    }

    state.userBalance -= totalPrice;
    localStorage.setItem('news_user_balance', state.userBalance.toString());
    updateBalanceDisplays();

    closeRentalContractModal();
    const deliveryText = deliveryFee > 0 ? ` (כולל משלוח עד הבית 🛵 yhsh ${deliveryFee})` : '';
    showToast(`נחתם חוזה השכרה וערבות נזק/הרס בהצלחה עבור ${title}${deliveryText}! ✍️📜🎉`);
}

// Instant Buy Action
function buyArticleNow(id, buyPrice, title) {
    const cost = buyPrice || 4000;
    if (state.userBalance < cost) {
        showToast(`אין מספיק יתרה בארנק! מחיר קנייה: yhsh ${cost.toLocaleString('he-IL')}, יתרה: yhsh ${state.userBalance.toLocaleString('he-IL')}`);
        openSubscriptionModal();
        return;
    }

    if (confirm(`האם ברצונך לרכוש את ${title} בקנייה סופית בסך yhsh ${cost.toLocaleString('he-IL')}?`)) {
        state.userBalance -= cost;
        localStorage.setItem('news_user_balance', state.userBalance.toString());
        updateBalanceDisplays();
        showToast(`מזל טוב! רכשת בהצלחה את ${title} ב-yhsh ${cost.toLocaleString('he-IL')}! 🛒🎉`);
    }
}

// Monthly Subscription Logic
function openSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.classList.remove('hidden');
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.classList.add('hidden');
}

function subscribePlan(planName, price, bonusWallet) {
    state.subscription = {
        planName: planName,
        price: price,
        bonusWallet: bonusWallet,
        active: true,
        startDate: new Date().toISOString()
    };
    
    state.userBalance += bonusWallet;
    localStorage.setItem('news_user_balance', state.userBalance.toString());
    localStorage.setItem('news_user_subscription', JSON.stringify(state.subscription));

    updateBalanceDisplays();

    if (elements.guestUserText) {
        elements.guestUserText.textContent = `👑 ${planName}`;
    }

    closeSubscriptionModal();
    showToast(`מזל טוב! הצטרפת ל-${planName} וקיבלת yhsh ${bonusWallet.toLocaleString('he-IL')} בונוס לארנק! 🥳💎`);
}

/* =========================================================
   BOTTOM DARK FAVORITES SHEET LOGIC
   ========================================================= */
function openFavoritesSheet() {
    renderFavoritesSheet();
    const sheet = document.getElementById('favBottomSheet');
    const overlay = document.getElementById('favBottomSheetOverlay');
    if (sheet) sheet.classList.add('active');
    if (overlay) overlay.classList.add('active');
}

function closeFavoritesSheet() {
    const sheet = document.getElementById('favBottomSheet');
    const overlay = document.getElementById('favBottomSheetOverlay');
    if (sheet) sheet.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function renderFavoritesSheet() {
    const gridContainer = document.getElementById('favInventoryGrid');
    const countBadge = document.getElementById('favSheetCount');
    if (!gridContainer) return;

    const bookmarkedArticles = state.articles.filter(a => state.bookmarks.includes(a.id));

    if (countBadge) countBadge.textContent = `${bookmarkedArticles.length} מוצרים`;

    if (bookmarkedArticles.length === 0) {
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #a0a0b0;">
                <i class="fa-solid fa-heart-crack fa-3x" style="margin-bottom: 12px; color: #444455;"></i>
                <h4 style="font-size: 1.2rem; color: #ffffff; margin-bottom: 4px;">אין עדיין מוצרים שמורים</h4>
                <p>לחץ על סמל הלב במודעות ההשכרה כדי לשמור פריטים כאן!</p>
            </div>
        `;
        return;
    }

    gridContainer.innerHTML = bookmarkedArticles.map(article => `
        <div class="fav-tile-card" onclick="openArticleModal('${article.id}')">
            <img class="fav-tile-image" src="${article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים']}" alt="${article.title}">
            <button class="fav-tile-remove-btn" onclick="event.stopPropagation(); toggleBookmarkMain('${article.id}'); renderFavoritesSheet();" title="הסר מהמועדפים">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="fav-tile-content">
                <div class="fav-tile-title">${article.title}</div>
                <div class="fav-tile-price">${article.rentalPeriod || ('yhsh ' + (article.price || 150) + '/יום')}</div>
            </div>
        </div>
    `).join('');
}

// Expose globally
window.openFavoritesSheet = openFavoritesSheet;
window.closeFavoritesSheet = closeFavoritesSheet;
window.openSubscriptionModal = openSubscriptionModal;
window.closeSubscriptionModal = closeSubscriptionModal;
window.subscribePlan = subscribePlan;
window.buyArticleNow = buyArticleNow;
window.openRentalContractModal = openRentalContractModal;
window.closeRentalContractModal = closeRentalContractModal;
window.confirmRentalWithContract = confirmRentalWithContract;
window.openReportModal = openReportModal;
window.closeReportModal = closeReportModal;
window.submitReportForm = submitReportForm;
window.addFundsGlobal = addFundsGlobal;
window.openRateUserModal = openRateUserModal;
window.closeRateUserModal = closeRateUserModal;
window.setStarRating = setStarRating;
window.submitUserRating = submitUserRating;
window.toggleFilterMenu = toggleFilterMenu;
window.applyFiverrFilters = applyFiverrFilters;
window.toggleSortMenu = toggleSortMenu;
window.selectSortOption = selectSortOption;

function saveBookmarksToStorage() {
    localStorage.setItem('news_bookmarks', JSON.stringify(state.bookmarks));
}

function applyTheme() {
    if (state.darkMode) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Main Render Function
function renderApp() {
    if (elements.favBtnLabel) elements.favBtnLabel.textContent = `מועדפים (${state.bookmarks.length})`;

    // Filter Articles
    let filtered = state.articles.filter(article => {
        const matchesCategory = state.activeCategory === 'all' || article.category === state.activeCategory;
        const matchesBookmarks = !state.showBookmarksOnly || state.bookmarks.includes(article.id);
        return matchesCategory && matchesBookmarks;
    });

    if (elements.fiverrResultsCount) {
        elements.fiverrResultsCount.textContent = `${filtered.length * 320}+ תוצאות לוח`;
    }

    // Render Rental/Buy Listing Cards in Fiverr Marketplace Style (NO Video)
    if (elements.articlesList) {
        if (filtered.length === 0) {
            elements.articlesList.innerHTML = '';
            if (elements.emptyState) elements.emptyState.classList.remove('hidden');
        } else {
            if (elements.emptyState) elements.emptyState.classList.add('hidden');
            renderArticlesList(filtered);
        }
    }
}

// Render Fiverr Marketplace Style Grid Cards (NO Video - Just Clean Images)
function renderArticlesList(articles) {
    if (!elements.articlesList) return;
    
    elements.articlesList.className = "cube-cards-grid";
    elements.articlesList.innerHTML = articles.map((article, index) => {
        let rentalPeriod = article.rentalPeriod || (`🔑 yhsh ${article.price || 150} / ליום`);
        let buyPeriod = article.buyPeriod || (`🛒 yhsh ${(article.buyPrice || 3500).toLocaleString('he-IL')} לקנייה`);
        
        rentalPeriod = rentalPeriod.replace(/₪/g, 'yhsh');
        buyPeriod = buyPeriod.replace(/₪/g, 'yhsh');

        const isBookmarked = state.bookmarks.includes(article.id);
        const image = article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים'];
        const summaryText = article.summary || 'ציוד איכותי שמור כחדש זמין להשכרה או קנייה מיידית מפרטי.';
        const rentPriceNum = article.price || 150;

        const rating = article.sellerRating || 4.9;
        const reviewsCount = article.sellerReviews || (10 + (index * 7));
        const sellerLevel = index % 2 === 0 ? "Top Rated ♦︎♦︎♦︎" : "Level 1 ♦︎♢♢";

        return `
            <div class="cube-card-box" onclick="openArticleModal('${article.id}')">
                
                <!-- Image Wrapper with Top-Left Floating Heart Icon & Category Tag -->
                <div class="cube-image-wrapper">
                    <img src="${image}" alt="${article.title}" loading="lazy">
                    <span class="cube-badge-tag">${article.category}</span>
                    <div class="cube-heart-btn ${isBookmarked ? 'active' : ''}" onclick="event.stopPropagation(); toggleBookmarkMain('${article.id}')" title="שמור במועדפים">
                        <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </div>
                </div>

                <!-- Card Body (Fiverr Marketplace Structure) -->
                <div class="cube-card-body">
                    
                    <!-- Seller Row: Avatar + Online Dot + Name + Ad badge + Level -->
                    <div class="fiverr-seller-row">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="seller-avatar-mini">
                                <i class="fa-solid fa-user"></i>
                                <span class="seller-online-dot"></span>
                            </div>
                            <span class="seller-name-text">${article.author} <span style="font-size:0.68rem; color:var(--text-muted); font-weight:700;">Ad</span></span>
                        </div>
                        <span class="seller-level-badge">${sellerLevel}</span>
                    </div>

                    <!-- Title -->
                    <h3 class="cube-title-text">${article.title}</h3>
                    
                    <!-- Subtitle Summary -->
                    <p class="cube-subtitle-text">${summaryText}</p>

                    <!-- Rating Row -->
                    <div style="display: flex; align-items: center; gap: 4px; font-size: 0.85rem; font-weight: 800; color: var(--text-primary); margin-top: auto; margin-bottom: 6px;">
                        <i class="fa-solid fa-star" style="color: #18181b;"></i>
                        <span>${rating}</span>
                        <span style="color: var(--text-muted); font-weight: 700;">(${reviewsCount})</span>
                    </div>

                    <!-- Price Row (החל מ-yhsh...) -->
                    <div class="cube-price-tag" style="font-size: 0.95rem; font-weight: 900; margin-bottom: 8px;">
                        החל מ-<strong>yhsh ${rentPriceNum}</strong> / ליום
                    </div>

                    <!-- Dual Option Action Buttons -->
                    <div class="cube-dual-actions">
                        <button class="btn-rent-option" onclick="event.stopPropagation(); openRentalContractModal('${article.id}', '${article.title.replace(/'/g, "\\'")}', ${rentPriceNum})">
                            <i class="fa-solid fa-key"></i> השכר
                        </button>
                        <button class="btn-buy-option" onclick="event.stopPropagation(); buyArticleNow('${article.id}', ${article.buyPrice || 4000}, '${article.title.replace(/'/g, "\\'")}')">
                            <i class="fa-solid fa-cart-shopping"></i> קנה
                        </button>
                    </div>

                </div>

            </div>
        `;
    }).join('');
}

function toggleBookmarkMain(id) {
    const idx = state.bookmarks.indexOf(id);
    if (idx > -1) {
        state.bookmarks.splice(idx, 1);
        showToast('המוצר הוסר מהמועדפים');
    } else {
        state.bookmarks.push(id);
        showToast('המוצר נשמר במועדפים! ❤️');
        openFavoritesSheet();
    }
    saveBookmarksToStorage();
    renderApp();
}

function setupEventListeners() {
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderApp();
        });
    }
}

// Redirect to Dedicated Article Page INSTANTLY
function openArticleModal(id) {
    window.location.href = 'article.html?id=' + id;
}

// Toast Notification Helper
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

// Run App on Load
document.addEventListener('DOMContentLoaded', initApp);
