const title = document.querySelector('.hero__title');
const pad = document.querySelectorAll('.simon-game__pad');
const wrapper = document.querySelector('.wrapper');
const padAmt = pad.length;

let simonSq = [];
let userSq = [];
let lvl = 0;
let isUserTurn = false;
let gameInProcess = false;

function generateRandNum(){
  let randomNum = Math.floor(Math.random() * padAmt);
  simonSq.push(randomNum);
  return simonSq;
}

function padSound(padSoundNum){
  switch (padSoundNum) {
    case 0:
      new Audio('./sounds/green.mp3').play();
      break;
    case 1:
      new Audio('./sounds/red.mp3').play();
      break;
    case 2:
      new Audio('./sounds/yellow.mp3').play();
    break;
    case 3:
      new Audio ('./sounds/blue.mp3').play();
    break;
    default: console.log('Error pad sound num is ' + padSoundNum);
      break;
  }
}

function padAnimation(padAnimNum){
  pad[padAnimNum].classList.toggle('simon-game__pad--selected');
  setTimeout(() => {
    pad[padAnimNum].classList.toggle('simon-game__pad--selected');
  }, 100);
}

document.addEventListener('keydown', startGameGate);
document.addEventListener('click', startGameGate);

function startGameGate(e){
  if(e.target.closest('.simon-game__pad')) return;
  if(gameInProcess === true) return;
  startGame();
}

function startGame(){
  title.textContent = 'Level 1';
  callNextPad(lvl);
  gameInProcess = true;
  isUserTurn = true;
}

function callNextPad(level){
  generateRandNum();
  padAnimation(simonSq[level]);
  padSound(simonSq[level]);
  console.log(simonSq);
  isUserTurn = true;
}

userInput();

function userInput(){
  for (let i = 0; i < padAmt; i++) {
    pad[i].addEventListener('click', () => nextLevel(i));
  }
}

function nextLevel(padClicked){
  if(!gameInProcess) return;
  if (!isUserTurn) return;
  padAnimation(padClicked);
  padSound(padClicked);
  userSq.push(padClicked);
  isUserTurn = false;
  let currentStep = userSq.length - 1;
  if (userSq[currentStep] !== simonSq[currentStep]) {
    title.textContent = 'Game over';
    new Audio('./sounds/wrong.mp3').play();
    wrapper.classList.toggle('wrapper--game-over');
    clean();
    gameInProcess = false;
    setTimeout(() => {
      wrapper.classList.toggle('wrapper--game-over');
    }, 300);
    setTimeout(() => {
      title.textContent = 'Click or Press a Key';
    }, 1000);
  } else if (simonSq.length === userSq.length) {
    userSq = [];
    lvl = lvl + 1;
    console.log((lvl+1));
    setTimeout(() => {
      title.textContent = 'Level ' + (lvl+1);
      callNextPad(lvl);
    }, 800);
  } else {
    isUserTurn = true;
  }
}

function clean(){
  simonSq = [];
  userSq = [];
  lvl = 0;
}