document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [{row: 1, col:1, isMine: false, hidden: true}, {row: 1, col:2, isMine: false, hidden: true}, {row: 1, col:3, isMine: false, hidden: true}, {row: 2, col:1, isMine: true, hidden: true}, {row: 2, col:2, isMine: false, hidden: true}, {row: 2, col:3, isMine: false, hidden: true}, {row: 3, col:1, isMine: false, hidden: true}, {row: 3, col:2, isMine: false, hidden: true}, {row: 3, col:3, isMine: false, hidden: true}]
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  board.cells.forEach(element => element.surroundingMines = countSurroundingMines(element));
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin (cells) {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
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
  var surrounding = getSurroundingCells(cell.row, cell.col);
  console.log(surrounding);
  let counter = 0;
  for (i = 0; i < surrounding.length; i++){
    if(surrounding[i].isMine == true){
      counter++;
    }
  }
  return counter;
}