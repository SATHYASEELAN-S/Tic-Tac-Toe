const cellElements = document.querySelectorAll(".cell");
const boardHover = document.querySelector(".board")
const messageWinning = document.getElementById("messagewinning");
const messageWinningText = document.querySelector(".winning-message-text");
const restartGame = document.querySelector("#restartbutton");
const type = document.getElementById("type")
const xScore = document.getElementById("player-x")
const oScore = document.getElementById("player-o")
const human = "x";
let level = parseInt(type.value)
const ai = "O";
let board = ["", "", "", "", "", "", "", "", "", ""];
let winner=null
let x = 0, o = 0
let circleTurn = false
let current


startgame();

type.addEventListener("change", function () {
    console.log(type.value);
    level = parseInt(type.value)
    startgame()
})

function startgame() {
    x = 0, o = 0
    scoreUpdate()
    board = ["", "", "", "", "", "", "", "", "", ""];
    cellElements.forEach((cell) => {
        messageWinningText.textContent = "  ";
        cell.classList.remove(human);
        cell.classList.remove(ai);
        cell.removeEventListener("click", handleclick);
        cell.addEventListener("click", handleclick, { once: true });
    });
}

restartGame.addEventListener("click", function () {
    startgame();
    messageWinning.classList.add("winning-message-show");
});

function handleclick(e) {
    const cell = e.target;


    if (type.value != "human") {
        placeMark(cell, human)
        if (checkwinner()) {
            message()
        } else {
            let move = bestmove()
            let aiCell = document.getElementById(move)
            placeMark(aiCell, ai)
            if (checkwinner()) {
                message()
            }
            console.log(board);
        }
    }
    else {

       
        current = circleTurn ? ai : human
        console.log(current,"cureent ");
        
        placeMark(cell, current)
        w = checkwinner();
        console.log("win", w);


        if (w) {
            message()
            console.log("true");

        }

        switchTurn()
        boardhover()

    }
}
function switchTurn() {
    circleTurn = !circleTurn
}
function boardhover() {
    boardHover.classList.remove(human)
    boardHover.classList.remove(ai)
    let hoverClass = circleTurn ? ai : human
    boardHover.classList.add(hoverClass)
}

function message() {
    if (winner == null) {
        messageWinningText.textContent = "Match Draw";
    } else {
    
        cellElements.forEach((cell) => {
        cell.removeEventListener("click", handleclick);  
        })
        messageWinningText.textContent = winner + "'s Won";
        if (winner == 'x') {
            x++
           
            console.log(x);
        } else if (winner == 'O') {
            o++
           
            console.log(o);
        }
        scoreUpdate()
    }
}

function scoreUpdate()
{
 xScore.textContent = `Your Score ${x}`
 oScore.textContent = `O' Score ${o}`
}


function bestmove() {
    let move;
    let bestscore = -Infinity;

    for (let i = 1; i < 10; i++) {
        if (board[i] == "") {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestscore) {
                bestscore = score;
                move = i;
            }
        }
    }
    board[move] = ai;
    return move;
}

let scores = [
    {
        x: 0,
        O: 0,
        draw: 1,
    }, {

        x: -1,
        O: 1,
        draw: 0,
    }]

function minimax(board, depth, isMaximizing) {
    let result = checkwinner();
    if (result !== null) {
        return scores[level][result];
    }
    if (isMaximizing) {
        let bestscore = -Infinity;
        for (let i = 1; i < 10; i++) {
            if (board[i] == "") {
                board[i] = ai;
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                if (score > bestscore) {
                    bestscore = score;
                }
            }
        }
        return bestscore;
    } else {
        let bestscore = Infinity;
        for (let i = 1; i < 10; i++) {
            if (board[i] == "") {
                board[i] = human;
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                if (score < bestscore) {
                    bestscore = score;
                }
            }
        }
        return bestscore;
    }
}

function placeMark(cell, placedMark) {
    const index=cell.getAttribute("id")
    cell.classList.add(placedMark);
    board[index] = placedMark;
    cell.removeEventListener("click", handleclick);    
}

function equal(a, b, c) {
    return a == b && b == c && a != "";
}

function checkwinner() {
    let currentclass = null;
    if (equal(board[1], board[2], board[3])) 
        currentclass = board[1];
    else if (equal(board[4], board[5], board[6])) 
        currentclass = board[4];
    else if (equal(board[7], board[8], board[9])) 
        currentclass = board[7];
    else if (equal(board[1], board[4], board[7])) 
        currentclass = board[4];
    else if (equal(board[2], board[5], board[8])) 
        currentclass = board[2];
    else if (equal(board[3], board[6], board[9]))
         currentclass = board[9];
    else if (equal(board[1], board[5], board[9])) 
        currentclass = board[9];
    else if (equal(board[3], board[5], board[7])) 
        currentclass = board[7];
    else if (
        board[1] != "" &&
        board[2] != "" &&
        board[3] != "" &&
        board[4] != "" &&
        board[5] != "" &&
        board[6] != "" &&
        board[7] != "" &&
        board[8] != "" &&
        board[9] != ""
    )
        return "Draw";
    winner =currentclass
    return winner;
}
