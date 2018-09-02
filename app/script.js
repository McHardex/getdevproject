let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 200000);
}

currentSlide = (n) => {
  showSlides(slideIndex = n);
}

$('.dot1').on('click', ()=> {
  currentSlide(1)
});

$('.dot2').on('click', ()=> {
  currentSlide(2)
});