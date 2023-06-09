let homeScreen, detailsScreen;

let cardContainer;

let firstCard, secondCard, thirdCard;
let gone, coming;
let allCards;

let touchStartX = 0, touchEndX = 0;

let eventNameDiv, eventVenueDiv, eventTimeDiv;

const cardData = [
    {
        title: 'Car show', 
        venue: 'Delhi, India', 
        date: 'Aug 19th, 2020', 
        image: 'https://tse4.mm.bing.net/th?id=OIP.AyHE-CKYaD0mC03tgyE8NgHaHa&pid=Api&P=0'
    },
    {
        title: 'Fashion show', 
        venue: 'Moscow, Russia', 
        date: 'Nov 13th, 2020', 
        image: 'https://dl.dropbox.com/s/a6u9380b8q2g9b7/500007100686_55491.jpg?dl=0'
    },
    {
        title: 'Light show', 
        venue: 'Gandhinagar, India', 
        date: 'Oct 2nd, 2020', 
        image: 'https://dl.dropbox.com/s/5fy7j5ve9ai3ax0/DigitalVegetables_07.jpg?dl=0'
    },
    {
        title: 'Party night', 
        venue: 'Rajkot, India', 
        date: 'May 3rd, 2020', 
        image: 'https://dl.dropbox.com/s/ntqtw1rdodns7ep/500009900713_11922.jpg?dl=0'
    },
    {
        title: 'Casino opening', 
        venue: 'Mumbai, India',
        date: 'Nov 13th, 2020', 
        image: 'https://dl.dropbox.com/s/8hp0lsb0hso1ak4/500009500510_11563.jpg?dl=0'
    },
    {
        title: 'Auction', 
        venue: 'Chennai, India', 
        date: 'Dec 9th, 2020', 
        image: 'https://dl.dropbox.com/s/pd9hmmiypjjika0/858111568_396242.jpg?dl=0'
    },
];

let cardNumber = 0;

//card changer function
const changeCard = () => {

    //check which side it is swiped to
    //starting position is less than ending means right swipe
    //starting position is greater than ending means left swipe
    if (Math.round(touchStartX) < Math.round(touchEndX)) {

        // there should be atleast one element in gone array
        if (gone.length !== 0) {

            //any card should not be null otherwise it will throw error
            if (firstCard != null) {

                //first card moved to second card after swipe
                firstCard.classList.add('second');
                firstCard.classList.remove('first');
                cardNumber--;

            }

            if (secondCard != null) {

                //second card moved to third card after swipe
                secondCard.classList.add('third');
                secondCard.classList.remove('second');

            }

            if (thirdCard != null) {

                //third card moved as coming card
                thirdCard.classList.add('coming');
                thirdCard.classList.remove('third');

            }

            //get last element from gone array and make it first available card
            gone[gone.length - 1].classList.add('first');
            gone[gone.length - 1].classList.remove('gone');

        }

    } else if(Math.round(touchStartX) === Math.round(touchEndX)) {
        // console.log("equal");
        //Does nothing really, lol
    } else {

        //again, check for null
        if (secondCard != null) {

            if (firstCard != null) {

                //first card moved to gone
                firstCard.classList.add('gone');
                firstCard.classList.remove('first');
                cardNumber++;

            }

            if (secondCard != null) {

                //second becomes first
                secondCard.classList.add('first');
                secondCard.classList.remove('second');

            }

            if (thirdCard != null) {

                //third becomes second
                thirdCard.classList.add('second');
                thirdCard.classList.remove('third');

            }

            if (coming.length !== 0) {
            
                //first card from coming array becomes third
                coming[0].classList.add('third');
                coming[0].classList.remove('coming');

            }
        }

    }

    //setting variables again because classes are changed
    initializeCardVars();
    changeCardDetail(cardData[cardNumber]);

}

//initialize/re-initializing variabeles
const initializeCardVars = () => {
    gone = document.getElementsByClassName('gone');
    coming = document.getElementsByClassName('coming');
    firstCard = document.querySelector('.first');
    secondCard = document.querySelector('.second');
    thirdCard = document.querySelector('.third');
}

const cardOpener = (index) => {
    alert(index);
}

const changeCardDetail = (data) => {
    eventNameDiv.innerText = data.title;
    eventVenueDiv.innerText = data.venue;
    eventTimeDiv.innerText = data.date;
}

const openDetailsPage = (data) => {
    // homeScreen.style.display = "none";
    const eventNameSpan = document.querySelector('.details-event-name span');
    eventNameSpan.innerText = data.title;
    const eventLocation = document.querySelector('.details-event-location');
    eventLocation.innerText = data.venue;
    const eventTime = document.querySelector('.details-event-time');
    eventTime.innerText = data.date;
    const bannerContainer = document.querySelector('.event-banner-container');
    bannerContainer.style.background = `linear-gradient(rgba(100,100,100,0.4), rgba(100,100,100,0.4)), url(${data.image})`;
    bannerContainer.style.backgroundPosition = "top";
    bannerContainer.style.backgroundSize = "cover";
    bannerContainer.style.backgroundRepeat = "no-repeat";
    detailsScreen.style.left = "0";
}

let isNavOpen = false;

const openNav = () => {
    if (!isNavOpen) {
        homeScreen.style.transform = "rotateZ(-25deg)";
        cardContainer.style.pointerEvents = "none";
    } else {
        homeScreen.style.transform = "rotateZ(0deg)";
        cardContainer.style.pointerEvents = "all";
    }
    isNavOpen = !isNavOpen;
}

const backBtn = () => {
    detailsScreen.style.left = "100%";
}

//wait for window to load
window.onload = () => {

    homeScreen = document.getElementById('home-screen');
    detailsScreen = document.getElementById('event-details-screen');

    cardContainer = document.getElementById('card-container');
    eventNameDiv = document.getElementById('event-name-container');
    eventVenueDiv = document.getElementById('venue-container');
    eventTimeDiv = document.getElementById('time-container');

    cardData.forEach((data, index) => {

        let classes = "card ";
        switch(index) {
            case 0: 
                classes += "first";
                changeCardDetail(data);
                break;
            case 1:
                classes += "second";
                break;
            case 2: 
                classes += "third";
                break;
            default:
                classes += "coming";
                break;
        }
        const cardDiv = document.createElement('div');
        cardDiv.classList = classes;
        cardDiv.style.backgroundImage = `url(${data.image})`;
        cardDiv.addEventListener('click', () => openDetailsPage(data));
        cardContainer.appendChild(cardDiv);

    });

    //select from DOM
    cardChangeDetector = document.getElementById('change-detector');
    allCards = document.querySelectorAll('.card');
    // allCards.forEach((card, index) => {
    //     card.addEventListener('click', () => {
    //         cardOpener(index);
    //     });
    // });

    //for setting initial values to variable.
    initializeCardVars();

    //mousedown and mouseup are for desktop browsers
    cardContainer.addEventListener('mousedown', (e) => {
        // console.log(e.clientX);
        touchStartX = e.clientX;
    });
    
    cardContainer.addEventListener('mouseup', (e) => {
        // console.log(e.clientX);
        touchEndX = e.clientX;
        changeCard();
    });


    //touchstart and touchend events are for mobiles
    cardContainer.addEventListener('touchstart', (e) => {
        // console.log(e.clientX);
        // alert("started");
        touchStartX = e.touches[0].clientX;
    });
    
    cardContainer.addEventListener('touchend', (e) => {
        // console.log(e.clientX);
        // alert("ended");
        touchEndX = e.changedTouches[0].clientX;
        changeCard();
    });

    const loader = document.querySelector('#loader');
    const app = document.querySelector('#App');
    loader.style.display = "none";
    app.style.display = "block";

}

