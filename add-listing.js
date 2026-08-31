// Add Listing State
let selectedCategory = 'מחשבים';
let selectedCondition = 'חדש באריזה';
let userBalance = 50000;
let darkMode = false;

const CATEGORY_IMAGES = {
    "מחשבים": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "פלאפונים": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "כלי עבודה": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "אקסבוקס וגיימינג": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    "מצלמות": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
};

function initAddListingPage() {
    setupTheme();
    loadBalance();
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    userBalance = saved ? parseInt(saved, 10) : 50000;
    const balDisplay = document.getElementById('userBalanceDisplay');
    const heroBalText = document.getElementById('heroBalanceText');
    if (balDisplay) balDisplay.textContent = 'yhsh ' + userBalance.toLocaleString('he-IL');
    if (heroBalText) heroBalText.textContent = 'yhsh ' + userBalance.toLocaleString('he-IL');
}

function addFundsGlobal() {
    userBalance += 10000;
    localStorage.setItem('news_user_balance', userBalance.toString());
    loadBalance();
    showToast('נטענו yhsh 10,000 בהצלחה לארנק! 💰');
}

function setupTheme() {
    darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            darkMode = !darkMode;
            localStorage.setItem('news_theme', darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function applyTheme() {
    if (darkMode) {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function selectFormCategory(catName) {
    selectedCategory = catName;
    
    const step1 = document.getElementById('stepCategorySelect');
    const form = document.getElementById('listingForm');
    if (step1) step1.classList.add('hidden');
    if (form) form.classList.remove('hidden');

    const selectElem = document.getElementById('inputCategory');
    if (selectElem) selectElem.value = catName;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectCondition(el, conditionName) {
    selectedCondition = conditionName;
    const pills = document.querySelectorAll('.condition-pill');
    pills.forEach(p => p.classList.remove('active'));
    el.classList.add('active');
}

function updateImagePreview(url) {
    const previewBox = document.getElementById('imagePreview1');
    if (!previewBox) return;

    if (url && url.startsWith('http')) {
        previewBox.innerHTML = `<img src="${url}" alt="תצוגה מקדימה">`;
    } else {
        previewBox.innerHTML = `<span>תמונה 2</span>`;
    }
}

function triggerImageUrlInput() {
    const input = document.getElementById('inputImageUrl');
    if (input) input.focus();
}

window.selectFormCategory = selectFormCategory;
window.selectCondition = selectCondition;
window.updateImagePreview = updateImagePreview;
window.triggerImageUrlInput = triggerImageUrlInput;
window.addFundsGlobal = addFundsGlobal;

function submitNewListing(event) {
    event.preventDefault();

    const contractCheckbox = document.getElementById('checkboxContract');
    if (!contractCheckbox || !contractCheckbox.checked) {
        showToast('יש לאשר את חוזה ההשכרה וערבות הנזק/הרס כדי להמשיך!');
        return;
    }

    const title = document.getElementById('inputTitle').value.trim();
    const category = document.getElementById('inputCategory').value;
    const summary = document.getElementById('inputSummary').value.trim();
    const price = parseInt(document.getElementById('inputPrice').value, 10);
    const buyPrice = parseInt(document.getElementById('inputBuyPrice').value, 10);
    let imageUrl = document.getElementById('inputImageUrl').value.trim();

    if (!imageUrl) {
        imageUrl = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['מחשבים'];
    }

    const newArticle = {
        id: 'custom-' + Date.now(),
        title: title,
        category: category,
        author: 'אורח (אתה)',
        date: new Date().toISOString(),
        readTime: 'טווח השכרה: יומי / שבועי',
        price: price,
        buyPrice: buyPrice,
        rentalPeriod: `🔑 yhsh ${price} / ליום`,
        buyPeriod: `🛒 yhsh ${buyPrice.toLocaleString('he-IL')} לקנייה`,
        rentalDates: 'זמין להשכרה/קנייה מיידית',
        imageUrl: imageUrl,
        summary: summary,
        content: `
            <h3>${title}</h3>
            <p>${summary}</p>
            <br>
            <p><strong>מצב המוצר:</strong> ${selectedCondition}</p>
            <p><strong>תנאי השכרה:</strong> השכרה יומית ב-yhsh ${price}. קנייה סופית ב-yhsh ${buyPrice.toLocaleString('he-IL')}.</p>
            <p><strong>חוזה אחריות:</strong> השוכר חתם על חוזה אחריות נזק/הרס במקרה של קלקול או נזק לציוד.</p>
        `,
        tags: [category, selectedCondition, "חוזה נזק מאושר"],
        condition: selectedCondition,
        contractApproved: true,
        sellerRating: 5.0,
        sellerTenure: "חדש באתר (2026)",
        completedDeals: 1
    };

    try {
        const existingCustom = JSON.parse(localStorage.getItem('news_custom_articles') || '[]');
        existingCustom.unshift(newArticle);
        localStorage.setItem('news_custom_articles', JSON.stringify(existingCustom));
    } catch (e) {
        localStorage.setItem('news_custom_articles', JSON.stringify([newArticle]));
    }

    showToast('המודעה והחוזה פורסמו בהצלחה ללוח ההשכרות! 🎉');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

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

document.addEventListener('DOMContentLoaded', initAddListingPage);
