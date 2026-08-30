// Fallback images per category
const CATEGORY_IMAGES = {
    "מחשבים": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "פלאפונים": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "כלי עבודה": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "אקסבוקס וגיימינג": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    "מצלמות": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
};

// Database of Category-Specific Live Price Trends
const CATEGORY_PRICE_TRENDS = {
    "all": [
        { name: "MacBook M3 Max (הוזלה!)", type: "down", change: "-12%", price: "₪200/יום" },
        { name: "Sony A7 IV (מבצע חם)", type: "down", change: "-14%", price: "₪250/יום" },
        { name: "iPhone 15 Pro Max", type: "down", change: "-10%", price: "₪95/יום" },
        { name: "Xbox Series X (ביקוש גבוה)", type: "up", change: "+5.2%", price: "₪110/יום" },
        { name: "פטישון BOSCH GBH", type: "down", change: "-18%", price: "₪85/יום" }
    ],
    "מחשבים": [
        { name: "MacBook Pro 16\" M3 (הוזלה!)", type: "down", change: "-12%", price: "₪200/יום" },
        { name: "MacBook Air M2 15\"", type: "up", change: "+5.4%", price: "₪130/יום" },
        { name: "Lenovo Legion i7 (מבצע)", type: "down", change: "-15%", price: "₪150/יום" },
        { name: "Dell XPS 15 OLED", type: "down", change: "-8%", price: "₪170/יום" }
    ],
    "פלאפונים": [
        { name: "iPhone 15 Pro Max 512GB", type: "down", change: "-10%", price: "₪95/יום" },
        { name: "Samsung Galaxy S24 Ultra", type: "up", change: "+6.8%", price: "₪110/יום" },
        { name: "Google Pixel 8 Pro (הוזלה!)", type: "down", change: "-16%", price: "₪80/יום" },
        { name: "iPhone 14 Pro 256GB", type: "down", change: "-12%", price: "₪75/יום" }
    ],
    "כלי עבודה": [
        { name: "פטישון BOSCH GBH (מבצע)", type: "down", change: "-18%", price: "₪85/יום" },
        { name: "סט מברגות DEWALT 18V", type: "up", change: "+4.5%", price: "₪90/יום" },
        { name: "משחזת זווית Makita", type: "down", change: "-11%", price: "₪70/יום" },
        { name: "מסור עגול Milwaukee", type: "down", change: "-14%", price: "₪95/יום" }
    ],
    "אקסבוקס וגיימינג": [
        { name: "Xbox Series X 1TB (ביקוש חם)", type: "up", change: "+5.2%", price: "₪110/יום" },
        { name: "PlayStation 5 Slim (הוזלה!)", type: "down", change: "-14%", price: "₪120/יום" },
        { name: "Nintendo Switch OLED", type: "down", change: "-9%", price: "₪75/יום" },
        { name: "הגה מרוצים Logitech G29", type: "up", change: "+8.0%", price: "₪65/יום" }
    ],
    "מצלמות": [
        { name: "Sony A7 IV + 24-70mm (הוזלה!)", type: "down", change: "-14%", price: "₪250/יום" },
        { name: "Canon EOS R6 Mark II", type: "up", change: "+7.1%", price: "₪280/יום" },
        { name: "רחפן DJI Mini 4 Pro (מבצע)", type: "down", change: "-10%", price: "₪160/יום" },
        { name: "עדשת Sony 70-200mm f/2.8", type: "down", change: "-13%", price: "₪180/יום" }
    ]
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
    subscription: null
};

// DOM Elements
const elements = {
    top3Grid: document.getElementById('top3Grid'),
    articlesList: document.getElementById('articlesList'),
    emptyState: document.getElementById('emptyState'),
    sectionTitle: document.getElementById('sectionTitle'),
    resultsCount: document.getElementById('resultsCount'),
    searchInput: document.getElementById('searchInput'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    themeToggle: document.getElementById('themeToggle'),
    bookmarksBtn: document.getElementById('bookmarksBtn'),
    favBtnLabel: document.getElementById('favBtnLabel'),
    userBalanceDisplay: document.getElementById('userBalanceDisplay'),
    subscriptionModal: document.getElementById('subscriptionModal'),
    guestUserText: document.getElementById('guestUserText'),
    priceTrendsList: document.getElementById('priceTrendsList'),
    favBottomSheet: document.getElementById('favBottomSheet'),
    favBottomSheetOverlay: document.getElementById('favBottomSheetOverlay'),
    favInventoryGrid: document.getElementById('favInventoryGrid'),
    favSheetCount: document.getElementById('favSheetCount'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// Initialize Application
async function initApp() {
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
                elements.guestUserText.parentElement.style.borderColor = 'var(--yad2-pink)';
                elements.guestUserText.parentElement.style.color = 'var(--yad2-pink)';
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

// Monthly Subscription Logic
function openSubscriptionModal() {
    if (elements.subscriptionModal) {
        elements.subscriptionModal.classList.remove('hidden');
    }
}

function closeSubscriptionModal() {
    if (elements.subscriptionModal) {
        elements.subscriptionModal.classList.add('hidden');
    }
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
        elements.guestUserText.parentElement.style.borderColor = 'var(--yad2-pink)';
        elements.guestUserText.parentElement.style.color = 'var(--yad2-pink)';
    }

    closeSubscriptionModal();
    showToast(`מזל טוב! הצטרפת ל-${planName} וקיבלת ₪${bonusWallet.toLocaleString('he-IL')} בונוס לארנק! 🥳💎`);
}

/* =========================================================
   BOTTOM DARK FAVORITES SHEET LOGIC ("חלון שחור מלמטה עם ריבועים")
   ========================================================= */
function openFavoritesSheet() {
    renderFavoritesSheet();
    if (elements.favBottomSheet) elements.favBottomSheet.classList.add('active');
    if (elements.favBottomSheetOverlay) elements.favBottomSheetOverlay.classList.add('active');
}

function closeFavoritesSheet() {
    if (elements.favBottomSheet) elements.favBottomSheet.classList.remove('active');
    if (elements.favBottomSheetOverlay) elements.favBottomSheetOverlay.classList.remove('active');
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

    // Square Inventory Tiles (Matches Screenshot 2)
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

function filterByCategory(cat) {
    state.activeCategory = cat;
    state.showBookmarksOnly = false;
    renderApp();
    const listElem = document.getElementById('articlesList');
    if (listElem) listElem.scrollIntoView({ behavior: 'smooth' });
}

function saveCustomArticlesToStorage(newArticle) {
    const localCustomArticles = JSON.parse(localStorage.getItem('news_custom_articles') || '[]');
    localCustomArticles.unshift(newArticle);
    localStorage.setItem('news_custom_articles', JSON.stringify(localCustomArticles));
}

function saveBookmarksToStorage() {
    localStorage.setItem('news_bookmarks', JSON.stringify(state.bookmarks));
}

function saveLikesToStorage() {
    localStorage.setItem('news_likes', JSON.stringify(state.likes));
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

// Render Dynamic Category-Relevant Live Price Trends Widget
function renderPriceTrendsWidget() {
    const trendsContainer = document.getElementById('priceTrendsList');
    if (!trendsContainer) return;

    const currentCat = state.activeCategory || 'all';
    const trendsData = CATEGORY_PRICE_TRENDS[currentCat] || CATEGORY_PRICE_TRENDS['all'];

    trendsContainer.innerHTML = trendsData.map(item => `
        <div class="market-item">
            <span class="market-name">${item.name}</span>
            <span class="trend ${item.type}">
                <i class="fa-solid fa-caret-${item.type}"></i> ${item.change} (${item.price})
            </span>
        </div>
    `).join('');
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
            elements.sectionTitle.textContent = 'ציוד ומוצרים להשכרה (מחשבים, פלאפונים, כלי עבודה, אקסבוקס, מצלמות)';
        }
    }

    if (elements.resultsCount) elements.resultsCount.textContent = `מציג ${filtered.length} מוצרים להשכרה`;

    // Render Top 3 Featured Grid
    const showTop3 = state.activeCategory === 'all' && !state.searchQuery && !state.showBookmarksOnly && filtered.length >= 3;
    
    let rowArticles = filtered;

    if (elements.top3Grid) {
        if (showTop3) {
            const top3Articles = filtered.slice(0, 3);
            renderTop3Grid(top3Articles);
            elements.top3Grid.parentElement.classList.remove('hidden');
            rowArticles = filtered.slice(3);
        } else {
            elements.top3Grid.parentElement.classList.add('hidden');
        }
    }

    // Render Rental Listing Cards
    if (elements.articlesList) {
        if (rowArticles.length === 0 && (!showTop3 || filtered.length === 0)) {
            elements.articlesList.innerHTML = '';
            if (elements.emptyState) elements.emptyState.classList.remove('hidden');
        } else {
            if (elements.emptyState) elements.emptyState.classList.add('hidden');
            renderArticlesList(rowArticles);
        }
    }

    // Render Category-Relevant Price Trends Widget
    renderPriceTrendsWidget();
}

// Render Top 3 Featured Rental Items Grid
function renderTop3Grid(articles) {
    elements.top3Grid.innerHTML = articles.map(article => `
        <div class="top3-card" onclick="openArticleModal('${article.id}')">
            <img src="${article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים']}" alt="${article.title}">
            <div class="top3-overlay">
                <div style="font-size:0.8rem; color:var(--yad2-pink); font-weight:800; margin-bottom:2px;">${article.rentalPeriod || 'להשכרה'}</div>
                ${article.title}
            </div>
        </div>
    `).join('');
}

// Render Symmetrical Yad2 Rental Listing Row Items
function renderArticlesList(articles) {
    elements.articlesList.innerHTML = articles.map((article) => {
        const rentalPeriod = article.rentalPeriod || (`₪ ${article.price || 150} / ליום`);
        const rentalDates = article.rentalDates || 'זמין להשכרה מיידית';
        const isBookmarked = state.bookmarks.includes(article.id);
        const pills = article.tags || ['השכרה יומית', 'שמור כחדש', 'איסוף מהיר'];

        return `
            <article class="news-row-item" onclick="openArticleModal('${article.id}')">
                
                <!-- Right Side Image (200px Fixed) -->
                <div class="row-image">
                    <img src="${article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים']}" alt="${article.title}" loading="lazy">
                </div>

                <!-- Center Details Area -->
                <div class="row-content">
                    <h3 class="row-title">${article.title}</h3>
                    <div class="row-subtitle">${article.summary}</div>
                    <div class="row-meta-yad2">
                        <span><i class="fa-solid fa-location-dot" style="color:var(--yad2-pink);"></i> ${article.author}</span>
                        <span>•</span>
                        <span><i class="fa-regular fa-calendar-check"></i> ${rentalDates}</span>
                    </div>
                    <div class="row-tags-pills">
                        ${pills.map(p => `<span class="yad2-tag-pill">${p}</span>`).join('')}
                    </div>
                </div>

                <!-- Left Price & Rental Period Tag -->
                <div class="row-left-yad2">
                    <div class="row-heart-btn ${isBookmarked ? 'active' : ''}" onclick="event.stopPropagation(); toggleBookmarkMain('${article.id}')" title="שמור במועדפים">
                        <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </div>
                    <div class="row-price-yad2" style="font-size:1.25rem; text-align:left; color:var(--yad2-pink);">${rentalPeriod}</div>
                </div>

            </article>
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
                if (elements.bookmarksBtn) {
                    elements.bookmarksBtn.classList.remove('btn-primary');
                    elements.bookmarksBtn.classList.add('btn-outline');
                }
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
    if (!elements.toastMessage || !elements.toast) return;
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('hidden');
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

// Run App on Load
document.addEventListener('DOMContentLoaded', initApp);
