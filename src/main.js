import "modern-normalize/modern-normalize.css";
import "./style.css";
import "./modal.css";

const board = document.querySelector(".board");
const cells = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;

const modal = document.querySelector(".modal");
const modalMessage = document.querySelector(".modal-message");
const modalButton = document.querySelector(".modal-button");

function restartGame() {
  cells.forEach((cell, index) => {
    cells[index] = "";
    const cellElement = document.querySelector(`[data-cell="${index}"]`);
    cellElement.textContent = "";
  });

  gameActive = true;
  modal.close();
}

function declareWinner(winner) {
  const winners = {
    x: "Player wins!",
    o: "CPU wins!",
    draw: "It's a draw!",
  };

  modalMessage.textContent = winners[winner];
  setTimeout(() => {
    modal.showModal();
  }, 500);
}

function checkForWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winConditions.forEach((condition) => {
    if (
      cells[condition[0]] === cells[condition[1]] &&
      cells[condition[1]] === cells[condition[2]] &&
      cells[condition[0]] !== ""
    ) {
      declareWinner(cells[condition[0]]);
      gameActive = false;
    }

    const isDraw = cells.every((cell) => cell !== "") && gameActive;
    if (isDraw) {
      declareWinner("draw");
    }
  });
}

function makeAIMove() {
  const emptyIndexes = cells
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);

  const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
  const aiMoveIndex = emptyIndexes[randomIndex];

  cells[aiMoveIndex] = "o";
  document.querySelector(`[data-cell="${aiMoveIndex}"]`).textContent = "o";

  checkForWin();
}

function drawOnBoard(event) {
  const playerValue = "x";

  const cellIndex = event.target.dataset.cell;
  if (cells[cellIndex] === "") {
    cells[cellIndex] = playerValue;
    event.target.textContent = playerValue;
  }
  checkForWin();
  makeAIMove();
}

board.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cell")) return;
  drawOnBoard(e);
});

modalButton.addEventListener("click", restartGame);
