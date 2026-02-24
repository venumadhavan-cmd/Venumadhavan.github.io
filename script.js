lucide.createIcons();
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-element');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(element => {
        const delayClass = Array.from(element.classList).find(cls => cls.startsWith('delay-'));
        if (delayClass) {
            const delay = delayClass.split('-')[1] + 'ms';
            element.style.transitionDelay = delay;
        }
        observer.observe(element);
    });
});


function setupSlider(carouselId, prevBtnId, nextBtnId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!carousel || !prevBtn || !nextBtn) return;

    const slides = carousel.querySelectorAll('.project-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    if (totalSlides === 0) return;

    const updateCarousel = () => {
        const slideWidth = slides[0] ? slides[0].offsetWidth : 0;

        if (slideWidth === 0) return;

        carousel.scrollLeft = currentIndex * slideWidth;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = (currentIndex >= totalSlides - 1);

        prevBtn.classList.toggle('opacity-50', currentIndex === 0);
        nextBtn.classList.toggle('opacity-50', (currentIndex >= totalSlides - 1));
    };

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateCarousel();
        }
    });

    updateCarousel();
    window.addEventListener('resize', updateCarousel);
}

document.addEventListener('DOMContentLoaded', () => {
    setupSlider('projects-carousel', 'prev-button', 'next-button');
    setupSlider('workshop-carousel', 'workshop-prev-button', 'workshop-next-button');
});
