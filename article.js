// Fallback images per category
const CATEGORY_IMAGES = {
    "מחשבים": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "פלאפונים": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "כלי עבודה": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "אקסבוקס וגיימינג": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    "מצלמות": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
};

let articles = [];
let bookmarks = [];
let likes = {};
let currentArticle = null;
let darkMode = false;
let userBalance = 50000;
let offers = [];

// DOM Elements
const articlePageContainer = document.getElementById('articlePageContainer');
const relatedGrid = document.getElementById('relatedGrid');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize Article Page
function initArticlePage() {
    setupTheme();
    setupEventListeners();
    loadBalance();

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    loadArticlesSync();

    if (articleId) {
        currentArticle = articles.find(a => a.id === articleId);
    }

    if (!currentArticle && articles.length > 0) {
        currentArticle = articles[0];
    }

    if (currentArticle) {
        document.title = `${currentArticle.title} | yhsh להשכרה או קנייה`;
        renderFullArticle(currentArticle);
        renderRelatedArticles(currentArticle);
    } else {
        renderNotFound();
    }

    fetchBackgroundArticles(articleId);
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    userBalance = saved ? parseInt(saved, 10) : 50000;
    const balDisplay = document.getElementById('userBalanceDisplay');
    if (balDisplay) balDisplay.textContent = '₪ ' + userBalance.toLocaleString('he-IL');
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

    try {
        offers = JSON.parse(localStorage.getItem('news_offers') || '[]');
    } catch (e) {
        offers = [];
    }
}

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

            if (targetId) {
                const freshArticle = articles.find(a => a.id === targetId);
                if (freshArticle && JSON.stringify(freshArticle) !== JSON.stringify(currentArticle)) {
                    currentArticle = freshArticle;
                    renderFullArticle(currentArticle);
                    renderRelatedArticles(currentArticle);
                }
            }
        }
    } catch (e) {}
}

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
            <h3>המוצר אינו נמצא</h3>
            <a href="index.html" class="btn btn-primary" style="margin-top:15px;">חזרה לדף הבית</a>
        </div>
    `;
}

// Buy Item Outright
function buyCurrentArticle(buyPrice, title) {
    const cost = buyPrice || 4000;
    if (userBalance < cost) {
        showToast(`אין מספיק יתרה בארנק! מחיר קנייה: ₪${cost.toLocaleString('he-IL')}, יתרה: ₪${userBalance.toLocaleString('he-IL')}`);
        return;
    }

    if (confirm(`האם ברצונך לרכוש את ${title} בקנייה סופית בסך ₪${cost.toLocaleString('he-IL')}?`)) {
        userBalance -= cost;
        localStorage.setItem('news_user_balance', userBalance.toString());
        loadBalance();
        showToast(`מזל טוב! רכשת בהצלחה את ${title} ב-₪${cost.toLocaleString('he-IL')}! 🛒🎉`);
    }
}

window.buyCurrentArticle = buyCurrentArticle;

// Render Article / Rental & Purchase Product Details Page
function renderFullArticle(article) {
    const isBookmarked = bookmarks.includes(article.id);
    const likeCount = likes[article.id] || 0;
    const rentalPeriod = article.rentalPeriod || (`🔑 ₪ ${article.price || 150} / ליום`);
    const buyPeriod = article.buyPeriod || (`🛒 ₪ ${(article.buyPrice || 4000).toLocaleString('he-IL')} לקנייה`);
    const rentalDates = article.rentalDates || 'זמין להשכרה/קנייה מיידית';
    const buyPriceNum = article.buyPrice || 4000;

    // Get highest bid for this item
    const articleBids = offers.filter(o => o.articleId === article.id);
    const highestBid = articleBids.length > 0 ? Math.max(...articleBids.map(b => b.amount)) : (article.price || 150);

    articlePageContainer.innerHTML = `
        <div class="article-page-header">
            <span class="article-full-category">${article.category}</span>
            <h1 class="article-page-title">${article.title}</h1>
            
            <div class="article-page-meta">
                <span class="meta-author"><i class="fa-solid fa-location-dot"></i> המשכיר/מוכר: <strong>${article.author}</strong></span>
                <span>•</span>
                <span><i class="fa-regular fa-calendar-check"></i> ${rentalDates}</span>
            </div>
        </div>

        <div class="article-page-image-wrapper">
            <img class="article-page-image" src="${article.imageUrl || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['מחשבים']}" alt="${article.title}">
        </div>

        <!-- Dual Option Banner: Rent/Borrow vs Buy Outright -->
        <div class="article-page-summary-box" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; background:var(--card-bg); border:2px solid var(--border-color); border-radius:var(--radius-md); padding:20px;">
            <div>
                <h3 style="font-size:1.3rem; font-weight:900; color:var(--text-primary); margin-bottom:4px;">בחר אפשרות: השאלה/השכרה או קנייה סופית</h3>
                <p style="color:var(--text-muted); font-size:0.95rem;">
                    <strong>השכרה יומית:</strong> ${rentalPeriod} &nbsp;|&nbsp; 
                    <strong style="color:#16a34a;">קנייה סופית:</strong> ${buyPeriod}
                </p>
            </div>

            <div style="display:flex; gap:10px;">
                <button class="btn btn-primary" onclick="document.getElementById('biddingSection').scrollIntoView({behavior:'smooth'})" style="padding:10px 18px;">
                    <i class="fa-solid fa-key"></i> השכר / השאל
                </button>
                <button class="btn" onclick="buyCurrentArticle(${buyPriceNum}, '${escapeQuote(article.title)}')" style="background-color:#16a34a; color:#ffffff; padding:10px 18px; border:none; font-weight:900;">
                    <i class="fa-solid fa-cart-shopping"></i> קנה עכשיו (₪${buyPriceNum.toLocaleString('he-IL')})
                </button>
            </div>
        </div>
        
        <div class="article-page-content">
            ${article.content}
        </div>

        <!-- Bidding & Rental Section -->
        <div id="biddingSection" class="article-bidding-widget">
            <div class="bidding-header">
                <i class="fa-solid fa-gavel fa-2x"></i>
                <div>
                    <h3>הגש הצעת מחיר להשכרה / השאלה בלייב</h3>
                    <p>ארנק המסחר שלך: <strong>₪ ${userBalance.toLocaleString('he-IL')}</strong> | הגש הצעה והתחרה על המוצר!</p>
                </div>
            </div>
            <div class="bidding-body">
                <div class="current-bid-box">
                    <span>הצעה מובילה כרגע:</span>
                    <strong id="articleHighestBid">₪ ${highestBid.toLocaleString('he-IL')}</strong>
                </div>
                <div class="bid-input-group">
                    <input type="number" id="userBidInput" placeholder="סכום הצעה ב-₪ (למשל: ${highestBid + 50})" step="10">
                    <button class="btn btn-primary" onclick="submitBidFromArticle('${article.id}', '${escapeQuote(article.title)}', ${highestBid})">
                        <i class="fa-solid fa-gavel"></i> הגש הצעה
                    </button>
                </div>
            </div>
        </div>

        <div class="article-page-actions">
            <div class="action-buttons-group">
                <button class="btn ${isBookmarked ? 'btn-primary' : 'btn-outline'}" onclick="toggleBookmark('${article.id}')">
                    <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                    <span id="bookmarkBtnText">${isBookmarked ? 'שמור במועדפים' : 'הוסף למועדפים'}</span>
                </button>
                <button class="btn btn-outline" onclick="likeCurrentArticle('${article.id}')">
                    <i class="fa-solid fa-heart"></i>
                    <span id="likeCountText">פרגן בלייק (${likeCount})</span>
                </button>
                <a href="trading.html" class="btn btn-outline">
                    <i class="fa-solid fa-list-check"></i>
                    <span>כל ההצעות באתר</span>
                </a>
            </div>
            
            <a href="index.html" class="btn btn-outline">
                <i class="fa-solid fa-arrow-right"></i>
                <span>חזרה ללוח ההשכרות</span>
            </a>
        </div>
    `;
}

function submitBidFromArticle(articleId, articleTitle, currentHighest) {
    const input = document.getElementById('userBidInput');
    if (!input || !input.value) {
        showToast('אנא הזן סכום הצעה תקף');
        return;
    }

    const bidAmount = parseInt(input.value, 10);
    if (isNaN(bidAmount) || bidAmount <= currentHighest) {
        showToast(`ההצעה חייבת להיות גבוהה מההצעה הנוכחית (₪${currentHighest.toLocaleString('he-IL')})`);
        return;
    }

    if (userBalance < bidAmount) {
        showToast('אין לך מספיק יתרה בארנק להציע ₪' + bidAmount.toLocaleString('he-IL'));
        return;
    }

    // Process bid
    userBalance -= 50;
    localStorage.setItem('news_user_balance', userBalance.toString());

    const newOffer = {
        id: 'off-' + Date.now(),
        articleId: articleId,
        articleTitle: articleTitle,
        bidder: 'אורח (אתה)',
        amount: bidAmount,
        date: new Date().toISOString(),
        status: 'הצעה מובילה 🔥',
        isMyBid: true
    };

    offers.forEach(o => {
        if (o.articleId === articleId) {
            o.status = 'הצעה נמוכה יותר';
        }
    });

    offers.unshift(newOffer);
    localStorage.setItem('news_offers', JSON.stringify(offers));

    input.value = '';
    const highestElem = document.getElementById('articleHighestBid');
    if (highestElem) highestElem.textContent = '₪ ' + bidAmount.toLocaleString('he-IL');

    showToast('הצעתך להשכרה בסך ₪' + bidAmount.toLocaleString('he-IL') + ' הוגשה בהצלחה! 🥳');
}

function escapeQuote(str) {
    return str.replace(/'/g, "\\'");
}

function renderRelatedArticles(current) {
    const related = articles.filter(a => a.id !== current.id).slice(0, 3);
    relatedGrid.innerHTML = related.map(art => `
        <div class="top3-card" onclick="window.location.href='article.html?id=${art.id}'">
            <img src="${art.imageUrl || CATEGORY_IMAGES[art.category] || CATEGORY_IMAGES['מחשבים']}" alt="${art.title}">
            <div class="top3-overlay">
                <div style="font-size:0.8rem; color:var(--text-primary); font-weight:800;">${art.rentalPeriod || 'להשכרה'}</div>
                ${art.title}
            </div>
        </div>
    `).join('');
}

function likeCurrentArticle(id) {
    likes[id] = (likes[id] || 0) + 1;
    localStorage.setItem('news_likes', JSON.stringify(likes));
    const countSpan = document.getElementById('likeCountText');
    if (countSpan) countSpan.textContent = `פרגן בלייק (${likes[id]})`;
    showToast('תודה שפרגנת בלייק! 👍');
}

function toggleBookmark(id) {
    const index = bookmarks.indexOf(id);
    if (index > -1) {
        bookmarks.splice(index, 1);
        showToast('המוצר הוסר מהמועדפים');
    } else {
        bookmarks.push(id);
        showToast('המוצר נשמר במועדפים!');
    }
    localStorage.setItem('news_bookmarks', JSON.stringify(bookmarks));
    
    const btnText = document.getElementById('bookmarkBtnText');
    if (btnText) {
        btnText.textContent = bookmarks.includes(id) ? 'שמור במועדפים' : 'הוסף למועדפים';
    }
}

function showToast(message) {
    if (!toastMessage || !toast) return;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', initArticlePage);
