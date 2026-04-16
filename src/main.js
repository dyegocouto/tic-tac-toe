import "modern-normalize/modern-normalize.css";
import "./style.css";
import "./modal.css";
import xIcon from "./assets/x.svg";
import oIcon from "./assets/o.svg";

class TicTacToe {
  constructor() {
    this.board = document.querySelector(".board");
    this.modal = document.querySelector(".modal");
    this.modalMessage = document.querySelector(".modal-message");
    this.modalButton = document.querySelector(".modal-button");

    this.cells = Array(9).fill("");
    this.gameActive = true;

    this.init();
  }

  init() {
    this.board.addEventListener("click", (e) => this.handleBoardClick(e));
    this.modalButton.addEventListener("click", () => this.restartGame());
  }

  restartGame() {
    this.cells = Array(9).fill("");
    this.gameActive = true;

    this.cells.forEach((cell, index) => {
      const cellDOM = document.querySelector(`[data-cell="${index}"]`);
      cellDOM.textContent = "";
    });

    this.modal.close();
  }

  declareWinner(winner) {
    const winners = {
      x: "Player wins!",
      o: "CPU wins!",
      draw: "It's a draw!",
    };

    this.modalMessage.textContent = winners[winner];

    setTimeout(() => {
      this.modal.showModal();
    }, 500);
  }

  checkForWin() {
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

    for (const condition of winConditions) {
      const [a, b, c] = condition;

      if (
        this.cells[a] &&
        this.cells[a] === this.cells[b] &&
        this.cells[b] === this.cells[c]
      ) {
        this.gameActive = false;
        this.declareWinner(this.cells[a]);
        return;
      }
    }

    this.checkForDraw();
  }

  checkForDraw() {
    const isDraw = this.cells.every((cell) => cell !== "");
    if (isDraw && this.gameActive) {
      this.declareWinner("draw");
      this.gameActive = false;
    }
  }

  makeAIMove() {
    if (!this.gameActive) return;

    const emptyIndexes = this.cells
      .map((cell, index) => (cell === "" ? index : null))
      .filter((index) => index !== null);

    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    const aiMoveIndex = emptyIndexes[randomIndex];

    this.cells[aiMoveIndex] = "o";
    this.paintCell(document.querySelector(`[data-cell="${aiMoveIndex}"]`), "o");

    this.checkForWin();
  }

  handleBoardClick(event) {
    if (!event.target.classList.contains("cell") || !this.gameActive) return;

    const cellIndex = event.target.dataset.cell;

    if (this.cells[cellIndex] !== "") return;

    this.makePlayerMove(cellIndex, event.target);
  }

  paintCell(element, icon) {
    const img = document.createElement("img");
    img.src = icon === "x" ? xIcon : oIcon;
    element.appendChild(img);
  }

  makePlayerMove(index, element) {
    this.cells[index] = "x";
    this.paintCell(element, "x");

    this.checkForWin();
    this.makeAIMove();
  }
}

new TicTacToe();
