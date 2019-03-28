// Sorry W3.CSS but counting starts from 0, not 1
var slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    var slideTexts = document.querySelectorAll(".slideshow-text")

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length-1;

    // Hide all slides
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    for (var i= 0; i < slides.length; i++) {
        slideTexts[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
    slideTexts[slideIndex].style.display = "flex";
}