const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

// Input validation function
const validadeInput = ({target}) => {
    if(target.value.length>2){
        button.removeAttribute('disabled');
        return;
    } else {
        button.setAttribute('disabled', '');
    }
};
// Saving input value
const handlesubmit = (event)=> {
    event.preventDefault(); //Default value prevention
    localStorage.setItem('player', input.value); // Save the value in local storage, need key and value everytime!
    window.location = 'game.html'
}





input.addEventListener('input', validadeInput);
form.addEventListener('submit', handlesubmit);