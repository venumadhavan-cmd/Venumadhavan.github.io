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

        