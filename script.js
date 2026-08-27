// Efeito de Digitação no Hero
const typingElement = document.getElementById('typing-text');
const words = ['Sofisticados', 'Premium', 'Exigentes'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// Atualizar ano dinamicamente no footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileMenuIcon = document.querySelector('.mobile-menu-btn i');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.classList.replace('ph-list', 'ph-x');
    } else {
        mobileMenuIcon.classList.replace('ph-x', 'ph-list');
    }
});

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuIcon.classList.replace('ph-x', 'ph-list');
        }
    });
});

// Active Link highlighting during scroll
const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);
        if (link && !link.classList.contains('btn')) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// Form handling e redirecionamento WhatsApp personalizado
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const servico = document.getElementById('servico').options[document.getElementById('servico').selectedIndex].text;
        const mensagem = document.getElementById('mensagem').value;

        let textoWa = `Olá, Vizzione Glass! Meu nome é *${nome}*.\n\n`;
        textoWa += `Gostaria de um orçamento para: *${servico}*.\n`;

        if (mensagem) {
            textoWa += `\nDetalhes do projeto: ${mensagem}`;
        }

        const numeroWhatsApp = '5511941154343';
        const urlWa = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`;

        window.open(urlWa, '_blank');
    });
}

// ==========================================
// Custom Cursor
// ==========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    let hasMoved = false;

    const moveCursor = (e) => {
        if (!hasMoved) {
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
            hasMoved = true;
        }

        let posX, posY;

        if (e.type === 'touchmove') {
            posX = e.touches[0].clientX;
            posY = e.touches[0].clientY;
        } else {
            posX = e.clientX;
            posY = e.clientY;
        }

        cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('touchmove', moveCursor, { passive: true });
}

// ==========================================
// Scroll Reveal Animations
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================
    // Animated SVG Borders
    // ==========================================
    const animatedCards = document.querySelectorAll('.card-container');
    
    animatedCards.forEach(card => {
        const rect = card.querySelector('.borderRect');
        if (!rect) return;

        // Give a tiny delay to ensure SVG is rendered and has size
        setTimeout(() => {
            const perimeter = rect.getTotalLength();
            
            rect.style.strokeDasharray = perimeter;
            rect.style.strokeDashoffset = perimeter;

            const startAnimation = () => {
                rect.style.strokeDashoffset = 0;
            };

            const stopAnimation = () => {
                rect.style.strokeDashoffset = perimeter;
            };

            card.addEventListener('mouseenter', startAnimation);
            card.addEventListener('mouseleave', stopAnimation);

            card.addEventListener('touchstart', startAnimation, { passive: true });
            card.addEventListener('touchend', stopAnimation);
        }, 100);
    });
});

// ==========================================
// Hero Technical Animation Global Functions
// ==========================================
window.resetHeroAnimateClasses = function() {
    const lines = document.querySelectorAll('.tech-workspace-hero .path-line');
    const fades = document.querySelectorAll('.tech-workspace-hero .fade-element');

    lines.forEach(el => {
        el.classList.remove('animate-draw');
        el.classList.remove('animate-draw-slow');
        void el.offsetWidth;
    });

    fades.forEach(el => {
        el.classList.remove('animate-fade');
        void el.offsetWidth;
    });
};

window.iniciarHeroAnimacao = function() {
    window.resetHeroAnimateClasses();
    
    // --- ETAPA 1: Marco Externo ---
    document.querySelectorAll('.tech-workspace-hero .step-1').forEach(el => el.classList.add('animate-draw'));

    // --- ETAPA 2: Trilhos (Delay 1.5s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-2').forEach(el => el.classList.add('animate-draw'));
    }, 1500);

    // --- ETAPA 3: Folhas da Janela (Delay 3s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-3').forEach(el => el.classList.add('animate-draw-slow'));
    }, 3000);

    // --- ETAPA 4: Vidraçaria (Delay 5.5s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-4').forEach(el => el.classList.add('animate-fade'));
    }, 5500);

    // --- ETAPA 5: Detalhamento Técnico (Delay 7.5s) ---
    setTimeout(() => {
        document.querySelectorAll('.tech-workspace-hero .step-5').forEach(el => {
            if (el.tagName.toLowerCase() === 'g') {
                el.classList.add('animate-fade');
            }
            const innerLines = el.querySelectorAll('.path-line');
            innerLines.forEach(l => l.classList.add('animate-draw'));
        });
    }, 7500);
};

// Iniciar automaticamente a animação da Hero Section quando a página carregar
window.addEventListener('load', () => {
    setTimeout(window.iniciarHeroAnimacao, 500); // 500ms delay para dar tempo do site carregar
});
