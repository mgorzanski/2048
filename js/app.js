import $ from 'jquery';

window.$ = $;

class Game {
  constructor() {
    this.board = [
      2,2,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
    ];
    this.game = $("#game");
    this.startValue = 2;
  }

  drawBoard() {
    this.board.map((value, index) => {
      if(value !== 0) {
        //Template String Literals
        const boxInner = `<div class="box-value">${value}</div>`;
        const boxOuter = `<div id="box-${index}" class="box">${boxInner}</div>`;
        this.game.append(boxOuter);
      } else {
        const boxOuter = `<div id="box-${index}" class="box"></div>`;
        this.game.append(boxOuter);
      }
    });
  }

  makeMove(direction) {
    let newBoard = this.board.slice(0);
    let blocksChanged = false;

    newBoard = checkRow(newBoard, 0, direction);
    newBoard = checkRow(newBoard, 1, direction);
    newBoard = checkRow(newBoard, 2, direction);
    newBoard = checkRow(newBoard, 3, direction);

    function checkRow(board, row_col, direction) {
      let currBoard = board.slice(0);
      let importantBlocksChanged = false;

      if(row_col === 0) {
        if(direction === "left" || direction === "right") {
          var tempBoard = board.slice(0,4);
          var index = 0;
        } else if(direction == "up" || direction === "down") {
          var tempBoard = getColArray(board.slice(0), 0);
        }
      } else if(row_col === 1) {
        if(direction === "left" || direction === "right") {
          var tempBoard = board.slice(4,8);
          var index = 4;
        } else if(direction == "up" || direction === "down") {
          var tempBoard = getColArray(board.slice(0), 1);
        }
      } else if(row_col === 2) {
        if(direction === "left" || direction === "right") {
          var tempBoard = board.slice(8,12);
          var index = 8;
        } else if(direction == "up" || direction === "down") {
          var tempBoard = getColArray(board.slice(0), 2);
        }
      } else if(row_col === 3) {
        if(direction === "left" || direction === "right") {
          var tempBoard = board.slice(12,16);
          var index = 12;
        } else if(direction == "up" || direction === "down") {
          var tempBoard = getColArray(board.slice(0), 3);
        }
      }

      let el0, el1, el2, el3;

      switch(direction) {
        case "left":
          el0 = index+0;
          el1 = index+1;
          el2 = index+2;
          el3 = index+3;
          break;

        case "right":
          el0 = index+3;
          el1 = index+2;
          el2 = index+1;
          el3 = index+0;
          break;

        case "up":
          el0 = index+3;
          el1 = index+2;
          el2 = index+1;
          el3 = index+0;
          break;

        case "down":
          el0 = index+0;
          el1 = index+1;
          el2 = index+2;
          el3 = index+3;
          break;
      }

      changeBlocks();

      function changeBlocks() {
        if(tempBoard.find(moreThanZero) != undefined) {
          //last two blocks
          if(currBoard[el2] != 0 && currBoard[el2] == currBoard[el3]) {
            if(currBoard[el1] == 0) {
              if(currBoard[el0] == 0) {
                currBoard[el0] = currBoard[el2]*2;
                currBoard[el1] = currBoard[el2] = currBoard[el3] = 0;
              } else {
                currBoard[el1] = currBoard[el2]*2;
                currBoard[el2] = currBoard[el3] = 0;
              }
            } else {
              currBoard[el2] *= 2;
              currBoard[el3] = 0;
            }
            importantBlocksChanged = true;
            blocksChanged = true;
          }

          //two middle blocks
          if(currBoard[el1] != 0 && currBoard[el1] == currBoard[el2] && !importantBlocksChanged) {
            if(currBoard[el0] == 0) {
              currBoard[el0] = currBoard[el1]*2;
              if(currBoard[el3] != 0) {
                currBoard[el1] = currBoard[el3];
                currBoard[el2] = currBoard[el3] = 0;
              } else {
                currBoard[el1] = currBoard[el2] = currBoard[el3] = 0;
              }
            } else {
              currBoard[el1] = currBoard[el2]*2;
              currBoard[el2] = currBoard[el3];
              currBoard[el3] = 0;
            }
            importantBlocksChanged = true
            blocksChanged = true;
          }

          //two first blocks
          if(currBoard[el0] != 0 && currBoard[el0] == currBoard[el1] && !importantBlocksChanged) {
            currBoard[el0] *= 2;
            currBoard[el1] = currBoard[el2];
            currBoard[el2] = currBoard[el3];
            currBoard[el3] = 0;
            importantBlocksChanged = true;
            blocksChanged = true;
          }

          if(currBoard[el1] != 0) {
            if(currBoard[el0] == 0) {
              currBoard[el0] = currBoard[el1];
              currBoard[el1] = currBoard[el2];
              currBoard[el2] = currBoard[el3];
              currBoard[el3] = 0;
              blocksChanged = true;
            }
          }

          if(currBoard[el2] != 0) {
            if(currBoard[el1] == 0) {
              if(currBoard[el0] == 0) {
                currBoard[el0] = currBoard[el2];
                currBoard[el1] = currBoard[el3];
                currBoard[el3] = currBoard[el2] = 0;
              } else if(currBoard[el0] == currBoard[el2]) {
                currBoard[el0] *= 2;
                currBoard[el2] = 0;
              } else {
                currBoard[el1] = currBoard[el2];
                currBoard[el2] = currBoard[el3];
                currBoard[el3] = 0;
              }
              blocksChanged = true;
            }
          }

          if(currBoard[el3] != 0) {
            if(currBoard[el2] == 0) {
              if(currBoard[el1] == 0) {
                if(currBoard[el0] == 0) {
                  currBoard[el0] = currBoard[el3];
                  currBoard[el3] = currBoard[el2] = currBoard[el1] = 0;
                } else if(currBoard[el0] == currBoard[el3]) {
                  currBoard[el0] *= 2;
                  currBoard[el3] = 0;
                } else {
                  currBoard[el1] = currBoard[el3];
                  currBoard[el3] = currBoard[el2] = 0;
                }
              } else if(currBoard[el1] == currBoard[el3]) {
                currBoard[el1] *= 2;
                currBoard[el3] = 0;
              } else {
                currBoard[el2] = currBoard[el3];
                currBoard[el3] = 0;
              }
              blocksChanged = true;
            }
          }
        }
      }

      return currBoard;
    }

    function moreThanZero(element) {
      return element > 0;
    }

    //get every fourth element from array
    function getColArray(board, col) {
      var tempBoardCurr = [];
      let delta = Math.floor(board.length/4);
      for (let i = col; i < board.length; i=i+delta) {
        tempBoardCurr.push(board[i]);
      }
      return tempBoardCurr;
    }

    if(blocksChanged && !this.onlyOneBoxEmpty(newBoard)) {
      var newBox = this.generateRandomBox(newBoard);
      newBoard[newBox] = this.startValue;
    }

    this.board = newBoard;
    this.clearBoard();
    this.drawBoard();
  }

  onlyOneBoxEmpty(board = this.board) {
    let emptyBoxes = 0;
    board.map((value) => {
      if(value === 0) {
        emptyBoxes++;
      }
    });

    if(emptyBoxes === 1) {
      return true;
    }
    return false;
  }

  generateRandomBox(board = this.board) {
    do {
      var random = Math.floor(Math.random() * 16);
    } while(board[random] != 0);

    return random;
  }

  clearBoard() {
    this.game.empty();
  }

  start() {
    this.drawBoard();
    document.onkeydown = (evt) => {
      switch(evt.keyCode) {
        case 37:
          evt.preventDefault();
          this.makeMove("left");
          break;
        case 39:
          evt.preventDefault();
          this.makeMove("right");
          break;
        case 38:
          evt.preventDefault();
          this.makeMove("up");
          break;
        case 40:
          evt.preventDefault();
          this.makeMove("down");
          break;
      }
    }
  }
}

$(document).ready(() => {
  var game = new Game();
  game.start();
});