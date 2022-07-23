

//Scrolling Animation
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

//Toggle Panel 
const toggleMenu = document.querySelector('.toggle');
const togglePanel = document.querySelector('.toggle-panel')
const body = document.querySelector('body');

toggleMenu.onclick = function(){
  toggleMenu.classList.toggle('active')
  togglePanel.classList.toggle('active')
  body.style.overflow === '' ? body.style.overflow ='hidden' : body.style.overflow =''
}

const removeActiveClass = () => {
  if (window.innerWidth > 940 && toggleMenu.classList.contains('active')) {
    toggleMenu.classList.remove('active')
    togglePanel.classList.remove('active')
  }
}

const removeBodyOverflow = () => {
  if (window.innerWidth > 940 && body.style.overflow === 'hidden'){
    body.style.overflow = '';
  }
} 

window.addEventListener('resize', ()=>{
  removeActiveClass();
  removeBodyOverflow();
  gallery_item_size = gallery_scroller.querySelector('.location').clientWidth;
  news_gallery_item_size = news_gallery_scroller.querySelector('.news-card').clientWidth;
}) 

removeActiveClass()
removeBodyOverflow()

// Nepal Now section
// News fetch and render code

//Async function that fetches news object using "newscatcher API"
//https://newscatcherapi.com/
