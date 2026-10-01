const gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
const userClickedPattern = [];
let level = 0;
let gameStarted = false;

function nextSequence() {
   userClickedPattern.length = 0;
   const randomNumber = Math.floor(Math.random() * 4);
   const randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
   const audio = new Audio("sounds/" + randomChosenColour + ".mp3");
   audio.play();
   level++;
   $("#level-title").html("Level " + level);
};

$(".btn").on("click", function() {
   const userChosenColour = $(this).attr("class").split(" ")[1];
   $("#" + userChosenColour).fadeOut(100).fadeIn(100);
   userClickedPattern.push(userChosenColour);
   if (userChosenColour === gamePattern[userClickedPattern.length - 1]) {
      const audio = new Audio ("sounds/" + userChosenColour + ".mp3");
      audio.play();
         if (gamePattern.length === userClickedPattern.length) {
            nextSequence();
         }
   } else {
      $("#level-title").html("Game Over, Press Any Key to Restart");
      const audio = new Audio("sounds/wrong.mp3");
      audio.play();
      gameStarted = false;
      gamePattern.length = 0;
      level = 0;
   }
});

$(document).on("keydown", function() {
   if (gameStarted === false) {
      nextSequence();
      gameStarted = true;
   }
});