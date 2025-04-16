document.addEventListener("DOMContentLoaded", function () {
    // Instantly fade in the hero section
    const hero = document.querySelector(".hero");
    if (hero) hero.classList.add("fade-in");

    // Sections to animate on scroll
    const sectionsToReveal = document.querySelectorAll(".about, .features, .cta, .video-section");

    // Intersection Observer for efficient reveal
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    obs.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, { threshold: 0.15 }); // Adjust threshold for when to trigger

        sectionsToReveal.forEach(section => observer.observe(section));
    } else {
        // Fallback for older browsers: Debounced scroll event
        function debounce(fn, delay) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn.apply(this, args), delay);
            };
        }

        function revealOnScroll() {
            const scrollPosition = window.innerHeight;
            sectionsToReveal.forEach(section => {
                if (!section.classList.contains("fade-in")) {
                    const top = section.getBoundingClientRect().top;
                    if (top < scrollPosition - 100) {
                        section.classList.add("fade-in");
                    }
                }
            });
        }

        const debouncedReveal = debounce(revealOnScroll, 100);
        window.addEventListener("scroll", debouncedReveal);
        revealOnScroll();
    }

    // Learn More button interaction
    const learnMoreBtn = document.querySelector(".learn-more");
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", function () {
            alert("More features coming soon!");
        });
    }
});
// Function to handle the login form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        // Send POST request to /login route
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // If login is successful, redirect to dashboard
            window.location.href = '/patient-dashboard.html';
        } else {
            // If login fails, display the error message
            alert(result.message || 'Login failed. Please try again.');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again.');
    }
}

// Function to handle the register form submission
async function handleRegister(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        // Send POST request to /register route
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // If registration is successful, inform the user
            alert('Registration successful!');
            toggleAuth('login'); // Switch to login form
        } else {
            // If registration fails, display the error message
            alert(result.message || 'Registration failed. Please try again.');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again.');
    }
}

// Attach event listeners to form submissions
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('register-form').addEventListener('submit', handleRegister);
