const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        score: document.querySelector("#score"),
        time: document.querySelector("#time"),
        startTela: document.querySelector(".start"),
        startBtn: document.querySelector(".botaoStart"),
        gameOverTela: document.querySelector(".gameOver"),
        startBtnGameOver: document.querySelector(".btnGoverStart"),
        scoreFinal: document.querySelector(".score-final"),
        easyButton: document.querySelector(".easy"),
        mediumButton: document.querySelector(".medium"),
        hardButton: document.querySelector(".hard"),
        textoDificuldade: document.querySelector(".texto-dificuldade")
    },
    values:{
        timerId: null,
        timerLeftId: null,
        contador: 0,
        curretTime: 60,
        velocidadeEnemy: 650
    },
};

let init = () => {}

state.view.easyButton.addEventListener('click', () => {
    state.view.textoDificuldade.innerHTML = "Dificuldade escolhida: fácil"
    state.values.velocidadeEnemy = 1000;
})

state.view.mediumButton.addEventListener('click', () => {
    state.view.textoDificuldade.innerHTML = "Dificuldade escolhida: médio"
    state.values.velocidadeEnemy = 650;
})

state.view.hardButton.addEventListener('click', () => {
    state.view.textoDificuldade.innerHTML = "Dificuldade escolhida: difícil"
    state.values.velocidadeEnemy = 550;
})

function curretDown(){
    state.values.curretTime--;
    state.view.time.innerHTML = state.values.curretTime; 
    
    if(state.values.curretTime <= 0){
        clearInterval(state.values.timerId);
        clearInterval(state.values.timerLeftId);
        state.view.score.innerHTML = '0';
        state.values.curretTime = 0;
        state.view.time.innerHTML = state.values.curretTime;
        gameOver()
    }
}

function playSound(){
    let audio = new Audio("./assets/sounds/hit.m4a")
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let numeroSorteado = parseInt(Math.floor(Math.random() * 9));
    let randomSquare = state.view.squares[numeroSorteado];

    randomSquare.classList.add("enemy");
}

let moveSquare = () => {
    state.values.timerId = setInterval(randomSquare, state.values.velocidadeEnemy)
}



let addListenerHitBox = () => {
    state.view.squares.forEach((square) => {
        square.addEventListener('click', function renderScore(){
            if(square.classList == "square enemy"){
                playSound();
                state.values.contador++
                state.view.score.innerHTML = state.values.contador;
            }
        })
    })
};

let = curretDownTimerId = () => {
    state.values.timerLeftId = setInterval(curretDown, 1000);
}



function startGame(){
    state.view.startBtn.addEventListener("click", () => {
        console.log('clickei');
        init = () => {
            moveSquare()
            addListenerHitBox()
            curretDownTimerId()
        };

        init();
        state.view.startTela.style.display = 'none';
    })
}

function reiniciarGame(){
    state.view.startBtnGameOver.addEventListener("click", () => {
        state.values.contador = 0;
        state.values.curretTime = 60;
        state.view.score.innerHTML = state.values.contador;
        console.log('clickei');
        state.view.gameOverTela.style.display = 'none';
    })
}

function gameOver() {
    addListenerHitBox = () => {return;}
    curretDownTimerId = () => {return;}
    moveSquare = () => {return;}
    reiniciarGame();
    curretDownTimerId = () => {state.values.timerLeftId = setInterval(curretDown, 1000);}
    moveSquare = () => {state.values.timerId = setInterval(randomSquare, 600)}
    init = () => {
        moveSquare()
        addListenerHitBox()
        curretDownTimerId()
    };
    init();
    state.view.gameOverTela.style.display = 'flex';
    state.view.scoreFinal.innerHTML = 'O seu score foi: ' + state.values.contador;
}

startGame()