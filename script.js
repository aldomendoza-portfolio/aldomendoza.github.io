document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica de Cambio de Idioma
    const langBtn = document.getElementById('lang-toggle');
    const body = document.body;
    
    // Verificar si hay un idioma guardado en el navegador, si no, usar español por defecto
    const savedLang = localStorage.getItem('cv-lang') || 'es';
    body.className = savedLang;

    langBtn.addEventListener('click', () => {
        if (body.classList.contains('es')) {
            body.className = 'en';
            localStorage.setItem('cv-lang', 'en');
        } else {
            body.className = 'es';
            localStorage.setItem('cv-lang', 'es');
        }
    });

    // 2. Lógica de Animación de Scroll (Fade In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Easter egg
    console.log("%c¡Hola! Infraestructura como Código, CV como Código.", "color: #38bdf8; font-size: 16px; font-weight: bold;");
});
