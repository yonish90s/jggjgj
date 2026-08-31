let couriersState = {
    couriers: [],
    userBalance: 50000,
    darkMode: false
};

const INITIAL_COURIERS = [
    {
        id: "cour-1",
        name: "יונתן מזרחי",
        vehicle: "🛵 קטנוע / אופנוע",
        area: "תל אביב, רמת גן, גבעתיים",
        price: 35,
        rating: 4.9,
        deliveriesCount: 142,
        phone: "050-8899123",
        status: "זמין כעת 🟢"
    },
    {
        id: "cour-2",
        name: "אלירן לוי",
        vehicle: "🚐 מסחרית (לציוד כבד)",
        area: "כל הארץ / המרכז והשרון",
        price: 90,
        rating: 5.0,
        deliveriesCount: 210,
        phone: "052-7711445",
        status: "זמין כעת 🟢"
    },
    {
        id: "cour-3",
        name: "סער כהן",
        vehicle: "🚗 רכב פרטי",
        area: "ראשל״צ, חולון, בת ים",
        price: 45,
        rating: 4.8,
        deliveriesCount: 89,
        phone: "054-3322119",
        status: "זמין כעת 🟢"
    },
    {
        id: "cour-4",
        name: "מאור שלום",
        vehicle: "🛵 קטנוע / אופנוע",
        area: "הרצליה, כפר סבא, רעננה",
        price: 40,
        rating: 4.9,
        deliveriesCount: 115,
        phone: "053-9988776",
        status: "זמין כעת 🟢"
    }
];

function initCouriersPage() {
    setupTheme();
    loadBalance();
    loadCouriers();
    renderCouriers();
}

function loadBalance() {
    const saved = localStorage.getItem('news_user_balance');
    couriersState.userBalance = saved ? parseInt(saved, 10) : 50000;
    const balDisplay = document.getElementById('userBalanceDisplay');
    const heroBalText = document.getElementById('heroBalanceText');
    if (balDisplay) balDisplay.textContent = '₪ ' + couriersState.userBalance.toLocaleString('he-IL');
    if (heroBalText) heroBalText.textContent = '₪ ' + couriersState.userBalance.toLocaleString('he-IL');
}

function addFundsGlobal() {
    couriersState.userBalance += 10000;
    localStorage.setItem('news_user_balance', couriersState.userBalance.toString());
    loadBalance();
    showToast('נטענו ₪10,000 בהצלחה לארנק! 💰');
}

function setupTheme() {
    couriersState.darkMode = localStorage.getItem('news_theme') === 'dark';
    applyTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            couriersState.darkMode = !couriersState.darkMode;
            localStorage.setItem('news_theme', couriersState.darkMode ? 'dark' : 'light');
            applyTheme();
        });
    }
}

function applyTheme() {
    if (couriersState.darkMode) {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function loadCouriers() {
    const saved = localStorage.getItem('news_couriers_list');
    if (saved) {
        try {
            couriersState.couriers = JSON.parse(saved);
        } catch (e) {
            couriersState.couriers = INITIAL_COURIERS;
        }
    } else {
        couriersState.couriers = INITIAL_COURIERS;
        saveCouriers();
    }
}

function saveCouriers() {
    localStorage.setItem('news_couriers_list', JSON.stringify(couriersState.couriers));
}

function renderCouriers() {
    const grid = document.getElementById('couriersGrid');
    const countSpan = document.getElementById('couriersCount');
    if (!grid) return;

    if (countSpan) countSpan.textContent = `מציג ${couriersState.couriers.length} שליחים זמינים`;

    grid.innerHTML = couriersState.couriers.map(cour => `
        <div class="courier-card">
            <div class="courier-header">
                <div class="courier-avatar">
                    <i class="fa-solid fa-user-ninja"></i>
                </div>
                <div>
                    <div class="courier-name">${cour.name}</div>
                    <span class="courier-vehicle-tag">${cour.vehicle}</span>
                </div>
            </div>

            <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-top: 4px;">
                <div><i class="fa-solid fa-location-dot" style="color:#16a34a;"></i> <strong>אזור:</strong> ${cour.area}</div>
                <div><i class="fa-solid fa-star" style="color:#eab308;"></i> <strong>דירוג:</strong> ${cour.rating} (${cour.deliveriesCount || 50} משלוחים)</div>
                <div><i class="fa-solid fa-phone"></i> <strong>טלפון:</strong> ${cour.phone}</div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                <span style="font-size: 1.15rem; font-weight: 900; color: var(--text-primary);">₪${cour.price} <span style="font-size:0.75rem; color:var(--text-muted);">/ למשלוח</span></span>
                <button class="btn" onclick="orderCourier('${cour.name}', ${cour.price})" style="background-color: #18181b; color: #ffffff; font-size: 0.82rem; font-weight: 900; padding: 6px 14px; border: none; border-radius: var(--radius-sm);">
                    <i class="fa-solid fa-paper-plane"></i> הזמן משלוח
                </button>
            </div>
        </div>
    `).join('');
}

function orderCourier(name, price) {
    if (couriersState.userBalance < price) {
        showToast(`אין מספיק יתרה בארנק! מחיר משלוח: ₪${price}, יתרה: ₪${couriersState.userBalance.toLocaleString('he-IL')}`);
        return;
    }

    if (confirm(`האם ברצונך להזמין משלוח ציוד ע"י השליח ${name} בעלות ₪${price}?`)) {
        couriersState.userBalance -= price;
        localStorage.setItem('news_user_balance', couriersState.userBalance.toString());
        loadBalance();
        showToast(`הזמנת המשלוח מול ${name} נקלטה בהצלחה! השליח בדרך אליך 🚀`);
    }
}

function submitCourierRegistration(event) {
    event.preventDefault();

    const name = document.getElementById('inputCourierName').value.trim();
    const area = document.getElementById('inputCourierArea').value.trim();
    const vehicle = document.getElementById('inputCourierVehicle').value;
    const price = parseInt(document.getElementById('inputCourierPrice').value, 10);
    const phone = document.getElementById('inputCourierPhone').value.trim();

    const chk = document.getElementById('chkCourierTerms');
    if (!chk || !chk.checked) {
        showToast('יש לאשר את התחייבות השליח!');
        return;
    }

    const newCourier = {
        id: 'cour-' + Date.now(),
        name: name,
        vehicle: vehicle,
        area: area,
        price: price,
        rating: 5.0,
        deliveriesCount: 1,
        phone: phone,
        status: 'זמין כעת 🟢'
    };

    couriersState.couriers.unshift(newCourier);
    saveCouriers();
    renderCouriers();

    showToast(`מזל טוב ${name}! נרשמת בהצלחה כשליח ציוד מורשה! 🥳🛵`);

    // Reset Form
    event.target.reset();
}

window.orderCourier = orderCourier;
window.submitCourierRegistration = submitCourierRegistration;
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

document.addEventListener('DOMContentLoaded', initCouriersPage);
