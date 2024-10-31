const cells = document.querySelectorAll('.cell');
const playerTurn = document.getElementById('player-turn');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Function to handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.id.split('-')[1];

    if (boardState[cellIndex] !== '' || !gameActive) {
        return; // Ignore clicks on already filled cells or when game is not active
    }

    boardState[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkResult();
}

// Function to check the result of the game
function checkResult() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameStatus.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }

    if (!boardState.includes('')) {
        gameStatus.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.innerText = `Player ${currentPlayer}'s turn`;
}

// Function to restart the game
function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    playerTurn.innerText = `Player ${currentPlayer}'s turn`;
    gameStatus.innerText = 'In Progress';

    cells.forEach(cell => {
        cell.innerText = '';
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
