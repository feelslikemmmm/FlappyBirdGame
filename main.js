const score = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameArea = document.querySelector('.gameArea');
const gameMessage = document.querySelector('.gameMessage');


document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

//game start 기능
startBtn.addEventListener('click', start);
gameMessage.addEventListener('click', start);

function start(){
    gameMessage.classList.add('hide');
    startBtn.classList.add('hide');
}

//키보드 감지처리 
function pressOn(){
    console.log('pressOn');
}

function pressOff(){
    console.log('pressOff');
}