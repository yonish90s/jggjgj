// Fallback images per category
const CATEGORY_IMAGES = {
    "ארץ": "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80",
    "טכנולוגיה": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "כלכלה": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    "ספורט": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    "תרבות": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
};

// Initial Ticker Items
const TICKER_ITEMS = [
    { time: "14:50", text: 'אנבידיה מציגה את טכנולוגיית הזיכרון NVHBM עם 30% יותר רוחב פס' },
    { time: "13:33", text: 'סמסונג מציגה את כונני ה-SSD החיצוניים P9 ו-P7 במהירות 4,000MB/s' },
    { time: "12:02", text: 'גוגל משדרגת את Gemini Live עם ביצוע משימות קוליות' },
    { time: "11:15", text: 'גרמין משיקה את סדרת שעוני ה-fēnix 9 בהחל מ-4,399 ש"ח' }
];

// Application State
let state = {
    articles: [],
    bookmarks: [],
    likes: {},
    activeCategory: 'all',
    searchQuery: '',
    showBookmarksOnly: false,
    darkMode: false,
    pollVoted: false
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
    bookmarkCount: document.getElementById('bookmarkCount'),
    addArticleBtn: document.getElementById('addArticleBtn'),
    tickerContent: document.getElementById('tickerContent'),
    top5List: document.getElementById('top5List'),
    pollContainer: document.getElementById('pollContainer'),
    
    // Modals
    articleModal: document.getElementById('articleModal'),
    closeArticleModal: document.getElementById('closeArticleModal'),
    articleModalContent: document.getElementById('articleModalContent'),
    
    addArticleModal: document.getElementById('addArticleModal'),
    closeAddModal: document.getElementById('closeAddModal'),
    cancelAddBtn: document.getElementById('cancelAddBtn'),
    addArticleForm: document.getElementById('addArticleForm'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// Initialize Application
async function initApp() {
    await loadStateFromStorage();
    setupEventListeners();
    renderTicker();
    renderApp();
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
        } else {
            fallbackLoadArticles();
        }
    } catch (e) {
        fallbackLoadArticles();
    }

    // Bookmarks
    const savedBookmarks = localStorage.getItem('news_bookmarks');
    if (savedBookmarks) {
        try {
            state.bookmarks = JSON.parse(savedBookmarks);
        } catch (e) {
            state.bookmarks = [];
        }
    }

    // Likes
    const savedLikes = localStorage.getItem('news_likes');
    if (savedLikes) {
        try {
            state.likes = JSON.parse(savedLikes);
        } catch (e) {
            state.likes = {};
        }
    } else {
        state.likes = { "art-1": 14, "art-2": 9, "art-3": 7, "art-4": 5, "art-5": 3 };
        localStorage.setItem('news_likes', JSON.stringify(state.likes));
    }

    // Poll State
    state.pollVoted = localStorage.getItem('news_poll_voted') === 'true';

    // Dark Mode
    state.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
}

function fallbackLoadArticles() {
    const savedArticles = localStorage.getItem('news_articles');
    if (savedArticles) {
        try {
            state.articles = JSON.parse(savedArticles);
        } catch (e) {
            state.articles = [];
        }
    }
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
        elements.themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        elements.themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// Render Ticker
function renderTicker() {
    const track = document.createElement('div');
    track.className = 'ticker-track';
    
    const itemsToRender = [...TICKER_ITEMS, ...TICKER_ITEMS];
    
    track.innerHTML = itemsToRender.map(item => `
        <div class="ticker-item">
            <span class="ticker-time">${item.time}</span>
            <span>${item.text}</span>
        </div>
    `).join('');
    
    elements.tickerContent.innerHTML = '';
    elements.tickerContent.appendChild(track);
}

// Main Render Function
function renderApp() {
    elements.bookmarkCount.textContent = state.bookmarks.length;

    // Filter Articles
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
    if (state.showBookmarksOnly) {
        elements.sectionTitle.textContent = 'כתבות שמורות';
    } else if (state.searchQuery) {
        elements.sectionTitle.textContent = `תוצאות חיפוש עבור: "${state.searchQuery}"`;
    } else if (state.activeCategory !== 'all') {
        elements.sectionTitle.textContent = `חדשות בקטגוריית ${state.activeCategory}`;
    } else {
        elements.sectionTitle.textContent = 'חדשות אחרונות';
    }

    elements.resultsCount.textContent = `מציג ${filtered.length} כתבות`;

    // Render Top 3 Featured Grid (Only when in 'all' view with no search)
    const showTop3 = state.activeCategory === 'all' && !state.searchQuery && !state.showBookmarksOnly && filtered.length >= 3;
    
    let rowArticles = filtered;

    if (showTop3) {
        const top3Articles = filtered.slice(0, 3);
        renderTop3Grid(top3Articles);
        elements.top3Grid.parentElement.classList.remove('hidden');
        rowArticles = filtered.slice(3);
    } else {
        elements.top3Grid.parentElement.classList.add('hidden');
    }

    // Render Main Articles Horizontal List
    if (rowArticles.length === 0 && (!showTop3 || filtered.length === 0)) {
        elements.articlesList.innerHTML = '';
        elements.emptyState.classList.remove('hidden');
    } else {
        elements.emptyState.classList.add('hidden');
        renderArticlesList(rowArticles);
    }

    // Render Sidebar Widgets
    renderTop5Widget();
    renderPollWidget();
}

// Render Top 3 Featured Grid (Exactly like screenshot top tiles)
function renderTop3Grid(articles) {
    elements.top3Grid.innerHTML = articles.map(article => `
        <div class="top3-card" onclick="openArticleModal('${article.id}')">
            <img src="${article.imageUrl || CATEGORY_IMAGES[article.category]}" alt="${article.title}">
            <div class="top3-overlay">
                ${article.title}
            </div>
        </div>
    `).join('');
}

// Render Horizontal Articles List (Matching Screenshot)
function renderArticlesList(articles) {
    elements.articlesList.innerHTML = articles.map(article => {
        const isBookmarked = state.bookmarks.includes(article.id);
        const timeFormatted = formatTimeOrDate(article.date);

        return `
            <article class="news-row-item" onclick="openArticleModal('${article.id}')">
                <div class="row-content">
                    <h3 class="row-title">${article.title}</h3>
                    <div class="row-meta">
                        <span class="row-author">${article.author}</span>
                        <span>|</span>
                        <span>${timeFormatted}</span>
                    </div>
                    <div class="row-summary">
                        <span class="row-star">⭐</span>
                        <span>${article.summary}</span>
                    </div>
                </div>
                <div class="row-image">
                    <img src="${article.imageUrl || CATEGORY_IMAGES[article.category]}" alt="${article.title}" loading="lazy">
                </div>
            </article>
        `;
    }).join('');
}

// Render TOP 5 Articles Widget
function renderTop5Widget() {
    if (!elements.top5List) return;

    const sorted = [...state.articles].sort((a, b) => (state.likes[b.id] || 0) - (state.likes[a.id] || 0));
    const top5 = sorted.slice(0, 5);

    elements.top5List.innerHTML = top5.map((article, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const count = state.likes[article.id] || 0;
        return `
            <div class="top5-item" onclick="openArticleModal('${article.id}')">
                <span class="top5-number">${num}</span>
                <span class="top5-title">${article.title}</span>
                <button class="top5-like-btn" onclick="event.stopPropagation(); likeArticle('${article.id}')">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>${count}</span>
                </button>
            </div>
        `;
    }).join('');
}

// Like Article Function
function likeArticle(id) {
    state.likes[id] = (state.likes[id] || 0) + 1;
    saveLikesToStorage();
    renderTop5Widget();
    showToast('תודה שפרגנת בלייק! 👍');
}

// Poll Widget Handler
function renderPollWidget() {
    if (!elements.pollContainer) return;

    if (state.pollVoted) {
        elements.pollContainer.innerHTML = `
            <p class="poll-question">תודה שהשתתפת בסקר!</p>
            <div style="background:var(--primary-light); padding:10px; border-radius:8px; font-weight:700; color:var(--primary-color);">
                84% תומכים בפיתוח בינה מלאכותית בישראל 🚀
            </div>
        `;
    }
}

function votePoll(option) {
    state.pollVoted = true;
    localStorage.setItem('news_poll_voted', 'true');
    renderPollWidget();
    showToast('הצבעתך נקלטה בהצלחה!');
}

// Event Listeners Setup
function setupEventListeners() {
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeCategory = btn.dataset.category;
            state.showBookmarksOnly = false;
            elements.bookmarksBtn.classList.remove('btn-primary');
            elements.bookmarksBtn.classList.add('btn-outline');
            renderApp();
        });
    });

    elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderApp();
    });

    elements.themeToggle.addEventListener('click', () => {
        state.darkMode = !state.darkMode;
        localStorage.setItem('news_theme', state.darkMode ? 'dark' : 'light');
        applyTheme();
    });

    elements.bookmarksBtn.addEventListener('click', () => {
        state.showBookmarksOnly = !state.showBookmarksOnly;
        if (state.showBookmarksOnly) {
            elements.bookmarksBtn.classList.add('btn-primary');
            elements.bookmarksBtn.classList.remove('btn-outline');
        } else {
            elements.bookmarksBtn.classList.remove('btn-primary');
            elements.bookmarksBtn.classList.add('btn-outline');
        }
        renderApp();
    });

    elements.addArticleBtn.addEventListener('click', openAddModal);
    elements.closeAddModal.addEventListener('click', closeAddModal);
    elements.cancelAddBtn.addEventListener('click', closeAddModal);

    elements.closeArticleModal.addEventListener('click', closeArticleModal);

    elements.articleModal.querySelector('.modal-overlay').addEventListener('click', closeArticleModal);
    elements.addArticleModal.querySelector('.modal-overlay').addEventListener('click', closeAddModal);

    elements.addArticleForm.addEventListener('submit', handleAddArticleSubmit);

    document.querySelectorAll('.site-footer a[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            const targetBtn = Array.from(elements.categoryBtns).find(b => b.dataset.category === category);
            if (targetBtn) {
                targetBtn.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Toggle Bookmark
function toggleBookmark(id) {
    const index = state.bookmarks.indexOf(id);
    if (index > -1) {
        state.bookmarks.splice(index, 1);
        showToast('הכתבה הוסרה מהמועדפים');
    } else {
        state.bookmarks.push(id);
        showToast('הכתבה נשמרה במועדפים!');
    }
    saveBookmarksToStorage();
    renderApp();
}

// Modal Handlers
function openArticleModal(id) {
    const article = state.articles.find(a => a.id === id);
    if (!article) return;

    const isBookmarked = state.bookmarks.includes(article.id);

    elements.articleModalContent.innerHTML = `
        <span class="article-full-category">${article.category}</span>
        <h1 class="article-full-title">${article.title}</h1>
        
        <div class="article-full-meta">
            <span><i class="fa-solid fa-user"></i> מאת: <strong style="color:var(--orange-accent);">${article.author}</strong></span>
            <span><i class="fa-regular fa-calendar"></i> ${formatDate(article.date)}</span>
            <span><i class="fa-regular fa-clock"></i> ${article.readTime}</span>
        </div>

        <img class="article-full-image" src="${article.imageUrl || CATEGORY_IMAGES[article.category]}" alt="${article.title}">
        
        <div class="article-full-text">${article.content}</div>

        <div class="article-full-actions">
            <button class="btn ${isBookmarked ? 'btn-primary' : 'btn-outline'}" onclick="toggleBookmark('${article.id}'); openArticleModal('${article.id}');">
                <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                <span>${isBookmarked ? 'שמור במועדפים' : 'הוסף למועדפים'}</span>
            </button>
            <button class="btn btn-outline" onclick="shareArticle('${article.title}')">
                <i class="fa-solid fa-share-nodes"></i>
                <span>שתף כתבה</span>
            </button>
        </div>
    `;

    elements.articleModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
    elements.articleModal.classList.add('hidden');
    document.body.style.overflow = '';
}

function openAddModal() {
    elements.addArticleModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAddModal() {
    elements.addArticleModal.classList.add('hidden');
    document.body.style.overflow = '';
    elements.addArticleForm.reset();
}

// Handle Adding Article Form
function handleAddArticleSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('formTitle').value.trim();
    const category = document.getElementById('formCategory').value;
    const author = document.getElementById('formAuthor').value.trim();
    let imageUrl = document.getElementById('formImageUrl').value.trim();
    const summary = document.getElementById('formSummary').value.trim();
    const content = document.getElementById('formContent').value.trim();

    if (!imageUrl) {
        imageUrl = CATEGORY_IMAGES[category] || CATEGORY_IMAGES["ארץ"];
    }

    const wordCount = content.split(/\s+/).length;
    const readMinutes = Math.max(1, Math.ceil(wordCount / 100));

    const newArticle = {
        id: 'art-' + Date.now(),
        title,
        category,
        author,
        date: new Date().toISOString(),
        readTime: `${readMinutes} דקות קריאה`,
        imageUrl,
        summary,
        content,
        isFeatured: false
    };

    state.articles.unshift(newArticle);
    saveCustomArticlesToStorage(newArticle);

    closeAddModal();
    renderApp();
    showToast('הכתבה פורסמה בהצלחה!');
}

// Share Article Helper
function shareArticle(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('הקישור הועתק ללוח!');
    }
}

// Toast Notification Helper
function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('hidden');
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

// Time/Date Formatter for screenshot style ("היום, 14:50")
function formatTimeOrDate(dateString) {
    try {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `היום, ${hours}:${minutes}`;
    } catch (e) {
        return dateString;
    }
}

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

// Run App on Load
document.addEventListener('DOMContentLoaded', initApp);
