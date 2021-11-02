const resetGameStatus = () => {
  activePlayer = 0;
  currentRound = 1;
  isGameOver = false;
  gameOverElement.firstElementChild.innerHTML = `You Won <span id="winner-name">Player Name</span>!`;
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoard.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
};

const startNewGame = async () => {
  if (!players[0].name || !players[1].name) {
    // backdropElement.style.display = "block";
    alert("Please set custom name for both players!");
    return;
  }

  resetGameStatus();

  activePlayerName.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
};

const switchPlayer = () => {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
};

const checkForGameOver = () => {
  //rows checking
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][0] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //columns checking
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //diagonal: top left to bottom right
  if (gameData[0][0] === gameData[1][1] && gameData[0][0] === gameData[2][2]) {
    return gameData[0][0];
  }

  //diagonal: bottom left to top right
  if (gameData[2][0] === gameData[1][1] && gameData[2][0] === gameData[0][2]) {
    return gameData[2][0];
  }

  //draw
  if (currentRound === 9) {
    return -1;
  }
  return 0;
};

const endGame = (winnerId) => {
  isGameOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a Draw!";
  }
};

const selectGameField = (e) => {
  if (e.target.tagName !== "LI" || isGameOver) {
    return;
  }
  const selectedField = e.target;
  const selectedColumn = +selectedField.dataset.col;
  const selectedRow = +selectedField.dataset.row;

  if (gameData[selectedRow - 1][selectedColumn - 1]) {
    alert("Please select and empty field");
    return;
  }

  e.target.classList.add("disabled");
  e.target.textContent = players[activePlayer].symbol;

  gameData[selectedRow - 1][selectedColumn - 1] = activePlayer + 1;
  const winnerId = checkForGameOver();

  if (winnerId) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
};
