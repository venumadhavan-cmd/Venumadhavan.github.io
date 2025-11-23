lucide.createIcons();
        
// Navigation Toggle Logic (for mobile menu)
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.setAttribute('data-lucide', 'x');
        lucide.createIcons();
    } else {
        menu.classList.add('hidden');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
}

/**
 * Handles Formspree submission using Fetch API, updates UI, and redirects on success.
 * @param {Event} event - The form submission event.
 */
async function submitForm(event) {
    // 1. Stop the default form submission (which would refresh the page)
    event.preventDefault(); 
    
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit-button');

    // Reset messages and disable button
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    
    // 2. Simple client-side validation check
    if (!form.checkValidity()) {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
        errorMessage.textContent = "Please fill in all required fields correctly.";
        errorMessage.classList.remove('hidden');
        form.reportValidity();
        return;
    }

    // 3. Prepare and send data to Formspree
    var data = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                // Formspree requires the 'Accept' header for JSON response
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // SUCCESS: Show message and prepare for redirect
            successMessage.classList.remove('hidden');
            form.reset(); // Clear the form fields
            submitButton.textContent = "Message Sent! 👌";

            // Redirect after a brief delay to show success
            setTimeout(() => {
                window.location.href = 'Thank.html'; 
            }, 1000); 

        } else {
            // FAILURE: Handle server-side errors from Formspree
            const errorData = await response.json();
            
            // Display Formspree-specific errors or a generic message
            if (Object.hasOwn(errorData, 'errors')) {
                errorMessage.textContent = errorData["errors"].map(error => error["message"]).join(", ");
            } else {
                errorMessage.textContent = "Oops! There was a problem submitting your form. Please try again.";
            }
            errorMessage.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.textContent = "Send message";
        }
    } catch (error) {
        // Network or fetch API error
        console.error("Submission error:", error);
        errorMessage.textContent = "Network error. Check your connection or try again.";
        errorMessage.classList.remove('hidden');
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
    }
}

// 4. Attach the event listener to the form element
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", submitForm);
}


// Dummy reveal-element function to prevent errors if the CSS animation classes are missing
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal-element').forEach(el => el.classList.add('active'));
});