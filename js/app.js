class Game {
  constructor() {
    this.board = [
      2,2,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
    ];
    this.game = document.getElementById("game");
    this.blockDefaultValue = 2;
    this.blocksChanged = false;
    this.score = 0;
    this.noChangesLeft = false;
    this.noChangesRight = false;
    this.noChangesUp = false;
    this.noChangesDown = false;
  }

  drawBoard() {
    this.board.map((value, index) => {
      if(value !== 0) {
        const boxInner = '<div class="box-value">' + value + '</div>';
        let boxOuter = document.createElement('div');
        boxOuter.id = index;
        boxOuter.className = "box";
        boxOuter.innerHTML = boxInner;
        this.game = document.getElementById("game").appendChild(boxOuter);
      } else {
        let boxOuter = document.createElement('div');
        boxOuter.id = index;
        boxOuter.className = "box";
        this.game = document.getElementById("game").appendChild(boxOuter);
      }
    });
  }

  makeMove(direction) {
    let newBoard = this.board.slice(0);

    for(let i = 0; i < 4; i++) {
      newBoard = this.checkLine(newBoard, i, direction);
    }

    if(this.blocksChanged) {
      if(this.isEmptyBox(newBoard)) {
        let newBox = this.generateRandomBox(newBoard);
        newBoard[newBox] = this.blockDefaultValue;
        this.blocksChanged = false;
        this.noChangesLeft = false;
        this.noChangesRight = false;
        this.noChangesUp = false;
        this.noChangesDown = false;
      }
    } else {
      switch(direction) {
        case "left":
        this.noChangesLeft = true;
        break;

        case "right":
        this.noChangesRight = true;
        break;

        case "up":
        this.noChangesUp = true;
        break;

        case "down":
        this.noChangesDown = true;
        break;
      }
    }

    this.updateScore();
    this.board = newBoard;
    this.clearBoard();
    this.drawBoard();

    if(this.playerWon()) {
      setTimeout(() => {
        alert("Wygrałeś!");
        this.restartGame();
      }, 100);
    } else if(this.noChangesLeft && this.noChangesRight && this.noChangesUp && this.noChangesDown) {
      alert("Przegrałeś!");
      this.restartGame();
    }
  }

  checkLine(board, line, direction) {
    let currBoard = board.slice(0);

    switch(line) {
      case 0:
      if(direction === "left" || direction === "right") {
        var tempBoard = board.slice(0,4);
        var index = 0;
      } else if(direction == "up" || direction === "down") {
        var tempBoard = this.getColArray(board.slice(0), 0);
        var index = 0;
      }
      break;

      case 1:
      if(direction === "left" || direction === "right") {
        var tempBoard = board.slice(4,8);
        var index = 4;
      } else if(direction == "up" || direction === "down") {
        var tempBoard = this.getColArray(board.slice(0), 1);
        var index = 1;
      }
      break;

      case 2:
      if(direction === "left" || direction === "right") {
        var tempBoard = board.slice(8,12);
        var index = 8;
      } else if(direction == "up" || direction === "down") {
        var tempBoard = this.getColArray(board.slice(0), 2);
        var index = 2;
      }
      break;

      case 3:
      if(direction === "left" || direction === "right") {
        var tempBoard = board.slice(12,16);
        var index = 12;
      } else if(direction == "up" || direction === "down") {
        var tempBoard = this.getColArray(board.slice(0), 3);
        var index = 3;
      }
      break;
    }

    switch(direction) {
      case "left":
      var el0 = index+0;
      var el1 = index+1;
      var el2 = index+2;
      var el3 = index+3;
      break;

      case "right":
      var el0 = index+3;
      var el1 = index+2;
      var el2 = index+1;
      var el3 = index+0;
      break;

      case "up":
      var el0 = index+0;
      var el1 = index+4;
      var el2 = index+8;
      var el3 = index+12;
      break;

      case "down":
      var el0 = index+12;
      var el1 = index+8;
      var el2 = index+4;
      var el3 = index+0;
      break;
    }

    let blocksChanged = false;
    let newBlockValue;

    if(tempBoard.find(this.moreThanZero) != undefined) {
      //two first blocks
      if(currBoard[el0] != 0 && currBoard[el0] == currBoard[el1]) {
        newBlockValue = currBoard[el0]*2;
        currBoard[el0] *= 2;
        currBoard[el1] = currBoard[el2];
        currBoard[el2] = currBoard[el3];
        currBoard[el3] = 0;
        blocksChanged = true;
        this.score += newBlockValue;
      }

      //two middle blocks
      if(currBoard[el1] != 0 && currBoard[el1] == currBoard[el2]) {
        newBlockValue = currBoard[el1]*2;
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
        blocksChanged = true;
        this.score += newBlockValue;
      }

      //last two blocks
      if(currBoard[el2] != 0 && currBoard[el2] == currBoard[el3]) {
        newBlockValue = currBoard[el2]*2;
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
        blocksChanged = true;
        this.score += newBlockValue;
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
            newBlockValue = currBoard[el0]*2;
            currBoard[el0] *= 2;
            currBoard[el2] = 0;
            this.score += newBlockValue;
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
              newBlockValue = currBoard[el0]*2;
              currBoard[el0] *= 2;
              currBoard[el3] = 0;
              this.score += newBlockValue;
            } else {
              currBoard[el1] = currBoard[el3];
              currBoard[el3] = currBoard[el2] = 0;
            }
          } else if(currBoard[el1] == currBoard[el3]) {
            newBlockValue = currBoard[el1]*2;
            currBoard[el1] *= 2;
            currBoard[el3] = 0;
            this.score += newBlockValue;
          } else {
            currBoard[el2] = currBoard[el3];
            currBoard[el3] = 0;
          }
          blocksChanged = true;
        }
      }
    }

    if(!this.blocksChanged && blocksChanged == true) {
      this.blocksChanged = blocksChanged;
    }

    return currBoard;
  }

  moreThanZero(element) {
    return element > 0;
  }

  playerWon(board = this.board) {
    if(board.find((element) => {
      return element == 2048;
    })) {
      return true;
    }
    return false;
  }

  //get every fourth element from array
  getColArray(board, col) {
    let tempBoardCurr = [];
    let delta = Math.floor(board.length/4);
    for (let i = col; i < board.length; i=i+delta) {
      tempBoardCurr.push(board[i]);
    }
    return tempBoardCurr;
  }

  isEmptyBox(board = this.board) {
    let emptyBoxes = 0;
    board.map((value) => {
      if(value === 0) {
        emptyBoxes++;
      }
    });

    console.log(emptyBoxes);
    if(emptyBoxes > 0) {
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
    let gameBoard = document.getElementById("game");
    while(gameBoard.firstChild) {
      game.removeChild(gameBoard.firstChild);
    }
  }

  updateScore() {
    let score = document.getElementById("score");
    score.innerHTML = "Wynik: " + this.score;
  }

  restartGame() {
    this.board = [
      2,2,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
    ];
    this.game = document.getElementById("game");
    this.blockDefaultValue = 2;
    this.blocksChanged = false;
    this.score = 0;
    this.noChangesLeft = false;
    this.noChangesRight = false;
    this.noChangesUp = false;
    this.noChangesDown = false;

    this.updateScore();
    this.clearBoard();
    this.drawBoard();
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

window.onload = () => {
  var game = new Game();
  game.start();
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
