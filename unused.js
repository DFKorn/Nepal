


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


// Nepal Now section
// News fetch and render code
const executeNewsLoad = async () => {
    const newsData = await getNews()

    const newsCard = document.querySelectorAll('.news-card')
    const slide = document.querySelector('.news-slider')

    newsCard.forEach((card,index) => {
    const newsLink = newsData.articles[index].link;
    const newsImageDiv = document.querySelector('.news-card-image');
    const newsImageUrl = newsData.articles[index].media;
    const newsImage = document.createElement('img');
    newsImage.setAttribute('src',newsImageUrl);
    newsImageDiv.append(newsImage)
    newsImageDiv.setAttribute('href', newsLink)

    const dateDiv = document.querySelector('.date');
    const dateParagraph = document.createElement('p');
    const dateContent = newsData.articles[index].published_date;
    dateParagraph.textContent = dateContent;
    dateDiv.append(dateParagraph)

    const newsCardHeader = document.querySelector('.news-card-header');
    const headerContent = newsData.articles[index].title;
    const newsHeader = document.createElement('h4');
    newsHeader.textContent = headerContent;
    newsCardHeader.append(newsHeader);
    newsCardHeader.setAttribute('href', newsLink)
    // newsCard.append(newsImageDiv,dateDiv,newsCardHeader)
    slide.append(card)
    })}