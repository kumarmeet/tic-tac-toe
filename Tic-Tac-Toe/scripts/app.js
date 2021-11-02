"use strict";

let editedPlayer = 0; //tracing which player edit their name
let activePlayer = 0; //tracking player 1 or 2
let currentRound = 1; //tracking draw
let isGameOver = false; //tracting game is over than not to click the button of grid

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const players = [
  {
    name: null,
    symbol: "X",
  },
  {
    name: null,
    symbol: "O",
  },
];

const playerConfigOverlay = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const inputError = document.getElementById("config-errors");
const gameArea = document.getElementById("active-game");
const gameBoard = document.getElementById("game-board");
const activePlayerName = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

const editPlayer1Btn = document.getElementById("edit-player-1-btn");
const editPlayer2Btn = document.getElementById("edit-player-2-btn");
const cancelBtn = document.getElementById("cancel-config-btn");
const startGameBtn = document.getElementById("start-game-btn");

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelBtn.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startGameBtn.addEventListener("click", startNewGame);

gameBoard.addEventListener("click", selectGameField);


