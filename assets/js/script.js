// ===== PROJECTS DATA =====
const projects = [
    {
        nom: "Maquette site de voyage",
        image: "./assets/img/WA.png",
        lien: "./Wanderly.html",
        description: "Maquette d'une agence de voyage fictive — destinations immersives & offres personnalisées.",
        tech: "figma"
    },
    {
        nom: "Maquette culture jeune",
        image: "./assets/img/CU.png",
        lien: "./Culture.html",
        description: "Plateforme culturelle destinée aux jeunes — événements, articles & ressources.",
        tech: "figma"
    },
    {
        nom: "Site Rainbow Photo",
        image: "./assets/img/RB.png",
        lien: "./Rainbow.html",
        description: "Collection de photographies colorées avec mise en page dynamique.",
        tech: "html"
    },
    {
        nom: "Modernisation Micromania",
        image: "./assets/img/MI.png",
        lien: "./Micromania.html",
        description: "Refonte UX/UI du site Micromania — nouvelle expérience pour les amateurs de jeux vidéo.",
        tech: "figma"
    },
    {
        nom: "Site Street-Food",
        image: "./assets/img/STF.png",
        lien: "./StreetFusion.html",
        description: "Fast-food du monde entier — menu interactif et commande en ligne.",
        tech: "javascript"
    }
];

// ===== RENDER PROJECTS =====
function renderProjects(list) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-card-img">
                <img src="${p.image}" alt="${p.nom}" loading="lazy">
            </div>
            <div class="project-card-content">
                <span class="project-tech">${p.tech}</span>
                <h3>${p.nom}</h3>
                <p>${p.description}</p>
                <div class="project-arrow">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            </div>
        `;
        card.addEventListener('click', () => window.location.href = p.lien);
        grid.appendChild(card);
    });
}

renderProjects(projects);

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        renderProjects(cat === 'all' ? projects : projects.filter(p => p.tech === cat));
    });
});

// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
        loader.style.display = 'none';
    } else {
        sessionStorage.setItem('hasVisited', 'true');
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.6s ease';
            setTimeout(() => loader.style.display = 'none', 600);
        }, 2200);
    }
});

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && window.innerWidth > 768) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });
    function animFollower() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        follower.style.left = fx + 'px';
        follower.style.top = fy + 'px';
        requestAnimationFrame(animFollower);
    }
    animFollower();
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '14px';
            cursor.style.height = '14px';
            follower.style.width = '50px';
            follower.style.height = '50px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            follower.style.width = '32px';
            follower.style.height = '32px';
        });
    });
}

// ===== SCROLL HEADER =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ===== MOBILE MENU =====
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (toggle) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button[type=submit]');
        btn.disabled = true;
        btn.textContent = 'Envoi en cours…';
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                status.style.color = '#4ade80';
                status.textContent = '✓ Message envoyé avec succès !';
                form.reset();
            } else {
                status.style.color = '#f87171';
                status.textContent = '✗ Erreur. Veuillez réessayer.';
            }
        } catch {
            status.style.color = '#f87171';
            status.textContent = '✗ Erreur de connexion.';
        } finally {
            btn.disabled = false;
            btn.textContent = 'Envoyer le message';
        }
    });
}
