function toggleMenu() {
    var navLinks = document.getElementById("nav-links");

    if (navLinks.classList.contains("show")) {
        navLinks.style.maxHeight = "0";
    } else {
        navLinks.style.maxHeight = "300px";
    }

    navLinks.classList.toggle("show");
}


//hero
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-content");
const dots = document.querySelectorAll(".hero-dots span");
const heroContainer = document.querySelector(".hero-container");

// Function to show the slide based on the index
function showSlide(index) {
    heroContainer.style.transform = `translateX(-${index * 100}vw)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

// Function to auto-change slides
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-change slides every 2 seconds
setInterval(nextSlide, 5000);

// Add event listeners to dots for manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Initially show the first slide
showSlide(0);
