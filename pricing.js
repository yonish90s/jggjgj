let pricingState = {
    subscription: null,
    userBalance: 50000,
    darkMode: false
};

function initPricingPage() {
    setupTheme();
    loadBalance();
    loadSubscription();
    renderSubscriptionStatus();
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    pricingState.userBalance = saved ? parseInt(saved, 10) : 50000;
    const balDisplay = document.getElementById('userBalanceDisplay');
    const heroBalText = document.getElementById('heroBalanceText');
    if (balDisplay) balDisplay.textContent = 'yhsh ' + pricingState.userBalance.toLocaleString('he-IL');
    if (heroBalText) heroBalText.textContent = 'yhsh ' + pricingState.userBalance.toLocaleString('he-IL');
}

function addFundsGlobal() {
    pricingState.userBalance += 10000;
    localStorage.setItem('news_user_balance', pricingState.userBalance.toString());
    loadBalance();
    showToast('נטענו yhsh 10,000 בהצלחה לארנק! 💰');
}

function setupTheme() {
    pricingState.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            pricingState.darkMode = !pricingState.darkMode;
            localStorage.setItem('news_theme', pricingState.darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function applyTheme() {
    if (pricingState.darkMode) {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function loadSubscription() {
    try {
        const saved = localStorage.getItem('news_user_subscription');
        if (saved) {
            pricingState.subscription = JSON.parse(saved);
        }
    } catch (e) {
        pricingState.subscription = null;
    }
}

function renderSubscriptionStatus() {
    const banner = document.getElementById('activeSubStatusBanner');
    const subText = document.getElementById('activeSubText');
    const guestText = document.getElementById('guestUserText');

    if (pricingState.subscription && pricingState.subscription.active) {
        if (banner) banner.classList.remove('hidden');
        if (subText) subText.textContent = `המנוי החודשי שלך פעיל: ${pricingState.subscription.planName} (קיבלת yhsh ${pricingState.subscription.bonusWallet.toLocaleString('he-IL')} בונוס לארנק!)`;
        if (guestText) guestText.textContent = `👑 ${pricingState.subscription.planName}`;
    } else {
        if (banner) banner.classList.add('hidden');
        if (guestText) guestText.textContent = 'אורח';
    }
}

function subscribePlanPage(planName, price, bonusWallet) {
    pricingState.subscription = {
        planName: planName,
        price: price,
        bonusWallet: bonusWallet,
        active: true,
        startDate: new Date().toISOString()
    };

    pricingState.userBalance += bonusWallet;
    localStorage.setItem('news_user_balance', pricingState.userBalance.toString());
    localStorage.setItem('news_user_subscription', JSON.stringify(pricingState.subscription));

    loadBalance();
    renderSubscriptionStatus();

    showToast(`מזל טוב! הצטרפת ל-${planName} וקיבלת yhsh ${bonusWallet.toLocaleString('he-IL')} בונוס לארנק! 🥳💎`);
}

function cancelSubscription() {
    if (confirm('האם ברצונך לבטל את המנוי החודשי?')) {
        pricingState.subscription = null;
        localStorage.removeItem('news_user_subscription');
        renderSubscriptionStatus();
        showToast('המנוי החודשי בוטל בהצלחה.');
    }
}

window.subscribePlanPage = subscribePlanPage;
window.cancelSubscription = cancelSubscription;
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

document.addEventListener('DOMContentLoaded', initPricingPage);
