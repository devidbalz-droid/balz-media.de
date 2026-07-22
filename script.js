const themeToggle = document.getElementById('theme-toggle');

window.onload = function() {
    window.scrollTo(0, 0);
};

let currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
    currentTheme = 'dark';
    localStorage.setItem('theme', 'dark');
}

document.documentElement.setAttribute('data-theme', currentTheme);
updateButtonText(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText(newTheme);
});

function updateButtonText(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}
