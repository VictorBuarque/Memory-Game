// DOM Elements
const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
const spanPlayer = document.querySelector('.player');
const button = document.querySelector('button');

// Card Numbers
const actors = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
];

// Game variables
let firstCard = '';
let secondCard = '';
let loop;

// Revealing cards
const revealCard = ({ target }) => {
    if (target.parentNode.classList.contains('back')) {
        return;
    }
    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCard();
    }
}

// Verify Winner
const checkWinner = () => {
    const disabled = document.querySelectorAll('.disabled-card');
    if (disabled.length === 20) {
        button.removeAttribute('disabled');
        clearInterval(loop);
        alert(`Parabéns ${spanPlayer.innerHTML}, seu tempo foi de ${timer.innerHTML}`);
    }
}

// Verify card functionality
const checkCard = () => {
    const firstActor = firstCard.getAttribute('data-actors');
    const secondActor = secondCard.getAttribute('data-actors');

    if (firstActor === secondActor) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkWinner();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

// Creating HTML elements 
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Creating cards
const createCard = (actors) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('./assets/img/${actors}.jpeg')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-actors', actors);

    return card;
}

// Load game function
const loadGame = () => {
    const duplicateActors = [...actors, ...actors];
    const shuffleCards = duplicateActors.sort(() => Math.random() - 0.5);

    shuffleCards.forEach((actor) => {
        const card = createCard(actor);
        grid.appendChild(card);
    });
}

// Start timer function
const startTimer = () => {
    loop = setInterval(() => {
        const currentTimer = Number(timer.innerHTML);
        timer.innerHTML = currentTimer + 1;
    }, 1000);
}

// Start the game when window is fully loaded
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();

    // Restart event
    button.addEventListener('click', restart);
};

// Restart game
function restart() {
    clearPage();
    clearInterval(loop);
    timer.innerHTML = '0';
    startTimer();
    loadGame();
}

// Clear Page
function clearPage() {
    grid.innerHTML = '';
}
