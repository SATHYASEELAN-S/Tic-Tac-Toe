const cellElements = document.querySelectorAll(".cell")
const board = document.getElementById("board")
const messageWinning=document.getElementById("messagewinning")
const messageWinningText= document.querySelector(".winning-message-text")
const restartGame= document.querySelector("#restartbutton")
const xClass = 'x'
const circleClass = "circle"
let circleTurn=false
let arr=[]

startgame()

function startgame(){
     circleTurn=false
     arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
cellElements.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
    cell.removeEventListener('click',handleclick)
    cell.addEventListener("click", handleclick, { once: true })
})
boardhover()
}


restartGame.addEventListener('click',function(){
    startgame()
    messageWinning.classList.add("winning-message-show")
})

function handleclick(e) {
    const cell = e.target
    const currentclass = circleTurn ? circleClass : xClass
    placeMark(cell, currentclass)
}
function placeMark(cell, currentclass) {
    cell.classList.add(currentclass)

    arr[cell.getAttribute('id')]=currentclass
    const winornot=check()

    if (winornot==1)
    {
       messageWinning.classList.remove("winning-message-show")
        messageWinningText.textContent=`${circleTurn?"O":"X"}'s Wins`
       console.log("Wins");
    }
    else if(winornot==0)
     {
      messageWinning.classList.remove("winning-message-show")
      messageWinningText.textContent=`Match Draw`
     }

    switchTurns()
    boardhover()
}

function switchTurns() {
    circleTurn = !circleTurn
}

function boardhover() {
    board.classList.remove("x")
    board.classList.remove("circle")
    if (circleTurn) {
        board.classList.add("circle")
    }
    else {
        board.classList.add("x")
    }
}

function check() {
    if (arr[1] == arr[2] && arr[2] === arr[3])
        return 1
    else if (arr[4] == arr[5] && arr[5] === arr[6])
        return 1
    else if (arr[7] == arr[8] && arr[8] === arr[9]) 
        return 1
    else if (arr[1] == arr[4] && arr[4] === arr[7])
        return 1
    else if (arr[2] == arr[5] && arr[5] === arr[8]) 
        return 1
    else if (arr[3] == arr[6] && arr[6] === arr[9]) 
        return 1    
    else if (arr[1] == arr[5] && arr[5] === arr[9]) 
        return 1
    else if (arr[7] == arr[5] && arr[5] === arr[3]) 
        return 1
    else if (arr[1] != 1 && arr[2] != 2 && arr[3] != 3
        && arr[4] != 4 && arr[5] != 5 &&
        arr[6] != 6 && arr[7] != 7 && arr[8] != 8 && arr[9] != 9)
        return 0
}



