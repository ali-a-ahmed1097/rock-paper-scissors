const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const computerWins = 0;
const playerWins = 1;

let moveNumber = 1;

function convertToRPS(rps) {
    if (rps === ROCK) return 'Rock';
    else if (rps === PAPER) return 'Paper';
    else return 'Scissors';
}

function getComputerChoice() {
    return Math.floor(Math.random() * 3) + 1;
}

function update(score, playerWon) {
    if (playerWon) {
        const playerScore = document.querySelector('.player-score');
        playerScore.textContent = score;
    }
    else {
        const cpuScore = document.querySelector('.cpu-score');
        cpuScore.textContent = score;
    }

}

function getPlayerChoice(e) {
    let choice = e.target.classList[0];
    if (choice === 'rock') return ROCK;
    else if (choice === 'paper') return PAPER;
    else if (choice === 'scissors') return SCISSORS;
}

function computeChoiceOutcome(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return -1;
    else if ((playerChoice === ROCK && computerChoice === PAPER)
        || (playerChoice === SCISSORS && computerChoice === ROCK)
        || (playerChoice === PAPER && computerChoice === SCISSORS))
        return computerWins;
    else return playerWins;
}

function playGame(e) {
    const playerScore = document.querySelector('.player-score');
    const cpuScore = document.querySelector('.cpu-score');

    let computerPoints = cpuScore.textContent;
    let playerPoints = playerScore.textContent;

    if (computerPoints < 5 && playerPoints < 5) {
        let pc = getPlayerChoice(e);
        let cc = getComputerChoice();
        let outcome = computeChoiceOutcome(pc, cc);

        const scrollDiv = document.querySelector('.scroll');
        const add = document.createElement('p');

        if (outcome === computerWins) {
            update(++computerPoints, computerWins);
            add.textContent = `${moveNumber}: You lose! ${convertToRPS(cc)} beats ${convertToRPS(pc)}`;
            scrollDiv.prepend(add);
        }
        else if (outcome === playerWins) {
            update(++playerPoints, playerWins);
            add.textContent = `${moveNumber}: You win! ${convertToRPS(pc)} beats ${convertToRPS(cc)}`;
            scrollDiv.prepend(add);
        }
        else {
            add.textContent = `${moveNumber}: Tie! Both chose ${convertToRPS(cc)}`;
            scrollDiv.prepend(add);
        }

        moveNumber++;
    }

    if (computerPoints === 5) {
        endGame('Computer wins. You lose!')
    } 
    else if (playerPoints == 5) {
        endGame('Congratulations! You win!');
    }
}

function createButton(btnClass, parentClass, btnText) {
    const parent = document.querySelector(parentClass);
    const btn = document.createElement('button');
    btn.classList.add(btnClass);
    btn.textContent = btnText;

    parent.appendChild(btn);
}

function scoreListPopulate(l, name, scoreClass) {
    const points = document.createElement('li');
    points.textContent = 0;
    points.classList.add(scoreClass);

    const pName = document.createElement('li');
    pName.textContent = name;

    l.appendChild(points);
    l.appendChild(pName);
}

function createGame() {
    createButton('rock', '.game-buttons', 'Rock');
    createButton('paper', '.game-buttons', 'Paper');
    createButton('scissors', '.game-buttons', 'Scissors');

    const rpsBtns = document.querySelectorAll('.rock, .paper, .scissors');
    rpsBtns.forEach(function (btn) { 
        btn.addEventListener('click', playGame);
        btn.addEventListener('mouseover', function (){
            btn.classList.add('hover-over');
        });
        btn.addEventListener('mouseout', function (){
            btn.classList.remove('hover-over');
        });
    });

    const score = document.querySelector('.score');
    score.innerHTML = "";

    const h2 = document.createElement('h2');
    h2.textContent = 'Score';
    score.appendChild(h2);

    const ulDiv = document.createElement('div');
    const playerUL = document.createElement('ul');
    const computerUL = document.createElement('ul');

    ulDiv.classList.add('scorecard');

    scoreListPopulate(playerUL, 'You', 'player-score');
    scoreListPopulate(computerUL, 'Computer', 'cpu-score');
    ulDiv.appendChild(playerUL);
    ulDiv.appendChild(computerUL);
    score.appendChild(ulDiv);

    createButton('log-button', '.log', 'Show Log');

    const h1 = document.querySelector('h1');
    h1.textContent = "Rock, Paper, Scissors";

    const scrollDiv = document.querySelector('#scroll');
    scrollDiv.innerHTML = "";
    scrollDiv.classList.contains('scroll') ? null : scrollDiv.classList.add('scroll');

    moveNumber = 1;
}

function endGame(winner) {
    const gameBtns = document.querySelector('.game-buttons');
    const startBtns = document.querySelector('.start');
    // const scoreDiv = document.querySelector('.score');
    const logDiv = document.querySelector('.log');
    const scrollDiv = document.querySelector('#scroll');

    gameBtns.innerHTML = "";
    // scoreDiv.innerHTML = "";
    logDiv.innerHTML = "";
    scrollDiv.innerHTML = "";
    scrollDiv.classList.remove('scroll');

    const winnerText = document.createElement('p');
    winnerText.textContent = winner;
    startBtns.append(winnerText);

    createButton('reset', '.start', 'Start New Game');

    const reset = document.querySelector('.reset');
    reset.addEventListener('click', function () {
        const startBtns = document.querySelector('.start');
        startBtns.innerHTML = "";
        createGame();
    });
}


const start = document.querySelector('.start-game');
start.addEventListener('click', function () {
    createGame();
    start.remove();
});