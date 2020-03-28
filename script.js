//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
}
);      

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //Validate 
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  if (guess === winningNum) {
    gameOver(true, `${guess} is correct. You win!`); 
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //Game over - lost 
      gameOver(false, `Game over. You lost! The correct number was ${winningNum}`);
    } else {
      //Game continues - answer wrong
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is wrong. You have ${guessesLeft} guesses left`, 'red');
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver (won, msg) {
  won === true ? color = 'green' : color = 'red';
  guessInput.disable = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color)

  //Play again
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';

}

function getRandomNum(min, max){
  return Math.floor((Math.random()*(max-min+1)+min));
}