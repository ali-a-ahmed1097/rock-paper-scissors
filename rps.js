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

function game(e) {
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
    else if (computerPoints === 5) console.log('Computer wins. You lose!');
    else console.log('Congratulations! You win!');
}

const rpsBtns = document.querySelectorAll('.rock, .paper, .scissors');
rpsBtns.forEach((btn) => btn.addEventListener('click', game));