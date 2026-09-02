const IDEAS_DATASET = [
    {
        id: "idea-1",
        title: "פלטפורמה קהילתית להשאלת ציוד וכלי עבודה בין שכנים",
        category: "קהילה וסביבה",
        author: "דניאל קליין",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        date: "01.09.2026",
        status: "בפיתוח",
        upvotes: 42,
        userVoted: false,
        summary: "אפליקציה המאפשרת לדיירים באותו בניין או שכונה להשאיל מקדחות, סולמות וציוד קמפינג במקום לרכוש מוצרים חדשים.",
        details: "במקום שכל בית יחזיק מקדחה שנעשה בה שימוש 10 דקות בשנה, הפלטפורמה מאפשרת רישום של ציוד זמין בשכונה, קביעת מועדי איסוף ופיקדון דיגיטלי מאובטח.",
        comments: [
            { author: "רוני שפירא", text: "רעיון מעולה! אשמח להשאיל את מכונת השטיפה בלחץ שלי." },
            { author: "מיכאל כהן", text: "איך עובד נושא הפיקדון למקרה שמוצר נהרס?" }
        ]
    },
    {
        id: "idea-2",
        title: "סוכן AI אוטונומי לניהול משימות ולוח זמנים משפחתי",
        category: "טכנולוגיה ו-AI",
        author: "מיכל שפירא",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        date: "31.08.2026",
        status: "חדש",
        upvotes: 68,
        userVoted: false,
        summary: "סוכן חכם שמסתנכרן עם הוואטסאפ והיומן המשפחתי, מתזכר על חוגים, תורים לרופא וקניות בסופר באופן אוטומטי.",
        details: "המערכת מזהה הודעות טקסט והקלטות קוליות בקבוצה המשפחתית, ממצה מהן משימות ותאריכים, ומעדכנת את היומן של כל אחד מבני המשפחה.",
        comments: [
            { author: "עמית גולן", text: "זה בדיוק מה שהיה חסר בבית שלנו, מעוניין לבדוק בטא!" }
        ]
    },
    {
        id: "idea-3",
        title: "רשת עמדות טעינה מהירות לאופניים וקורקינטים חשמליים",
        category: "יזמות ועסקים",
        author: "אהרון לוי",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        date: "30.08.2026",
        status: "חדש",
        upvotes: 35,
        userVoted: false,
        summary: "הצבת עמדות טעינה סולאריות ליד תחנות רכבת ומרכזי קניות לטעינה מהירה של כל סוגי הסוללות.",
        details: "עמדות חכמות שבהן ניתן לנעול את הסוללה בתוך תא בטיחותי חסין אש ולטעון אותה תוך 20 דקות בתשלום סמלי באפליקציה.",
        comments: []
    },
    {
        id: "idea-4",
        title: "משחק לימודי מבוסס מציאות מועשרת (AR) ללימוד היסטוריה",
        category: "גיימינג ובידור",
        author: "רוני ברק",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        date: "29.08.2026",
        status: "בפיתוח",
        upvotes: 54,
        userVoted: false,
        summary: "משחק שבו תלמידים מסיירים באתרי מורשת ורואים שחקנים ואירועים היסטוריים מוקרנים סביבם דרך המצלמה.",
        details: "חוויית למידה אינטראקטיבית המשלבת חידות, משימות קבוצתיות וסיפורים היסטוריים חיים הממחישים את העבר.",
        comments: [
            { author: "טלי דגן", text: "מדהים! בתי ספר ישמחו להכניס את זה לתוכנית הלימודים." }
        ]
    },
    {
        id: "idea-5",
        title: "מערכת חכמה למניעת בזבוז מזון במסעדות וברשתות שיווק",
        category: "קהילה וסביבה",
        author: "טלי דגן",
        authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
        date: "28.08.2026",
        status: "בוצע",
        upvotes: 91,
        userVoted: false,
        summary: "פלטפורמה המקשרת בין מסעדות בסוף יום עבודה לתושבים המעוניינים לרכוש מנות טריות ב-70% הנחה.",
        details: "הפלטפורמה כבר פועלת בהצלחה ב-15 ערים בישראל ומנעה זריקת עשרות טונות של מזון איכותי למזבלות.",
        comments: [
            { author: "ניר כהן", text: "משתמש בזה באופן קבוע בחיפה, פשוט שירות מנצח!" }
        ]
    },
    {
        id: "idea-6",
        title: "תוכנה לעיצוב פנים בתלת-ממד בלחיצת כפתור לפי תמונת חדר",
        category: "עיצוב ומוצר",
        author: "עמית גולן",
        authorAvatar: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80",
        date: "27.08.2026",
        status: "חדש",
        upvotes: 49,
        userVoted: false,
        summary: "מצלמים את החדר בבית, והתוכנה מציעה 5 סגנונות עיצוב מותאמים כולל קישורים לרכישת הריהוט בארץ.",
        details: "הבינה המלאכותית מזהה את מידות החדר, התאורה והפתחים וממקמת את הרהיטים בדיוק מרבי.",
        comments: []
    }
];

let state = {
    ideas: IDEAS_DATASET,
    searchQuery: '',
    selectedCategory: 'all',
    selectedStatus: 'all',
    activeIdea: null
};

document.addEventListener('DOMContentLoaded', () => {
    renderIdeas();
});

function renderIdeas() {
    const container = document.getElementById('ideasGridContainer');
    const countText = document.getElementById('ideasResultsCount');
    if (!container) return;

    let filtered = [...state.ideas];

    if (state.searchQuery) {
        const q = state.searchQuery.trim().toLowerCase();
        filtered = filtered.filter(i => 
            i.title.toLowerCase().includes(q) || 
            i.summary.toLowerCase().includes(q) ||
            i.author.toLowerCase().includes(q)
        );
    }

    if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(i => i.category === state.selectedCategory);
    }

    if (state.selectedStatus !== 'all') {
        filtered = filtered.filter(i => i.status === state.selectedStatus);
    }

    // Sort by Upvotes descending
    filtered.sort((a, b) => b.upvotes - a.upvotes);

    if (countText) {
        countText.textContent = `${filtered.length} רעיונות נמצאו`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-weight: 800;">לא נמצאו רעיונות העונים לסינון שנבחר. לחץ על "שתף רעיון חדש +" כדי לפרסם ראשון!</div>`;
        return;
    }

    container.innerHTML = filtered.map(idea => {
        let statusBadgeColor = '#2563eb';
        if (idea.status === 'בפיתוח') statusBadgeColor = '#f59e0b';
        if (idea.status === 'בוצע') statusBadgeColor = '#16a34a';

        return `
            <div class="article-card-box" style="padding: 20px; display: flex; flex-direction: column;" onclick="openIdeaDetailModal('${idea.id}')">
                
                <!-- Category & Status Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="background-color: #f7f7f5; border: 1px solid #e5e5e0; color: #111111; padding: 3px 12px; border-radius: 14px; font-size: 0.78rem; font-weight: 800;">
                        💡 ${idea.category}
                    </span>
                    <span style="background-color: ${statusBadgeColor}; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.76rem; font-weight: 800;">
                        ${idea.status}
                    </span>
                </div>

                <h3 style="font-size: 1.1rem; font-weight: 900; color: #111111; line-height: 1.35; margin-bottom: 8px;">
                    ${idea.title}
                </h3>

                <p style="font-size: 0.85rem; color: #555555; line-height: 1.45; margin-bottom: 16px; flex-grow: 1;">
                    ${idea.summary}
                </p>

                <!-- Author & Stats Footer Row -->
                <div style="border-top: 1px solid #e5e5e0; padding-top: 14px; margin-top: auto; display: flex; align-items: center; justify-content: space-between;">
                    
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${idea.authorAvatar}" alt="${idea.author}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                        <span style="font-size: 0.82rem; font-weight: 800; color: #333333;">${idea.author}</span>
                    </div>

                    <div style="display: flex; align-items: center; gap: 8px;">
                        <!-- Upvote Pill Button -->
                        <button class="btn-offer-pill" style="padding: 5px 14px; font-size: 0.82rem; background-color: ${idea.userVoted ? '#16a34a' : '#111111'};" onclick="toggleUpvoteIdea(event, '${idea.id}')">
                            👍 ${idea.upvotes}
                        </button>
                        
                        <span style="font-size: 0.8rem; color: #777777; font-weight: 700;">
                            💬 ${idea.comments.length}
                        </span>
                    </div>

                </div>

            </div>
        `;
    }).join('');
}

function toggleUpvoteIdea(event, ideaId) {
    if (event) event.stopPropagation();
    const idea = state.ideas.find(i => i.id === ideaId);
    if (!idea) return;

    if (idea.userVoted) {
        idea.upvotes--;
        idea.userVoted = false;
        showToast('ביטלת את התמיכה ברעיון');
    } else {
        idea.upvotes++;
        idea.userVoted = true;
        showToast('תודה! תמכת ברעיון בהצלחה 👍💡');
    }
    renderIdeas();
}

function handleIdeaSearch(val) {
    state.searchQuery = val;
    renderIdeas();
}

function filterIdeaCategory(catVal, labelText) {
    state.selectedCategory = catVal;
    const label = document.getElementById('labelIdeaCategory');
    if (label) label.textContent = labelText;
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    renderIdeas();
}

function filterIdeaStatus(statusVal, labelText) {
    state.selectedStatus = statusVal;
    const label = document.getElementById('labelIdeaStatus');
    if (label) label.textContent = labelText;
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    renderIdeas();
}

function togglePillDropdown(menuId, event) {
    if (event) event.stopPropagation();
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => {
        if (m.id !== menuId) m.classList.add('hidden');
    });
    const menu = document.getElementById(menuId);
    if (menu) menu.classList.toggle('hidden');
}

function openIdeaDetailModal(ideaId) {
    const idea = state.ideas.find(i => i.id === ideaId);
    if (!idea) return;

    state.activeIdea = idea;

    document.getElementById('detailIdeaCategory').textContent = idea.category;
    document.getElementById('detailIdeaTitle').textContent = idea.title;
    document.getElementById('detailIdeaAuthor').textContent = `מאת: ${idea.author} • ${idea.date} (סטטוס: ${idea.status})`;
    document.getElementById('detailIdeaContent').innerHTML = `
        <p style="font-weight: 800; margin-bottom: 10px; color: #111111;">${idea.summary}</p>
        <p>${idea.details || ''}</p>
    `;

    renderIdeaComments();

    const modal = document.getElementById('ideaDetailModal');
    if (modal) modal.classList.remove('hidden');
}

function renderIdeaComments() {
    const list = document.getElementById('ideaCommentsList');
    if (!list || !state.activeIdea) return;

    if (state.activeIdea.comments.length === 0) {
        list.innerHTML = `<div style="font-size: 0.85rem; color: #888888; font-weight: 700;">טרם נכתבו תגובות לרעיון זה. קדימה, כתוב את התגובה הראשונה!</div>`;
        return;
    }

    list.innerHTML = state.activeIdea.comments.map(c => `
        <div style="background-color: #f7f7f5; border: 1px solid #e5e5e0; padding: 10px 14px; border-radius: 12px; font-size: 0.86rem;">
            <strong style="color: #111111; display: block; margin-bottom: 2px;">${c.author}:</strong>
            <span style="color: #444444;">${c.text}</span>
        </div>
    `).join('');
}

function closeIdeaDetailModal() {
    const modal = document.getElementById('ideaDetailModal');
    if (modal) modal.classList.add('hidden');
}

function handleAddCommentSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('newCommentInput');
    const text = input.value.trim();
    if (!text || !state.activeIdea) return;

    state.activeIdea.comments.push({
        author: "אורח",
        text: text
    });

    input.value = '';
    renderIdeaComments();
    renderIdeas();
    showToast('התגובה שלך נוספה בהצלחה! 💬');
}

function openAddIdeaModal() {
    const modal = document.getElementById('addIdeaModal');
    if (modal) modal.classList.remove('hidden');
}

function closeAddIdeaModal() {
    const modal = document.getElementById('addIdeaModal');
    if (modal) modal.classList.add('hidden');
}

function handleAddIdeaSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('newIdeaTitle').value.trim();
    const author = document.getElementById('newIdeaAuthor').value.trim();
    const summary = document.getElementById('newIdeaSummary').value.trim();
    const category = document.getElementById('newIdeaCategory').value;

    const newIdea = {
        id: 'idea-' + Date.now(),
        title: title,
        category: category,
        author: author,
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
        date: "היום",
        status: "חדש",
        upvotes: 1,
        userVoted: true,
        summary: summary,
        details: summary,
        comments: []
    };

    state.ideas.unshift(newIdea);
    closeAddIdeaModal();
    renderIdeas();
    showToast(`ברכות ${author}! הרעיון "${title}" פורסם בהצלחה בלוח! 💡🎉`);
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

window.handleIdeaSearch = handleIdeaSearch;
window.filterIdeaCategory = filterIdeaCategory;
window.filterIdeaStatus = filterIdeaStatus;
window.togglePillDropdown = togglePillDropdown;
window.toggleUpvoteIdea = toggleUpvoteIdea;
window.openIdeaDetailModal = openIdeaDetailModal;
window.closeIdeaDetailModal = closeIdeaDetailModal;
window.handleAddCommentSubmit = handleAddCommentSubmit;
window.openAddIdeaModal = openAddIdeaModal;
window.closeAddIdeaModal = closeAddIdeaModal;
window.handleAddIdeaSubmit = handleAddIdeaSubmit;
