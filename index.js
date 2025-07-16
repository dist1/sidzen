// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link with proper home handling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Set home as active on page load
window.addEventListener('load', () => {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
});

// Replace the existing scroll event listener for active navigation
window.addEventListener('scroll', () => {
    let current = '';
    
    // Check if we're at the top of the page
    if (window.scrollY < 100) {
        current = 'home';
    } else {
        // Check if we're near the bottom of the page
        const isNearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
        
        if (isNearBottom) {
            // If near bottom, set to the last section (contact)
            current = 'contact';
        } else {
            // Normal section detection
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                // Special handling for contact section (last section)
                if (section.getAttribute('id') === 'contact') {
                    if (window.scrollY >= sectionTop - 300) {
                        current = 'contact';
                    }
                } else {
                    // Regular sections
                    if (window.scrollY >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                }
            });
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic typing effect for hero title
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const originalText = heroTitle.dataset.text || 'Siddharth Jha';
        heroTitle.textContent = ''; // clear any accidental pre-rendered text
        heroTitle.style.visibility = 'visible'; // now allow it to show
        typeWriter(heroTitle, originalText, 100);
    }
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (for future enhancement)
const mobileMenuToggle = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
};

// Lazy loading for better performance
const lazyElements = document.querySelectorAll('.lazy');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyObserver.unobserve(entry.target);
        }
    });
});

lazyElements.forEach(el => lazyObserver.observe(el));

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(el);
});

// Add intro pop-up animation to skill tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'skillIntro 0.6s ease-out forwards';
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8) translateY(20px)';
});

// Enhanced scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #6366f1);
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add stagger animation to cards
const animateCards = () => {
    document.querySelectorAll('.project-card, .cert-card, .achievement-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
};

animateCards();

// Smooth fade hero section on scroll
// Enhanced version with visibility control
// Fade hero section on scroll
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    const scrollY = window.scrollY;
    
    // Calculate opacity based on scroll position
    const opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.8)));
    
    // Apply fade effect
    hero.style.opacity = opacity;
    
    // Optional: Add slight transform for more dynamic effect
    hero.style.transform = `translateY(${scrollY * 0.3}px)`;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Special handling for home button - scroll to top
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        // Regular scrolling for other sections
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});