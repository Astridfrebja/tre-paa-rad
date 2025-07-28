document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    // Funksjon for å starte spillet på nytt
    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        renderBoard();
    }

    // Koble restart-knappen til funksjonen
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
    
    let board = ['', '', '', '', '', '', '', '', '']
    let currentPlayer ='X';
    let gameActive = true;

    function renderBoard() {
        gameBoard.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.addEventListener('click', handleCellClick);
            if (cell !== '') {
                cellElement.classList.add(cell.toLowerCase()); // x eller o
            }
            gameBoard.appendChild(cellElement);
        });
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.index);

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        renderBoard(); // Oppdater hele brettet slik at riktig klasse og bilde vises

        if (checkWin()) {
            gameActive = false;
            setTimeout(() => {
                if (currentPlayer === 'X') {
                    alert('Klodrik har vunnet!');
                } else {
                    alert('Suki har vunnet!');
                }
            }, 0);
            return;
        }

        if (checkDraw()) {
            gameActive = false;
            setTimeout(() => {
                alert('Det ble uavgjort!');
            }, 0);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for(let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false; 
    }

    function checkDraw() {
        return !board.includes('');
    }
    
    renderBoard(); 
});