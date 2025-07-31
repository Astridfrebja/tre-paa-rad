document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusMessage = document.getElementById('status-message');
    const restartButton = document.getElementById('restart-button');
    const modal = document.getElementById('game-over-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalOkButton = document.getElementById('modal-ok-button');
    const closeButton = document.querySelector('.close-button');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    // Funksjon for å starte spillet på nytt. Denne funksjonen vil nå bli brukt av alle restart-knappene.
    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        // VIKTIG: Oppdaterer statusmeldingen til å vise hvem sin tur det er
        statusMessage.textContent = 'Det er Klodrik sin tur';
        // Tømmer modal-meldingen i tilfelle den er synlig
        modalMessage.textContent = ''; 
        renderBoard();
    }

    // Denne funksjonen oppdaterer statusmeldingen når spillerturen byttes.
    function updateStatusMessage() {
        statusMessage.textContent = `Det er ${currentPlayer === 'X' ? 'Klodrik' : 'Suki'} sin tur`;
    }

    function renderBoard() {
        gameBoard.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            
            if (gameActive && cell === '') {
                cellElement.addEventListener('click', handleCellClick);
            }
            
            if (cell !== '') {
                cellElement.classList.add(cell.toLowerCase());
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
        renderBoard(); 

        if (checkWin()) {
            gameActive = false;
            if (currentPlayer === 'X') {
                modalMessage.textContent = 'Klodrik har vunnet!';
            } else {
                modalMessage.textContent = 'Suki har vunnet!';
            }
            modal.style.display = 'block';
            // VIKTIG: Oppdaterer også den vanlige statusmeldingen ved seier
            statusMessage.textContent = modalMessage.textContent; 
            return;
        }

        if (checkDraw()) {
            gameActive = false;
            modalMessage.textContent = 'Det ble uavgjort!';
            modal.style.display = 'block';
            // VIKTIG: Oppdaterer også den vanlige statusmeldingen ved uavgjort
            statusMessage.textContent = modalMessage.textContent;
            return;
        }
        
        // Oppdaterer den nåværende spilleren
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // VIKTIG: Kaller funksjonen som oppdaterer statusmeldingen etter hver tur
        updateStatusMessage();
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
    
    // Koble den opprinnelige restart-knappen til funksjonen
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            modal.style.display = 'none'; // I tilfelle modalen er åpen
            restartGame();
        });
    }

    // Lukk modalen når brukeren klikker på kryss (close)
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // "Mjau"-knappen i modalen lukker bare modalen
    if (modalOkButton) {
        modalOkButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Lukk modalen når brukeren klikker utenfor modal-innholdet
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Starter spillet når siden lastes for første gang
    restartGame();
});