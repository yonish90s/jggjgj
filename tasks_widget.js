/* =========================================================
   IOS STYLE WEBSITE TASKS & PROGRESS WIDGET
   Manages circular SVG progress rings, task checklist modal, and localStorage.
   ========================================================= */

const DEFAULT_TASKS_DATA = {
    ads: [
        { id: "task_ad_1", title: "פרסם מודעה ראשונה בלוח (מוצרים/טכנולוגיה)", done: true },
        { id: "task_ad_2", title: "הגדר סוג עסקה (השאלה / קניה / החלפה)", done: true },
        { id: "task_ad_3", title: "הוסף תמונת מוצר ברורה", done: true },
        { id: "task_ad_4", title: "הגדר מיקום ומצב מוצר", done: false }
    ],
    offers: [
        { id: "task_offer_1", title: "הגש הצעת מחיר לרכישה למודעה", done: true },
        { id: "task_offer_2", title: "הגש הצעה להשאלת ציוד", done: false }
    ],
    carpool: [
        { id: "task_carpool_1", title: "חפש נסיעה שיתופית במסלול קבוע", done: true },
        { id: "task_carpool_2", title: "בקש הצטרפות לאיסוף בדרך", done: true }
    ],
    ideas: [
        { id: "task_idea_1", title: "שתף רעיון חדש בלוח הרעיונות", done: true },
        { id: "task_idea_2", title: "הצבע (Upvote) לרעיון של משתמש אחר", done: false },
        { id: "task_idea_3", title: "הוסף פידבק או תגובה לרעיון", done: false },
        { id: "task_idea_4", title: "הוסף קונספט לעסק ומודל הכנסות", done: false },
        { id: "task_idea_5", title: "צור קשר עם מציע המיזם", done: false }
    ]
};

let tasksState = loadTasksState();

function loadTasksState() {
    try {
        const saved = localStorage.getItem('antigravity_tasks_state_v1');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error loading tasks state", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_TASKS_DATA));
}

function saveTasksState() {
    try {
        localStorage.setItem('antigravity_tasks_state_v1', JSON.stringify(tasksState));
    } catch (e) {
        console.error("Error saving tasks state", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateAllRings();
    injectTasksModalIfNeeded();
});

function updateAllRings() {
    updateSingleRing('ads', 'ringCircleAds', 'ringPercentAds');
    updateSingleRing('offers', 'ringCircleOffers', 'ringPercentOffers');
    updateSingleRing('carpool', 'ringCircleCarpool', 'ringPercentCarpool');
    updateSingleRing('ideas', 'ringCircleIdeas', 'ringPercentIdeas');
    updateOverallTotal();
}

function updateSingleRing(catKey, circleId, textId) {
    const list = tasksState[catKey] || [];
    const doneCount = list.filter(t => t.done).length;
    const totalCount = list.length;
    const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const circle = document.getElementById(circleId);
    const textElem = document.getElementById(textId);

    if (textElem) {
        textElem.textContent = `${percent}%`;
    }

    if (circle) {
        const circumference = 150.796; // 2 * PI * 24
        const offset = circumference * (1 - percent / 100);
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
    }
}

function updateOverallTotal() {
    let allDone = 0;
    let allTotal = 0;

    Object.keys(tasksState).forEach(k => {
        allDone += tasksState[k].filter(t => t.done).length;
        allTotal += tasksState[k].length;
    });

    const overallPercent = allTotal > 0 ? Math.round((allDone / allTotal) * 100) : 0;
    const badge = document.getElementById('overallProgressText');
    if (badge) {
        badge.textContent = `${overallPercent}% הושלם`;
    }
}

function openTaskChecklistModal(catKey) {
    const modal = document.getElementById('tasksChecklistModal');
    const titleElem = document.getElementById('tasksModalTitle');
    const listElem = document.getElementById('tasksModalList');

    if (!modal || !listElem) return;

    const titlesMap = {
        ads: "📦 משימות פרסום מודעות וסיפורים",
        offers: "🤝 משימות הגשת הצעות מחיר",
        carpool: "🚘 משימות נסיעות שיתופיות",
        ideas: "💡 משימות רעיונות ומיזמים עסקיים"
    };

    if (titleElem) {
        titleElem.textContent = titlesMap[catKey] || "משימות האתר";
    }

    const tasks = tasksState[catKey] || [];
    listElem.innerHTML = tasks.map(t => `
        <label class="task-chk-item">
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTaskDone('${catKey}', '${t.id}', this.checked)">
            <span style="font-weight: 700; ${t.done ? 'text-decoration: line-through; opacity: 0.7;' : ''}">${t.title}</span>
        </label>
    `).join('');

    modal.classList.remove('hidden');
}

function closeTasksChecklistModal() {
    const modal = document.getElementById('tasksChecklistModal');
    if (modal) modal.classList.add('hidden');
}

function toggleTaskDone(catKey, taskId, isChecked) {
    const task = (tasksState[catKey] || []).find(t => t.id === taskId);
    if (task) {
        task.done = isChecked;
        saveTasksState();
        updateAllRings();
        openTaskChecklistModal(catKey); // Refresh modal view
    }
}

function injectTasksModalIfNeeded() {
    if (document.getElementById('tasksChecklistModal')) return;

    const modalHTML = `
        <div id="tasksChecklistModal" class="modal-overlay hidden">
            <div class="publish-modal-box" style="max-width: 500px; background-color: #1c1c1e; color: #ffffff; border: 1px solid #2c2c2e;">
                <button class="close-modal-btn" style="background: #2c2c2e; color: #ffffff;" onclick="closeTasksChecklistModal()">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="publish-modal-header">
                    <h2 id="tasksModalTitle" class="publish-modal-title" style="color: #ffffff;">🎯 משימות האתר</h2>
                    <p class="publish-modal-subtitle" style="color: #98989d;">סמן משימות שהושלמו לעדכון טבעות ההתקדמות</p>
                </div>

                <div id="tasksModalList" style="display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
                    <!-- Tasks rendered dynamically -->
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

window.openTaskChecklistModal = openTaskChecklistModal;
window.closeTasksChecklistModal = closeTasksChecklistModal;
window.toggleTaskDone = toggleTaskDone;
