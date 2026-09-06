/* ============================================================
   Hebrew Cookie Consent Banner (מודעת עוגיות בעברית)
   1:1 Matching design from media_1788704928505.png
   ============================================================ */

(function () {
    // Check if user has already made a cookie choice
    var consent = localStorage.getItem('cookie_consent');
    if (consent) return; // Already accepted/declined/dismissed

    document.addEventListener('DOMContentLoaded', function () {
        initCookieBanner();
    });

    // Fallback if DOMContentLoaded already fired
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        initCookieBanner();
    }

    function initCookieBanner() {
        if (document.getElementById('cookieConsentBanner')) return;

        var container = document.createElement('div');
        container.id = 'cookieConsentBanner';
        container.className = 'cookie-consent-wrapper';
        container.innerHTML = `
            <div class="cookie-banner-box">
                <button class="cookie-banner-close" onclick="closeCookieConsent('dismiss')" title="סגור">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <h3 class="cookie-banner-title">אתר זה משתמש בעוגיות (Cookies)</h3>
                <p class="cookie-banner-desc">
                    אתר זה משתמש בעוגיות כדי לשפר את חווית המשתמש. המידע האישי והעוגיות שלך עשויים לשמש להתאמה אישית של מודעות. בשימוש באתר זה הנך מסכים/ה לכל העוגיות בהתאם למדיניות העוגיות שלנו. 
                    <a href="#" class="cookie-read-more" onclick="toggleCookieDetails(event)">קרא עוד</a>
                </p>

                <!-- Expandable details box -->
                <div id="cookieDetailsBox" class="cookie-details-box hidden">
                    <div class="cookie-category-item">
                        <label class="cookie-category-label">
                            <input type="checkbox" checked disabled>
                            <span><strong>עוגיות הכרחיות (Necessary):</strong> נדרשות לתפעול תקין של האתר, אבטחה ושמירת העדפות.</span>
                        </label>
                    </div>
                    <div class="cookie-category-item">
                        <label class="cookie-category-label">
                            <input type="checkbox" checked id="chkAnalyticsCookie">
                            <span><strong>עוגיות ניתוח וביצועים (Analytics):</strong> עוזרות לנו להבין כיצד גולשים משתמשים באתר ולשפר אותו.</span>
                        </label>
                    </div>
                    <div class="cookie-category-item">
                        <label class="cookie-category-label">
                            <input type="checkbox" checked id="chkMarketingCookie">
                            <span><strong>עוגיות שיווק ופרסום (Marketing):</strong> משמשות להצגת מודעות ותכנים המותאמים אישית עבורך.</span>
                        </label>
                    </div>
                </div>

                <div class="cookie-banner-actions">
                    <button class="cookie-btn-accept" onclick="closeCookieConsent('accepted')">אישור הכל</button>
                    <button class="cookie-btn-decline" onclick="closeCookieConsent('declined')">דחה הכל</button>
                </div>

                <div class="cookie-banner-footer" onclick="toggleCookieDetails(event)">
                    <i class="fa-solid fa-gear"></i>
                    <span id="cookieDetailsToggleText">הצג פרטים</span>
                </div>
            </div>
        `;

        document.body.appendChild(container);
    }
})();

function closeCookieConsent(action) {
    localStorage.setItem('cookie_consent', action);
    var banner = document.getElementById('cookieConsentBanner');
    if (banner) {
        banner.classList.add('hide-banner');
        setTimeout(function () {
            banner.remove();
        }, 350);
    }
}

function toggleCookieDetails(e) {
    if (e) e.preventDefault();
    var details = document.getElementById('cookieDetailsBox');
    var textSpan = document.getElementById('cookieDetailsToggleText');
    if (!details) return;

    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        if (textSpan) textSpan.innerText = 'הסתר פרטים';
    } else {
        details.classList.add('hidden');
        if (textSpan) textSpan.innerText = 'הצג פרטים';
    }
}

function resetCookieConsent() {
    localStorage.removeItem('cookie_consent');
    location.reload();
}
