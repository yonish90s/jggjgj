const PROFESSIONALS_DATA = [
    {
        id: "pro-1",
        name: "דוד לוי",
        title: "חשמלאי מוסמך ובודק תקף",
        category: "חשמל ומיזוג",
        city: "תל אביב - יפו",
        rating: "4.9",
        reviewsCount: 84,
        price: "yhsh 250 / קריאה",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
        phone: "054-1234567",
        experience: "15 שנות ניסיון",
        verified: true,
        summary: "התקנת לוחות חשמל, איתור קצרים, תאורת גן ועבודות מתח גבוה ותקשורת."
    },
    {
        id: "pro-2",
        name: "מיכל כהן",
        title: "מפתחת סוכני AI ו-Python",
        category: "טכנולוגיה ו-AI",
        city: "חיפה - מרכז",
        rating: "5.0",
        reviewsCount: 42,
        price: "yhsh 350 / שעה",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        phone: "052-9876543",
        experience: "8 שנות ניסיון",
        verified: true,
        summary: "פיתוח מערכות בינה מלאכותית, אוטומציות עסקיות, אינטגרציות API ומודלי שפה שונים."
    },
    {
        id: "pro-3",
        name: "אלי מזרחי",
        title: "אינסטלטור מורחה וגילוי נזילות במצלמה תרמית",
        category: "שרברבות ואינסטלציה",
        city: "ירושלים",
        rating: "4.8",
        reviewsCount: 65,
        price: "yhsh 280 / קריאה",
        avatar: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80",
        phone: "050-5554433",
        experience: "20 שנות ניסיון",
        verified: true,
        summary: "פתיחת סתימות מורכבות, צילום צנרת, תיקון פיצוצי מים והתקנת כלים סניטריים."
    },
    {
        id: "pro-4",
        name: "שירה ארד",
        title: "אדריכלית ומעצבת פנים",
        category: "עיצוב ובנייה",
        city: "תל אביב - יפו",
        rating: "4.95",
        reviewsCount: 91,
        price: "yhsh 400 / פגישת ייעוץ",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        phone: "053-1112233",
        experience: "12 שנות ניסיון",
        verified: true,
        summary: "תכנון ועיצוב דירות יוקרה, משרדים וחללים מסחריים כולל הדמיות בתלת-ממד."
    },
    {
        "id": "pro-5",
        "name": "יוסי שטרן",
        title: "טכנאי מיזוג אוויר ומשאבות חום",
        category: "חשמל ומיזוג",
        city: "ראשון לציון",
        rating: "4.85",
        reviewsCount: 37,
        price: "yhsh 220 / בדיקה",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        phone: "054-7778899",
        experience: "10 שנות ניסיון",
        verified: false,
        summary: "התקנת מזגנים עיליים, מיזוג מרכזי, ניקוי עמוק ומילוי גז בכל סוגי המזגנים."
    },
    {
        "id": "pro-6",
        "name": "רונן ברק",
        title: "יועץ עסקי ומלווה סטארטאפים",
        category: "ייעוץ ועסקים",
        city: "הרצליה",
        rating: "5.0",
        reviewsCount: 53,
        price: "yhsh 450 / שעה",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        phone: "050-9998877",
        experience: "18 שנות ניסיון",
        verified: true,
        summary: "בניית תוכניות עבודה, גיוסי הון, אופטימיזציית תהליכים ומעבר משלב הפיתוח לצמיחה."
    }
];

let state = {
    professionals: PROFESSIONALS_DATA,
    searchQuery: '',
    selectedCategory: 'all',
    selectedCity: 'all',
    activeProContact: null
};

document.addEventListener('DOMContentLoaded', () => {
    renderProfessionals();
});

function renderProfessionals() {
    const container = document.getElementById('professionalsGrid');
    const countText = document.getElementById('proResultsCount');
    if (!container) return;

    let filtered = [...state.professionals];

    if (state.searchQuery) {
        const q = state.searchQuery.trim().toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.title.toLowerCase().includes(q) || 
            p.city.toLowerCase().includes(q) ||
            p.summary.toLowerCase().includes(q)
        );
    }

    if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === state.selectedCategory);
    }

    if (state.selectedCity !== 'all') {
        filtered = filtered.filter(p => p.city.includes(state.selectedCity));
    }

    if (countText) {
        countText.textContent = `${filtered.length} אנשי מקצוע נמצאו`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-weight: 800;">לא נמצאו אנשי מקצוע העונים לסינון שנבחר.</div>`;
        return;
    }

    container.innerHTML = filtered.map(pro => `
        <div class="article-card-box" style="padding: 16px;">
            <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 12px;">
                <div style="position: relative; width: 64px; height: 64px; flex-shrink: 0;">
                    <img src="${pro.avatar}" alt="${pro.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                    <span style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; background-color: #16a34a; border: 2px solid white; border-radius: 50%;"></span>
                </div>
                <div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <h3 style="font-size: 1.05rem; font-weight: 900; color: var(--text-primary); margin: 0;">${pro.name}</h3>
                        ${pro.verified ? '<i class="fa-solid fa-circle-check" style="color: #2563eb; font-size: 0.85rem;" title="איש מקצוע מאומת"></i>' : ''}
                    </div>
                    <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-muted);">${pro.title}</div>
                    <div style="font-size: 0.78rem; color: #f59e0b; font-weight: 900; margin-top: 2px;">
                        ⭐ ${pro.rating} (${pro.reviewsCount} המלצות) • ${pro.city}
                    </div>
                </div>
            </div>

            <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 14px; flex-grow: 1;">
                ${pro.summary}
            </p>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; font-weight: 900; color: var(--text-primary); border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: auto;">
                <span>מחיר משוער: <strong style="color: #ff5000;">${pro.price}</strong></span>
                <button class="btn-offer-pill" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openProContactModal('${pro.id}')">
                    📞 צור קשר
                </button>
            </div>
        </div>
    `).join('');
}

function handleProSearch(val) {
    state.searchQuery = val;
    renderProfessionals();
}

function filterProCategory(catValue, labelText) {
    state.selectedCategory = catValue;
    const label = document.getElementById('labelProCategory');
    if (label) label.textContent = labelText;
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    renderProfessionals();
}

function filterProCity(cityValue, labelText) {
    state.selectedCity = cityValue;
    const label = document.getElementById('labelProCity');
    if (label) label.textContent = labelText;
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    renderProfessionals();
}

function togglePillDropdown(menuId, event) {
    if (event) event.stopPropagation();
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => {
        if (m.id !== menuId) m.classList.add('hidden');
    });
    const menu = document.getElementById(menuId);
    if (menu) menu.classList.toggle('hidden');
}

function openProContactModal(proId) {
    const pro = state.professionals.find(p => p.id === proId);
    if (!pro) return;

    state.activeProContact = pro;
    const title = document.getElementById('proContactTitle');
    const sub = document.getElementById('proContactSub');

    if (title) title.textContent = `יצירת קשר עם ${pro.name}`;
    if (sub) sub.textContent = `${pro.title} (${pro.city}) • טלפון: ${pro.phone}`;

    const modal = document.getElementById('proContactModal');
    if (modal) modal.classList.remove('hidden');
}

function closeProContactModal() {
    const modal = document.getElementById('proContactModal');
    if (modal) modal.classList.add('hidden');
}

function handleProContactSubmit(event) {
    event.preventDefault();
    const clientName = document.getElementById('contactClientName').value.trim();
    closeProContactModal();
    showToast(`תודה ${clientName}! פנייתך הועברה בהצלחה ל-${state.activeProContact ? state.activeProContact.name : 'איש המקצוע'}! 📞`);
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

document.addEventListener('click', () => {
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
});

window.handleProSearch = handleProSearch;
window.filterProCategory = filterProCategory;
window.filterProCity = filterProCity;
window.togglePillDropdown = togglePillDropdown;
window.openProContactModal = openProContactModal;
window.closeProContactModal = closeProContactModal;
window.handleProContactSubmit = handleProContactSubmit;
