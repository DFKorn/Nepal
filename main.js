
const slider = document.querySelector('.slideshow');
const prev = document.querySelector('.previous');
const next = document.querySelector('.next');
const locations = document.querySelectorAll('.location');


/*That were the first options for slideshow to work.
One moved the slideshow element, the other moved every location element 
Decided to leave it here just in case...*/
//Arrow controls for slideshow element
/*let width = 29.5;
let step = 1;
let imgDisplayed = 3;

let position = 0;

function left() {
    position += width * step;
    position = Math.min(position, 0);

    for(const location of locations){
        location.style.transform = `translateX(${position}vw)`;
    }
    //slider.style.transform = `translateX(${position}vw)`;
}

function right(){
    position -= width * step;
    position = Math.max(position, -width * (locations.length - step*imgDisplayed))

    for(const location of locations){
        location.style.transform = `translateX(${position}vw)`;
    }
    //slider.style.transform = `translateX(${position}vw)`;
}
prev.addEventListener('click', left)
next.addEventListener('click', right)
*/

const gallery = document.querySelector('.destinations');
const gallery_scroller = gallery.querySelector('.slideshow');
const gallery_item_size = gallery_scroller.querySelector('.location').clientWidth;

gallery.querySelector('.next').addEventListener('click', scrollToNextPage);
gallery.querySelector('.previous').addEventListener('click', scrollToPrevPage);

function scrollToNextPage() {
  gallery_scroller.scrollBy(gallery_item_size, 0);
}
function scrollToPrevPage() {
  gallery_scroller.scrollBy(-gallery_item_size, 0);
}
/*
function scrollToNextPage() {
  gallery_scroller.scrollBy({left: gallery_item_size,
  behavior: 'smooth'});
}
function scrollToPrevPage() {
  gallery_scroller.scrollBy({left: -gallery_item_size,
  behavior: 'smooth'});
}*/


//
/*let resizeTimer;
window.addEventListener("resize", () => {
  slider.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    slider.classList.remove("resize-animation-stopper");
  }, 400);
});*/

//const scrollOffset = 100;
const percentageScroll = 95;
 
const scrollElements = document.querySelectorAll(".scroll-fade");
 
const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;
 
  return (
    elementTop <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
  );
};

const displayScrollElement = (element) => {
  element.classList.add('scrolled');
}
 
const hideScrollElement = (element) => {
  element.classList.remove('scrolled');
}

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, percentageScroll)){
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  })  
  } 
 
const handleAnimation = () =>{
  scrollElements.forEach((el) =>{
    if (elementInView(el, percentageScroll)){
      displayScrollElement(el);
  }})
}  


handleAnimation();

window.addEventListener('resize', ()=>{
  handleAnimation();
})

window.addEventListener('scroll', () => {
  handleScrollAnimation();
})