// Dark / Light Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        toggleBtn.textContent = '☀️ Light Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleBtn.textContent = '🌙 Dark Mode';
    }
});

// Mobile Burger Menü Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Menü automatisch schließen, wenn ein Link geklickt wird
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
