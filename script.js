'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const newElement = document.querySelector('.btn--new');
const rollElement = document.querySelector('.btn--roll');
const holdElement = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let currentScore;
let activePlayer;
let scores;
let playing;
score0.textContent = 0;
score1.textContent = 0;

let init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceElement.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

newElement.addEventListener('click', init);

//rolling the dice
rollElement.addEventListener('click', function () {
  if (playing) {
    //generate random number
    const number = Math.trunc(Math.random() * 6) + 1;
    //display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${number}.png`;
    //check the dice number
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdElement.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
