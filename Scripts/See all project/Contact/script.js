lucide.createIcons();

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

async function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit-button');

    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    if (!form.checkValidity()) {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
        errorMessage.textContent = "Please fill in all required fields correctly.";
        errorMessage.classList.remove('hidden');
        form.reportValidity();
        return;
    }

    var data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            successMessage.classList.remove('hidden');
            form.reset();
            submitButton.textContent = "Message Sent! 👌";

            setTimeout(() => {
                window.location.href = 'Thank.html';
            }, 1000);

        } else {
            const errorData = await response.json();

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
        console.error("Submission error:", error);
        errorMessage.textContent = "Network error. Check your connection or try again.";
        errorMessage.classList.remove('hidden');
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
    }
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", submitForm);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal-element').forEach(el => el.classList.add('active'));
});