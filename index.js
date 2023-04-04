const cells = Array.from(document.querySelectorAll(".cell"));

document.querySelector("#cellContainer").addEventListener("click", startGame);
const restartGame = document
    .querySelector("button")
    .addEventListener("click", resetGame);

// Test Cases
const winningSolutions = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]],
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]],
];

console.log(winningSolutions);
let playerXOptions = []; // [0, 2, 8]
let playerOOptions = []; // [0, 2, 8]
let running = false;
let playerX = "X";
let playerO = "O";
let currentPlayer = playerX;
let winner = "";
let turnCount = 0;

startGame();

// start the game and play the game when the cell is clicked

function startGame() {
    running = true;
    cells.forEach((cell) => cell.addEventListener("click", playGame));
}

//add the input

//change player
function changePlayer() {
    currentPlayer == playerX
        ? (currentPlayer = playerO)
        : (currentPlayer = playerX);
    console.log("changed to " + currentPlayer);
    document.querySelector("h2").innerText = `${currentPlayer}'s Turn`;
}

function playGame(event) {
    // check if the board is empty and there is no winner
    if (event.target.innerText == "" && winner == "") {
        event.target.innerText = currentPlayer;
        turnCount += 1;
        running = true;
        updateCell(event, currentPlayer);
        winGame();

        if (!winner) {
            changePlayer();
        }
    } else {
        running = false;
    }
}
//check for winning game
function winGame() {
    if (!winner) {
        // check for the win condition

        for (let row of winningSolutions) {
            if (
                row[0].innerText.includes("X") &&
                row[1].innerText.includes("X") &&
                row[2].innerText.includes("X")
            ) {
                running = false;
                winner = currentPlayer;
                console.log("winner is " + winner);
                break;
            } else if (
                row[0].innerText.includes("O") &&
                row[1].innerText.includes("O") &&
                row[2].innerText.includes("O")
            ) {
                running = false;
                winner = currentPlayer;
                console.log("winner is " + winner);
                break;
            } else if (turnCount >= 9) {
                winner = "Draw";
            }
        }
    }

    if (winner == currentPlayer) {
        console.log(winner);
        document.querySelector("h2").innerText = `${currentPlayer} Won!`;
    } else if (winner === "Draw") {
        document.querySelector("h2").innerText = `It's a draw!`;
    }
}

function updateCell(event, player) {
    // options[event.target.cellIndex] = event.target.cellIndex;
    console.log("player is :" + player);
    if (player == playerX) {
        console.log("made it to if statement in the updateCell func..");
        const cellIndex = event.target.getAttribute("cellIndex");
        // console.log(cellIndex);
        playerXOptions.push(cellIndex);
        console.log("for the playerX array" + playerXOptions);
    } else {
        const cellIndex = event.target.getAttribute("cellIndex");
        // console.log(cellIndex);
        playerOOptions.push(cellIndex);
        console.log("for the playerO array" + playerOOptions);
    }
}

//reset game if every cell is used
function resetGame() {
    currentPlayer = playerX;
    cells.forEach((cell) => (cell.innerText = ""));
    document.querySelector("h2").innerText = ``;
    running = true;
    winner = "";
    turnCount = 0;
}
