// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) {
    toggle.addEventListener('click', () => nav.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => nav.classList.remove('active')));
}
