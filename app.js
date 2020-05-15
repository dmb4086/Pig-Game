/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer,GamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {

    if (GamePlaying) {
        var diceDOM, dice;
        diceDOM = document.querySelector(".dice");

        // 1. randomize the number
        dice = Math.floor(Math.random() * 6 + 1); //setting the dice to produce a random number

        // 2. display the dice
        diceDOM.src = "dice-" + dice + ".png"; // change the image based on the dice
        diceDOM.style.display = "block";

        // 3.  update the score  if it's not 1
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            //switch the active player
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (GamePlaying) {
        // when the user clicks it add the current score to global score
        scores[activePlayer] += roundScore;

        // update the UI to reflect the same
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        // check if the player won the game

        if (scores[activePlayer] >= 20) {
            GamePlaying = false;
            document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
            document.querySelector(".dice").style.display = "none";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
}

function init() {
    GamePlaying = true;
  // hiding the dice when the game beigns
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-1").textContent = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2 ";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
}
