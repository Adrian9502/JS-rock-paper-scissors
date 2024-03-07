let computerMove = "";
let playerMoveImage;
let computerMoveImage;

let playerScore = 0;
let computerScore = 0;
// Retrieve stored scores from local storage or use default values
const storedPlayerScore = parseInt(localStorage.getItem("playerScore")) || 0;
const storedComputerScore =
  parseInt(localStorage.getItem("computerScore")) || 0;

playerScore = storedPlayerScore;
computerScore = storedComputerScore;
// Object to store HTML image elements for displaying hand signs
const movesImages = {
  rock: '<img src="rock.png" alt="rock hand sign" />',
  paper: '<img src="paper.png" alt="paper hand sign"/>',
  scissors: '<img src="scissors.png" alt="scissors hand sign"/>',
};
// Function to randomly select a move for the computer
function pickComputerMove() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();
  // Determine the computer's move based on the random number
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock"; // Computer chose rock
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper"; // Computer chose paper
  } else {
    computerMove = "scissors"; // Computer chose scissors
  }
}
// Function to save player and computer scores to localStorage
function saveScoresToLocalStorage() {
  // Convert playerScore to string and store it in localStorage under the key "playerScore"
  localStorage.setItem("playerScore", playerScore.toString());
  // Convert computerScore to string and store it in localStorage under the key "computerScore"
  localStorage.setItem("computerScore", computerScore.toString());
}
// Function to reset scores, save to localStorage, and generate HTML
function updateScoreReset() {
  // Reset player and computer scores to 0
  playerScore = 0;
  computerScore = 0;
  saveScoresToLocalStorage;
  // Save the reset scores to localStorage
  // Generate HTML for moves and results
  generateMovesAndResultHTML();
}
// Function to generate HTML for displaying moves, results, and scores
function generateMovesAndResultHTML() {
   // Update the HTML content in the element with the class "js-result"
  document.querySelector(".js-result").innerHTML = `
  <div class="moves-container">
    <div class="your-move-text">You :</div>
    <div class="moves-image-container">${playerMoveImage}</div>
    <span class="versus-text">VS</span>
    <div class="moves-image-container">${computerMoveImage}</div>
    <div class="computer-move-text" >: Computer</div>
  </div>

  <div class="result-text">${result}</div>

  <div class="score-container">
  <div class="score-text">Your Score : ${playerScore}<br>
  Computer Score : ${computerScore}</div>
  <button class="reset-button" onclick="updateScoreReset()">
  Reset Score</button>
  </div>
  `;
}
// Function to play a round of the game
function playGame(playerMove) {
   // Let the computer make a move
  pickComputerMove();
  // Get the object representation of player and computer moves
  playerMoveImage = movesImages[playerMove];
  computerMoveImage = movesImages[computerMove];
// Determine the result of the game based on player and computer moves
  if (computerMove === playerMove) {
    result = "Tie";
  } else if (
    (computerMove === "rock" && playerMove === "scissors") ||
    (computerMove === "paper" && playerMove === "rock") ||
    (computerMove === "scissors" && playerMove === "paper")
  ) {
    result = "You Lose";
    computerScore += 1;
  } else {
    result = "You Win!";
    playerScore += 1;
  }
   // Save updated scores to localStorage
  saveScoresToLocalStorage();
  // Update the HTML to display the results and scores
  generateMovesAndResultHTML();
}
