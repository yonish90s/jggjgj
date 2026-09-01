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
        "imageUrl": "https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&w=800&q=80",
        "summary": "מגלריות פיזיות לתערוכות וירטואליות במטאוורס: הסיפורים מאחורי האמנים הדיגיטליים המצליחים בעולם.",
        "content": "<h3>עידן חדש ליוצרים ויצירות</h3><p>העולם האמנותי עובר שינוי עמוק. יוצרים צעירים משלבים טכנולוגיות תלת-ממד ובלוקצ'יין.</p>"
    },
    {
        "id": "art-7",
        "title": "סייבר ואבטחת מידע: האתגרים החדשים בהגנה על תשתיות קריטיות",
        "category": "סייבר וביטחון",
        "author": "יובל גולן",
        "date": "26.08.2026",
        "readTime": "6 דקות קריאה",
        "views": "9.8K",
        "likes": "97%",
        "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        "summary": "כיצד ארגונים מתמודדים עם מתקפות מתוחכמות, ומהן הטכנולוגיות המתקדמות ביותר לזיהוי איומים בזמן אמת.",
        "content": "<h3>הגנת סייבר בעידן של איומים מורכבים</h3><p>מומחי אבטחת מידע מצביעים על חשיבות הגישה הכלל-ארגונית להגנת סייבר.</p>"
    },
    {
        "id": "art-8",
        "title": "מחשוב קוונטי: הפריצה הטכנולוגית שתשנה את עולם ההצפנה והתקשורת",
        "category": "טכנולוגיה",
        "author": "ד\"ר איתן וייס",
        "date": "25.08.2026",
        "readTime": "8 דקות קריאה",
        "views": "13.6K",
        "likes": "99%",
        "imageUrl": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
        "summary": "חברות הענק מציגות מעבדים קוונטיים מתקדמים: מה המשמעות עבור רפואה, פיננסים ופיזיקה חישובית.",
        "content": "<h3>הכוח החישובי של המחר</h3><p>המחשבים הקוונטיים מסוגלים לבצע בתוך שניות חישובים שמחשבי-על רגילים היו מבצעים באלפי שנים.</p>"
    },
    {
        "id": "art-9",
        "title": "עולם הגיימינג ב-2026: מנועי גרפיקה מציאותיים וטכנולוגיית VR מתקדמת",
        "category": "גיימינג",
        "author": "תומר ברק",
        "date": "24.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "14.1K",
        "likes": "96%",
        "imageUrl": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
        "summary": "סקר משחקי השנה: כיצד מנועי המשחקים החדשים מוחקים את הגבול בין המציאות למשחק הדיגיטלי.",
        "content": "<h3>חווית משחק שקועה לחלוטין</h3><p>מנועי התלת-ממד של הדור החדש מאפשרים תאורה היפר-ראליסטית ופיזיקה מדויקת.</p>"
    },
    {
        "id": "art-10",
        "title": "מהפכת הקולינריה הבריאה: מטבחים מודרניים, רכיבים טבעיים וקיימות",
        "category": "קולינריה",
        "author": "שף רועי כהן",
        "date": "23.08.2026",
        "readTime": "4 דקות קריאה",
        "views": "7.3K",
        "likes": "94%",
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        "summary": "שפים מובילים משתפים מתכונים וטכניקות בישול מתקדמות המשלבות טעם עשיר וערכים תזונתיים גבוהים.",
        "content": "<h3>בישול מודרני מבוסס חומרי גלם טבעיים</h3><p>הטרנד הקולינרי הבולט ביותר הוא חזרה למקורות.</p>"
    },
    {
        "id": "art-11",
        "title": "התקדמות ברפואה מותאמת אישית: דיאגנוסטיקה מוקדמת וטיפולים גנטיים",
        "category": "רפואה ואיכות חיים",
        "author": "ד\"ר שרה גולדמן",
        "date": "22.08.2026",
        "readTime": "7 דקות קריאה",
        "views": "10.4K",
        "likes": "98%",
        "imageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        "summary": "פריצות דרך בחקר ה-DNA וטכנולוגיות ה-CRISPR המאפשרות התאמת תרופות אישית לכל מטופל.",
        "content": "<h3>רפואת העתיד כבר כאן</h3><p>המדע הרפואי עובר מטיפול אחיד לכל המטופלים לפתרונות מותאמים אישית.</p>"
    },
    {
        "id": "art-12",
        "title": "המפתח לכושר גופני מתמיד: איך לבנות שגרת אימונים שמחזיקה לאורך זמן",
        "category": "בריאות וכושר",
        "author": "גיא מזרחי",
        "date": "21.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "8.2K",
        "likes": "93%",
        "imageUrl": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        "summary": "מדריך מעשי לבניית תכנית אימונים מאוזנת המשלבת כוח, סיבולת וגמישות מבלי לסבול משחיקה.",
        "content": "<h3>התמדה היא הסוד לתוצאות</h3><p>הסוד לבניית כושר אינו אימונים מפרכים פעם בשבוע, אלא הקפדה על תנועה עקבית.</p>"
    },
    {
        "id": "art-13",
        "title": "רכבים חשמליים ואוטונומיים: לאן צועד עולם התחבורה העתידי",
        "category": "טכנולוגיה",
        "author": "רוני עמית",
        "date": "20.08.2026",
        "readTime": "6 דקות קריאה",
        "views": "11.8K",
        "likes": "97%",
        "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        "summary": "סוללות מהירות נטענות, נהיגה אוטונומית ברמה 4 ותשתיות טעינה חכמות המשנות את כבישי העולם.",
        "content": "<h3>תחבורה נקייה וחכמה</h3><p>המעבר לרכבים חשמליים תופס תאוצה עולמית.</p>"
    },
    {
        "id": "art-14",
        "title": "פסיכולוגיה חיובית בעבודה: כיצד ליצור סביבת עבודה מעצימה ומקדמת",
        "category": "לייפסטייל",
        "author": "ד\"ר תמר כהן",
        "date": "19.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "6.1K",
        "likes": "91%",
        "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        "summary": "מחקרים מעודכנים מראים כיצד שביעות רצון ותחושת משמעות בעבודה משפרים את הביצועים והרווחה האישית.",
        "content": "<h3>יצירת סביבת עבודה בריאה</h3><p>מנהלים מובילים מבינים כיום כי תמיכה ברווחת העובדים היא המפתח להצלחה.</p>"
    },
    {
        "id": "art-15",
        "title": "ענני הנתונים והדאטה-סנטרים הירוקים: תשתיות העתיד של האינטרנט",
        "category": "טכנולוגיה",
        "author": "עידו שגיא",
        "date": "18.08.2026",
        "readTime": "6 דקות קריאה",
        "views": "9.2K",
        "likes": "95%",
        "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        "summary": "איך חברות הענן הגדולות מקטינות את טביעת הרגל הפחמנית ומעבירות את מרכזי הנתונים לאנרגיה ירוקה.",
        "content": "<h3>תשתיות ענן מקיימות</h3><p>צריכת החשמל של חוות השרתים הולכת וגדלה.</p>"
    },
    {
        "id": "art-16",
        "title": "היסטוריה של החדשנות: מהמצאת הקיטור ועד המהפכה הדיגיטלית",
        "category": "תרבות ואמנות",
        "author": "פרופ' דוד רוזן",
        "date": "17.08.2026",
        "readTime": "7 דקות קריאה",
        "views": "8.5K",
        "likes": "96%",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        "summary": "סריקה היסטורית מרתקת של קפיצות הדרך הטכנולוגיות שעיצבו את הציביליזציה האנושית לאורך הדורות.",
        "content": "<h3>מסע בעקבות תגליות פורצות דרך</h3><p>מהמצאת הכתב והגלגל ועד למעבדי הסיליקון.</p>"
    }
];

let state = {
    articles: FALLBACK_ARTICLES,
    currentArticle: null,
    searchQuery: '',
    activeTab: 'stories',
    currentPage: 1,
    itemsPerPage: 12
};

async function initApp() {
    closeArticleModal();
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
    const title = document.getElementById('heroTitle');
    const summary = document.getElementById('heroSummary');

    if (img) img.src = hero.imageUrl;
    if (title) title.textContent = hero.title;
    if (summary) summary.textContent = hero.summary;

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

function renderArticlesGrid() {
    const container = document.getElementById('articlesGridContainer');
    const gridTitle = document.getElementById('gridTitleText');
    if (!container) return;

    let filtered = state.articles;

    if (state.searchQuery) {
        const q = state.searchQuery.trim().toLowerCase();
        filtered = filtered.filter(a => 
            a.title.toLowerCase().includes(q) || 
            a.summary.toLowerCase().includes(q) || 
            a.category.toLowerCase().includes(q)
        );
    }

    const totalPages = Math.ceil(filtered.length / state.itemsPerPage) || 1;
    if (state.currentPage > totalPages) state.currentPage = 1;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedArticles = filtered.slice(startIndex, startIndex + state.itemsPerPage);

    if (gridTitle) {
        gridTitle.textContent = `כל הכתבות והסיפורים (${paginatedArticles.length} כתבות בעמוד ${state.currentPage} מתוך ${totalPages})`;
    }

    container.innerHTML = paginatedArticles.map(article => `
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
            </div>
        </div>
    `).join('');

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

    const gridElem = document.getElementById('articlesGridContainer');
    if (gridElem) {
        gridElem.scrollIntoView({ behavior: 'smooth' });
    }
}

function openArticleModal(articleId) {
    const article = state.articles.find(a => a.id === articleId) || state.articles[0];
    if (!article) return;

    state.currentArticle = article;

    const modal = document.getElementById('articleModal');
    const title = document.getElementById('modalArticleTitle');
    const category = document.getElementById('modalCategoryTag');
    const author = document.getElementById('modalArticleAuthor');
    const readTime = document.getElementById('modalArticleReadTime');
    const views = document.getElementById('modalArticleViews');
    const image = document.getElementById('modalArticleImage');
    const content = document.getElementById('modalArticleContent');
    const likes = document.getElementById('modalLikesCount');

    if (title) title.textContent = article.title;
    if (category) category.textContent = article.category;
    if (author) author.textContent = article.author;
    if (readTime) readTime.textContent = article.readTime;
    if (views) views.textContent = `${article.views} צפיות`;
    if (image) image.src = article.imageUrl;
    if (content) content.innerHTML = article.content || `<p>${article.summary}</p>`;
    if (likes) likes.textContent = article.likes || '98%';

    if (modal) modal.classList.remove('hidden');
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
    showToast(`עברת ללשונית: ${tabName === 'images' ? 'תמונות' : 'סיפורים'}`);
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
window.handleSearch = handleSearch;
window.setActiveTab = setActiveTab;
window.showGuestToast = showGuestToast;
window.likeCurrentModalArticle = likeCurrentModalArticle;
window.changePage = changePage;
window.openHeroArticle = () => {
    if (state.articles.length > 0) openArticleModal(state.articles[0].id);
};

document.addEventListener('DOMContentLoaded', initApp);
