let p1, p2, current = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let active = true;

let scoreX = Number(localStorage.getItem('scoreX')) || 0;
let scoreO = Number(localStorage.getItem('scoreO')) || 0;
let draws = Number(localStorage.getItem('draws')) || 0;

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function startGame() {
    p1 = document.getElementById('p1').value || 'Player 1';
    p2 = document.getElementById('p2').value || 'Player 2';

    document.getElementById('setup').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');

    updateScores();
    createBoard();
}

function createBoard() {
    const boardDiv = document.getElementById('board');

    boardDiv.innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    active = true;
    current = 'X';

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.i = i;
        cell.addEventListener('click', move);
        boardDiv.appendChild(cell);
    }

    updateStatus();
}

function move() {

    let index = this.dataset.i;

    if (board[index] !== '' || !active) {
        return;
    }

    board[index] = current;
    this.textContent = current;

    checkWinner();

    if (active) {
        current = current === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function checkWinner() {

    for (let combo of wins) {

        let [a, b, c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            active = false;

            const cells = document.querySelectorAll('.cell');

            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');

            let winnerName;

            if (current === 'X') {
                scoreX += 10;
                winnerName = p1;
            } else {
                scoreO += 10;
                winnerName = p2;
            }

            saveScores();
            updateScores();

            document.getElementById('status').textContent =
                `🏆 ${winnerName} Wins! (+10 Points)`;

            addHistory(`${winnerName} won the match`);

            confettiEffect();

            return;
        }
    }

    if (!board.includes('')) {

        active = false;

        draws++;

        saveScores();
        updateScores();

        document.getElementById('status').textContent =
            "🤝 Match Draw";

        addHistory("Draw Match");
    }
}

function updateStatus() {

    const player =
        current === 'X'
        ? p1
        : p2;

    document.getElementById('status').textContent =
        `${player}'s Turn (${current})`;
}

function updateScores() {

    document.getElementById('scoreX').textContent =
        `${p1}: ${scoreX}`;

    document.getElementById('scoreO').textContent =
        `${p2}: ${scoreO}`;

    document.getElementById('draws').textContent =
        `Draws: ${draws}`;
}

function resetRound() {
    createBoard();
}

function newMatch() {

    if (confirm("Start a new match?")) {

        scoreX = 0;
        scoreO = 0;
        draws = 0;

        localStorage.clear();

        location.reload();
    }
}

function saveScores() {

    localStorage.setItem('scoreX', scoreX);
    localStorage.setItem('scoreO', scoreO);
    localStorage.setItem('draws', draws);
}

function addHistory(text) {

    let li = document.createElement('li');

    li.textContent = text;

    document.getElementById('history').prepend(li);
}

function toggleTheme() {

    document.body.classList.toggle('dark');
}

function confettiEffect() {

    for (let i = 0; i < 50; i++) {

        let confetti = document.createElement('div');

        confetti.innerHTML = "🎉";

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.fontSize = "30px";
        confetti.style.zIndex = "9999";

        document.body.appendChild(confetti);

        let pos = -20;

        let fall = setInterval(() => {

            pos += 8;

            confetti.style.top = pos + "px";

            if (pos > window.innerHeight) {

                clearInterval(fall);

                confetti.remove();
            }

        }, 20);
    }
}