document.addEventListener("DOMContentLoaded", function () {
    function initLargeScreenCarousel() {
        if (window.innerWidth > 1000) {
            console.log("Carousel active on large screens");

            let currentSlide = 0;
            const slidesPerView = 3; // Showing 3 members at a time
            const staffMembers = document.querySelectorAll('.staff-member');
            const totalSlides = Math.ceil(staffMembers.length / slidesPerView);
            const teamContainer = document.querySelector('.team-container');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const dots = document.querySelectorAll('.dots span');

            // Function to move slides
            function showSlide(index) {
                if (index >= totalSlides) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = totalSlides - 1;
                } else {
                    currentSlide = index;
                }

                const offset = currentSlide * -100; // Moves by 100% per slide
                teamContainer.style.transform = `translateX(${offset}%)`;

                // Update active dot
                dots.forEach(dot => dot.classList.remove("active"));
                if (dots[currentSlide]) {
                    dots[currentSlide].classList.add("active");
                }
            }

            // Next slide function
            if (nextBtn) {
                nextBtn.addEventListener('click', function () {
                    showSlide(currentSlide + 1);
                });
            }

            // Previous slide function
            if (prevBtn) {
                prevBtn.addEventListener('click', function () {
                    showSlide(currentSlide - 1);
                });
            }

            // Direct slide selection from dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });

            // Auto-slide every 3 seconds
            const autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 3000);

            // Cleanup function for small screens
            function cleanup() {
                clearInterval(autoSlide);
                teamContainer.style.transform = "translateX(0)";
            }

            window.addEventListener("resize", function () {
                if (window.innerWidth <= 1000) {
                    cleanup();
                }
            });
        } else {
            console.log("Carousel disabled on small screens");
        }
    }

    // Run on page load
    initLargeScreenCarousel();

    // Listen for screen resize and reinitialize if necessary
    window.addEventListener("resize", initLargeScreenCarousel);
});
