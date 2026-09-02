// DEFAULT ARTICLES DATASET
const INITIAL_ARTICLES = [
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
        "rating": "★ 4.9 (58 המלצות)",
        "location": "תל אביב - יפו",
        "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "summary": "סקירה מקיפה על פריצות הדרך האחרונות בתחום ה-Agents והבינה המלאכותית היוצרת.",
        "content": "<h3>עידן חדש של סוכני AI אוטונומיים</h3><p>בשנים האחרונות ראינו מעבר חד מודלי שפה פשוטים המשיבים על שאלות למערכות אוטונומיות המסוגלות לבצע משימות מורכבות מקצה לקצה. מודלים כמו Antigravity 2.0 משנים לחלוטין את הדרך שבה צוותי פיתוח ומוצר עובדים.</p>"
    },
    {
        "id": "art-2",
        "title": "מדריך מעשי: איך לבנות סביבת עבודה היברידית חכמה בבית",
        "category": "טכנולוגיה",
        "author": "מיכל שפירא",
        "date": "31.08.2026",
        "readTime": "4 דקות קריאה",
        "views": "8.9K",
        "likes": "95%",
        "price": "yhsh 2,800",
        "sellPrice": "yhsh 2,800",
        "borrowPrice": "yhsh 200",
        "model": "חדש באריזה",
        "rating": "★ 4.8 (34 המלצות)",
        "location": "חיפה - מרכז",
        "imageUrl": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        "summary": "כל הטיפים, הציוד והתוכנות המומלצות לניהול יום עבודה אפקטיבי ונוח מהבית.",
        "content": "<h3>עיצוב וארגונומיה במשרד הביתי</h3><p>בחירת המסך הנכון, כיסא ארגונומי ותאורה מתאימה יכולים לשפר את התפוקה ולהפחית עייפות לאורך זמן.</p>"
    },
    {
        "id": "art-3",
        "title": "החלוציות בחלל: משימת מאדים 2026 וחיפוש אחר סימני חיים",
        "category": "מדע וחלל",
        "author": "פרופ' אהרון לוי",
        "date": "30.08.2026",
        "readTime": "8 דקות קריאה",
        "views": "15.1K",
        "likes": "99%",
        "price": "yhsh 8,500",
        "sellPrice": "yhsh 8,500",
        "borrowPrice": "yhsh 600",
        "model": "משומש במצב טוב",
        "rating": "★ 5.0 (92 המלצות)",
        "location": "ירושלים",
        "imageUrl": "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80",
        "summary": "ניתוח הנתונים הראשוניים שנשלחו מרכב המחקר החדש על פני הרי המאדים.",
        "content": "<h3>תגליות חדשות על מאדים</h3><p>הממצאים האחרונים מעידים על נוכחות מינרלים ייחודיים המצביעים על זרימת מים חופשית בעבר הרחוק.</p>"
    },
    {
        "id": "art-4",
        "title": "עסקים בעידן הדיגיטלי: אסטרטגיות צמיחה לחברות הזנק",
        "category": "עסקים",
        "author": "רוני ברק",
        "date": "29.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "7.3K",
        "likes": "92%",
        "price": "yhsh 3,900",
        "sellPrice": "yhsh 3,900",
        "borrowPrice": "yhsh 300",
        "model": "כמו חדש",
        "rating": "★ 4.7 (29 המלצות)",
        "location": "רמת גן",
        "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "summary": "כיצד יזמים צעירים גורמים למוצרים שלהם להגיע למיליוני משתמשים בתקציב זעום.",
        "content": "<h3>גיוס לקוחות אורגני</h3><p>בניית קהילה סביב המוצר היא המפתח הגדול ביותר להצלחה ארוכת טווח בעולם הסטארטאפים.</p>"
    },
    {
        "id": "art-5",
        "title": "עיצוב אורבני ירוק: הערים של המחר כבר כאן",
        "category": "עיצוב וסביבה",
        "author": "טלי דגן",
        "date": "28.08.2026",
        "readTime": "7 דקות קריאה",
        "views": "10.6K",
        "likes": "96%",
        "price": "yhsh 6,200",
        "sellPrice": "yhsh 6,200",
        "borrowPrice": "yhsh 450",
        "model": "חדש באריזה",
        "rating": "★ 4.9 (41 המלצות)",
        "location": "הרצליה פיתוח",
        "imageUrl": "https://images.unsplash.com/photo-1518005068251-37900150df60?auto=format&fit=crop&w=800&q=80",
        "summary": "השילוב בין צמחייה עשירה למבנים חכמים המפחיתים את זיהום האוויר במרכזי הערים.",
        "content": "<h3>גגות ירוקים ואנרגיה סולארית</h3><p>ערים מודרניות רבות מאמצות תקנים ירוקים המחייבים שילוב אנרגיות מתחדשות בבנייה חדשה.</p>"
    },
    {
        "id": "art-6",
        "title": "תזונה, אורח חיים ובריאות מנטלית: המדריך השלם",
        "category": "לייפסטייל",
        "author": "ד\"ר עמית גולן",
        "date": "27.08.2026",
        "readTime": "6 דקות קריאה",
        "views": "11.2K",
        "likes": "97%",
        "price": "yhsh 1,900",
        "sellPrice": "yhsh 1,900",
        "borrowPrice": "yhsh 150",
        "model": "משומש במצב טוב",
        "rating": "★ 4.85 (67 המלצות)",
        "location": "תל אביב - יפו",
        "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        "summary": "הקשר ההדוק בין מה שאנחנו אוכלים לרמת האנרגיה והמצב הרוח היומיומי שלנו.",
        "content": "<h3>איזון גוף ונפש</h3><p>תזונה מאוזנת יחד עם שינה איכותית ופעילות גופנית סדירה תורמים משמעותית לאריכות ימים וחיוניות.</p>"
    },
    {
        "id": "art-7",
        "title": "אבטחת מידע וסייבר 2026: הגנה על נכסים דיגיטליים",
        "category": "סייבר וביטחון",
        "author": "גיא רוזן",
        "date": "26.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "9.4K",
        "likes": "94%",
        "price": "yhsh 9,800",
        "sellPrice": "yhsh 9,800",
        "borrowPrice": "yhsh 700",
        "model": "חדש באריזה",
        "rating": "★ 4.95 (88 המלצות)",
        "location": "תל אביב - יפו",
        "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        "summary": "כיצד ארגונים מגינים על המידע הרגיש שלהם מפני מתקפות כופרה מורכבות.",
        "content": "<h3>הגנת סייבר מתקדמת</h3><p>שילוב בינה מלאכותית בזיהוי איומים בזמן אמת הופך לסטנדרט חובה בכל ארגון.</p>"
    },
    {
        "id": "art-8",
        "title": "דור העתיד של הגיימינג: מנועי גרפיקה בתלת-ממד ריאליסטי",
        "category": "גיימינג",
        "author": "ניר כהן",
        "date": "25.08.2026",
        "readTime": "7 דקות קריאה",
        "views": "14.2K",
        "likes": "99%",
        "price": "yhsh 5,400",
        "sellPrice": "yhsh 5,400",
        "borrowPrice": "yhsh 400",
        "model": "כמו חדש",
        "rating": "★ 4.9 (76 המלצות)",
        "location": "חיפה - מרכז",
        "imageUrl": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
        "summary": "הצצה ראשונה למנועי המשחק החדשים המטשטשים את הגבול בין מציאות למשחק.",
        "content": "<h3>טכנולוגיית Ray Tracing בזמן אמת</h3><p>חוויית המשחק הופכת לעשירה ומרשימה מאי פעם הודות לעיבוד גרפי פורץ דרך.</p>"
    },
    {
        "id": "art-9",
        "title": "סודות הקולינריה המודרנית: המטבח הבלקני והמזרח תיכוני",
        "category": "קולינריה",
        "author": "שף אורן כץ",
        "date": "24.08.2026",
        "readTime": "6 דקות קריאה",
        "views": "8.1K",
        "likes": "93%",
        "price": "yhsh 1,500",
        "sellPrice": "yhsh 1,500",
        "borrowPrice": "yhsh 120",
        "model": "כמו חדש",
        "rating": "★ 4.8 (25 המלצות)",
        "location": "ירושלים",
        "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "summary": "מסע קולינרי בין חומרי גלם טריים, תבלינים ייחודיים וטכניקות בישול מסורתיות.",
        "content": "<h3>טעמים אותנטיים במטבח הבית</h3><p>חומרי גלם טריים ואיכותיים הם הסוד לכל מנה מנצחת.</p>"
    },
    {
        "id": "art-10",
        "title": "כושר וסיבולת: אימוני הפוגות בעוצמה גבוהה (HIIT)",
        "category": "בריאות וכושר",
        "author": "מאיה שרון",
        "date": "23.08.2026",
        "readTime": "4 דקות קריאה",
        "views": "6.8K",
        "likes": "91%",
        "price": "yhsh 2,200",
        "sellPrice": "yhsh 2,200",
        "borrowPrice": "yhsh 180",
        "model": "משומש במצב טוב",
        "rating": "★ 4.75 (19 המלצות)",
        "location": "רמת גן",
        "imageUrl": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        "summary": "איך לשרוף קלוריות ביעילות ולשפר את הסיבולת האירובית בזמן קצר.",
        "content": "<h3>אימוני HIIT קצרים ואפקטיביים</h3><p>אימונים אלו מאפשרים להגיע לתוצאות מרביות בזמן קצר הודות לעוצמת הגירוי.</p>"
    },
    {
        "id": "art-11",
        "title": "אינטרנט של הדברים (IoT): הבית החכם והמחובר",
        "category": "טכנולוגיה",
        "author": "אלון נוי",
        "date": "22.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "13.5K",
        "likes": "97%",
        "price": "yhsh 3,500",
        "sellPrice": "yhsh 3,500",
        "borrowPrice": "yhsh 260",
        "model": "חדש באריזה",
        "rating": "★ 4.9 (53 המלצות)",
        "location": "תל אביב - יפו",
        "imageUrl": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
        "summary": "שליטה מלאה בתאורה, במיזוג ובביטחון הבית ישירות מהטלפון הנייד.",
        "content": "<h3>אוטומציה ביתית חכמה</h3><p>המערכות החדשות יודעות לזהות את הרגלי הדיירים ולפעול באופן אוטונומי לחסכון באנרגיה.</p>"
    },
    {
        "id": "art-12",
        "title": "השקעות קריפטו ובלוקצ'יין ב-2026: מגמות והזדמנויות",
        "category": "עסקים",
        "author": "תומר שגיא",
        "date": "21.08.2026",
        "readTime": "8 דקות קריאה",
        "views": "16.8K",
        "likes": "96%",
        "price": "yhsh 12,000",
        "sellPrice": "yhsh 12,000",
        "borrowPrice": "yhsh 900",
        "model": "כמו חדש",
        "rating": "★ 4.92 (110 המלצות)",
        "location": "הרצליה פיתוח",
        "imageUrl": "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
        "summary": "ניתוח שוק המטבעות הדיגיטליים והיישומים של חוזים חכמים בתעשייה.",
        "content": "<h3>עתיד הבלוקצ'יין בעולם הפיננסי</h3><p>טכנולוגיית הבלוקצ'יין ממשיכה להתפתח ולהציע פתרונות מאובטחים להעברת כספים גלובלית.</p>"
    }
];

// STATE MANAGEMENT
let state = {
    articles: [],
    filteredArticles: [],
    currentPage: 1,
    itemsPerPage: 12,
    searchQuery: '',
    minPrice: 500,
    maxPrice: 20000,
    selectedLocations: new Set(),
    filters: {
        category: 'all',
        dealType: 'all',
        condition: 'all'
    },
    activeModalArticle: null
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', async () => {
    await loadArticles();
    setupEventListeners();
    renderTopReadLists();
});

async function loadArticles() {
    try {
        const res = await fetch('articles.json?t=' + Date.now());
        if (res.ok) {
            state.articles = await res.json();
        } else {
            state.articles = INITIAL_ARTICLES;
        }
    } catch (e) {
        state.articles = INITIAL_ARTICLES;
    }
    applyAllFilters();
}

function applyAllFilters() {
    let result = [...state.articles];

    // Search query
    if (state.searchQuery) {
        const q = state.searchQuery.trim().toLowerCase();
        result = result.filter(a => 
            a.title.toLowerCase().includes(q) || 
            a.summary.toLowerCase().includes(q) ||
            a.category.toLowerCase().includes(q) ||
            a.author.toLowerCase().includes(q)
        );
    }

    // Category filter
    if (state.filters.category !== 'all') {
        result = result.filter(a => a.category === state.filters.category);
    }

    // Deal Type filter
    if (state.filters.dealType !== 'all') {
        result = result.filter(a => {
            if (state.filters.dealType === 'borrow') return !!a.borrowPrice;
            if (state.filters.dealType === 'buy') return !!a.sellPrice || !!a.price;
            return true;
        });
    }

    // Condition filter
    if (state.filters.condition !== 'all') {
        result = result.filter(a => a.model && a.model.includes(state.filters.condition));
    }

    // Location multi-select filter
    if (state.selectedLocations.size > 0) {
        result = result.filter(a => {
            if (!a.location) return false;
            for (let loc of state.selectedLocations) {
                if (a.location.includes(loc)) return true;
            }
            return false;
        });
    }

    // Dual Price Range Slider filter
    result = result.filter(a => {
        const p = getNumericPrice(a.sellPrice || a.price);
        return p >= state.minPrice && p <= state.maxPrice;
    });

    state.filteredArticles = result;
    state.currentPage = 1;

    updateResultsCounter();
    renderArticles();
    renderPagination();
}

function getNumericPrice(priceStr) {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 0;
}

function updateResultsCounter() {
    const counterEl = document.getElementById('resultsCountText');
    if (counterEl) {
        counterEl.textContent = `${state.filteredArticles.length} תוצאות`;
    }
}

// RENDER ARTICLES (ULTRA-CLEAN CARDS MATCHING USER SCREENSHOT)
function renderArticles() {
    const container = document.getElementById('articlesGridContainer');
    if (!container) return;

    const start = (state.currentPage - 1) * state.itemsPerPage;
    const pageItems = state.filteredArticles.slice(start, start + state.itemsPerPage);

    if (pageItems.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-weight: 800;">לא נמצאו מודעות העונות לסינון שנבחר.</div>`;
        return;
    }

    container.innerHTML = pageItems.map(item => {
        const sellPriceStr = item.sellPrice || item.price || 'yhsh 4,500';
        const borrowPriceStr = item.borrowPrice || 'yhsh 350';
        const conditionStr = item.model || 'כמו חדש';
        const ratingStr = item.rating || '★ 4.9 (58 המלצות)';
        const locationStr = item.location || 'תל אביב - יפו';

        return `
            <div class="article-card-box" onclick="openArticleModal('${item.id}')">
                <div class="article-card-image-box">
                    <img src="${item.imageUrl}" alt="${item.title}">
                    <span class="stock-pill-badge">${item.category}</span>
                </div>

                <div class="article-card-body">
                    <h3 class="article-card-title">${item.title}</h3>
                    
                    <div class="article-card-price-row">
                        <span class="main-price-text">${sellPriceStr}</span>
                        <span class="borrow-price-subtext">השאלה: ${borrowPriceStr}</span>
                    </div>

                    <div class="card-checklist-specs">
                        <div class="checklist-item"><i class="fa-solid fa-check"></i> מיקום: ${locationStr}</div>
                        <div class="checklist-item"><i class="fa-solid fa-check"></i> דירוג: ${ratingStr}</div>
                        <div class="checklist-item"><i class="fa-solid fa-check"></i> מצב המוצר: ${conditionStr}</div>
                    </div>

                    <button class="btn-card-action-pill" onclick="openOfferModalFromCard(event, '${item.id}')">
                        🤝 הגש הצעה למפרסם
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// RENDER PAGINATION
function renderPagination() {
    const container = document.getElementById('paginationContainer');
    if (!container) return;

    const totalPages = Math.ceil(state.filteredArticles.length / state.itemsPerPage);

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let buttonsHtml = `
        <button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${state.currentPage - 1})">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        buttonsHtml += `
            <button class="page-btn ${state.currentPage === i ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }

    buttonsHtml += `
        <button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${state.currentPage + 1})">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    `;

    container.innerHTML = buttonsHtml;
}

function goToPage(page) {
    state.currentPage = page;
    renderArticles();
    renderPagination();
    window.scrollTo({ top: 300, behavior: 'smooth' });
}

// RENDER SIDEBAR TOP READ LISTS
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

// DUAL PRICE RANGE SLIDER LOGIC
function updateDualPriceSlider() {
    const minInput = document.getElementById('minPriceRange');
    const maxInput = document.getElementById('maxPriceRange');
    const minValLabel = document.getElementById('minPriceValue');
    const maxValLabel = document.getElementById('maxPriceValue');

    if (!minInput || !maxInput) return;

    let minVal = parseInt(minInput.value, 10);
    let maxVal = parseInt(maxInput.value, 10);

    if (minVal > maxVal) {
        let temp = minVal;
        minVal = maxVal;
        maxVal = temp;
    }

    state.minPrice = minVal;
    state.maxPrice = maxVal;

    if (minValLabel) minValLabel.textContent = `yhsh ${minVal.toLocaleString()}`;
    if (maxValLabel) maxValLabel.textContent = `yhsh ${maxVal.toLocaleString()}`;
}

function applyDualPriceFilter() {
    updateDualPriceSlider();
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    applyAllFilters();
}

function setDualPricePreset(min, max) {
    const minInput = document.getElementById('minPriceRange');
    const maxInput = document.getElementById('maxPriceRange');
    if (minInput) minInput.value = min;
    if (maxInput) maxInput.value = max;
    updateDualPriceSlider();
    applyDualPriceFilter();
}

// LOCATION CHECKBOX MULTI-SELECT LOGIC
function toggleLocationSelection(cityName) {
    if (state.selectedLocations.has(cityName)) {
        state.selectedLocations.delete(cityName);
    } else {
        state.selectedLocations.add(cityName);
    }
}

function applyLocationFilter() {
    const btnLabel = document.getElementById('labelLocationMenu');
    if (btnLabel) {
        if (state.selectedLocations.size === 0) {
            btnLabel.textContent = 'מיקום';
        } else {
            btnLabel.textContent = `מיקום (${state.selectedLocations.size} ערים)`;
        }
    }
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    applyAllFilters();
}

// PILL FILTER DROPDOWNS LOGIC
function togglePillDropdown(menuId, event) {
    if (event) event.stopPropagation();
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => {
        if (m.id !== menuId) m.classList.add('hidden');
    });
    const menu = document.getElementById(menuId);
    if (menu) menu.classList.toggle('hidden');
}

function selectPillFilter(filterType, value, labelText) {
    state.filters[filterType] = value;

    if (filterType === 'dealType') {
        const label = document.getElementById('labelDealTypeMenu');
        if (label) label.textContent = labelText;
    } else if (filterType === 'category') {
        const label = document.getElementById('labelCategoryPill');
        if (label) label.textContent = labelText;
    } else if (filterType === 'condition') {
        const label = document.getElementById('labelConditionMenu');
        if (label) label.textContent = labelText;
    }

    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    applyAllFilters();
}

function handleSearch(val) {
    state.searchQuery = val;
    applyAllFilters();
}

// ARTICLE READER MODAL
function openArticleModal(articleId) {
    const article = state.articles.find(a => a.id === articleId) || state.articles[0];
    state.activeModalArticle = article;

    document.getElementById('modalCategoryTag').textContent = article.category;
    document.getElementById('modalArticleTitle').textContent = article.title;
    document.getElementById('modalArticleAuthor').textContent = article.author;
    document.getElementById('modalArticleReadTime').textContent = article.readTime;
    document.getElementById('modalArticleViews').textContent = article.views;
    document.getElementById('modalArticleImage').src = article.imageUrl;
    document.getElementById('modalArticleContent').innerHTML = article.content;
    document.getElementById('modalLikesCount').textContent = article.likes;

    const modal = document.getElementById('articleModal');
    if (modal) modal.classList.remove('hidden');
}

function closeArticleModal() {
    const modal = document.getElementById('articleModal');
    if (modal) modal.classList.add('hidden');
}

function openHeroArticle() {
    if (state.articles.length > 0) {
        openArticleModal(state.articles[0].id);
    }
}

// MAKE AN OFFER MODAL HANDLER
function openOfferModalFromCard(event, articleId) {
    if (event) event.stopPropagation();
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;

    document.getElementById('offerArticleId').value = article.id;
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

// PUBLISH LISTING MODAL FORM HANDLER
function openPublishModal() {
    const modal = document.getElementById('publishModal');
    if (modal) modal.classList.remove('hidden');
}

function closePublishModal() {
    const modal = document.getElementById('publishModal');
    if (modal) modal.classList.add('hidden');
}

function handlePublishSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('pubTitle').value.trim();
    const price = document.getElementById('pubPrice').value.trim();

    closePublishModal();
    document.getElementById('publishForm').reset();

    showToast(`ברכות! המודעה "${title}" פורסמה בהצלחה בלוח! 🎉`);
}

function showGuestToast() {
    showToast('שלום אורח! אתה מחובר במצב תצוגה 👍');
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

function setupEventListeners() {
    document.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    });
}

// EXPOSE TO WINDOW
window.openArticleModal = openArticleModal;
window.closeArticleModal = closeArticleModal;
window.openHeroArticle = openHeroArticle;
window.openPublishModal = openPublishModal;
window.closePublishModal = closePublishModal;
window.handlePublishSubmit = handlePublishSubmit;
window.openOfferModalFromCard = openOfferModalFromCard;
window.closeOfferModal = closeOfferModal;
window.handleOfferSubmit = handleOfferSubmit;
window.updateDualPriceSlider = updateDualPriceSlider;
window.applyDualPriceFilter = applyDualPriceFilter;
window.setDualPricePreset = setDualPricePreset;
window.toggleLocationSelection = toggleLocationSelection;
window.applyLocationFilter = applyLocationFilter;
window.togglePillDropdown = togglePillDropdown;
window.selectPillFilter = selectPillFilter;
window.handleSearch = handleSearch;
window.goToPage = goToPage;
window.showGuestToast = showGuestToast;
