import "modern-normalize/modern-normalize.css";
import "./style.css";
import "./modal.css";

const board = document.querySelector(".board");
const cells = ["", "", "", "", "", "", "", "", ""];

const modal = document.querySelector(".modal");
const modalMessage = document.querySelector(".modal-message");
const modalButton = document.querySelector(".modal-button");

function restartGame() {
  cells.forEach((cell, index) => {
    cells[index] = "";
    const cellElement = document.querySelector(`[data-cell="${index}"]`);
    cellElement.textContent = "";
  });

  modal.close();
}

function declareWinner(winner) {
  if (winner !== "draw") {
    modalMessage.textContent = `${winner} wins!`;
  } else {
    modalMessage.textContent = `It's a draw!`;
  }

  setTimeout(() => {
    modal.showModal();
  }, 300);
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
      declareWinner("player");
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
  drawOnBoard(e);
});

modalButton.addEventListener("click", restartGame);
