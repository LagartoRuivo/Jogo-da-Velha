const boardsRegions = document.querySelectorAll("#gameBoardReal span")
let vBoard = []

let turnPlayer = ''

function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame(){
    const display = document.getElementById('gameBoard').style.display
    if(display === "none" || display === ""){
        document.getElementById("gameBoard").style.display = 'flex'
        document.getElementById("gameOld").style.display = 'none'
    }
    vBoard = [['','',''],['','',''],['','','']]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    boardsRegions.forEach( function(element){
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', handleBoardClick)
        element.style.cursor = 'pointer'
    })
}

function handleBoardClick(ev){
    const region = ev.currentTarget.dataset.region
    const regionRemove = ev.currentTarget
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    const allRegions = document.querySelectorAll('#gameBoardReal span')

    if(turnPlayer === 'player1'){
        ev.currentTarget.innerText = "X"
        vBoard[row][column] = "X"
    }else{
        ev.currentTarget.innerText = "O"
        vBoard[row][column] = "O"
    }

    regionRemove.removeEventListener('click',handleBoardClick)
    regionRemove.style.cursor = 'default'

    const winRegions = getWinRegions();
    if (winRegions.length > 0){
        const playerWin = document.getElementById(turnPlayer)
        document.querySelector('h2').innerHTML = "Parabéns "+playerWin.value+" você venceu!!!"
        handleWin(winRegions)
        allRegions.forEach( function(region){
            region.removeEventListener('click',handleBoardClick)
            region.style.cursor = 'default'
        })
    }else if(vBoard.flat().includes('')){
        if(turnPlayer === 'player1'){
            turnPlayer = 'player2'
        }else{
            turnPlayer = 'player1'
        }
        document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
        updateTitle()
    }else{
        const displayOld = document.getElementById("gameOld").style.display
        if(displayOld === "none" || displayOld === ""){
            document.getElementById("gameOld").style.display = 'flex'
            document.getElementById("gameBoard").style.display = 'none'
        }

        document.querySelector('h2').innerHTML = "DEU VÉIA!!"
    }
}

function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
      winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
      winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
      winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
      winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
      winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
      winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
      winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

function handleWin(regions){
    regions.forEach(function (region){
        document.querySelector('[data-region="'+region+'"]').classList.add('win')
    })
}

document.getElementById('start').addEventListener('click', function(){
    initializeGame()
})