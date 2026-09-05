const CARPOOL_RIDES_DATA = [
    {
        id: "ride-1",
        driverName: "אלירן מזרחי",
        driverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        vehicle: "טסלה מודל 3 (לבנה)",
        verified: true,
        rating: "4.95",
        tripsCount: 142,
        origin: "חיפה - מרכז",
        destination: "תל אביב - יפו",
        waypoints: ["מת\"ם חיפה", "מחלף עתלית", "מחלף נתניה", "סינמה סיטי גלילות"],
        departureTime: "07:30 בבוקר",
        schedule: "ימים א-ה",
        availableSeats: 3,
        pricePerSeat: "yhsh 35",
        phone: "054-1234567",
        notes: "יוצא בדיוק בזמן, רכב שקט וממוזג. מתאים לעובדי ההייטק במרכז."
    },
    {
        id: "ride-2",
        driverName: "שירה כהן",
        driverAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        vehicle: "יונדאי איוניק 5",
        verified: true,
        rating: "5.0",
        tripsCount: 89,
        origin: "ירושלים",
        destination: "הרצליה פיתוח",
        waypoints: ["מחלף הראל", "מחלף לטרון", "מחלף קסם", "מחלף הסירה"],
        departureTime: "07:15 בבוקר",
        schedule: "ימים א-ה",
        availableSeats: 2,
        pricePerSeat: "yhsh 40",
        phone: "052-9876543",
        notes: "נוסעת יום יום לאזור התעשייה בהרצליה. מקום מרווח למחשב נייד תיקים."
    },
    {
        id: "ride-3",
        driverName: "אלון בן דוד",
        driverAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        vehicle: "סובארו פורסטר",
        verified: false,
        rating: "4.8",
        tripsCount: 45,
        origin: "ראשון לציון",
        destination: "מת\"ם חיפה",
        waypoints: ["מחלף גנות", "מחלף גלילות", "נתניה צפון", "כניסה דרומית לחיפה"],
        departureTime: "06:45 בבוקר",
        schedule: "ימים א-ה",
        availableSeats: 4,
        pricePerSeat: "yhsh 45",
        phone: "050-5554433",
        notes: "נסיעה מהירה על כביש 6 וכביש 2. מקום רב לציוד או מזוודות."
    },
    {
        id: "ride-4",
        driverName: "תמר לוי",
        driverAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        vehicle: "קיה נירו חשמלית",
        verified: true,
        rating: "4.9",
        tripsCount: 110,
        origin: "רמת גן",
        destination: "באר שבע - פארק הייטק",
        waypoints: ["מחלף אלוף שדה", "מחלף דורות", "צומת קסטינה", "אוניברסיטת בן גוריון"],
        departureTime: "07:45 בבוקר",
        schedule: "ימים א-ה",
        availableSeats: 3,
        pricePerSeat: "yhsh 50",
        phone: "053-1112233",
        notes: "נוסעת לפארק גב ים בבאר שבע. נסיעה נינוחה ונעימה עם מוזיקה טובה."
    },
    {
        id: "ride-5",
        driverName: "דניאל ארד",
        driverAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
        vehicle: "סקודה קודיאק",
        verified: true,
        rating: "4.85",
        tripsCount: 67,
        origin: "תל אביב - יפו",
        destination: "אילת",
        waypoints: ["מחלף אשדוד", "באר שבע", "דימונה", "מצפה רמון"],
        departureTime: "06:00 בבוקר",
        schedule: "חד פעמי",
        availableSeats: 3,
        pricePerSeat: "yhsh 90",
        phone: "054-7778899",
        notes: "נסיעת סופ\"ש לאילת, עוצר להתרעננות בדרך. מקום למזווודות גדולות."
    },
    {
        id: "ride-6",
        driverName: "מיכאל רוזן",
        driverAvatar: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80",
        vehicle: "מאזדה CX-5",
        verified: true,
        rating: "4.92",
        tripsCount: 98,
        origin: "נתניה",
        destination: "תל אביב - עזריאלי",
        waypoints: ["מחלף פולג", "מחלף שפיים", "מחלף הסירה", "מחנה גלילות"],
        departureTime: "08:00 בבוקר",
        schedule: "ימים א-ה",
        availableSeats: 2,
        pricePerSeat: "yhsh 25",
        phone: "050-9998877",
        notes: "נסיעה קבועה מדי בוקר דרך נתיב פלוס. מגיע ישר לאזור עזריאלי / רכבת השלום."
    }
];

let state = {
    rides: CARPOOL_RIDES_DATA,
    originQuery: '',
    destQuery: '',
    selectedSchedule: 'all',
    activeRide: null
};

document.addEventListener('DOMContentLoaded', () => {
    renderRides();
});

function renderRides() {
    const container = document.getElementById('ridesGridContainer');
    const countText = document.getElementById('ridesResultsCount');
    if (!container) return;

    let filtered = [...state.rides];

    if (state.originQuery) {
        const q = state.originQuery.trim().toLowerCase();
        filtered = filtered.filter(r => 
            r.origin.toLowerCase().includes(q) || 
            r.waypoints.some(w => w.toLowerCase().includes(q))
        );
    }

    if (state.destQuery) {
        const q = state.destQuery.trim().toLowerCase();
        filtered = filtered.filter(r => 
            r.destination.toLowerCase().includes(q) || 
            r.waypoints.some(w => w.toLowerCase().includes(q))
        );
    }

    if (state.selectedSchedule !== 'all') {
        filtered = filtered.filter(r => r.schedule.includes(state.selectedSchedule));
    }

    if (countText) {
        countText.textContent = `${filtered.length} נסיעות שיתופיות נמצאו`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-weight: 800;">לא נמצאו נסיעות שיתופיות במסלול המבוקש. לחץ על "הצע נסיעה שיתופית +" כדי לפרסם ראשון!</div>`;
        return;
    }

    container.innerHTML = filtered.map(ride => `
        <div class="article-card-box" style="padding: 0; overflow: hidden;">
            
            <!-- Route Header Banner -->
            <div style="background-color: #111111; color: #ffffff; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
                <div style="font-weight: 900; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-route" style="color: #ff5000;"></i>
                    <span>${ride.origin} ➔ ${ride.destination}</span>
                </div>
                <span style="background-color: rgba(255,255,255,0.15); padding: 3px 10px; border-radius: 12px; font-size: 0.78rem; font-weight: 800;">
                    ${ride.schedule}
                </span>
            </div>

            <div style="padding: 18px; display: flex; flex-direction: column; gap: 14px; flex-grow: 1;">
                
                <!-- Driver Info Row -->
                <div style="display: flex; gap: 12px; align-items: center;">
                    <img src="${ride.driverAvatar}" alt="${ride.driverName}" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e5e0;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <h3 style="font-size: 1.05rem; font-weight: 900; color: #111111; margin: 0;">${ride.driverName}</h3>
                            ${ride.verified ? '<i class="fa-solid fa-circle-check" style="color: #2563eb; font-size: 0.85rem;" title="נהג מאומת"></i>' : ''}
                        </div>
                        <div style="font-size: 0.82rem; color: #666666; font-weight: 700;">${ride.vehicle}</div>
                        <div style="font-size: 0.78rem; color: #f59e0b; font-weight: 800; margin-top: 2px;">
                            ⭐ ${ride.rating} (${ride.tripsCount} נסיעות)
                        </div>
                    </div>
                </div>

                <!-- Departure Time & Seats -->
                <div style="display: flex; justify-content: space-between; background-color: #f7f7f5; padding: 10px 14px; border-radius: 12px; font-size: 0.86rem; font-weight: 800; color: #111111;">
                    <span>⏰ יציאה: <strong>${ride.departureTime}</strong></span>
                    <span style="color: #16a34a;">💺 ${ride.availableSeats} מקומות פנויים</span>
                </div>

                <!-- Waypoints / Intermediate Stops Tags -->
                <div>
                    <div style="font-size: 0.8rem; font-weight: 800; color: #888888; margin-bottom: 6px;">נקודות איסוף בדרך:</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${ride.waypoints.map(wp => `<span style="background-color: #ffffff; border: 1px solid #e5e5e0; padding: 3px 10px; border-radius: 14px; font-size: 0.78rem; font-weight: 700; color: #333333;">📍 ${wp}</span>`).join('')}
                    </div>
                </div>

                <p style="font-size: 0.84rem; color: #555555; line-height: 1.4; margin-top: 4px;">
                    "${ride.notes}"
                </p>

                <!-- Footer Action Bar -->
                <div style="margin-top: auto; border-top: 1px solid #e5e5e0; padding-top: 12px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="font-size: 1.1rem; font-weight: 900; color: #111111;">
                        ${ride.pricePerSeat} <span style="font-size: 0.78rem; font-weight: 700; color: #888888;">/ נוסע</span>
                    </div>

                    <button class="btn-card-action-pill" style="width: auto; padding: 6px 14px; font-size: 0.78rem;" onclick="openJoinRideModal('${ride.id}')">
                        הצטרף לנסיעה
                    </button>
                </div>

            </div>
        </div>
    `).join('');
}

function handleRideSearch() {
    state.originQuery = document.getElementById('originSearchInput').value;
    state.destQuery = document.getElementById('destSearchInput').value;
    renderRides();
}

function filterRideSchedule(scheduleVal, labelText) {
    state.selectedSchedule = scheduleVal;
    const label = document.getElementById('labelScheduleMenu');
    if (label) label.textContent = labelText;
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => m.classList.add('hidden'));
    renderRides();
}

function togglePillDropdown(menuId, event) {
    if (event) event.stopPropagation();
    document.querySelectorAll('.filter-pill-dropdown-menu').forEach(m => {
        if (m.id !== menuId) m.classList.add('hidden');
    });
    const menu = document.getElementById(menuId);
    if (menu) menu.classList.toggle('hidden');
}

function openJoinRideModal(rideId) {
    const ride = state.rides.find(r => r.id === rideId);
    if (!ride) return;

    state.activeRide = ride;
    const title = document.getElementById('joinRideTitle');
    const sub = document.getElementById('joinRideSub');

    if (title) title.textContent = `בקשת הצטרפות לנסיעה עם ${ride.driverName}`;
    if (sub) sub.textContent = `מסלול: ${ride.origin} ➔ ${ride.destination} (${ride.departureTime} | ${ride.pricePerSeat})`;

    const modal = document.getElementById('joinRideModal');
    if (modal) modal.classList.remove('hidden');
}

function closeJoinRideModal() {
    const modal = document.getElementById('joinRideModal');
    if (modal) modal.classList.add('hidden');
}

function handleJoinRideSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('passengerName').value.trim();
    const pickup = document.getElementById('passengerPickup').value.trim();

    closeJoinRideModal();
    showToast(`תודה ${name}! בקשת ההצטרפות לאיסוף ב-${pickup} נשלחה לנהג! 🚗🎉`);
}

function openAddRideModal() {
    const modal = document.getElementById('addRideModal');
    if (modal) modal.classList.remove('hidden');
}

function closeAddRideModal() {
    const modal = document.getElementById('addRideModal');
    if (modal) modal.classList.add('hidden');
}

function handleAddRideSubmit(event) {
    event.preventDefault();
    const origin = document.getElementById('newRideOrigin').value.trim();
    const dest = document.getElementById('newRideDest').value.trim();
    const driverName = document.getElementById('newDriverName').value.trim();
    const waypointsRaw = document.getElementById('newRideWaypoints').value.trim();

    const newRide = {
        id: 'ride-' + Date.now(),
        driverName: driverName,
        driverAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
        vehicle: document.getElementById('newVehicleNotes').value.trim() || "רכב פרטי",
        verified: true,
        rating: "5.0",
        tripsCount: 1,
        origin: origin,
        destination: dest,
        waypoints: waypointsRaw ? waypointsRaw.split(',').map(s => s.trim()) : [origin, dest],
        departureTime: document.getElementById('newRideTime').value.trim(),
        schedule: document.getElementById('newRideSchedule').value,
        availableSeats: parseInt(document.getElementById('newRideSeats').value, 10) || 3,
        pricePerSeat: document.getElementById('newRidePrice').value.trim(),
        phone: document.getElementById('newDriverPhone').value.trim(),
        notes: "נסיעה חדשה שפורסמה בלוח הנסיעות השיתופיות."
    };

    state.rides.unshift(newRide);
    closeAddRideModal();
    renderRides();
    showToast(`ברכות ${driverName}! מסלול הנסיעה ${origin} ➔ ${dest} פורסם בהצלחה! 🚗`);
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

window.handleRideSearch = handleRideSearch;
window.filterRideSchedule = filterRideSchedule;
window.togglePillDropdown = togglePillDropdown;
window.openJoinRideModal = openJoinRideModal;
window.closeJoinRideModal = closeJoinRideModal;
window.handleJoinRideSubmit = handleJoinRideSubmit;
window.openAddRideModal = openAddRideModal;
window.closeAddRideModal = closeAddRideModal;
window.handleAddRideSubmit = handleAddRideSubmit;
