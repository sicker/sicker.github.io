const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const board = document.getElementById('board');
const restartButton = document.getElementById('restart-btn');
const newGameButton = document.getElementById('new-game-btn');
const endGameScreen = document.getElementById('end-game-screen');
const endGameMessage = document.getElementById('end-game-message');
const cells = document.querySelectorAll('.cell');
let currentPlayerClass = X_CLASS;

startGame();

restartButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', startGame);

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    endGameScreen.classList.add('hidden');
    restartButton.classList.add('hidden');
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = currentPlayerClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        endGameMessage.innerText = 'It\'s a Draw!';
    } else {
        endGameMessage.innerText = `${currentPlayerClass === X_CLASS ? "X" : "O"} wins!`;
    }
    endGameScreen.classList.remove('hidden');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayerClass);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
