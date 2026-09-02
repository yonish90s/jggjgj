const FALLBACK_ARTICLES = [
    {
        "id": "art-1",
        "title": "מהפכת ה-AI ב-2026: כיצד מודלים אוטונומיים משנים את שוק העבודה",
        "category": "בינה מלאכותית",
        "author": "דניאל קליין",
        "date": "01.09.2026",
        "readTime": "6 דקות קריאה",
        "views": "12.4K",
        "likes": "98%",
        "price": "yhsh 4,500",
        "sellPrice": "yhsh 4,500",
        "borrowPrice": "yhsh 350",
        "model": "כמו חדש",
        "rating": "דירוג 4.9 (58 עסקאות)",
        "location": "תל אביב - יפו",
        "dealTypes": ["borrow", "buy"],
        "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "summary": "סקירה מקיפה על פריצות הדרך האחרונות בתחום ה-Agents והבינה המלאכותית היוצרת, ואיך ארגונים מובילים רותמים אותם להגברת הפריון.",
        "content": "<h3>עידן חדש של סוכני AI אוטונומיים</h3><p>בשנים האחרונות ראינו מעבר חד מודלי שפה פשוטים המשיבים על שאלות למערכות אוטונומיות המסוגלות לבצע משימות מורכבות מקצה לקצה.</p>"
    },
    {
        "id": "art-2",
        "title": "עתיד הארכיטקטורה הירוקה: בנייה חכמה ואקולוגית בערים המודרניות",
        "category": "עיצוב וסביבה",
        "author": "מיכל אהרוני",
        "date": "31.08.2026",
        "readTime": "4 דקות קריאה",
        "views": "8.9K",
        "likes": "95%",
        "price": "yhsh 8,200",
        "sellPrice": "yhsh 8,200",
        "borrowPrice": "yhsh 600",
        "model": "חדש באריזה",
        "rating": "דירוג 4.8 (42 עסקאות)",
        "location": "חיפה - מרכז",
        "dealTypes": ["buy", "trade"],
        "imageUrl": "https://images.unsplash.com/photo-1518005068251-37900150df60?auto=format&fit=crop&w=800&q=80",
        "summary": "כיצד אדריכלים ברחבי העולם משלבים צמחיה אנכית, אנרגיה סולארית וחומרי בנייה ממוחזרים כדי ליצור הערים של המחר.",
        "content": "<h3>בנייה ירוקה בלב מטרופולינים סואנים</h3><p>הערים הגדולות עוברות מהפכה שקטה: מבנים חדשים מתוכננים מראש כדי לייצר יותר אנרגיה ממה שהם צורכים.</p>"
    },
    {
        "id": "art-3",
        "title": "גילויים חדשים בחלל העמוק: טלסקופ ג'יימס ווב מציג גלקסיות קדומות",
        "category": "מדע וחלל",
        "author": "פרופ' אריאל דהן",
        "date": "30.08.2026",
        "readTime": "7 דקות קריאה",
        "views": "15.2K",
        "likes": "99%",
        "price": "yhsh 12,000",
        "sellPrice": "yhsh 12,000",
        "borrowPrice": "yhsh 900",
        "model": "כמו חדש",
        "rating": "דירוג 5.0 (96 עסקאות)",
        "location": "ירושלים",
        "dealTypes": ["borrow"],
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        "summary": "תמונות חדשות שהתקבלו מטלסקופ החלל חושפות כוכבים וגלקסיות שנוצרו מאות מיליוני שנים בלבד לאחר המפץ הגדול.",
        "content": "<h3>הצצה לראשית היקום</h3><p>המדענים נרגשים: המודלים הקיימים של היווצרות גלקסיות עומדים למבחן מחדש בעקבות הגילויים האחרונים.</p>"
    },
    {
        "id": "art-4",
        "title": "המדריך המלא לסגנון חיים בריא: תזונה, שינה וכושר בעידן הדיגיטלי",
        "category": "לייפסטייל",
        "author": "נועה לוי",
        "date": "29.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "6.7K",
        "likes": "92%",
        "price": "yhsh 1,800",
        "sellPrice": "yhsh 1,800",
        "borrowPrice": "yhsh 150",
        "model": "משומש במצב טוב",
        "rating": "דירוג 4.7 (31 עסקאות)",
        "location": "רמת גן",
        "dealTypes": ["borrow", "buy"],
        "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        "summary": "טיפים מעשיים לשמירה על איזון נפשי וגופני בעולם המהיר, כולל טכניקות להפחתת זמן מסך ושיפור איכות השינה.",
        "content": "<h3>איזון בעולם של התראות ללא הפסקה</h3><p>איך שומרים על אורח חיים בריא כשהמכשירים הדיגיטליים מלווים אותנו 24/7?</p>"
    },
    {
        "id": "art-5",
        "title": "טרנדים בעולם הסטארטאפים: לאן זורמים השקעות ההון סיכון בשנת 2026",
        "category": "עסקים",
        "author": "אלון שחר",
        "date": "28.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "11.1K",
        "likes": "96%",
        "price": "yhsh 15,500",
        "sellPrice": "yhsh 15,500",
        "borrowPrice": "yhsh 1,200",
        "model": "חדש באריזה",
        "rating": "דירוג 4.9 (74 עסקאות)",
        "location": "הרצליה פיתוח",
        "dealTypes": ["buy"],
        "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "summary": "ניתוח מגמות ההשקעה במיזמים טכנולוגיים: קלינטק, סייבר, בינה מלאכותית רפואית ומחשוב קוונטי.",
        "content": "<h3>התחומים החמים של השנה</h3><p>משקיעי הון סיכון מחפשים כעת מיזמים עם גב טכנולוגי עמוק ויכולת יישום מהירה.</p>"
    },
    {
        "id": "art-6",
        "title": "אמנות דיגיטלית ו-NFT: כיצד יוצרים מגדירים מחדש את מושג הבעלות",
        "category": "תרבות ואמנות",
        "author": "עדי שפירא",
        "date": "27.08.2026",
        "readTime": "4 דקות קריאה",
        "views": "5.4K",
        "likes": "91%",
        "price": "yhsh 3,200",
        "sellPrice": "yhsh 3,200",
        "borrowPrice": "yhsh 250",
        "model": "כמו חדש",
        "rating": "דירוג 4.8 (28 עסקאות)",
        "location": "תל אביב - נווה צדק",
        "dealTypes": ["trade", "borrow"],
        "imageUrl": "https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&w=800&q=80",
        "summary": "מגלריות פיזיות לתערוכות וירטואליות במטאוורס: הסיפורים מאחורי האמנים הדיגיטליים המצליחים בעולם.",
        "content": "<h3>עידן חדש ליוצרים ויצירות</h3><p>העולם האמנותי עובר שינוי עמוק. יוצרים צעירים משלבים טכנולוגיות תלת-ממד ובלוקצ'יין.</p>"
    }
];

let state = {
    articles: FALLBACK_ARTICLES,
    currentArticle: null,
    searchQuery: '',
    activeTab: 'stories',
    currentPage: 1,
    itemsPerPage: 12,
    currentSort: 'רלוונטיות',
    proServicesOnly: false,
    onlineNowOnly: true,
    savedListings: new Set(),
    selectedPublishCategory: 'מוצרים',
    minPrice: 500,
    maxPrice: 20000,
    selectedLocations: new Set(),
    filters: {
        dealType: 'all',
        category: 'all',
        condition: 'all',
        budget: 'all'
    }
};

async function initApp() {
    closeArticleModal();
    closePublishModal();
    closeOfferModal();
    await loadArticles();
    renderHeroBanner();
    renderTopReadLists();
    renderArticlesGrid();
}

async function loadArticles() {
    try {
        const res = await fetch('articles.json?t=' + Date.now());
        if (res.ok) {
            const fetched = await res.json();
            if (Array.isArray(fetched) && fetched.length > 0) {
                state.articles = fetched;
            }
        }
    } catch (e) {
        state.articles = FALLBACK_ARTICLES;
    }
}

function renderHeroBanner() {
    if (!state.articles || state.articles.length === 0) return;
    const hero = state.articles[0];

    const img = document.getElementById('heroImage');
    if (img) img.src = hero.imageUrl;

    const heroCard = document.getElementById('heroFeaturedCard');
    if (heroCard) {
        heroCard.onclick = () => openArticleModal(hero.id);
    }
}

function renderTopReadLists() {
    const leftContainer = document.getElementById('topReadStoriesLeft');
    const rightContainer = document.getElementById('topReadStoriesRight');

    const topItems = state.articles.slice(0, 4);

    const html = topItems.map((item, idx) => `
        <div class="top-read-item" onclick="openArticleModal('${item.id}')">
            <span class="top-read-num">0${idx + 1}</span>
            <span class="top-read-title">${item.title}</span>
        </div>
    `).join('');

    if (leftContainer) leftContainer.innerHTML = html;
    if (rightContainer) rightContainer.innerHTML = html;
}

function openOfferModal(articleId, event) {
    if (event) event.stopPropagation();

    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;

    const hiddenInput = document.getElementById('offerArticleId');
    if (hiddenInput) hiddenInput.value = articleId;

    const subTitle = document.getElementById('offerModalSubTitle');
    if (subTitle) {
        subTitle.textContent = `עבור: "${article.title}" (מכירה: ${article.sellPrice || article.price} | השאלה: ${article.borrowPrice || 'yhsh 350'})`;
    }

    const modal = document.getElementById('offerModal');
    if (modal) modal.classList.remove('hidden');
}

function closeOfferModal() {
    const modal = document.getElementById('offerModal');
    if (modal) modal.classList.add('hidden');
}

function handleOfferSubmit(event) {
    event.preventDefault();

    const amount = document.getElementById('offerAmount').value.trim();
    const name = document.getElementById('offerName').value.trim();

    closeOfferModal();
    document.getElementById('offerForm').reset();

    showToast(`תודה ${name}! ההצעה בסך ${amount} נשלחה בהצלחה למפרסם המודעה! 🤝🎉`);
}

function toggleLocationSelection(city) {
    if (state.selectedLocations.has(city)) {
        state.selectedLocations.delete(city);
    } else {
        state.selectedLocations.add(city);
    }
}

function applyLocationFilter() {
    const labelElem = document.getElementById('labelLocationMenu');
    if (labelElem) {
        if (state.selectedLocations.size === 0) {
            labelElem.textContent = 'מיקום';
        } else if (state.selectedLocations.size === 1) {
            labelElem.textContent = `מיקום: ${Array.from(state.selectedLocations)[0]}`;
        } else {
            labelElem.textContent = `מיקום (${state.selectedLocations.size} ערים)`;
        }
    }

    const menu = document.getElementById('locationMenu');
    if (menu) menu.classList.add('hidden');

    state.currentPage = 1;
    showToast(`סוננו ${state.selectedLocations.size || 'כל'} מיקומים`);
    renderArticlesGrid();
}

function updateDualPriceSlider() {
    const minInput = document.getElementById('minPriceRange');
    const maxInput = document.getElementById('maxPriceRange');

    if (!minInput || !maxInput) return;

    let minVal = parseInt(minInput.value, 10);
    let maxVal = parseInt(maxInput.value, 10);

    if (minVal > maxVal) {
        let temp = minVal;
        minVal = maxVal;
        maxVal = temp;
    }

    const minDisplay = document.getElementById('minPriceValue');
    const maxDisplay = document.getElementById('maxPriceValue');

    if (minDisplay) minDisplay.textContent = `yhsh ${minVal.toLocaleString('he-IL')}`;
    if (maxDisplay) maxDisplay.textContent = `yhsh ${maxVal.toLocaleString('he-IL')}`;
}

function setDualPricePreset(minVal, maxVal) {
    const minInput = document.getElementById('minPriceRange');
    const maxInput = document.getElementById('maxPriceRange');

    if (minInput) minInput.value = minVal;
    if (maxInput) maxInput.value = maxVal;

    updateDualPriceSlider();
    applyDualPriceFilter();
}

function applyDualPriceFilter() {
    const minInput = document.getElementById('minPriceRange');
    const maxInput = document.getElementById('maxPriceRange');

    if (minInput && maxInput) {
        let minVal = parseInt(minInput.value, 10);
        let maxVal = parseInt(maxInput.value, 10);

        if (minVal > maxVal) {
            let temp = minVal;
            minVal = maxVal;
            maxVal = temp;
        }

        state.minPrice = minVal;
        state.maxPrice = maxVal;
    }

    const labelElem = document.getElementById('labelBudgetMenu');
    if (labelElem) {
        if (state.minPrice <= 500 && state.maxPrice >= 20000) {
            labelElem.textContent = 'תקציב';
        } else {
            labelElem.textContent = `תקציב: ${state.minPrice.toLocaleString('he-IL')} - ${state.maxPrice.toLocaleString('he-IL')} yhsh`;
        }
    }

    const menu = document.getElementById('budgetMenu');
    if (menu) menu.classList.add('hidden');

    state.currentPage = 1;
    showToast(`סונן תקציב: ${state.minPrice.toLocaleString('he-IL')} עד ${state.maxPrice.toLocaleString('he-IL')} yhsh`);
    renderArticlesGrid();
}

function openPublishModal() {
    const modal = document.getElementById('publishModal');
    if (modal) modal.classList.remove('hidden');
}

function closePublishModal() {
    const modal = document.getElementById('publishModal');
    if (modal) modal.classList.add('hidden');
}

function selectPublishCategory(tileElem, categoryName) {
    document.querySelectorAll('.category-tile-btn').forEach(btn => btn.classList.remove('selected'));
    tileElem.classList.add('selected');
    state.selectedPublishCategory = categoryName;
}

function handlePublishSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('pubTitle').value.trim();
    const dealType = document.getElementById('pubDealType').value;
    const price = document.getElementById('pubPrice').value.trim() || 'yhsh 2,500';
    const condition = document.getElementById('pubCondition').value;
    const location = document.getElementById('pubLocation').value.trim() || 'תל אביב';
    const imageUrl = document.getElementById('pubImageUrl').value.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
    const summary = document.getElementById('pubSummary').value.trim() || 'מודעה חדשה שפורסמה כעת בלוח.';

    const newId = 'art-' + Date.now();
    const newArticle = {
        id: newId,
        title: title,
        category: state.selectedPublishCategory || 'מוצרים',
        author: 'מפרסם אורח',
        date: '01.09.2026',
        readTime: '3 דקות קריאה',
        views: '1 צפייה',
        likes: '100%',
        price: price,
        sellPrice: price,
        borrowPrice: 'yhsh 250',
        model: condition,
        rating: 'דירוג 5.0 (מודעה חדשה)',
        location: location,
        dealTypes: [dealType],
        imageUrl: imageUrl,
        summary: summary,
        content: `<h3>${title}</h3><p>${summary}</p><p><strong>מיקום:</strong> ${location}</p><p><strong>מצב:</strong> ${condition}</p>`
    };

    state.articles.unshift(newArticle);
    state.currentPage = 1;
    renderArticlesGrid();
    closePublishModal();

    document.getElementById('publishForm').reset();
    showToast('המודעה פורסמה בהצלחה והתווספה ללוח! 🎉');
}

function togglePillDropdown(menuId, event) {
    if (event) event.stopPropagation();
    
    document.querySelectorAll('.filter-pill-dropdown-menu, .sort-popup-menu').forEach(m => {
        if (m.id !== menuId) m.classList.add('hidden');
    });

    const targetMenu = document.getElementById(menuId);
    if (targetMenu) {
        targetMenu.classList.toggle('hidden');
    }
}

function selectPillFilter(filterType, filterValue, labelText) {
    state.filters[filterType] = filterValue;
    state.currentPage = 1;

    const labelElemIdMap = {
        dealType: 'labelDealTypeMenu',
        category: 'labelCategoryPill',
        condition: 'labelConditionMenu'
    };

    const targetLabelId = labelElemIdMap[filterType];
    if (targetLabelId) {
        const elem = document.getElementById(targetLabelId);
        if (elem) elem.textContent = labelText;
    }

    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));

    showToast(`סונן לפי: ${labelText}`);
    renderArticlesGrid();
}

function applySwitchesFilter() {
    const proChk = document.getElementById('switchProServices');
    const onlineChk = document.getElementById('switchOnlineNow');

    state.proServicesOnly = proChk ? proChk.checked : false;
    state.onlineNowOnly = onlineChk ? onlineChk.checked : true;

    renderArticlesGrid();
}

function toggleSortMenu(event) {
    if (event) event.stopPropagation();
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    const menu = document.getElementById('sortPopupMenu');
    if (menu) menu.classList.toggle('hidden');
}

function selectSortOption(sortOption) {
    state.currentSort = sortOption;
    const label = document.getElementById('currentSortText');
    if (label) label.textContent = sortOption;

    const menu = document.getElementById('sortPopupMenu');
    if (menu) menu.classList.add('hidden');

    renderArticlesGrid();
}

document.addEventListener('click', () => {
    document.querySelectorAll('.filter-pill-dropdown-menu, .sort-popup-menu').forEach(menu => {
        menu.classList.add('hidden');
    });
});

function getNumericPrice(priceStr) {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
}

function renderArticlesGrid() {
    const container = document.getElementById('articlesGridContainer');
    const gridTitle = document.getElementById('gridTitleText');
    const resultsCountElem = document.getElementById('resultsCountText');
    if (!container) return;

    let filtered = [...state.articles];

    if (state.searchQuery) {
        const q = state.searchQuery.trim().toLowerCase();
        filtered = filtered.filter(a => 
            a.title.toLowerCase().includes(q) || 
            a.summary.toLowerCase().includes(q) || 
            a.category.toLowerCase().includes(q)
        );
    }

    // MULTI-SELECT LOCATIONS FILTER
    if (state.selectedLocations.size > 0) {
        filtered = filtered.filter(a => {
            if (!a.location) return false;
            return Array.from(state.selectedLocations).some(city => a.location.includes(city));
        });
    }

    // PRODUCT CONDITION FILTER
    if (state.filters.condition && state.filters.condition !== 'all') {
        filtered = filtered.filter(a => a.model && a.model.includes(state.filters.condition));
    }

    // DUAL PRICE RANGE SLIDER FILTER
    filtered = filtered.filter(a => {
        const p = getNumericPrice(a.price);
        return p >= state.minPrice && p <= state.maxPrice;
    });

    // Deal Type Filter
    if (state.filters.dealType !== 'all') {
        filtered = filtered.filter(a => a.dealTypes && a.dealTypes.includes(state.filters.dealType));
    }

    if (state.filters.category !== 'all') {
        filtered = filtered.filter(a => a.category === state.filters.category);
    }

    // EXACT ARTICLES COUNT
    if (resultsCountElem) {
        if (filtered.length === 1) {
            resultsCountElem.textContent = `תוצאה 1`;
        } else {
            resultsCountElem.textContent = `${filtered.length} תוצאות`;
        }
    }

    const totalPages = Math.ceil(filtered.length / state.itemsPerPage) || 1;
    if (state.currentPage > totalPages) state.currentPage = 1;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedArticles = filtered.slice(startIndex, startIndex + state.itemsPerPage);

    if (gridTitle) {
        gridTitle.textContent = `כל הכתבות והסיפורים (${paginatedArticles.length} כתבות בעמוד ${state.currentPage} מתוך ${totalPages})`;
    }

    container.innerHTML = paginatedArticles.map(article => {
        const borrowP = article.borrowPrice || 'yhsh 350';
        const sellP = article.sellPrice || article.price || 'yhsh 4,500';

        return `
            <div class="article-card-box" onclick="openArticleModal('${article.id}')">
                <div class="article-card-image-box">
                    <img src="${article.imageUrl}" alt="${article.title}" loading="lazy">
                    <span class="article-card-category">${article.category}</span>
                </div>
                
                <div class="article-card-body">
                    <h3 class="article-card-title">${article.title}</h3>
                    <p class="article-card-summary">${article.summary}</p>
                    
                    <div class="article-card-meta">
                        <span><i class="fa-regular fa-clock"></i> ${article.readTime}</span>
                        <span><i class="fa-regular fa-eye"></i> ${article.views}</span>
                    </div>

                    <!-- EXACT 2 PRICES + INTERACTIVE 'הגש הצעה' BUTTON -->
                    <div class="article-card-action-bar">
                        <div class="action-bar-right" style="font-size: 0.78rem;">
                            <span>השאלה: <strong style="color: #2563eb;">${borrowP}</strong></span>
                            <span class="action-divider">|</span>
                            <span>מכירה: <strong style="color: #ff5000;">${sellP}</strong></span>
                        </div>
                        
                        <div class="action-bar-left">
                            <button class="btn-offer-pill" onclick="openOfferModal('${article.id}', event)">
                                🤝 הגש הצעה
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }).join('');

    renderPaginationControls(filtered.length);
}

function renderPaginationControls(totalItems) {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalItems / state.itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }

    paginationContainer.style.display = 'flex';

    let html = `
        <button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} onclick="changePage(${state.currentPage - 1})">
            « הקודם
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="page-btn ${i === state.currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }

    html += `
        <button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${state.currentPage + 1})">
            הבא »
        </button>
    `;

    paginationContainer.innerHTML = html;
}

function changePage(pageNumber) {
    const totalPages = Math.ceil(state.articles.length / state.itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) return;

    state.currentPage = pageNumber;
    renderArticlesGrid();

    const filterElem = document.querySelector('.articles-filter-bar');
    if (filterElem) {
        filterElem.scrollIntoView({ behavior: 'smooth' });
    }
}

function openArticleModal(articleId) {
    window.location.href = `article.html?id=${articleId}`;
}

function closeArticleModal() {
    const modal = document.getElementById('articleModal');
    if (modal) modal.classList.add('hidden');
}

function handleSearch(query) {
    state.searchQuery = query;
    state.currentPage = 1;
    renderArticlesGrid();
}

function setActiveTab(tabName) {
    state.activeTab = tabName;
    if (tabName === 'images') {
        window.location.href = 'images.html';
    } else {
        window.location.href = 'index.html';
    }
}

function showGuestToast() {
    showToast('שלום אורח! תהנה מקריאת הכתבות באתר 📖');
}

function likeCurrentModalArticle() {
    showToast('תודה שפרגנת בלייק לכתבה! 👍');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const msgElem = document.getElementById('toastMessage');
    if (!toast || !msgElem) return;

    msgElem.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2500);
}

window.openArticleModal = openArticleModal;
window.closeArticleModal = closeArticleModal;
window.openPublishModal = openPublishModal;
window.closePublishModal = closePublishModal;
window.openOfferModal = openOfferModal;
window.closeOfferModal = closeOfferModal;
window.handleOfferSubmit = handleOfferSubmit;
window.selectPublishCategory = selectPublishCategory;
window.handlePublishSubmit = handlePublishSubmit;
window.toggleLocationSelection = toggleLocationSelection;
window.applyLocationFilter = applyLocationFilter;
window.updateDualPriceSlider = updateDualPriceSlider;
window.setDualPricePreset = setDualPricePreset;
window.applyDualPriceFilter = applyDualPriceFilter;
window.handleSearch = handleSearch;
window.setActiveTab = setActiveTab;
window.showGuestToast = showGuestToast;
window.likeCurrentModalArticle = likeCurrentModalArticle;
window.changePage = changePage;
window.togglePillDropdown = togglePillDropdown;
window.selectPillFilter = selectPillFilter;
window.applySwitchesFilter = applySwitchesFilter;
window.toggleSortMenu = toggleSortMenu;
window.selectSortOption = selectSortOption;
window.openHeroArticle = () => {
    if (state.articles.length > 0) openArticleModal(state.articles[0].id);
};

document.addEventListener('DOMContentLoaded', initApp);
