
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {

        const index = cell.dataset.index;

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();
    });
});

function checkWinner() {

    let winner = false;

    for (let condition of winConditions) {

        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winner = true;
            break;
        }
    }

    if (winner) {
        statusText.textContent = "Player " + currentPlayer + " Wins! 🎉";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "Game Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = "Player " + currentPlayer + "'s Turn";
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });

    statusText.textContent = "Player X's Turn";
}
