lucide.createIcons();

        // --- Mobile Menu Toggle ---
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            const icon = document.getElementById('menu-icon');
            menu.classList.toggle('hidden');
            if (menu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons(); // Re-render icon after change
        }

        // --- Intersection Observer for Scroll Reveal Animation ---
        document.addEventListener('DOMContentLoaded', () => {
            const revealElements = document.querySelectorAll('.reveal-element');

            // Options for the observer
            const observerOptions = {
                root: null, // relative to the viewport
                rootMargin: '0px',
                threshold: 0.1 // 10% of the element must be visible
            };

            // Callback function to execute when an element visibility changes
            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element is visible, add the active class
                        entry.target.classList.add('active');
                        // Stop observing once it's revealed
                        observer.unobserve(entry.target);
                    }
                });
            };

            // Create the observer
            const observer = new IntersectionObserver(observerCallback, observerOptions);

            // Start observing each element
            revealElements.forEach(element => {
                // Apply optional delay based on the class (e.g., delay-200)
                const delayClass = Array.from(element.classList).find(cls => cls.startsWith('delay-'));
                if (delayClass) {
                    const delay = delayClass.split('-')[1] + 'ms';
                    element.style.transitionDelay = delay;
                }
                observer.observe(element);
            });
        });


        // --- Generic Slider Logic Function ---
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
                // Determine the width of one slide to calculate the scroll distance
                // Use a safe check for the first slide existing
                const slideWidth = slides[0] ? slides[0].offsetWidth : 0; 
                
                if (slideWidth === 0) return; // Exit if width is zero

                // Set the scroll position
                carousel.scrollLeft = currentIndex * slideWidth;

                // Update button visibility/state
                prevBtn.disabled = currentIndex === 0;
                // Last navigable index is totalSlides - 1 (since we are scrolling one slide at a time)
                nextBtn.disabled = (currentIndex >= totalSlides - 1); 

                prevBtn.classList.toggle('opacity-50', currentIndex === 0);
                nextBtn.classList.toggle('opacity-50', (currentIndex >= totalSlides - 1));
            };

            // Event listeners for navigation buttons
            prevBtn.addEventListener('click', () => {
                // Decrement by 1 slide to allow scrolling one card at a time.
                if (currentIndex > 0) {
                    currentIndex = Math.max(0, currentIndex - 1); 
                    updateCarousel();
                }
            });

            nextBtn.addEventListener('click', () => {
                // Only allow scrolling if we are not on the last card
                if (currentIndex < totalSlides - 1) {
                     // Increment by 1 slide
                    currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
                    updateCarousel();
                }
            });
            
            // Initial state setup and handling window resize for responsive scrolling
            updateCarousel();
            window.addEventListener('resize', updateCarousel);
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Setup the Projects slider
            setupSlider('projects-carousel', 'prev-button', 'next-button');

            // Setup the new Workshop slider
            setupSlider('workshop-carousel', 'workshop-prev-button', 'workshop-next-button');
        });
