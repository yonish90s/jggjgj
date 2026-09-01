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
        "content": "<h3>עידן חדש של סוכני AI אוטונומיים</h3><p>בשנים האחרונות ראינו מעבר חד מודלי שפה פשוטים המשיבים על שאלות למערכות אוטונומיות המסוגלות לבצע משימות מורכבות מקצה לקצה. כיום, סוכני AI מנהלים פרויקטים, כותבים קוד, ומבצעים מחקרים מעמיקים ללא צורך בהתערבות אנושית מתמדת.</p><h4>השפעה על תעשיית ההייטק</h4><p>צוותי פיתוח ברחבי העולם מדווחים על קפיצה של עשרות אחוזים בתפוקה בזכות שילוב עוזרי פיתוח חכמים. השינוי אינו רק בטרמינולוגיה, אלא בדרך שבה חברות מתכננות ומפתחות מוצרים דיגיטליים.</p>"
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
        "content": "<h3>בנייה ירוקה בלב מטרופולינים סואנים</h3><p>הערים הגדולות עוברות מהפכה שקטה: מבנים חדשים מתוכננים מראש כדי לייצר יותר אנרגיה ממה שהם צורכים. בעזרת פאנלים סולאריים משולבים בחלונות ומערכות אגירת מים מתקדמות, הגורדי שחקים הופכים למערכות אקולוגיות עצמאיות.</p>"
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
        "content": "<h3>הצצה לראשית היקום</h3><p>המדענים נרגשים: המודלים הקיימים של היווצרות גלקסיות עומדים למבחן מחדש בעקבות הגילויים האחרונים של טלסקופ ג'יימס ווב. הגלקסיות שנצפו מראות בהירות ומסה גבוהה בהרבה ממה ששורער בעבר.</p>"
    },
    {
        "id": "art-4",
        "title": "המדריך המלא לסגנון חיים בריא: תזונה, שינה וכושר בעידן الדיגיטלי",
        "category": "לייפסטייל",
        "author": "נועה לוי",
        "date": "29.08.2026",
        "readTime": "5 דקות קריאה",
        "views": "6.7K",
        "likes": "92%",
        "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        "summary": "טיפים מעשיים לשמירה על איזון נפשי וגופני בעולם המהיר, כולל טכניקות להפחתת זמן מסך ושיפור איכות השינה.",
        "content": "<h3>איזון בעולם של התראות ללא הפסקה</h3><p>איך שומרים על אורח חיים בריא כשהמכשירים הדיגיטליים מלווים אותנו 24/7? הכל מתחיל בהצבת גבולות ברורים, הקפדה על שגרת שינה קבועה ושילוב תנועה יומית בלוח הזמנים.</p>"
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
        "content": "<h3>התחומים החמים של השנה</h3><p>משקיעי הון סיכון מחפשים כעת מיזמים עם גב טכנולוגי עמוק ויכולת יישום מהירה. טכנולוגיות ירוקות ופתרונות סייבר מתקדמים מובילים את טבלאות הגיוסים.</p>"
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
        "content": "<h3>עידן חדש ליוצרים ויצירות</h3><p>העולם האמנותי עובר שינוי עמוק. יוצרים צעירים משלבים טכנולוגיות תלת-ממד, בינה מלאכותית ובלוקצ'יין כדי ליצור יצירות אינטראקטיביות וייחודיות.</p>"
    }
];

let state = {
    articles: FALLBACK_ARTICLES,
    currentArticle: null,
    searchQuery: '',
    activeTab: 'stories'
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

    container.innerHTML = filtered.map(article => `
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
window.openHeroArticle = () => {
    if (state.articles.length > 0) openArticleModal(state.articles[0].id);
};

document.addEventListener('DOMContentLoaded', initApp);
