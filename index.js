/* =========================================================
   SIDDHARTH JHA — PORTFOLIO
   Interaction layer
========================================================= */

document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

/* ---------------------------------------------------------
   Smooth scroll for in-page links (closes mobile menu too)
--------------------------------------------------------- */
function smoothScrollTo(targetId) {
    if (targetId === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        smoothScrollTo(targetId);
        closeMobileMenu();
    });
});

/* ---------------------------------------------------------
   Mobile menu toggle
--------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}
if (navToggle) {
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });
}

/* ---------------------------------------------------------
   Navbar scrolled state
--------------------------------------------------------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar && navbar.classList.add('scrolled');
    else navbar && navbar.classList.remove('scrolled');
}, { passive: true });

/* ---------------------------------------------------------
   Scroll progress bar
--------------------------------------------------------- */
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ---------------------------------------------------------
   Active nav link on scroll (desktop + mobile)
--------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function setActiveLink() {
    let current = 'home';
    const scrollY = window.scrollY;

    if (scrollY < 120) {
        current = 'home';
    } else if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80) {
        current = 'contact';
    } else {
        sections.forEach(section => {
            const top = section.offsetTop - 220;
            if (scrollY >= top) current = section.getAttribute('id');
        });
    }

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);

/* ---------------------------------------------------------
   Back to top button
--------------------------------------------------------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------
   Intersection Observer — fade-in reveal
--------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

/* ---------------------------------------------------------
   Featured project reveal (kept for the larger cards)
--------------------------------------------------------- */
const featuredProjects = document.querySelectorAll('.featured-project');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('project-visible');
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
featuredProjects.forEach(project => projectObserver.observe(project));

/* ---------------------------------------------------------
   Hero title type-on effect
--------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const text = heroTitle.dataset.text || 'Siddharth Jha';
        heroTitle.textContent = '';
        heroTitle.style.visibility = 'visible';
        let i = 0;
        (function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 70);
            }
        })();
    }
});

/* ---------------------------------------------------------
   Animated counters (stats strip)
--------------------------------------------------------- */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const isDecimal = String(el.dataset.count).includes('.');
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---------------------------------------------------------
   Cursor glow (desktop only)
--------------------------------------------------------- */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });

    function animateGlow() {
        curX += (mouseX - curX) * 0.12;
        curY += (mouseY - curY) * 0.12;
        cursorGlow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

/* ---------------------------------------------------------
   Magnetic buttons (desktop only)
--------------------------------------------------------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
}

/* ---------------------------------------------------------
   Subtle tilt on featured project cards (desktop only)
--------------------------------------------------------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    featuredProjects.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1000) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 3;
            const rotateX = (0.5 - y / rect.height) * 3;
            card.style.transform = `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

/* ---------------------------------------------------------
   Lazy-load images (future-proofing, if any are added)
--------------------------------------------------------- */
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
});

/* ---------------------------------------------------------
   Close mobile menu on resize to desktop
--------------------------------------------------------- */
window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) closeMobileMenu();
});

/* ---------------------------------------------------------
   Escape key closes mobile menu
--------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
});
