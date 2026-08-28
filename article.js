// Fallback images per category
const CATEGORY_IMAGES = {
    "ארץ": "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80",
    "טכנולוגיה": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "כלכלה": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    "ספורט": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    "תרבות": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
};

let articles = [];
let bookmarks = [];
let likes = {};
let currentArticle = null;
let darkMode = false;

// DOM Elements
const articlePageContainer = document.getElementById('articlePageContainer');
const relatedGrid = document.getElementById('relatedGrid');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize Article Page - INSTANT 0ms RENDER
function initArticlePage() {
    setupTheme();
    setupEventListeners();

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // 1. Load synchronously from cache/localStorage for INSTANT display
    loadArticlesSync();

    if (articleId) {
        currentArticle = articles.find(a => a.id === articleId);
    }

    if (!currentArticle && articles.length > 0) {
        currentArticle = articles[0];
    }

    if (currentArticle) {
        document.title = `${currentArticle.title} | yhsh`;
        renderFullArticle(currentArticle);
        renderRelatedArticles(currentArticle);
    } else {
        renderNotFound();
    }

    // 2. Fetch fresh articles.json asynchronously in background without blocking UI
    fetchBackgroundArticles(articleId);
}

// Synchronous fast load
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
        articles = combined;
    } catch (e) {
        articles = [];
    }

    try {
        bookmarks = JSON.parse(localStorage.getItem('news_bookmarks') || '[]');
    } catch (e) {
        bookmarks = [];
    }

    try {
        likes = JSON.parse(localStorage.getItem('news_likes') || '{}');
    } catch (e) {
        likes = {};
    }
}

// Background fetch for articles.json
async function fetchBackgroundArticles(targetId) {
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
            articles = combined;
            localStorage.setItem('news_articles', JSON.stringify(fileArticles));

            // Re-render if new data arrived
            if (targetId) {
                const freshArticle = articles.find(a => a.id === targetId);
                if (freshArticle && JSON.stringify(freshArticle) !== JSON.stringify(currentArticle)) {
                    currentArticle = freshArticle;
                    renderFullArticle(currentArticle);
                    renderRelatedArticles(currentArticle);
                }
            }
        }
    } catch (e) {
        // Silently keep cached version
    }
}

// Theme handler
function setupTheme() {
    darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
}

function applyTheme() {
    if (darkMode) {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function setupEventListeners() {
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            darkMode = !darkMode;
            localStorage.setItem('news_theme', darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function renderNotFound() {
    articlePageContainer.innerHTML = `
        <div class="empty-state">
            <i class="fa-solid fa-triangle-exclamation fa-3x"></i>
            <h3>הכתבה לא נמצאה</h3>
            <a href="index.html" class="btn btn-primary" style="margin-top:15px;">חזרה לדף הבית</a>
        </div>
    `;
}

// Render Article Details Page
function renderFullArticle(article) {
    const isBookmarked = bookmarks.includes(article.id);
    const likeCount = likes[article.id] || 0;
    const formattedDate = formatDate(article.date);

    articlePageContainer.innerHTML = `
        <div class="article-page-header">
            <span class="article-full-category">${article.category}</span>
            <h1 class="article-page-title">${article.title}</h1>
            
            <div class="article-page-meta">
                <span class="meta-author">מאת: <strong style="color:var(--orange-accent);">${article.author}</strong></span>
                <span>•</span>
                <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                <span>•</span>
                <span><i class="fa-regular fa-clock"></i> ${article.readTime || '3 דקות קריאה'}</span>
            </div>
        </div>

        <div class="article-page-image-wrapper">
            <img class="article-page-image" src="${article.imageUrl || CATEGORY_IMAGES[article.category]}" alt="${article.title}">
        </div>

        <div class="article-page-summary-box">
            <span class="row-star">⭐</span>
            <p><strong>תקציר:</strong> ${article.summary}</p>
        </div>
        
        <div class="article-page-content">
            ${article.content}
        </div>

        <div class="article-page-actions">
            <div class="action-buttons-group">
                <button class="btn ${isBookmarked ? 'btn-primary' : 'btn-outline'}" onclick="toggleBookmark('${article.id}')">
                    <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                    <span id="bookmarkBtnText">${isBookmarked ? 'שמור במועדפים' : 'הוסף למועדפים'}</span>
                </button>
                <button class="btn btn-outline" onclick="likeCurrentArticle('${article.id}')">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span id="likeCountText">פרגן בלייק (${likeCount})</span>
                </button>
                <button class="btn btn-outline" onclick="shareArticle('${article.title}')">
                    <i class="fa-solid fa-share-nodes"></i>
                    <span>שתף כתבה</span>
                </button>
            </div>
            
            <a href="index.html" class="btn btn-outline">
                <i class="fa-solid fa-arrow-right"></i>
                <span>חזרה לחדשות</span>
            </a>
        </div>
    `;
}

// Render Related Articles
function renderRelatedArticles(current) {
    const related = articles.filter(a => a.id !== current.id).slice(0, 3);
    relatedGrid.innerHTML = related.map(art => `
        <div class="top3-card" onclick="window.location.href='article.html?id=${art.id}'">
            <img src="${art.imageUrl || CATEGORY_IMAGES[art.category]}" alt="${art.title}">
            <div class="top3-overlay">
                ${art.title}
            </div>
        </div>
    `).join('');
}

// Like helper
function likeCurrentArticle(id) {
    likes[id] = (likes[id] || 0) + 1;
    localStorage.setItem('news_likes', JSON.stringify(likes));
    const countSpan = document.getElementById('likeCountText');
    if (countSpan) countSpan.textContent = `פרגן בלייק (${likes[id]})`;
    showToast('תודה שפרגנת בלייק! 👍');
}

// Bookmark helper
function toggleBookmark(id) {
    const index = bookmarks.indexOf(id);
    if (index > -1) {
        bookmarks.splice(index, 1);
        showToast('הכתבה הוסרה מהמועדפים');
    } else {
        bookmarks.push(id);
        showToast('הכתבה נשמרה במועדפים!');
    }
    localStorage.setItem('news_bookmarks', JSON.stringify(bookmarks));
    
    const btnText = document.getElementById('bookmarkBtnText');
    if (btnText) {
        btnText.textContent = bookmarks.includes(id) ? 'שמור במועדפים' : 'הוסף למועדפים';
    }
}

// Share helper
function shareArticle(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('הקישור לכתבה הועתק ללוח!');
    }
}

// Toast helper
function showToast(message) {
    if (!toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Format Date
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', initArticlePage);
