const grid = document.querySelector('.grid');

const actors = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
];

let firstCard = '';
let secondCard = '';

const revealCard = ({target}) =>{
    if (target.parentNode.className.includes('')) { //condition for card flip
        return;
    }
    if(firstCard ===''){ //Verifying if is the first card flipped
        target.parentNode.classList.add('reveal-card'); //select class and add to card
        firstCard = target.parentNode;
    } else if (secondCard === ''){ //Verifying if is the second card flipped
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        
        checkCards()

    
}
//Creating HMTL tag and class 
const createElement = (tag, className) => {
    const element = document.createElement(tag); //creating a html tag using createElement function
    element.className = className; //add class to tag
    return element; 
}
//Creating card
const createCard = (actors)=>{

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    
    front.style.backgroundImage = `url('./assets/img/${actors}.jpeg')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    
    return card;
}
//Loading function
const loadGame = () => {
    const duplicateActors = [...actors, ...actors];
    const shuffleCards = duplicateActors.sort(() => Math.random() - 0.5); // Shuffle the cards

    //Creating each cards
    shuffleCards.forEach((actor) => { // Use 'actor' instead of 'card' here
        const card = createCard(actor); // Pass 'actor' instead of 'actors'
        grid.appendChild(card);
    });
}

loadGame();
