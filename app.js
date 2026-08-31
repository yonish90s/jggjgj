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
    pollVoted: false,
    userBalance: 50000,
    subscription: null,
    pendingRentalArticle: null,
    pendingReportTarget: null
};

// DOM Elements Container
const elements = {
    articlesList: null,
    emptyState: null,
    sectionTitle: null,
    resultsCount: null,
    searchInput: null,
    categoryBtns: null,
    themeToggle: null,
    favBtnLabel: null,
    userBalanceDisplay: null,
    subscriptionModal: null,
    guestUserText: null,
    favBottomSheet: null,
    favBottomSheetOverlay: null,
    favInventoryGrid: null,
    favSheetCount: null,
    toast: null,
    toastMessage: null,
    rentalContractModal: null,
    reportUserModal: null
};

function bindDOMElements() {
    elements.articlesList = document.getElementById('articlesList');
    elements.emptyState = document.getElementById('emptyState');
    elements.sectionTitle = document.getElementById('sectionTitle');
    elements.resultsCount = document.getElementById('resultsCount');
    elements.searchInput = document.getElementById('searchInput');
    elements.categoryBtns = document.querySelectorAll('.category-btn');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.favBtnLabel = document.getElementById('favBtnLabel');
    elements.userBalanceDisplay = document.getElementById('userBalanceDisplay');
    elements.subscriptionModal = document.getElementById('subscriptionModal');
    elements.guestUserText = document.getElementById('guestUserText');
    elements.favBottomSheet = document.getElementById('favBottomSheet');
    elements.favBottomSheetOverlay = document.getElementById('favBottomSheetOverlay');
    elements.favInventoryGrid = document.getElementById('favInventoryGrid');
    elements.favSheetCount = document.getElementById('favSheetCount');
    elements.toast = document.getElementById('toast');
    elements.toastMessage = document.getElementById('toastMessage');
    elements.rentalContractModal = document.getElementById('rentalContractModal');
    elements.reportUserModal = document.getElementById('reportUserModal');
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

    try {
        state.likes = JSON.parse(localStorage.getItem('news_likes') || '{}');
    } catch (e) {
        state.likes = { "rent-1": 32, "rent-2": 28, "rent-3": 21, "rent-4": 17, "rent-5": 14 };
    }

    const savedBal = localStorage.getItem('news_user_balance');
    state.userBalance = savedBal ? parseInt(savedBal, 10) : 50000;
    if (elements.userBalanceDisplay) {
        elements.userBalanceDisplay.textContent = '₪ ' + state.userBalance.toLocaleString('he-IL');
    }

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

    state.pollVoted = localStorage.getItem('news_poll_voted') === 'true';
    state.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
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
   REPORT & APPEAL SYSTEM (ערעור ודיווח על משתמש/מוכר)
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
    if (titleElem) titleElem.textContent = `מוצר להשכרה: ${title} (₪${price}/יום)`;
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
        showToast(`אין מספיק יתרה בארנק! סה"כ לתשלום (השכרה + משלוח): ₪${totalPrice}, יתרה: ₪${state.userBalance.toLocaleString('he-IL')}`);
        openSubscriptionModal();
        return;
    }

    state.userBalance -= totalPrice;
    localStorage.setItem('news_user_balance', state.userBalance.toString());
    if (elements.userBalanceDisplay) {
        elements.userBalanceDisplay.textContent = '₪ ' + state.userBalance.toLocaleString('he-IL');
    }

    closeRentalContractModal();
    const deliveryText = deliveryFee > 0 ? ` (כולל משלוח עד הבית 🛵 ₪${deliveryFee})` : '';
    showToast(`נחתם חוזה השכרה וערבות נזק/הרס בהצלחה עבור ${title}${deliveryText}! ✍️📜🎉`);
}

// Instant Buy Action
function buyArticleNow(id, buyPrice, title) {
    const cost = buyPrice || 4000;
    if (state.userBalance < cost) {
        showToast(`אין מספיק יתרה בארנק! מחיר קנייה: ₪${cost.toLocaleString('he-IL')}, יתרה: ₪${state.userBalance.toLocaleString('he-IL')}`);
        openSubscriptionModal();
        return;
    }

    if (confirm(`האם ברצונך לרכוש את ${title} בקנייה סופית בסך ₪${cost.toLocaleString('he-IL')}?`)) {
        state.userBalance -= cost;
        localStorage.setItem('news_user_balance', state.userBalance.toString());
        if (elements.userBalanceDisplay) {
            elements.userBalanceDisplay.textContent = '₪ ' + state.userBalance.toLocaleString('he-IL');
        }
        showToast(`מזל טוב! רכשת בהצלחה את ${title} ב-₪${cost.toLocaleString('he-IL')}! 🛒🎉`);
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

    if (elements.userBalanceDisplay) {
        elements.userBalanceDisplay.textContent = '₪ ' + state.userBalance.toLocaleString('he-IL');
    }

    if (elements.guestUserText) {
        elements.guestUserText.textContent = `👑 ${planName}`;
    }

    closeSubscriptionModal();
    showToast(`מזל טוב! הצטרפת ל-${planName} וקיבלת ₪${bonusWallet.toLocaleString('he-IL')} בונוס לארנק! 🥳💎`);
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

    // Square Inventory Tiles
    gridContainer.innerHTML = bookmarkedArticles.map(article => `
        <div class="fav-tile-card" onclick="openArticleModal('${article.id}')">
            <img class="fav-tile-image" src="${article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים']}" alt="${article.title}">
            <button class="fav-tile-remove-btn" onclick="event.stopPropagation(); toggleBookmarkMain('${article.id}'); renderFavoritesSheet();" title="הסר מהמועדפים">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="fav-tile-content">
                <div class="fav-tile-title">${article.title}</div>
                <div class="fav-tile-price">${article.rentalPeriod || ('₪' + (article.price || 150) + '/יום')}</div>
            </div>
        </div>
    `).join('');
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

// Expose globally for inline onclick attributes
window.openFavoritesSheet = openFavoritesSheet;
window.closeFavoritesSheet = closeFavoritesSheet;
window.openSubscriptionModal = openSubscriptionModal;
window.closeSubscriptionModal = closeSubscriptionModal;
window.subscribePlan = subscribePlan;
window.toggleReadMore = toggleReadMore;
window.buyArticleNow = buyArticleNow;
window.openRentalContractModal = openRentalContractModal;
window.closeRentalContractModal = closeRentalContractModal;
window.confirmRentalWithContract = confirmRentalWithContract;
window.openReportModal = openReportModal;
window.closeReportModal = closeReportModal;
window.submitReportForm = submitReportForm;

function filterByCategory(cat) {
    state.activeCategory = cat;
    state.showBookmarksOnly = false;
    renderApp();
    const listElem = document.getElementById('articlesList');
    if (listElem) listElem.scrollIntoView({ behavior: 'smooth' });
}

function saveBookmarksToStorage() {
    localStorage.setItem('news_bookmarks', JSON.stringify(state.bookmarks));
}

function applyTheme() {
    if (state.darkMode) {
        document.body.classList.add('dark-theme');
        if (elements.themeToggle) elements.themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        if (elements.themeToggle) elements.themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// Main Render Function
function renderApp() {
    if (elements.favBtnLabel) elements.favBtnLabel.textContent = `מועדפים (${state.bookmarks.length})`;

    // Filter Articles / Rental Items
    let filtered = state.articles.filter(article => {
        const matchesCategory = state.activeCategory === 'all' || article.category === state.activeCategory;
        
        const query = state.searchQuery.trim().toLowerCase();
        const matchesSearch = !query || 
            article.title.toLowerCase().includes(query) || 
            article.summary.toLowerCase().includes(query) || 
            article.category.toLowerCase().includes(query) ||
            article.author.toLowerCase().includes(query);

        const matchesBookmarks = !state.showBookmarksOnly || state.bookmarks.includes(article.id);

        return matchesCategory && matchesSearch && matchesBookmarks;
    });

    // Update Section Title & Count
    if (elements.sectionTitle) {
        if (state.showBookmarksOnly) {
            elements.sectionTitle.textContent = 'מוצרים ששמרת במועדפים';
        } else if (state.searchQuery) {
            elements.sectionTitle.textContent = `תוצאות חיפוש עבור: "${state.searchQuery}"`;
        } else if (state.activeCategory !== 'all') {
            elements.sectionTitle.textContent = `מוצרים להשכרה בקטגוריית ${state.activeCategory}`;
        } else {
            elements.sectionTitle.textContent = 'ציוד ומוצרים להשכרה / קנייה סופית מפרטיים (מדד אמינות ⭐)';
        }
    }

    if (elements.resultsCount) elements.resultsCount.textContent = `מציג ${filtered.length} מוצרים זמינים להשכרה ולקנייה`;

    // Render Rental/Buy Listing Cards with Seller Rating & Report Button
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

// Render 100% Symmetrical Grid Cards with Seller Trust Rating Badge & Report Icon
function renderArticlesList(articles) {
    if (!elements.articlesList) return;
    
    elements.articlesList.className = "cube-cards-grid";
    elements.articlesList.innerHTML = articles.map((article) => {
        const rentalPeriod = article.rentalPeriod || (`🔑 ₪ ${article.price || 150} / ליום`);
        const buyPeriod = article.buyPeriod || (`🛒 ₪ ${(article.buyPrice || 3500).toLocaleString('he-IL')} לקנייה`);
        const isBookmarked = state.bookmarks.includes(article.id);
        const image = article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים'];
        const summaryText = article.summary || 'ציוד איכותי שמור כחדש זמין להשכרה או קנייה מיידית מפרטי.';
        const hasLongSummary = summaryText.length > 55;
        const buyPriceNum = article.buyPrice || 4000;
        const rentPriceNum = article.price || 150;
        const rating = article.sellerRating || 4.9;
        const trustPct = article.trustScore || "98%";

        return `
            <div class="cube-card-box" onclick="openArticleModal('${article.id}')">
                
                <!-- Image Header with Floating Badges & Report Button -->
                <div class="cube-image-wrapper">
                    <img src="${image}" alt="${article.title}" loading="lazy">
                    <span class="cube-badge-tag">${article.category}</span>
                    <div class="cube-heart-btn ${isBookmarked ? 'active' : ''}" onclick="event.stopPropagation(); toggleBookmarkMain('${article.id}')" title="שמור במועדפים">
                        <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </div>
                </div>

                <!-- Card Content Body -->
                <div class="cube-card-body">
                    <div class="cube-price-tag">
                        <span class="rent-price">${rentalPeriod}</span>
                        <span class="buy-price">${buyPeriod}</span>
                    </div>

                    <h3 class="cube-title-text">${article.title}</h3>
                    
                    <div class="cube-subtitle-wrapper">
                        <p class="cube-subtitle-text">${summaryText}</p>
                        ${hasLongSummary ? `<button class="cube-read-more-btn" onclick="toggleReadMore(event, this)">עוד...</button>` : ''}
                    </div>

                    <!-- Seller Trust & Reliability Rating Row -->
                    <div class="cube-meta-row" style="justify-content: space-between;">
                        <span><i class="fa-solid fa-user-check" style="color: #16a34a;"></i> ${article.author}</span>
                        <span style="color: #eab308; font-weight: 900;"><i class="fa-solid fa-star"></i> ${rating} (${trustPct})</span>
                        <button onclick="event.stopPropagation(); openReportModal('${article.author.replace(/'/g, "\\'")}', '${article.title.replace(/'/g, "\\'")}')" style="background:none; border:none; color: var(--text-muted); cursor:pointer; font-size: 0.8rem;" title="דיווח / ערעור על משתמש">
                            <i class="fa-solid fa-flag"></i>
                        </button>
                    </div>

                    <div class="cube-spec-pills">
                        <span class="cube-pill-item" style="color: #16a34a; font-weight: 800;">⭐ ${rating} מדד אמינות</span>
                        <span class="cube-pill-item">משלוח זמין 🛵</span>
                    </div>

                    <!-- Dual Option Action Buttons -->
                    <div class="cube-dual-actions">
                        <button class="btn-rent-option" onclick="event.stopPropagation(); openRentalContractModal('${article.id}', '${article.title.replace(/'/g, "\\'")}', ${rentPriceNum})">
                            <i class="fa-solid fa-key"></i> השכר/השאל
                        </button>
                        <button class="btn-buy-option" onclick="event.stopPropagation(); buyArticleNow('${article.id}', ${buyPriceNum}, '${article.title.replace(/'/g, "\\'")}')">
                            <i class="fa-solid fa-cart-shopping"></i> קנה עכשיו
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

// Event Listeners Setup
function setupEventListeners() {
    if (elements.categoryBtns) {
        elements.categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.activeCategory = btn.dataset.category || 'all';
                state.showBookmarksOnly = false;
                renderApp();
            });
        });
    }

    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderApp();
        });
    }

    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('news_theme', state.darkMode ? 'dark' : 'light');
            applyTheme();
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
