let slideIndex = 0;
let slides = [];
let dots = [];
let slideInterval;

// Function to show a specific slide
function showSlides() {
    slides = document.getElementsByClassName("slide");
    dots = document.getElementsByClassName("dot");

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove 'active' class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // If slideIndex goes beyond last slide, go to first slide
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Reset to 0 for 0-based indexing
    }
    // If slideIndex goes before first slide, go to last slide
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    // Display the current slide and mark the corresponding dot as active
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}

// Function to advance or go back slides
function plusSlides(n) {
    clearTimeout(slideInterval); // Clear the existing interval
    slideIndex += n;
    showSlides();
    startAutoSlide(); // Restart auto-slide after manual navigation
}

// Function to jump to a specific slide using dots
function currentSlide(n) {
    clearTimeout(slideInterval); // Clear the existing interval
    slideIndex = n - 1; // Adjust for 0-based indexing
    showSlides();
    startAutoSlide(); // Restart auto-slide after manual navigation
}

// Function for automatic sliding
function startAutoSlide() {
    slideInterval = setTimeout(() => {
        slideIndex++;
        showSlides();
        startAutoSlide(); // Loop the auto-slide
    }, 5000); // Change image every 5 seconds
}

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the slider is part of the 'home' page or main content
    // and initialize only when it's active or loaded.
    showSlides(); // Show the first slide immediately
    startAutoSlide(); // Start the automatic sliding
});