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
        "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "summary": "סקירה מקיפה על פריצות הדרך האחרונות בתחום ה-Agents והבינה המלאכותית היוצרת.",
        "content": "<h3>עידן חדש של סוכני AI אוטונומיים</h3><p>בשנים האחרונות ראינו מעבר חד מודלי שפה פשוטים המשיבים על שאלות למערכות אוטונומיות המסוגלות לבצע משימות מורכבות מקצה לקצה.</p>"
    }
];

let currentArticleData = null;

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id') || 'art-1';

    let articles = FALLBACK_ARTICLES;

    try {
        const res = await fetch('articles.json?t=' + Date.now());
        if (res.ok) {
            articles = await res.json();
        }
    } catch (e) {}

    const article = articles.find(a => a.id === articleId) || articles[0];
    currentArticleData = article;

    document.getElementById('articleCategoryTag').textContent = article.category;
    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleAuthor').textContent = article.author;
    document.getElementById('articleReadTime').textContent = article.readTime;
    document.getElementById('articleViews').textContent = article.views;
    document.getElementById('articleImage').src = article.imageUrl;
    document.getElementById('articleContent').innerHTML = article.content;
    document.getElementById('articleLikes').textContent = article.likes;

    // SPECS BAR
    document.getElementById('specBorrowPrice').textContent = article.borrowPrice || 'yhsh 350';
    document.getElementById('specSellPrice').textContent = article.sellPrice || article.price || 'yhsh 4,500';
    document.getElementById('specModel').textContent = article.model || 'כמו חדש';

    // RENDER TOP READ SIDEBARS
    renderTopReadLists(articles);
});

function renderTopReadLists(articles) {
    const leftContainer = document.getElementById('topReadStoriesLeft');
    const rightContainer = document.getElementById('topReadStoriesRight');

    const topItems = articles.slice(0, 4);

    const html = topItems.map((item, idx) => `
        <div class="top-read-item" onclick="window.location.href='article.html?id=${item.id}'">
            <span class="top-read-num">0${idx + 1}</span>
            <span class="top-read-title">${item.title}</span>
        </div>
    `).join('');

    if (leftContainer) leftContainer.innerHTML = html;
    if (rightContainer) rightContainer.innerHTML = html;
}

function openArticleOfferModal() {
    if (!currentArticleData) return;
    const subTitle = document.getElementById('articleOfferSubTitle');
    if (subTitle) {
        subTitle.textContent = `עבור: "${currentArticleData.title}" (מכירה: ${currentArticleData.sellPrice || currentArticleData.price} | השאלה: ${currentArticleData.borrowPrice || 'yhsh 350'})`;
    }
    const modal = document.getElementById('articleOfferModal');
    if (modal) modal.classList.remove('hidden');
}

function closeArticleOfferModal() {
    const modal = document.getElementById('articleOfferModal');
    if (modal) modal.classList.add('hidden');
}

function handleArticleOfferSubmit(event) {
    event.preventDefault();
    const amount = document.getElementById('artOfferAmount').value.trim();
    const name = document.getElementById('artOfferName').value.trim();

    closeArticleOfferModal();
    document.getElementById('articleOfferForm').reset();

    showToast(`תודה ${name}! ההצעה בסך ${amount} נשלחה בהצלחה למפרסם המודעה! 🤝🎉`);
}

function likeArticle() {
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

window.likeArticle = likeArticle;
window.openArticleOfferModal = openArticleOfferModal;
window.closeArticleOfferModal = closeArticleOfferModal;
window.handleArticleOfferSubmit = handleArticleOfferSubmit;
