const BUSINESS_IDEAS_DATASET = [
    {
        id: "biz-1",
        title: "סוכנות AI לאוטומציית שירות לקוחות ולידים לעסקים",
        category: "בינה מלאכותית",
        modelType: "SaaS",
        modelName: "B2B SaaS - מנוי חודשי קבוע",
        author: "דניאל קליין",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        investmentLevel: "נמוך",
        initialInvestment: "yhsh 8,000",
        revenuePotential: "yhsh 35,000 - 80,000 / חודש",
        difficulty: "בינונית 🟡",
        rating: "★ 4.9 (42 יזמים מתעניינים)",
        targetAudience: "עסקים קטנים, חנויות אונליין ומרפאות",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        summary: "בניית סוכני AI חכמים המתחברים ל-WhatsApp ולפייסבוק של חברות, עונים על שאלות 24/7 וסוגרים פגישות ומכירות אוטומטית.",
        businessModelDetails: `
            <h4>💡 איך העסק מייצר הכנסות?</h4>
            <p>1. <strong>דמי הקמה ראשוניים:</strong> yhsh 2,500 - 5,000 עבור חיבור המערכת והטמעת בסיס הידע של הלקוח.</p>
            <p>2. <strong>רישיון שימוש חודשי (SaaS):</strong> yhsh 500 - 1,500 בחודש לכל עסק בהתאם לנפח הודעות הלידים.</p>
            <p>3. <strong>תוספות פרימיום:</strong> חיבור למערכות CRM (כגון HubSpot, Salesforce) ודוחות אנליטיים.</p>
        `
    },
    {
        id: "biz-2",
        title: "מרקטפלייס להשאלת ציוד יוקרתי, גיימינג וצילום",
        category: "סחר אלקטרוני",
        modelType: "Marketplace",
        modelName: "עמלת תיווך מרכישה (Marketplace Fee)",
        author: "מיכל שפירא",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        investmentLevel: "בינוני",
        initialInvestment: "yhsh 25,000",
        revenuePotential: "yhsh 45,000 - 110,000 / חודש",
        difficulty: "בינונית 🟡",
        rating: "★ 4.85 (28 יזמים מתעניינים)",
        targetAudience: "יוצרי תוכן, צלמים וגיימרים",
        imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        summary: "פלטפורמת Peer-to-Peer המאפשרת לבעלי ציוד צילום, רחפנים וקונסולות משחק להשכיר אותם למשתמשים לפי ימים.",
        businessModelDetails: `
            <h4>💡 איך העסק מייצר הכנסות?</h4>
            <p>1. <strong>עמלת תיווך:</strong> 15% עמלה מכל עסקת השאלה או השכרה בפלטפורמה.</p>
            <p>2. <strong>ביטוח ופיקדון דיגיטלי:</strong> גביית 3% נוספים עבור כיסוי ביטוחי נגד נזק או גניבה.</p>
            <p>3. <strong>קידום מודעות בתשלום:</strong> אפשרות לבעלי ציוד לשלם yhsh 50 בשבוע להבלטת המוצרים שלהם.</p>
        `
    },
    {
        id: "biz-3",
        title: "רשת עמדות מיזוג אוויר וטעינה מהירה ירוקה",
        category: "קיימות וסביבה",
        modelType: "Pay-per-use",
        modelName: "תשלום לפי שימוש (Pay-per-use)",
        author: "אהרון לוי",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        investmentLevel: "גבוה",
        initialInvestment: "yhsh 75,000",
        revenuePotential: "yhsh 60,000 - 150,000 / חודש",
        difficulty: "גבוהה 🔴",
        rating: "★ 4.95 (65 יזמים מתעניינים)",
        targetAudience: "רוכבי אופניים חשמליים, שליחים ועיריות",
        imageUrl: "https://images.unsplash.com/photo-1518005068251-37900150df60?auto=format&fit=crop&w=800&q=80",
        summary: "הצבת לוקרים חכמים סולאריים במרכזי ערים לטעינה מהירה של סוללות קורקינטים ואופניים חשמליים.",
        businessModelDetails: `
            <h4>💡 איך העסק מייצר הכנסות?</h4>
            <p>1. <strong>תשלום לפי טעינה:</strong> yhsh 12 לכל חצי שעת טעינה מהירה בלוקר המוגן.</p>
            <p>2. <strong>מנוי חודשי לשליחים:</strong> yhsh 199 בחודש לטעינה חופשית ללא הגבלה.</p>
            <p>3. <strong>חסויות ופרסום דיגיטלי:</strong> מסכי פרסומת על גבי עמדות הטעינה במרכזי ערים.</p>
        `
    },
    {
        id: "biz-4",
        title: "פלטפורמת Freemium לניהול תקציב וחסכונות למשפחות",
        category: "שירותים וייעוץ",
        modelType: "Freemium",
        modelName: "Freemium + שירותי פרימיום",
        author: "רוני ברק",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        investmentLevel: "נמוך",
        initialInvestment: "yhsh 12,000",
        revenuePotential: "yhsh 28,000 - 70,000 / חודש",
        difficulty: "קלה 🟢",
        rating: "★ 4.78 (39 יזמים מתעניינים)",
        targetAudience: "משפחות צעירות וזוגות",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        summary: "אפליקציה המתחברת לחשבונות הבנק וכרטיסי האשראי, מנתחת הוצאות מיותרות ומציעה דרכים לחסוך מאות שקלים בחודש.",
        businessModelDetails: `
            <h4>💡 איך העסק מייצר הכנסות?</h4>
            <p>1. <strong>מסלול בסיסי בחינם (Freemium):</strong> מעקב הוצאות בסיסי וקטגוריזציה אוטומטית.</p>
            <p>2. <strong>מסלול פרימיום משפחתי:</strong> yhsh 39 בחודש לקבלת התראות חריגה, ניתוח משכנתאות וייעוץ AI אישי.</p>
            <p>3. <strong>עמלות הפניה (Affiliate):</strong> עמלה מגופים פיננסיים על מחזור משכנתא או הוזלת ביטוחים.</p>
        `
    },
    {
        id: "biz-5",
        title: "שירות מנויים לארוחות שף בריאות ומדודות לספורטאים",
        category: "סחר אלקטרוני",
        modelType: "SaaS",
        modelName: "מנוי שבועי / חודשי (Subscription)",
        author: "עמית גולן",
        authorAvatar: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80",
        investmentLevel: "בינוני",
        initialInvestment: "yhsh 35,000",
        revenuePotential: "yhsh 50,000 - 130,000 / חודש",
        difficulty: "בינונית 🟡",
        rating: "★ 4.9 (51 יזמים מתעניינים)",
        targetAudience: "מתאמנים, אנשי הייטק וספורטאים",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        summary: "מטבח ענן שמכין ארוחות גורמה טריות לפי ערכים תזונתיים מדויקים (חלבון, פחמימות, קלוריות) ומשלח אותן מדי בוקר.",
        businessModelDetails: `
            <h4>💡 איך העסק מייצר הכנסות?</h4>
            <p>1. <strong>מנוי חודשי קבוע:</strong> yhsh 1,400 בחודש עבור 5 ארוחות שבועיות המגיעות עד פתח המשרד/הבית.</p>
            <p>2. <strong>מכירת תוספי תזונה:</strong> שילוב אבקות חלבון וויטמינים במארזים מותאמים אישית.</p>
        `
    },
    {
        id: "biz-6",
        title: "פלטפורמת B2B לניהול ואופטימיזציית נכסי קריפטו ונדל\"ן",
        category: "טכנולוגיה וסייבר",
        modelType: "Pay-per-use",
        modelName: "תשלום לפי נפח עסקאות (Volume-based)",
        author: "תומר שגיא",
        authorAvatar: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=300&q=80",
        investmentLevel: "גבוה",
        initialInvestment: "yhsh 90,000",
        revenuePotential: "yhsh 100,000 - 250,000 / חודש",
        difficulty: "גבוהה 🔴",
        rating: "★ 4.92 (95 יזמים מתעניינים)",
        targetAudience: "משקיעים, קרנות ומשפחות עתירות נכסים",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        summary: "תוכנה מאובטחת המאחדת נכסים פיננסיים, נדל\"ן ומטבעות דיגיטליים למסך אחד עם ניתוחי מס ואופטימיזציית תשואה.",
        businessModelDetails: `
            <h4>💡 איך העסק מייצר הכנסות?</h4>
            <p>1. <strong>עמלת ניהול שנתית:</strong> 0.1% מתוך היקף תיק הנכסים המנוהל במערכת.</p>
            <p>2. <strong>דוחות מס אוטומטיים:</strong> yhsh 1,200 להפקת דוח מס שנתי מוסמך לרשויות.</p>
        `
    }
];

let state = {
    bizIdeas: BUSINESS_IDEAS_DATASET,
    searchQuery: '',
    selectedModel: 'all',
    selectedInvestment: 'all',
    activePlan: null
};

document.addEventListener('DOMContentLoaded', () => {
    renderBusinessIdeas();
});

function renderBusinessIdeas() {
    const container = document.getElementById('bizGridContainer');
    const countText = document.getElementById('bizResultsCount');
    if (!container) return;

    let filtered = [...state.bizIdeas];

    if (state.searchQuery) {
        const q = state.searchQuery.trim().toLowerCase();
        filtered = filtered.filter(b => 
            b.title.toLowerCase().includes(q) || 
            b.summary.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            b.modelName.toLowerCase().includes(q)
        );
    }

    if (state.selectedModel !== 'all') {
        filtered = filtered.filter(b => b.modelType === state.selectedModel);
    }

    if (state.selectedInvestment !== 'all') {
        filtered = filtered.filter(b => b.investmentLevel === state.selectedInvestment);
    }

    if (countText) {
        countText.textContent = `${filtered.length} רעיונות עסקיים נמצאו`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-weight: 800;">לא נמצאו רעיונות עסקיים העונים לסינון שנבחר. לחץ על "הוסף רעיון עסקי +" כדי לפרסם ראשון!</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="article-card-box" onclick="openBusinessPlanModal('${item.id}')">
            
            <div class="article-card-image-box">
                <img src="${item.imageUrl}" alt="${item.title}">
                <span class="stock-pill-badge" style="background-color: #111111; color: white;">
                    💼 ${item.category}
                </span>
            </div>

            <div class="article-card-body">
                
                <h3 class="article-card-title">${item.title}</h3>
                
                <!-- Business Model Highlight Pill -->
                <div style="background-color: #f7f7f5; border: 1px solid #e5e5e0; padding: 6px 12px; border-radius: 12px; font-size: 0.82rem; font-weight: 800; color: #111111;">
                    🎯 מודל עסקי: <strong>${item.modelName}</strong>
                </div>

                <!-- Specs Checklist -->
                <div class="card-checklist-specs">
                    <div class="checklist-item"><i class="fa-solid fa-check" style="color: #16a34a;"></i> פוטנציאל רווח: <strong style="color: #16a34a; font-weight: 900;">${item.revenuePotential}</strong></div>
                    <div class="checklist-item"><i class="fa-solid fa-check"></i> השקעה ראשונית: ${item.initialInvestment} (${item.investmentLevel})</div>
                    <div class="checklist-item"><i class="fa-solid fa-check"></i> רמת מורכבות: ${item.difficulty}</div>
                </div>

                <p style="font-size: 0.82rem; color: #666666; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${item.summary}
                </p>

                <!-- Footer Symmetrical Action Bar -->
                <div class="article-card-action-bar" style="margin-top: auto;">
                    <span style="font-size: 0.78rem; font-weight: 800; color: #777777;">
                        ${item.rating}
                    </span>

                    <button class="btn-offer-pill" style="padding: 5px 12px; font-size: 0.78rem;" onclick="openPartnerOfferModal(event, '${item.id}')">
                        הצע שותפות / הצעה
                    </button>
                </div>

            </div>

        </div>
    `).join('');
}

function handleBizSearch(val) {
    state.searchQuery = val;
    renderBusinessIdeas();
}

function filterBizModel(modelVal, labelText) {
    state.selectedModel = modelVal;
    const label = document.getElementById('labelBizModel');
    if (label) label.textContent = labelText;
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    renderBusinessIdeas();
}

function filterBizInvestment(investVal, labelText) {
    state.selectedInvestment = investVal;
    const label = document.getElementById('labelBizInvestment');
    if (label) label.textContent = labelText;
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    renderBusinessIdeas();
}

function togglePillDropdown(menuId, event) {
    if (event) event.stopPropagation();
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => {
        if (m.id !== menuId) m.classList.add('hidden');
    });
    const menu = document.getElementById(menuId);
    if (menu) menu.classList.toggle('hidden');
}

function openBusinessPlanModal(bizId) {
    const item = state.bizIdeas.find(b => b.id === bizId);
    if (!item) return;

    state.activePlan = item;

    document.getElementById('planCategoryBadge').textContent = item.category;
    document.getElementById('planTitle').textContent = item.title;
    document.getElementById('planSub').textContent = `מאת: ${item.author} | מודל: ${item.modelName}`;

    document.getElementById('planBodyContent').innerHTML = `
        <div style="background-color: #f7f7f5; padding: 16px; border-radius: 14px; border: 1px solid #e5e5e0; margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.88rem; font-weight: 800;">
            <div>💰 רווחיות משוערת: <span style="color: #16a34a;">${item.revenuePotential}</span></div>
            <div>💵 השקעה ראשונית: <span>${item.initialInvestment}</span></div>
            <div>🎯 קהל יעד: <span>${item.targetAudience}</span></div>
            <div>⚡ דרגת קושי: <span>${item.difficulty}</span></div>
        </div>

        <h4 style="font-size: 1.1rem; color: #111111; margin-bottom: 8px; font-weight: 900;">📌 תקציר המיזם והבעיה בשוק:</h4>
        <p style="margin-bottom: 16px;">${item.summary}</p>

        ${item.businessModelDetails}
    `;

    const modal = document.getElementById('businessPlanModal');
    if (modal) modal.classList.remove('hidden');
}

function closeBusinessPlanModal() {
    const modal = document.getElementById('businessPlanModal');
    if (modal) modal.classList.add('hidden');
}

function openPartnerOfferFromPlan() {
    closeBusinessPlanModal();
    if (state.activePlan) {
        openPartnerOfferModal(null, state.activePlan.id);
    }
}

function openPartnerOfferModal(event, bizId) {
    if (event) event.stopPropagation();
    const item = state.bizIdeas.find(b => b.id === bizId);
    if (!item) return;

    state.activePlan = item;
    const sub = document.getElementById('bizOfferSub');
    if (sub) {
        sub.textContent = `עבור המיזם: "${item.title}" (${item.modelName})`;
    }

    const modal = document.getElementById('businessOfferModal');
    if (modal) modal.classList.remove('hidden');
}

function closeBusinessOfferModal() {
    const modal = document.getElementById('businessOfferModal');
    if (modal) modal.classList.add('hidden');
}

function handleBizOfferSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('bizOfferName').value.trim();
    const amount = document.getElementById('bizOfferAmount').value.trim();

    closeBusinessOfferModal();
    showToast(`תודה ${name}! הצעת השותפות בסך ${amount} נשלחה בהצלחה ליזם! 🤝🎉`);
}

function openAddBusinessIdeaModal() {
    const modal = document.getElementById('addBusinessIdeaModal');
    if (modal) modal.classList.remove('hidden');
}

function closeAddBusinessIdeaModal() {
    const modal = document.getElementById('addBusinessIdeaModal');
    if (modal) modal.classList.add('hidden');
}

function handleAddBusinessIdeaSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('newBizTitle').value.trim();
    const author = document.getElementById('newBizAuthor').value.trim();
    const category = document.getElementById('newBizCategory').value;
    const modelType = document.getElementById('newBizModel').value;
    const investment = document.getElementById('newBizInvestment').value.trim();
    const revenue = document.getElementById('newBizRevenue').value.trim();
    const summary = document.getElementById('newBizSummary').value.trim();

    const newBiz = {
        id: 'biz-' + Date.now(),
        title: title,
        category: category,
        modelType: modelType,
        modelName: `${modelType} - מודל הכנסות מותאם`,
        author: author,
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
        investmentLevel: "נמוך",
        initialInvestment: investment,
        revenuePotential: revenue,
        difficulty: "בינונית 🟡",
        rating: "★ 5.0 (חדש בלבד)",
        targetAudience: "עסקים ולקוחות פרטיים",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        summary: summary,
        businessModelDetails: `<h4>💡 פירוט מודל הכנסות:</h4><p>${summary}</p>`
    };

    state.bizIdeas.unshift(newBiz);
    closeAddBusinessIdeaModal();
    renderBusinessIdeas();
    showToast(`ברכות ${author}! הרעיון העסקי "${title}" פורסם בהצלחה בלוח! 💼🎉`);
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

window.handleBizSearch = handleBizSearch;
window.filterBizModel = filterBizModel;
window.filterBizInvestment = filterBizInvestment;
window.togglePillDropdown = togglePillDropdown;
window.openBusinessPlanModal = openBusinessPlanModal;
window.closeBusinessPlanModal = closeBusinessPlanModal;
window.openPartnerOfferFromPlan = openPartnerOfferFromPlan;
window.openPartnerOfferModal = openPartnerOfferModal;
window.closeBusinessOfferModal = closeBusinessOfferModal;
window.handleBizOfferSubmit = handleBizOfferSubmit;
window.openAddBusinessIdeaModal = openAddBusinessIdeaModal;
window.closeAddBusinessIdeaModal = closeAddBusinessIdeaModal;
window.handleAddBusinessIdeaSubmit = handleAddBusinessIdeaSubmit;
