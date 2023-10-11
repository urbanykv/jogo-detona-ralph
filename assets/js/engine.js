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
        scoreFinal: document.querySelector(".score-final")
    },
    values:{
        timerId: null,
        contador: 0,
        curretTime: 3,
    },
};

let init = () => {}

function curretDown(){
    state.values.curretTime--;
    state.view.time.innerHTML = state.values.curretTime; 
    
    if(state.values.curretTime <= 0  || state.values.contador < 0){
        init = () => {return;}
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

function moveSquare(){
    state.values.timerId = setInterval(randomSquare, 600)
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('click', () => {
            console.log(square);
            if(square.classList == "square enemy"){
                state.values.contador++
                state.view.score.innerHTML = state.values.contador;
                playSound();
            }else if(square.classList == "square"){
                state.values.contador--
                state.view.score.innerHTML = state.values.contador;
            }
        })
    })
};

function curretDownTimerId(){
    state.values.timerId= setInterval(curretDown, 1000)
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
        console.log('clickei');
        init = () => {
            moveSquare()
            addListenerHitBox()
            curretDownTimerId()
        };
        init();
        state.view.gameOverTela.style.display = 'none';
    })
}

function gameOver() {
    init = () => {null}

    reiniciarGame();

    clearInterval(state.values.timerId);

    state.view.gameOverTela.style.display = 'flex';
    state.view.scoreFinal.innerHTML = state.values.contador;
}

startGame()