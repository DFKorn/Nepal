
const slider = document.querySelector('.slideshow');
const prev = document.querySelector('.previous');
const next = document.querySelector('.next');
const locations = document.querySelectorAll('.location');

const gallery = document.querySelector('.destinations');
const gallery_scroller = gallery.querySelector('.slideshow');
let gallery_item_size = gallery_scroller.querySelector('.location').clientWidth;

gallery.querySelector('.next').addEventListener('click', scrollToNextPage);
gallery.querySelector('.previous').addEventListener('click', scrollToPrevPage);

function scrollToNextPage() {
  gallery_scroller.scrollBy(gallery_item_size, 0);
}
function scrollToPrevPage() {
  gallery_scroller.scrollBy(-gallery_item_size, 0);
}

//Throttle function for scrolling animation
let throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}


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
  throttle(handleScrollAnimation, 200)
  
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

//Async function that fetches news object using "WorldNews API"
//https://worldnewsapi.com/
const worldNewsUrl = 'https://api.worldnewsapi.com/search-news'
const worldNewsApi = '?api-key=f75ee3a0c70d4ce0976c4ed63187631e';
const mediaSearchTerm = '&text=nepal&language=en&earliest-publish-date=2023-06-22'
const getWorldNews = async() => {
  const urlToFetch = `${worldNewsUrl}${worldNewsApi}${mediaSearchTerm}`;
  try{
    const response = await fetch(urlToFetch);
    console.log(response)
    if (!response.ok){
      const newsDiv = document.querySelector('.news')
      newsDiv.style.textAlign = 'center'
      newsDiv.style.color = '#874040'
      newsDiv.textContent = 'We are sorry. Something went wrong with our news section. We will fix it as soon as possible.'
      throw new Error(`HTTP error: ${response.status}`);
    }
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return jsonResponse
  }
  catch(error){
    console.log(error.message)
  }
}


//Function to create "news-card" div useing WorldNews API's data

const createNewsCardDiv = (newsData, index) => {
  const newsCardDiv = document.createElement('div')
  newsCardDiv.classList.add('news-card')
  // create news-card-image element
  const newsImageDiv = document.createElement('a')
  newsImageDiv.classList.add('news-card-image')
  const newsImageUrl = newsData.news[index].image;
  const newsImage = document.createElement('img');
  const newsLink = newsData.news[index].url;
  newsImage.setAttribute('src',newsImageUrl);
  newsImageDiv.append(newsImage)
  newsImageDiv.setAttribute('href', newsLink)
  // create news-content element
  // create date element
  const dateDiv = document.createElement('div');
  dateDiv.classList.add('date');
  const dateParagraph = document.createElement('p');
  const dateContent = newsData.news[index].publish_date;
  dateParagraph.textContent = dateContent;
  const calendarImage = document.createElement('img');
  calendarImage.setAttribute('src', './Resources/Icons/calendar.svg')
  dateDiv.append(calendarImage, dateParagraph)
  // create news-card-header element
  const newsCardHeader = document.createElement('a')
  newsCardHeader.classList.add('news-card-header')
  const headerContent = newsData.news[index].title;
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

// function to execute fetch and load news using WorldNews API
const executeNewsLoad = async () => {
  const newsData = await getWorldNews()
  const slider = document.querySelector('.news-slider')
  for(let i = 0; i < Math.min(newsData['news'].length, 8); i++) {
    const newsCard = createNewsCardDiv(newsData, i)
    slider.append(newsCard)
  }
  news_gallery_item_size = news_gallery_scroller.querySelector('.news-card').clientWidth;
}
executeNewsLoad();

const newsGallery = document.querySelector('.news');
const news_gallery_scroller = document.querySelector('.news-slider');
let news_gallery_item_size;

newsGallery.querySelector('.next').addEventListener('click', scrollToNextNewsPage);
newsGallery.querySelector('.previous').addEventListener('click', scrollToPrevNewsPage);

function scrollToNextNewsPage() {
  news_gallery_scroller.scrollBy(news_gallery_item_size, 0);
}
function scrollToPrevNewsPage() {
  news_gallery_scroller.scrollBy(-news_gallery_item_size, 0);
}

//Weather fetch and render code

//Async function that fetches weather object using "OpenWeather API"
//https://openweathermap.org/
const weatherKey = 'a5896f288c42d0b5b853f3f61debe275'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const searchInput = document.querySelector('.search-input')
let city = searchInput.value ===''? 'Pokhara' : searchInput.value
// let city = 'Pokhara';
const getCurrentForecast = async () => {
  const urlToFetch = `${forecastUrl}${city}&appid=${weatherKey}&units=metric`;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      const errorParagraph = document.querySelector('.error-paragraph')
      if(!errorParagraph){
        const errorMessageParagraph = document.createElement('p');
        errorMessageParagraph.classList.add('error-paragraph');
        errorMessageParagraph.textContent = 'Try another city!';
        const formDiv = document.querySelector('.weather-form-container');
        formDiv.append(errorMessageParagraph);
      }
      throw new Error(`HTTP error: ${response.status}`);
    }
    const errorParagraph = document.querySelector('.error-paragraph')
    if (errorParagraph){
      errorParagraph.remove()
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  catch(error){
    console.log(error.message)
  }
}


const WeekForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
const getWeaklyForecast = async () => {
  const urlToFetch = `${WeekForecastUrl}${city}&appid=${weatherKey}&units=metric`
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

//ConvertDate function converts time from local  
//to the desired region's time based on timzoneOffset
//parameters date and timzoneOffset are meant to be taken from OpenWeather API
const convertDate = (timezoneOffset, date = Date.now()) => {
  const localTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const regionalOffset = timezoneOffset * 1000;
  let localDateToRegional = new Date(date/**1000*/ + localTimezoneOffset + regionalOffset)
  return localDateToRegional;
}

const executeWeatherLoad = async () => {
  const weatherData = await getCurrentForecast();
  const titleHeader = document.querySelector('.title-header');
  const measureTime = document.querySelector('.measure-time');
  const mainTempValue = document.querySelector('.temp-value');
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherDescription = document.querySelector('.condition-description span')
  const feelsLikeTemp = document.querySelector('.feels-temp');
  const windSpeed = document.querySelector('.speed-value');
  const humidity = document.querySelector('.humidity-value');
  const pressure = document.querySelector('.pressure-value')
  let regionTime = convertDate(/*weatherData.dt,*/ weatherData.timezone)

  titleHeader.textContent = weatherData.name
  measureTime.textContent = `${regionTime.toString().slice(0,21)}`;
  mainTempValue.textContent = weatherData.main.temp.toFixed(1);
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
  weatherDescription.textContent = (weatherData.weather[0].description);
  // Making first letter of weather description uppercse
  weatherDescription.textContent = weatherDescription.textContent[0].toUpperCase() +  weatherDescription.textContent.slice(1);

  feelsLikeTemp.textContent = weatherData.main.feels_like.toFixed(1);
  windSpeed.textContent = weatherData.wind.speed + ' m/s';
  humidity.textContent = weatherData.main.humidity + ' %';
  pressure.textContent = weatherData.main.pressure + ' hPa';
}

const weaklyWeatherLoad = async () => {
  const weatherData = await getWeaklyForecast();

  const dayDivs = document.querySelectorAll('.day-weather');
  const dayTemps = document.querySelectorAll('.day-temp-value');
  const dayHeaders = document.querySelectorAll('.day-header');
  const measureDates = document.querySelectorAll('.measure-date');
  const dayWeatherIcons = document.querySelectorAll('.day-weather-icon')
  const conditionDescriptions = document.querySelectorAll('.day-condition-description');
  let timestamp = 0;
  let regionTime = convertDate(weatherData.city.timezone, (weatherData.list[timestamp].dt)*1000);
  
  for(let i = 0; i < Math.min(dayDivs.length, 5); i++){
    console.log(regionTime)
    console.log(i);
    //timestamp step in WeatherAPI is 3 hours
    //the desired timestamp time is 11:00 - 14:00(region time)
    //the "if" statement below calculates the number of steps between 
    //the first timestamp and the desired timestamp 
    if(regionTime.getHours() >= 11 && regionTime.getHours() <=14 && i === 0){
      timestamp = 0;
    } else if(regionTime.getHours() >= 11 && regionTime.getHours() <=14){
      timestamp += 8;
    } else if(regionTime.getHours() < 11){
      timestamp += Math.round((12 - regionTime.getHours()) / 3);
    } else if(regionTime.getHours() > 14){
      timestamp += Math.round((24 - (regionTime.getHours() - 12)) / 3);
    } else{
      timestamp += 8;
    }

    regionTime = convertDate(weatherData.city.timezone, weatherData.list[timestamp].dt*1000);
    console.log(timestamp)
    dayHeaders[i].textContent = regionTime.toString().slice(0,4)
    measureDates[i].textContent = regionTime.toString().slice(4,11)
    dayTemps[i].textContent = weatherData.list[timestamp].main.temp.toFixed(1);
    dayWeatherIcons[i].setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.list[timestamp].weather[0].icon}@2x.png`)
    conditionDescriptions[i].textContent = weatherData.list[timestamp].weather[0].description
  }
}

let form = document.querySelector('.weather-form')
form.addEventListener('submit',(event) => {
  event.preventDefault()
  city = searchInput.value;
  executeWeatherLoad()
  weaklyWeatherLoad()
})

executeWeatherLoad()
weaklyWeatherLoad()
