document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
let mineProbability = 0.25; //Sets the likelyhood of a cell being a mine (i.e 0.25 = 1 in 4 chance)

function cellMaker(row, col){
  return {
    row: row,
    col: col,
    isMine: (Math.random() > mineProbability ? false : true),
    isMarked: false,
    hidden: true
  }
}

//this function creates a board according to what boardsize is given
function createBoard(boardsize){
  cellsArray = [];
  z = 0;
  for(i = 1; i <= boardsize; i++){
    for(j = 1; j <= boardsize; j++){
      cellsArray[z] = cellMaker(i, j);
      z++;
    }
  }
  return cellsArray
}

//setting some variables for game
let board;
let difficulty;
var winGameSound = new Audio('audio/new_game.mp3');
var selectSound = new Audio('audio/select.mp3');
var newGameSound = new Audio('audio/win_game.mp3');

//This function clears and resets the gameboard
function gameReset(){
  newGameSound.play();
  let clearboard = document.getElementById('board');
  clearboard.innerHTML = "";
  difficulty = parseInt(document.getElementById("gamedifficulty").value);
  board = {cells: createBoard(difficulty)}
  board.cells.forEach(element => element.surroundingMines = countSurroundingMines(element));
  lib.initBoard()
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  document.getElementById("gamedifficulty").addEventListener("change", gameReset)
  document.getElementById("resetgame").addEventListener("click", gameReset)
  difficulty = parseInt(document.getElementById("gamedifficulty").value);
  board = {cells: createBoard(difficulty)}
  board.cells.forEach(element => element.surroundingMines = countSurroundingMines(element));
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin(){
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  selectSound.play();
  let minesTotal = document.getElementsByClassName("mine").length;
  let foundMines = document.getElementsByClassName("mine marked").length;
  let checkForHiddens = document.getElementsByClassName("hidden").length;
  if(foundMines == minesTotal && foundMines == checkForHiddens){
    lib.displayMessage('You win!');
    winGameSound.play();
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let counter = 0;
  for (i = 0; i < surrounding.length; i++){
    if(surrounding[i].isMine == true){
      counter++;
    }
  }
  return counter;
}