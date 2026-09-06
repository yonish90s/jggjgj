/* ============================================================
   YouTube-style Slide Drawer — shared across all pages
   תפריט צד נשלף בסגנון יוטיוב, משותף לכל הדפים
   ============================================================ */
function openYtDrawer() {
    var d = document.getElementById('ytDrawer');
    var o = document.getElementById('ytDrawerOverlay');
    if (d) d.classList.add('open');
    if (o) o.classList.add('open');
    document.body.classList.add('yt-drawer-open');
}

function closeYtDrawer() {
    var d = document.getElementById('ytDrawer');
    var o = document.getElementById('ytDrawerOverlay');
    if (d) d.classList.remove('open');
    if (o) o.classList.remove('open');
    document.body.classList.remove('yt-drawer-open');
}

/* Publish action — uses the page's own modal if present, otherwise sends to home */
function ytDrawerPublish() {
    closeYtDrawer();
    if (typeof openPublishModal === 'function') {
        openPublishModal();
    } else {
        window.location.href = 'index.html';
    }
}

/* Guest / sign-in action — same graceful fallback */
function ytDrawerGuest() {
    closeYtDrawer();
    if (typeof showGuestToast === 'function') {
        showGuestToast();
    } else {
        window.location.href = 'index.html';
    }
}

/* Close on Escape */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeYtDrawer();
});

/* Highlight the item matching the current page */
document.addEventListener('DOMContentLoaded', function () {
    var page = (window.location.pathname.split('/').pop() || 'index.html');
    if (page === '') page = 'index.html';
    var items = document.querySelectorAll('#ytDrawer .yt-drawer-item[href]');
    for (var i = 0; i < items.length; i++) {
        var href = items[i].getAttribute('href');
        if (href === page) items[i].classList.add('active');
    }
});
