var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Step 7.1: Detect when a keyboard key has been pressed to start the game
$(document).keypress(function() {
  if (!started) {
    // Step 7.3: Update the h1 title to say "Level 0"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Step 4.1: Detect when any of the buttons are clicked
$(".btn").click(function() {

  // Step 4.2: Store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");
  
  // Step 4.4: Add the contents of userChosenColour to the end of userClickedPattern
  userClickedPattern.push(userChosenColour);

  // Step 5.1 & 5.4: Play sound and animate press for user click
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Step 8.2: Call checkAnswer() passing the index of the last answer
  checkAnswer(userClickedPattern.length - 1);
});

// Step 8.1: Create checkAnswer() function
function checkAnswer(currentLevel) {

  // Step 8.3: Check if the most recent user answer matches the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // Step 8.4: Check if they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {

      // Step 8.5: Call nextSequence() after a 1000 millisecond delay
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    // Step 9.1: Play wrong sound
    playSound("wrong");

    // Step 9.2: Apply "game-over" class to the body and remove it after 200ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Step 9.3: Change h1 title for Game Over
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Step 10.2: Call startOver() when the user gets the sequence wrong
    startOver();
  }

}

function nextSequence() {

  // Step 8.6: Reset the userClickedPattern to an empty array for the next level
  userClickedPattern = [];

  // Step 7.4 & 7.5: Increase level by 1 and update h1
  level++;
  $("#level-title").text("Level " + level);

  // Step 2.2: Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Step 2.4: Select a random colour from buttonColours
  var randomChosenColour = buttonColours[randomNumber];

  // Step 2.6: Add randomChosenColour to the end of gamePattern
  gamePattern.push(randomChosenColour);

  // Step 3.1 & 3.2: Flash the selected button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Step 3.3 & 5.3: Play the sound for the selected button
  playSound(randomChosenColour);
}

// Step 5.2 & 5.3: Create playSound() function taking name parameter
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Step 6.1: Create animatePress() function taking currentColour parameter
function animatePress(currentColour) {

  // Step 6.3: Add the "pressed" class to the clicked button
  $("#" + currentColour).addClass("pressed");

  // Step 6.4: Remove the "pressed" class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Step 10.1: Create startOver() function
function startOver() {
  // Step 10.3: Reset the values of level, gamePattern, and started variables
  level = 0;
  gamePattern = [];
  started = false;
}