document.addEventListener("DOMContentLoaded", function () {
    // Fade in the hero section on load
    document.querySelector(".hero").classList.add("fade-in");

    // Fade in about section on scroll
    const aboutSection = document.querySelector(".about");

    function revealOnScroll() {
        let scrollPosition = window.innerHeight;
        let top = aboutSection.getBoundingClientRect().top;
        if (top < scrollPosition) {
            aboutSection.classList.add("fade-in");
        }
    }

    window.addEventListener("scroll", revealOnScroll);

    // Button Click Effect
    document.querySelector(".learn-more").addEventListener("click", function () {
        alert("More features coming soon!");
    });
});
