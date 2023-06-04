/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let currPlayer = 1; // active player: 1 or 2

const WIDTH = 7;
const HEIGHT = 6;

let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: add comment for this code
  // top is the top row where players will select which column they wish to place their piece
  const top = document.createElement("tr");
  // top.setAttribute("id", "column-top");
  top.id = "column-top";
  top.addEventListener("click", handleClick);

  // creates DOM nodes that iterates through WIDTH value
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.id = x;
    top.append(headCell);

    // const newCell = `<td id="${x}"></td>`
    // cells += newCell
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creates DOM nodes that iterates through HEIGHT value to create rows
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); // row is just a reference

    // creates the table cells for current iteration of row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // creates an id attribute for each column/row value
      cell.id = `${y}-${x}`;
      //attaches cell to row
      row.append(cell);
    }
    // attaches created row to HTMLboard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // y is/are the rows on the board
  for (let y = board.length - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const playerPiece = document.createElement("div");
  playerPiece.classList.add("piece");

  playerPiece.classList.add(`piece--player-${currPlayer}`);

  // Gets a new Id for each cell, then we add the playerPiece to the cell
  // cell fetches the position in the DOM, the append puts  it in that fetched position
  const cell = document.getElementById(`${y}-${x}`);
  cell.append(playerPiece);
}

/** endGame: announce game end */

function endGame() {
  // TODO: pop up alert message
  alert(`Player ${currPlayer} won the game! Try again?`);
}

/* switch player function */
function switchPlayer() {
  let soonToBeCurrPlayer = currPlayer === 1 ? 2 : 1;
  let playerText = document.querySelector(".curr-player");
  playerText.querySelector(".curr-player-number").textContent =
    //this employs one of the players 1 or 2
    soonToBeCurrPlayer;
  // allows for ability to remove 1 or 2 to player
  playerText.classList.remove(`player-1`);
  playerText.classList.remove(`player-2`);
  // allows for 1 or 2 to be switched in the player turn box
  playerText.classList.add(`player-${soonToBeCurrPlayer}`);
  currPlayer = soonToBeCurrPlayer;
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x (col) from ID of clicked cell
  // +evt turns it into an integer rather than a string(shorthand way to use parseInt)
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // this replaces undefined with a piece
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("It was a tie! Try again?");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  switchPlayer();
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // loops through each row and column and builds what a win should look like
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // here is one sceneario of a win looking across the row
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      // scenario of a win with a column win
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      // scenario of a diagonal right win
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      // scenario of a diagonal left win
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      // once a win is reached, this code runs
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
makeBoard();
makeHtmlBoard();
