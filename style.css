  let p1, p2;
let current = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let active = true;

let gameMode = "pvp";

let scoreX = Number(localStorage.getItem('scoreX')) || 0;
let scoreO = Number(localStorage.getItem('scoreO')) || 0;
let draws = Number(localStorage.getItem('draws')) || 0;

let totalGames =
Number(localStorage.getItem('totalGames')) || 0;

let totalWins =
Number(localStorage.getItem('totalWins')) || 0;

let totalLosses =
Number(localStorage.getItem('totalLosses')) || 0;

const wins = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

function startGame(){

    p1 =
    document.getElementById('p1').value
    || "Player 1";

    p2 =
    document.getElementById('p2').value
    || "Player 2";

    gameMode =
    document.getElementById('gameMode').value;

    if(gameMode === "bot"){
        p2 = "🤖 Smart Bot";
    }

    document
    .getElementById('setup')
    .classList.add('hidden');

    document
    .getElementById('game')
    .classList.remove('hidden');

    updateScores();
    updateStats();
    renderHistory();
    checkTrophies();

    createBoard();
}

function createBoard(){

    const boardDiv =
    document.getElementById('board');

    boardDiv.innerHTML = '';

    board =
    ['','','','','','','','',''];

    active = true;

    current = 'X';

    for(let i=0;i<9;i++){

        let cell =
        document.createElement('div');

        cell.className = 'cell';

        cell.dataset.i = i;

        cell.addEventListener(
        'click',
        move
        );

        boardDiv.appendChild(cell);
    }

    updateStatus();
}

function move(){

    let index =
    this.dataset.i;

    if(
        board[index] !== ''
        || !active
    ){
        return;
    }

    board[index] = current;

    this.textContent = current;

    checkWinner();

    if(!active) return;

    if(
        gameMode === "bot"
        &&
        current === "X"
    ){

        current = "O";

        updateStatus();

        setTimeout(botMove,500);

        return;
    }

    current =
    current === "X"
    ? "O"
    : "X";

    updateStatus();
}

function botMove(){

    let moveIndex = findBestMove();

    board[moveIndex] = "O";

    document
    .querySelectorAll('.cell')
    [moveIndex]
    .textContent = "O";

    checkWinner();

    if(active){

        current = "X";

        updateStatus();
    }
}

function findBestMove(){

    for(let combo of wins){

        let [a,b,c] = combo;

        let line =
        [board[a],board[b],board[c]];

        if(
            line.filter(x=>x==="O").length===2
            &&
            line.includes("")
        ){

            if(board[a]==="") return a;
            if(board[b]==="") return b;
            if(board[c]==="") return c;
        }
    }

    for(let combo of wins){

        let [a,b,c] = combo;

        let line =
        [board[a],board[b],board[c]];

        if(
            line.filter(x=>x==="X").length===2
            &&
            line.includes("")
        ){

            if(board[a]==="") return a;
            if(board[b]==="") return b;
            if(board[c]==="") return c;
        }
    }

    if(board[4] === ""){
        return 4;
    }

    let empty = [];

    board.forEach((v,i)=>{

        if(v===""){
            empty.push(i);
        }
    });

    return empty[
        Math.floor(
        Math.random()*empty.length
        )
    ];
}

function checkWinner(){

    for(let combo of wins){

        let [a,b,c] = combo;

        if(
            board[a]
            &&
            board[a]===board[b]
            &&
            board[a]===board[c]
        ){

            active = false;

            const cells =
            document.querySelectorAll('.cell');

            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');

            let winnerName;

            if(current==="X"){

                scoreX += 10;

                totalWins++;

                winnerName = p1;

            }else{

                scoreO += 10;

                totalLosses++;

                winnerName = p2;
            }

            totalGames++;

            saveData();

            updateScores();

            updateStats();

            checkTrophies();

            addHistory(
            `${winnerName} won`
            );

            document
            .getElementById('status')
            .textContent =
            `🏆 ${winnerName} Wins!`;

            confettiEffect();

            return;
        }
    }

    if(!board.includes("")){

        active = false;

        draws++;

        totalGames++;

        saveData();

        updateScores();

        updateStats();

        addHistory("🤝 Draw Match");

        document
        .getElementById('status')
        .textContent =
        "🤝 Match Draw";
    }
}

function updateStatus(){

    let player =
    current==="X"
    ? p1
    : p2;

    document
    .getElementById('status')
    .textContent =
    `${player}'s Turn (${current})`;
}

function updateScores(){

    document
    .getElementById('scoreX')
    .textContent =
    `${p1}: ${scoreX}`;

    document
    .getElementById('scoreO')
    .textContent =
    `${p2}: ${scoreO}`;

    document
    .getElementById('draws')
    .textContent =
    `Draws: ${draws}`;
}

function updateStats(){

    document
    .getElementById('totalGames')
    .textContent =
    totalGames;

    document
    .getElementById('wins')
    .textContent =
    totalWins;

    document
    .getElementById('losses')
    .textContent =
    totalLosses;

    document
    .getElementById('drawCount')
    .textContent =
    draws;
}

function saveData(){

    localStorage.setItem(
    'scoreX',
    scoreX
    );

    localStorage.setItem(
    'scoreO',
    scoreO
    );

    localStorage.setItem(
    'draws',
    draws
    );

    localStorage.setItem(
    'totalGames',
    totalGames
    );

    localStorage.setItem(
    'totalWins',
    totalWins
    );

    localStorage.setItem(
    'totalLosses',
    totalLosses
    );
}

function addHistory(text){

    let history =
    JSON.parse(
    localStorage.getItem('history')
    ) || [];

    history.unshift(text);

    localStorage.setItem(
    'history',
    JSON.stringify(history)
    );

    renderHistory();
}

function renderHistory(){

    let history =
    JSON.parse(
    localStorage.getItem('history')
    ) || [];

    let ul =
    document.getElementById('history');

    ul.innerHTML = '';

    history.forEach(item=>{

        let li =
        document.createElement('li');

        li.textContent = item;

        ul.appendChild(li);
    });
}

function checkTrophies(){

    let trophy =
    "No Trophy Yet";

    if(totalWins >= 50)
    trophy = "👑 King Trophy";

    else if(totalWins >= 20)
    trophy = "🥇 Gold Trophy";

    else if(totalWins >= 10)
    trophy = "🥈 Silver Trophy";

    else if(totalWins >= 5)
    trophy = "🥉 Bronze Trophy";

    document
    .getElementById('trophies')
    .textContent =
    trophy;
}

function resetRound(){
    createBoard();
}

function newMatch(){

    if(confirm(
    "Reset all progress?"
    )){

        localStorage.clear();

        location.reload();
    }
}

function toggleTheme(){

    document.body
    .classList.toggle('dark');
}

function confettiEffect(){

    for(let i=0;i<50;i++){

        let confetti =
        document.createElement('div');

        confetti.innerHTML = "🎉";

        confetti.style.position =
        "fixed";

        confetti.style.left =
        Math.random()*100 + "vw";

        confetti.style.top =
        "-20px";

        confetti.style.fontSize =
        "30px";

        confetti.style.zIndex =
        "9999";

        document.body
        .appendChild(confetti);

        let pos = -20;

        let fall =
        setInterval(()=>{

            pos += 8;

            confetti.style.top =
            pos + "px";

            if(
            pos >
            window.innerHeight
            ){

                clearInterval(fall);

                confetti.remove();
            }

        },20);
    }
}
