
const slider = document.querySelector('.slideshow');
const prev = document.querySelector('.previous');
const next = document.querySelector('.next');
const locations = document.querySelectorAll('.location');



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
  removeActiveClass()
  removeBodyOverflow()
}) 

removeActiveClass()
removeBodyOverflow()

// Nepal Now section
// News fetch and render code

//Async function that fetches news object using "newscatcher API"
//https://newscatcherapi.com/
const newsApi = 'uZK0sjeVDXJ6YYa8PSV1VbrYr8rQDdRNwpcZJPHYOKQ';
const newsUrl = 'https://api.newscatcherapi.com/v2/search?q=';
const searchTerm = 'Nepal+AND+NOT+COVID';
const getNews = async () => {
  const urlToFetch = `${newsUrl}${searchTerm}`;
  try{
    const response = await fetch(urlToFetch,{
      method:'GET',
      headers: {'x-api-key': newsApi}
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  catch(error){
    console.log(error.message)
  }
};

 //Function to create "news-card" div 
 const createNewsCardDiv = (newsData, index) => {
  const newsCardDiv = document.createElement('div')
  newsCardDiv.classList.add('news-card')
  // create news-card-image element
  const newsImageDiv = document.createElement('a')
  newsImageDiv.classList.add('news-card-image')
  const newsImageUrl = newsData.articles[index].media;
  const newsImage = document.createElement('img');
  const newsLink = newsData.articles[index].link;
  newsImage.setAttribute('src',newsImageUrl);
  newsImageDiv.append(newsImage)
  newsImageDiv.setAttribute('href', newsLink)
  // create news-content element
  //create date element
  const dateDiv = document.createElement('div');
  dateDiv.classList.add('date');
  const dateParagraph = document.createElement('p');
  const dateContent = newsData.articles[index].published_date;
  dateParagraph.textContent = dateContent;
  const calendarImage = document.createElement('img');
  calendarImage.setAttribute('src', './Resources/calendar.svg')
  dateDiv.append(calendarImage, dateParagraph)
  // create news-card-header element
  const newsCardHeader = document.createElement('a')
  newsCardHeader.classList.add('news-card-header')
  const headerContent = newsData.articles[index].title;
  const newsHeader = document.createElement('h4');
  newsHeader.textContent = headerContent;
  newsCardHeader.append(newsHeader);
  newsCardHeader.setAttribute('href', newsLink)
  //complete news-content element
  const newsContent = document.createElement('div');
  newsContent.classList.add('news-content');
  newsContent.append(dateDiv, newsCardHeader);
  //complete news Card element
  newsCardDiv.append(newsImageDiv,newsContent)
  return newsCardDiv
}
// function to execute fetch and load news
const executeNewsLoad = async () => {
  const newsData = await getNews()
  const slider = document.querySelector('.news-slider')
  for(let i = 0; i < 8; i++) {
    const newsCard = createNewsCardDiv(newsData, i)
    slider.append(newsCard)
  }
}
executeNewsLoad();

//Weather fetch and render code

//Async function that fetches weather object using "OpenWeather API"
//https://openweathermap.org/
const apiKey = 'a5896f288c42d0b5b853f3f61debe275'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
let city = 'Pokhara';
const getCurrentForecast = async () => {
  const urlToFetch = `${forecastUrl}${city}&appid=${apiKey}&units=metric`
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  catch(error){
    console.log(error.message)
  }
}

// const executeSearch = async () => {
//   const api = document.querySelector('.api');
//   let tempH2 = document.createElement('h2');
//   const tempData = await getCurrentForecast()
//   tempH2.textContent = tempData.main.temp
//   api.append(tempH2)
// };