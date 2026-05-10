// =========================================================
// PARA A MELHOR MÃE DO MUNDO — interações
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----- AOS (animações ao rolar) -----
    if (window.AOS) {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
    }

    // ----- Lightbox da galeria -----
    if (window.GLightbox) {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            closeButton: true,
            zoomable: true,
            openEffect: 'zoom',
            closeEffect: 'fade'
        });
    }

    // ----- Pétalas caindo -----
    const petalContainer = document.querySelector('.petals');
    if (petalContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const petalCount = 14;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('span');
            petal.className = 'petal';
            const size = 12 + Math.random() * 14;
            const duration = 12 + Math.random() * 10;
            const delay = Math.random() * -20;
            const left = Math.random() * 100;
            const sway = (Math.random() - 0.5) * 30;

            petal.style.left = `${left}vw`;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            petal.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
            petal.style.transform = `rotate(${sway}deg)`;

            // alternate between rose tones
            if (i % 3 === 0) {
                petal.style.background = 'radial-gradient(circle at 30% 30%, #fbe9e3, #ecb0a3)';
            } else if (i % 3 === 1) {
                petal.style.background = 'radial-gradient(circle at 30% 30%, #fdf6f3, #f5cfc6)';
            }

            petalContainer.appendChild(petal);
        }
    }

    // ----- Ano dinâmico no footer -----
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ----- Mark gallery placeholders if image fails -----
    document.querySelectorAll('.gallery-item img').forEach(img => {
        const markPlaceholder = () => img.closest('.gallery-item')?.classList.add('placeholder');
        if (!img.complete) {
            img.addEventListener('error', markPlaceholder);
        } else if (img.naturalWidth === 0) {
            markPlaceholder();
        }
    });

    // ----- Smooth scroll para a seta do hero -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId.length <= 1) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
