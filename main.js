'use strict'
const score = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameArea = document.querySelector('.gameArea');
const gameMessage = document.querySelector('.gameMessage');
const mainText = document.querySelector('.main');

const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');

//키보드 감지처리 
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);
//game start 기능
startBtn.addEventListener('click', start);
gameMessage.addEventListener('click', start);

let keys = {};


let player = {
    x:0, //플레이어 객체의 좌표
    y:0,
    speed:2.5,
    score: 0,
    inplay: false
};

let pipe = {
    startPos : 0,
    spaceBetweenRow: 0,
    spaceBetweenCol: 0,
    pipeCount: 0
};


function start(){
    player.inplay = true;
    player.score = 0;
    gameArea.innerHTML = '';
    gameMessage.classList.add('hide');
    startBtn.classList.add('hide');
    mainText.classList.add('hide');
    let bird = document.createElement('div');
    let wing = document.createElement('div');
    bird.setAttribute('class', 'bird');
    wing.setAttribute('class', 'wing');
    wing.pos = 15;
    wing.style.top = wing.pos + "px";
    bird.appendChild(wing);
    gameArea.appendChild(bird);
    player.x = bird.offsetLeft;
    player.y = bird.offsetTop;

    pipe.startPos = 0;
    pipe.spaceBetweenRow = 400;
    pipe.pipeCount = Math.floor(gameArea.offsetWidth / pipe.spaceBetweenRow);

    for(let i = 0; i < pipe.pipeCount; i++){
        makePipe(pipe.startPos * pipe.spaceBetweenRow);
        pipe.startPos++;
    }
    window.requestAnimationFrame(playGame);
    playSound(bgSound);
}

function makePipe(pipePos){
    let totalHiget = gameArea.offsetHeight;
    let totalWidth = gameArea.offsetWidth;
    
    let pipeUp = document.createElement('div');
    pipeUp.classList.add('pipe');
    pipeUp.height = Math.floor( Math.random() * 350 );
    pipeUp.style.height = pipeUp.height + 'px';
    pipeUp.style.left = totalWidth + pipePos + 'px';
    pipeUp.x = totalWidth + pipePos;
    pipeUp.style.top = "0px";
    pipeUp.style.backgroundColor = 'red';
    gameArea.appendChild(pipeUp);

    pipe.spaceBetweenCol = Math.floor( Math.random() * 250 ) + 150;

    let pipeDown = document.createElement('div');
    pipeDown.classList.add('pipe');
    pipeDown.style.height = totalHiget - pipeUp.height - pipe.spaceBetweenCol + 'px';
    pipeDown.style.left = totalWidth + pipePos + 'px';
    pipeDown.x = totalWidth + pipePos;
    pipeDown.style.bottom = "0px";
    pipeDown.style.backgroundColor = 'black';
    gameArea.appendChild(pipeDown);
}

function playGame(){
    if(player.inplay == true){
        let bird = document.querySelector('.bird');
        let wing = document.querySelector('.wing');
        let move = false;
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
            move = true;
        }
        if(keys.ArrowRight && player.x < gameArea.offsetWidth - bird.offsetWidth){
            player.x += player.speed;
            move = true;
        }
        if((keys.ArrowUp || keys.Space) && player.y > 0){
            player.y -= player.speed * 4;
            move = true;
        }
        if(keys.ArrowDown && player.y < gameArea.offsetHeight - bird.offsetHeight){
            player.y += player.speed;
            move = true;
        }
        if(move){
            wing.pos = wing.pos === 15 ? 25 : 15;
            wing.style.top = wing.pos + "px";
        }

        player.y += player.speed * 2;
        if(player.y > gameArea.offsetHeight){
            playGameOver();
        }
        bird.style.left = player.x +'px';
        bird.style.top = player.y +'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = `SCORE : ${player.score}`;
    }
}

function playGameOver(){
    player.inplay = false;
    stopSound(bgSound);
    playSound(alertSound);
    gameMessage.classList.remove('hide');
    gameMessage.innerHTML = 
    `Game Over 당신의 점수는 ${player.score}점 입니다.<br>
    다시 시작하려면 여기를 누르세요!`
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

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}