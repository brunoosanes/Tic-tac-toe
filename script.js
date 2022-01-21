// FALTA COLOCAR:
// EMPATE
// PONTUAÇÃO
// BOTÃO PRA MUDAR DE MODO AO INVÉS DE SEMPRE IR PRA SELEÇÃO DE MODO
// JOGO CONTRA AI
// DIFICULDADES DA AI

const player = (() => {
  const player1 = "X";
  const player2 = "O";
  let currentPlayer = player1;
  return { player1, player2, currentPlayer };
})();

const gameBoard = (() => {
  const winningMessageContainer = document.querySelector(
    ".winning-message-container"
  );
  const winningMessage = document.querySelector(".winning-message");
  const board = document.querySelector(".board");
  const fields = document.querySelectorAll(".field");
  const sign = (e) => {
    if (player.currentPlayer == player.player1) {
      e.target.classList.add("X");
      board.classList.remove("X");
      board.classList.remove("O");
      board.classList.add("O");
    } else if (player.currentPlayer == player.player2) {
      e.target.classList.add("O");
      board.classList.remove("X");
      board.classList.remove("O");
      board.classList.add("X");
    }
    if (gameState.checkWinConditions(player.currentPlayer)) {
      winningMessageContainer.classList.add("show");
      winningMessage.textContent = `${player.currentPlayer} WINS`;
      board.classList.remove("O");
      board.classList.add("X");
    } else if (player.currentPlayer == player.player1) {
      player.currentPlayer = player.player2;
    } else if (player.currentPlayer == player.player2) {
      player.currentPlayer = player.player1;
    }
  };
  [...fields].forEach((field) =>
    field.addEventListener("click", sign, { once: true })
  );

  const removeAndReaddEventListeners = () => {
    [...fields].forEach((field) => {
      field.removeEventListener("click", sign);
      field.addEventListener("click", sign);
      field.addEventListener("click", sign, { once: true });
    });
  };

  return { fields, sign, removeAndReaddEventListeners };
})();

const gameState = (() => {
  const restartBtn = document.querySelector(".restartBtn");
  const fieldElements = document.querySelectorAll(".field");
  const boardContainer = document.querySelector(".board-container");
  const playerVsPCBtn = document.querySelector(".playerVsPCBtn");
  const playerVsPlayerBtn = document.querySelector(".playerVsPlayerBtn");
  const gameModeDisplay = document.querySelector(".gameMode");
  const winningMessageContainer = document.querySelector(
    ".winning-message-container"
  );
  const winningMessage = document.querySelector(".winning-message");
  const sign = gameBoard.sign;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let markedX = [];
  let markedO = [];

  const getMarks = () => {
    [...getX] = document.querySelectorAll(".field.X");
    [...getO] = document.querySelectorAll(".field.O");

    getX.forEach((e) => {
      let id = e.getAttribute("id");
      let idNumber = id.substring(1);
      markedX.push(idNumber);
    });

    getO.forEach((e) => {
      let id = e.getAttribute("id");
      let idNumber = id.substring(1);
      markedO.push(idNumber);
    });
  };

  /*  let marked = markedX.concat(markedO) */

  const checkWinConditions = (currentPlayer) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return fieldElements[index].classList.contains(currentPlayer);
      });
    });
  };

  const playerVsPCMode = () => {
    removeModeBtns();
  };
  const playerVsPlayerMode = () => {
    removeModeBtns();
  };
  const removeModeBtns = () => {
    gameModeDisplay.classList.add("hide");
    boardContainer.classList.add("show");
  };

  const restartGame = () => {
    fieldElements.forEach((field) => {
      field.classList.remove("X");
      field.classList.remove("O");
    });
    gameBoard.removeAndReaddEventListeners();
    winningMessageContainer.classList.remove("show");
    gameModeDisplay.classList.remove("hide");
    boardContainer.classList.remove("show");
    player.currentPlayer = 'X'
  };

  restartBtn.addEventListener("click", restartGame);

  // TO BE IMPLEMENTED LATER!!
  /* playerVsPCBtn.addEventListener("click", playerVsPCMode); */
  playerVsPlayerBtn.addEventListener("click", playerVsPlayerMode);

  return { markedO, markedX, getMarks, checkWinConditions, fieldElements };
})();

