const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const computerWins = 0;
const playerWins = 1;

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
    console.log(choice);
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
        if (outcome === computerWins) {
            console.log(`You lose! ${convertToRPS(cc)} beats ${convertToRPS(pc)}`);
            update(++computerPoints, computerWins);
        }
        else if (outcome === playerWins) {
            console.log(`You win! ${convertToRPS(pc)} beats ${convertToRPS(cc)}`);
            update(++playerPoints, playerWins);
        }
        else console.log(`Tie! Both chose ${convertToRPS(cc)}`);

        console.log(`Player points: ${playerPoints}, Computer points: ${computerPoints}`);
    }

    if (computerPoints === 5) {
        console.log('Computer wins. You lose!');
        endGame('Computer wins. You lose!')
    } 
    else if (playerPoints == 5) {
        console.log('Congratulations! You win!');
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
    rpsBtns.forEach((btn) => btn.addEventListener('click', playGame));

    const score = document.querySelector('.score');

    const h2 = document.createElement('h2');
    h2.textContent = 'Current score';
    score.appendChild(h2);

    const playerUL = document.createElement('ul');
    const computerUL = document.createElement('ul');

    scoreListPopulate(playerUL, 'You', 'player-score');
    scoreListPopulate(computerUL, 'Computer', 'cpu-score');
    score.appendChild(playerUL);
    score.appendChild(computerUL);

    createButton('log-button', '.log', 'Show Log');

    const h1 = document.querySelector('h1');
    h1.textContent = "Rock, Paper, Scissors";
}

function endGame(winner) {
    const gameBtns = document.querySelector('.game-buttons');
    const scoreDiv = document.querySelector('.score');
    const logDiv = document.querySelector('.log');

    gameBtns.innerHTML = "";
    scoreDiv.innerHTML = "";
    logDiv.innerHTML = "";

    const winnerText = document.createElement('p');
    winnerText.textContent = winner;
    gameBtns.append(winnerText);

    createButton('reset', '.game-buttons', 'Start New Game');

    const reset = document.querySelector('.reset');
    reset.addEventListener('click', function () {
        const gameBtns = document.querySelector('.game-buttons');
        gameBtns.innerHTML = "";
        createGame();
    });
}


const start = document.querySelector('.start-game');
start.addEventListener('click', function () {
    createGame();
    start.remove();
});