let repoState = {
    allArticles: [],
    displayedArticles: [],
    pageSize: 10,
    currentPage: 1,
    isLoading: false,
    searchQuery: "",
    userBalance: 50000,
    darkMode: false
};

const CATEGORY_IMAGES = {
    "מחשבים": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "פלאפונים": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "כלי עבודה": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "אקסבוקס וגיימינג": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    "מצלמות": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
};

function initRepositoryPage() {
    setupTheme();
    loadBalance();
    loadArticles();
    setupInfiniteScroll();
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    repoState.userBalance = saved ? parseInt(saved, 10) : 50000;
    const balDisplay = document.getElementById('userBalanceDisplay');
    const heroBalText = document.getElementById('heroBalanceText');
    if (balDisplay) balDisplay.textContent = '₪ ' + repoState.userBalance.toLocaleString('he-IL');
    if (heroBalText) heroBalText.textContent = '₪ ' + repoState.userBalance.toLocaleString('he-IL');
}

function addFundsGlobal() {
    repoState.userBalance += 10000;
    localStorage.setItem('news_user_balance', repoState.userBalance.toString());
    loadBalance();
    showToast('נטענו ₪10,000 בהצלחה לארנק! 💰');
}

function setupTheme() {
    repoState.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            repoState.darkMode = !repoState.darkMode;
            localStorage.setItem('news_theme', repoState.darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function applyTheme() {
    if (repoState.darkMode) {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function loadArticles() {
    try {
        const custom = JSON.parse(localStorage.getItem('news_custom_articles') || '[]');
        const saved = JSON.parse(localStorage.getItem('news_articles') || '[]');
        
        const combined = [...custom];
        saved.forEach(item => {
            if (!combined.some(a => a.id === item.id)) {
                combined.push(item);
            }
        });
        repoState.allArticles = combined;
    } catch (e) {
        repoState.allArticles = [];
    }

    // Load initial batch
    loadMoreItems();
}

function loadMoreItems() {
    if (repoState.isLoading) return;
    repoState.isLoading = true;

    const loader = document.getElementById('infiniteScrollLoader');
    if (loader) loader.style.display = 'block';

    setTimeout(() => {
        let pool = repoState.allArticles;
        if (repoState.searchQuery) {
            const q = repoState.searchQuery.toLowerCase();
            pool = pool.filter(a => 
                a.title.toLowerCase().includes(q) || 
                a.summary.toLowerCase().includes(q) || 
                a.author.toLowerCase().includes(q) ||
                a.category.toLowerCase().includes(q)
            );
        }

        if (pool.length === 0) {
            renderRepoGrid();
            repoState.isLoading = false;
            if (loader) loader.style.display = 'none';
            return;
        }

        // Infinite loop generator if reached end of list
        const startIndex = (repoState.currentPage - 1) * repoState.pageSize;
        for (let i = 0; i < repoState.pageSize; i++) {
            const itemIndex = (startIndex + i) % pool.length;
            const originalItem = pool[itemIndex];
            
            // Create a virtual unique entry for infinite feed
            const uniqueEntry = {
                ...originalItem,
                feedId: 'repo-feed-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7)
            };

            repoState.displayedArticles.push(uniqueEntry);
        }

        repoState.currentPage++;
        renderRepoGrid();

        repoState.isLoading = false;
    }, 400);
}

function renderRepoGrid() {
    const grid = document.getElementById('repositoryFeedGrid');
    const itemsCount = document.getElementById('repoItemsCount');
    if (!grid) return;

    if (itemsCount) itemsCount.textContent = `מציג ${repoState.displayedArticles.length} מוצרים בלולאה אינסופית`;

    grid.className = "cube-cards-grid";
    grid.innerHTML = repoState.displayedArticles.map(article => {
        const rentalPeriod = article.rentalPeriod || (`🔑 ₪ ${article.price || 150} / ליום`);
        const buyPeriod = article.buyPeriod || (`🛒 ₪ ${(article.buyPrice || 3500).toLocaleString('he-IL')} לקנייה`);
        const image = article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים'];
        const rating = article.sellerRating || 4.9;
        const tenure = article.sellerTenure || "3 שנים באתר";
        const deals = article.completedDeals || 58;

        return `
            <div class="cube-card-box" onclick="window.location.href='article.html?id=${article.id}'">
                
                <div class="cube-image-wrapper">
                    <img src="${image}" alt="${article.title}" loading="lazy">
                    <span class="cube-badge-tag">${article.category}</span>
                </div>

                <div class="cube-card-body">
                    <div class="cube-price-tag">
                        <span class="rent-price">${rentalPeriod}</span>
                        <span class="buy-price">${buyPeriod}</span>
                    </div>

                    <h3 class="cube-title-text">${article.title}</h3>
                    
                    <div class="cube-subtitle-wrapper">
                        <p class="cube-subtitle-text">${article.summary}</p>
                    </div>

                    <div style="border-top: 1px solid var(--border-color); margin: 8px 0;"></div>

                    <!-- Store Owner Link (מעבר לחנות האישית) -->
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.84rem;">
                        <a href="store.html?seller=${encodeURIComponent(article.author)}" onclick="event.stopPropagation()" style="color: var(--text-primary); font-weight: 800; text-decoration: none;">
                            <i class="fa-solid fa-shop" style="color: #16a34a;"></i> החנות של ${article.author}
                        </a>
                        <span style="color: #eab308; font-weight: 900;">⭐ ${rating}</span>
                    </div>

                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                        <span>⏳ ותק: ${tenure}</span> • <span>🤝 ${deals} עסקאות</span>
                    </div>

                    <div style="border-top: 1px solid var(--border-color); margin: 8px 0;"></div>

                    <div class="cube-dual-actions">
                        <button class="btn-rent-option" onclick="event.stopPropagation(); window.location.href='article.html?id=${article.id}'">
                            <i class="fa-solid fa-key"></i> השכר/השאל
                        </button>
                        <button class="btn-buy-option" onclick="event.stopPropagation(); window.location.href='article.html?id=${article.id}'">
                            <i class="fa-solid fa-cart-shopping"></i> קנה עכשיו
                        </button>
                    </div>
                </div>

            </div>
        `;
    }).join('');
}

function handleRepoSearch(query) {
    repoState.searchQuery = query.trim();
    repoState.displayedArticles = [];
    repoState.currentPage = 1;
    loadMoreItems();
}

function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
            loadMoreItems();
        }
    });
}

window.handleRepoSearch = handleRepoSearch;
window.addFundsGlobal = addFundsGlobal;

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

document.addEventListener('DOMContentLoaded', initRepositoryPage);
