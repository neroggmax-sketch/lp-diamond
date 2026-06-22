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
    
    // Troca o ícone
    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.classList.replace('ph-list', 'ph-x');
    } else {
        mobileMenuIcon.classList.replace('ph-x', 'ph-list');
    }
});

// Fechar menu mobile ao clicar em um link
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

contactForm.addEventListener('submit', function(e) {
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
