"use strict";

const openPlayerConfig = (event) => {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverlay.style.display = "block";
  backdropElement.style.display = "block";
};

const closePlayerConfig = () => {
  playerConfigOverlay.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  inputError.textContent = "";
  formElement[0].value = ""; //reset the input value
};

const savePlayerConfig = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const playerName = formData.get("playername").trim();

  if (!playerName) {
    event.target.firstElementChild.classList.add("error");
    inputError.textContent = "Please input valid name";
    return;
  }

  const updatedDataPlayer = document.getElementById(
    `player-${editedPlayer}-data`
  );

  updatedDataPlayer.children[1].textContent = playerName;

  players[editedPlayer - 1].name = playerName;

  closePlayerConfig();
};
