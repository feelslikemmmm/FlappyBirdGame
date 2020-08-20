const score = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameArea = document.querySelector('.gameArea');
const gameMessage = document.querySelector('.gameMessage');

//키보드 감지처리 
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);
//game start 기능
startBtn.addEventListener('click', start);
gameMessage.addEventListener('click', start);

let keys = { };  

function start(){
    gameMessage.classList.add('hide');
    startBtn.classList.add('hide');
}

function pressOn(e){
    console.log(e.code);
    keys[e.code] = true;
    console.log(keys);
}

function pressOff(e){
    console.log(e.code);
    keys[e.code] = false;
    console.log(keys);
}