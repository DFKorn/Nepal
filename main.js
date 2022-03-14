let width = 29.5;
let step = 1;
let imgDisplayed = 3;


let slide = document.querySelector('.slideshow');
let prev = document.querySelector('.previous');
let next = document.querySelector('.next');
let locLength = document.querySelectorAll('.location');

let position = 0;

function left() {
    position += width * step;
    position = Math.min(position, 0);

    slide.style.transform = `translateX(${position}vw)`;
}

function right(){
    position -= width * step;
    position = Math.max(position, -width * (locLength.length - step*imgDisplayed))

    slide.style.transform = `translateX(${position}vw)`;
}

prev.addEventListener('click', left)
next.addEventListener('click', right)

