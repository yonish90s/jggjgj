let state = {
    articles: [],
    currentArticle: null,
    searchQuery: '',
    activeTab: 'stories'
};

async function initApp() {
    await loadArticles();
    renderHeroBanner();
    renderTopReadLists();
    renderArticlesGrid();
}

async function loadArticles() {
    try {
        const res = await fetch('articles.json?t=' + Date.now());
        if (res.ok) {
            state.articles = await res.json();
        }
    } catch (e) {
        state.articles = [];
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
