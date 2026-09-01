// Fresh App Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggle');
    let darkMode = localStorage.getItem('news_theme') === 'dark';

    if (darkMode) {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            darkMode = !darkMode;
            document.body.classList.toggle('dark-theme', darkMode);
            localStorage.setItem('news_theme', darkMode ? 'dark' : 'light');
            themeBtn.innerHTML = darkMode ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }
});
