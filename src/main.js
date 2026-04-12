import "modern-normalize/modern-normalize.css";
import "./style.css";
import "./modal.css";

const board = document.querySelector(".board");
const cells = ["", "", "", "", "", "", "", "", ""];

function drawOnBoard(event) {
  const playerValue = "x";

  const cellIndex = event.target.dataset.cell;
  if (cells[cellIndex] === "") {
    cells[cellIndex] = playerValue;
    event.target.textContent = playerValue;
  }
  checkForWin();
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
      console.log("win");
    }
  });
}

board.addEventListener("click", (e) => {
  drawOnBoard(e);
});
