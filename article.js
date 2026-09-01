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
        "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "summary": "סקירה מקיפה על פריצות הדרך האחרונות בתחום ה-Agents והבינה המלאכותית היוצרת, ואיך ארגונים מובילים רותמים אותם להגברת הפריון.",
        "content": "<h3>עידן חדש של סוכני AI אוטונומיים</h3><p>בשנים האחרונות ראינו מעבר חד מודלי שפה פשוטים המשיבים על שאלות למערכות אוטונומיות המסוגלות לבצע משימות מורכבות מקצה לקצה. כיום, סוכני AI מנהלים פרויקטים, כותבים קוד, ומבצעים מחקרים מעמיקים ללא צורך בהתערבות אנושית מתמדת.</p><h3>השפעה על תעשיית ההייטק והחינוך</h3><p>צוותי פיתוח ברחבי העולם מדווחים על קפיצה של עשרות אחוזים בתפוקה בזכות שילוב עוזרי פיתוח חכמים. השינוי אינו רק בטרמינולוגיה, אלא בדרך שבה חברות מתכננות ומפתחות מוצרים דיגיטליים.</p>"
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
        "imageUrl": "https://images.unsplash.com/photo-1518005068251-37900150df60?auto=format&fit=crop&w=1200&q=80",
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
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "summary": "תמונות חדשות שהתקבלו מטלסקופ החלל חושפות כוכבים וגלקסיות שנוצרו מאות מיליוני שנים בלבד לאחר המפץ הגדול.",
        "content": "<h3>הצצה לראשית היקום</h3><p>המדענים נרגשים: המודלים הקיימים של היווצרות גלקסיות עומדים למבחן מחדש בעקבות הגילויים האחרונים של טלסקופ ג'יימס ווב. הגלקסיות שנצפו מראות בהירות ומסה גבוהה בהרבה ממה ששורער בעבר.</p>"
    }
];

let allArticles = FALLBACK_ARTICLES;

async function initArticlePage() {
    await loadArticlesData();

    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id') || 'art-1';

    const article = allArticles.find(a => a.id === articleId) || allArticles[0];
    renderArticle(article);
    renderRelatedArticles(article.id);
}

async function loadArticlesData() {
    try {
        const res = await fetch('articles.json?t=' + Date.now());
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                allArticles = data;
            }
        }
    } catch (e) {
        allArticles = FALLBACK_ARTICLES;
    }
}

function renderArticle(article) {
    document.title = `${article.title} | גלריית הכתבות`;

    const titleElem = document.getElementById('articleTitleHeading');
    const categoryElem = document.getElementById('articleCategoryTag');
    const authorElem = document.getElementById('articleAuthorName');
    const dateElem = document.getElementById('articlePublishDate');
    const readTimeElem = document.getElementById('articleReadingTime');
    const viewsElem = document.getElementById('articleViewCount');
    const imgElem = document.getElementById('articleHeroImage');
    const contentElem = document.getElementById('articleFullContent');
    const likesElem = document.getElementById('articleLikesCount');

    if (titleElem) titleElem.textContent = article.title;
    if (categoryElem) categoryElem.textContent = article.category;
    if (authorElem) authorElem.textContent = article.author;
    if (dateElem) dateElem.textContent = article.date || '01.09.2026';
    if (readTimeElem) readTimeElem.textContent = article.readTime;
    if (viewsElem) viewsElem.textContent = `${article.views} צפיות`;
    if (imgElem) imgElem.src = article.imageUrl;
    if (contentElem) contentElem.innerHTML = article.content || `<p>${article.summary}</p>`;
    if (likesElem) likesElem.textContent = article.likes || '98%';
}

function renderRelatedArticles(currentId) {
    const container = document.getElementById('relatedArticlesGrid');
    if (!container) return;

    const related = allArticles.filter(a => a.id !== currentId).slice(0, 3);

    container.innerHTML = related.map(art => `
        <div class="article-card-box" onclick="window.location.href='article.html?id=${art.id}'">
            <div class="article-card-image-box">
                <img src="${art.imageUrl}" alt="${art.title}" loading="lazy">
                <span class="article-card-category">${art.category}</span>
            </div>
            
            <div class="article-card-body">
                <h3 class="article-card-title">${art.title}</h3>
                <p class="article-card-summary">${art.summary}</p>
                
                <div class="article-card-meta">
                    <span><i class="fa-regular fa-clock"></i> ${art.readTime}</span>
                    <span><i class="fa-regular fa-eye"></i> ${art.views}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function likePageArticle() {
    showToast('תודה שפרגנת בלייק לכתבה! 👍');
}

function shareArticle() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('קישור הכתבה הועתק ללוח! 🔗');
    } else {
        showToast('שיתוף כתבה פתוח!');
    }
}

function showGuestToast() {
    showToast('שלום אורח! תהנה מקריאת הכתבה 📖');
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

window.likePageArticle = likePageArticle;
window.shareArticle = shareArticle;
window.showGuestToast = showGuestToast;

document.addEventListener('DOMContentLoaded', initArticlePage);
