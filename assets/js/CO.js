// Theme sync with index page
const projectStylesheet = document.getElementById('project-stylesheet')
    || document.getElementById('culture-stylesheet')
    || document.querySelector('link[rel="stylesheet"][href*="cutlure.css"]');
const savedTheme = localStorage.getItem('portfolioTheme');
if (projectStylesheet && savedTheme === 'light') {
    projectStylesheet.setAttribute('href', './assets/css/culture2.css');
}

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) {
    toggle.addEventListener('click', () => nav.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => nav.classList.remove('active')));
}
