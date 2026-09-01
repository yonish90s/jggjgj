const IMAGES_DATA = [
    {
        id: "img-1",
        title: "מהפכת ה-AI והעולם הדיגיטלי",
        category: "טכנולוגיה",
        photographer: "צילום: Unsplash / Tech Art",
        likes: "420",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-2",
        title: "ארכיטקטורה מודרנית בלב העיר",
        category: "ארכיטקטורה",
        photographer: "צילום: מרינה שפירא",
        likes: "310",
        url: "https://images.unsplash.com/photo-1518005068251-37900150df60?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-3",
        title: "כוכבים וגלקסיות בחלל העמוק",
        category: "חלל",
        photographer: "צילום: NASA / James Webb",
        likes: "890",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-4",
        title: "אורח חיים בריא ותזונה צבעונית",
        category: "לייפסטייל",
        photographer: "צילום: דניאל כהן",
        likes: "250",
        url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-5",
        title: "סביבת עבודה טכנולוגית חכמה",
        category: "טכנולוגיה",
        photographer: "צילום: אלון שחר",
        likes: "540",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-6",
        title: "אמנות דיגיטלית וציור תלת-ממדי",
        category: "ארכיטקטורה",
        photographer: "צילום: עדי שפירא",
        likes: "670",
        url: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-7",
        title: "אבטחת מידע ורשתות תקשורת",
        category: "טכנולוגיה",
        photographer: "צילום: יובל גולן",
        likes: "480",
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-8",
        title: "מעבדים קוונטיים מתקדמים",
        category: "חלל",
        photographer: "צילום: Quantum Lab",
        likes: "730",
        url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-9",
        title: "מנועי גיימינג וסימולציות מציאותיות",
        category: "טכנולוגיה",
        photographer: "צילום: Gamer Zone",
        likes: "910",
        url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-10",
        title: "בישול מודרני מבוסס חומרי גלם",
        category: "לייפסטייל",
        photographer: "צילום: שף רועי כהן",
        likes: "390",
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-11",
        title: "מחקר רפואי וטיפול מותאם אישית",
        category: "חלל",
        photographer: "צילום: Bio Med",
        likes: "620",
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: "img-12",
        title: "אימון כושר וספורט במרחב הפתוח",
        category: "לייפסטייל",
        photographer: "צילום: גיא מזרחי",
        likes: "510",
        url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
    }
];

let currentImages = IMAGES_DATA;

function renderImagesGrid(imagesList) {
    const container = document.getElementById('imagesGalleryGrid');
    if (!container) return;

    container.innerHTML = imagesList.map(img => `
        <div class="gallery-image-card" onclick="openLightboxModal('${img.id}')">
            <div class="gallery-image-wrapper">
                <img src="${img.url}" alt="${img.title}" loading="lazy">
                <span class="gallery-image-tag">${img.category}</span>
            </div>
            
            <div class="gallery-card-body">
                <h3 class="gallery-card-title">${img.title}</h3>
                <span class="gallery-card-photographer">${img.photographer}</span>
                
                <div class="gallery-card-actions">
                    <span style="color: #ec4899; font-weight: 800;"><i class="fa-solid fa-heart"></i> ${img.likes}</span>
                    <button class="btn-download-img">צפה בתמונה</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterGallery(category, btnElem) {
    document.querySelectorAll('.gallery-pill-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElem) btnElem.classList.add('active');

    if (category === 'all') {
        currentImages = IMAGES_DATA;
    } else {
        currentImages = IMAGES_DATA.filter(img => img.category === category);
    }
    renderImagesGrid(currentImages);
}

function openLightboxModal(imageId) {
    const item = IMAGES_DATA.find(i => i.id === imageId);
    if (!item) return;

    const modal = document.getElementById('imageLightboxModal');
    const img = document.getElementById('lightboxImage');
    const title = document.getElementById('lightboxTitle');
    const photographer = document.getElementById('lightboxPhotographer');
    const downloadBtn = document.getElementById('lightboxDownloadBtn');

    if (img) img.src = item.url;
    if (title) title.textContent = item.title;
    if (photographer) photographer.textContent = item.photographer;
    if (downloadBtn) downloadBtn.href = item.url;

    if (modal) modal.classList.remove('hidden');
}

function closeLightboxModal() {
    const modal = document.getElementById('imageLightboxModal');
    if (modal) modal.classList.add('hidden');
}

function showGuestToast() {
    showToast('שלום אורח! תהנה מצפייה בגלריית התמונות 🖼️');
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

window.filterGallery = filterGallery;
window.openLightboxModal = openLightboxModal;
window.closeLightboxModal = closeLightboxModal;
window.showGuestToast = showGuestToast;
window.showToast = showToast;

document.addEventListener('DOMContentLoaded', () => {
    renderImagesGrid(IMAGES_DATA);
});
