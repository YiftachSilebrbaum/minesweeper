'use strict'

const BOMB = '💣'
const FLAG = '🚩'

var gBoard
var gSize = 4
var gMines = 2

gBoard = buildBoard(gSize)
updateNegs(gBoard)
console.table(gBoard)
renderBoard(gBoard)

//builds our board data
function buildBoard(size){

  var newBoard = []
  var mines = getMines(2)
  newBoard = createMat(size)

setMines(newBoard , mines)

for(var i = 0 ; i < newBoard.length ; i++){
      
      for(var j = 0 ; j < newBoard.length; j++){

        if(newBoard[i][j].isMine) continue
        
        newBoard[i][j] = (createCell())
        
}

}

return newBoard

}

//updates the number of neigbors for each cell
function updateNegs(board){

  for(var i = 0 ; i < board.length ; i++){
     for(var j = 0 ; j < board.length ; j++){
      var currCell = board[i][j]

      if(currCell.isMine) continue

      currCell.minesAroundCount = countNegs(i , j)  

}

}

}

//creats mine object
function createMine(row , col){

   var mine = {
      i: row,
      j: col
    }

    return mine
}

//creats cell object
function createCell(){

  var cell = {

    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false

  }

return cell

}

//produces an array of mines
function getMines(num){

var minesLoc = []

for(var i = 0; i < num ; i++){

  minesLoc.push(createMine(getRandomIntInclusive(0 , 3),getRandomIntInclusive(0 , 3)))

}

return minesLoc

}

//sets our mines on the board
function setMines(board , mines){

   for(var i  = 0 ; i < mines.length ; i++){

    board[mines[i].i][mines[i].j] = createCell()
    board[mines[i].i][mines[i].j].isMine = true

}


}

// Render the board to an HTML table
function renderBoard(board) {
  console.log('board', board)
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]

      //var cellClass = getClassName({ i: i, j: j }) + ' '
      //cellClass += (currCell.isMine) ? 'wall' : 'floor'
      
      strHTML += `<td class="cell floor"  onclick="exposePlace(${i},${j})" >`

      if(currCell.isShown){

      if (currCell.isMine) {
        strHTML += BOMB
      } else 
        strHTML += currCell.minesAroundCount
    }
      

      strHTML += '</td>'
    }
    strHTML += '</tr>'
    // console.log('strHTML', strHTML)
  }

  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML

}

//counts how many bombs surround a cell 
function countNegs(currCellI , currcellJ){

var negsCount = 0;

    for (var i = currCellI - 1; i <= currCellI + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue;
      for (var j = currcellJ - 1; j <= currcellJ + 1; j++) {
        if (j < 0 || j >= gBoard.length) continue;
        if (i === currCellI && j === currcellJ) continue;
        var currCell = gBoard[i][j]
        if (currCell.isMine) negsCount++;
      }
    }

    return negsCount

  }

function exposePlace(i , j){

  if(gBoard[i][j].isMine) gameOver()
gBoard[i][j].isShown = true
renderBoard(gBoard)
}

// function renderCell(i , j){

//   const elCell = document.querySelector(`.cell-${i}-${j}`)
//   elCell.innerText = gBoard[i][j].minesAroundCount

// }

function gameOver(){

 
 var elTitle = document.querySelector('h2') 
 elTitle.innerHTML = 'you lost!'
 exposeAllBombs(gBoard)

}

function exposeAllBombs(Board){

for(var i = 0 ; i < Board.length ; i++){

   for(var j = 0 ; j < Board.length ; j++)

   if(gBoard[i][j].isMine) gBoard[i][j].isShown = true

}

renderBoard(gBoard)

}


