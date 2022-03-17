
let slider = document.querySelector('.slideshow');
let prev = document.querySelector('.previous');
let next = document.querySelector('.next');
let locLength = document.querySelectorAll('.location');

//arrow controls on slideshow element
let width = 29.5;
let step = 1;
let imgDisplayed = 3;

let position = 0;

function left() {
    position += width * step;
    position = Math.min(position, 0);

    /*for(const location of locLength){
        location.style.transform = `translateX(${position}vw)`;
    }*/
    slider.style.transform = `translateX(${position}vw)`;
}

function right(){
    position -= width * step;
    position = Math.max(position, -width * (locLength.length - step*imgDisplayed))

    /*for(const location of locLength){
        location.style.transform = `translateX(${position}vw)`;
    }*/
    slider.style.transform = `translateX(${position}vw)`;
}

prev.addEventListener('click', left)
next.addEventListener('click', right)

//
let resizeTimer;
window.addEventListener("resize", () => {
  slider.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    slider.classList.remove("resize-animation-stopper");
  }, 400);
});