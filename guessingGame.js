/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var guessesLeft = 7;
var guesses = [];
var winningNumber = null;

/* **** Guessing Game Functions **** */
// Generate the Winning Number
function generateWinningNumber(){
	winningNumber = Math.floor((Math.random() * 100) + 1); 
}

// Fetch the Players Guess
function playersGuessSubmission(){
  playersGuess = +$('#userInput').val();
  if(winningNumber === null) generateWinningNumber();
  $('#userInput').val("");
  checkGuess();
  guesses.push(playersGuess);
}

// Let the player know how close they are to the winningNumber
function howFarOff() {
  var hint = "";
  var distance = Math.abs(playersGuess - winningNumber);
  if(distance > 50) hint = " You are REALLY far off."
  else if (distance > 20) hint = " You are more than 20 numbers off."
  else if (distance > 10) hint = " You are less than 20 numbers off."
  else if (distance > 5) hint = " You are within 10 numbers!" 
  else if (distance <= 5) hint = " SO CLOSE!!!" 
  return hint;  
}

// Check if the Player's Guess is the winning number 
function checkGuess(){
  if(playersGuess === winningNumber) {
    youWin();
  } else if (guesses.indexOf(playersGuess) > -1) {
    $('#outputMesssage').text('You already guessed that number');
  } else if (playersGuess > 100 || playersGuess < 0) {
    alert("That guess is out of bounds!");
    guessesLeft--;
  } else if(playersGuess < winningNumber) {
    $('#outputMesssage').text('Guess higher!' + howFarOff());
    guessesLeft--;
  } else if(playersGuess > winningNumber) {
    $('#outputMesssage').text('Guess lower!' + howFarOff());
    guessesLeft--;
  }
  if(guessesLeft === 0) youLose();
}

//Lose and Win messages
function youLose() {
  $('#outputMesssage').text('Game Over. The winning Number was ' + winningNumber + '. Try again!');
};

function youWin() {
  $('#penguin').addClass('rotate');
  if(guessesLeft === 1) $('#outputMesssage').text('You WIN with ' + guessesLeft + ' guess remaining!').addClass('highlighted');
  else $('#outputMesssage').text('You WIN with ' + guessesLeft + ' guesses remaining!').addClass('highlighted');
};

// Create a provide hint button that lets the player know if the winning number is even or odd
function provideHint(){
  if(winningNumber === null) {
     $('#hintMessage').text("Don't give up! Try guessing first :)").css("color", "white");
  } else if (winningNumber % 2 === 1) {
                                                //cant figure out how to make this css a class
    $('#hintMessage').text("It's an odd number").css("color", "white"); 
  } else {
    $('#hintMessage').text("It's an even number!").css("color", "white");
  }
}

// Allow the "Player" to Play Again
function playAgain(){
  guessesLeft = 7;
  guesses = [];
  $('#hintMessage').css("color", "#144673"); //instead of changing the font color to the background color to hide the text, i could remove class.. to fix
  $('#outputMesssage').text('Game Restarted. Input your guess here!').removeClass('highlighted');
  $('#penguin').removeClass('rotate');
  winningNumber = null;
}

//tell the player how many guesses are left when hovering the penguin
function guessesRemaining() {
  var oneGuessLeft = " guess remains!";
  var multipleGuessesLeft = " guesses remain!";
  if(guessesLeft > 1) $('h1').text(guessesLeft + multipleGuessesLeft);
  else if (guessesLeft === 1) $('h1').text(guessesLeft + oneGuessLeft);
  else $('h1').text("No more guesses. Game Over.");
}

//show the player past guesses when hovering the penguin
function displayGuesses() {
  var guessesStr = guesses.join("   ");
  $('#allGuesses').text(guessesStr).css("color", "white");
}

/* **** Event Listeners/Handlers ****  */
//click buttons 
$('#submitGuess').click(playersGuessSubmission);
$('#hintButton').click(provideHint);
$('#newGame').click(playAgain);
$('#guessesLeft').click(function() {
  alert("Ask the penguin!");
});
//press enter after input
$('form').keypress(function (event) {
  if (event.which == 13) {
    event.preventDefault();
    playersGuessSubmission(); 
  }   
});
//hover over penguin
$('#penguin').on('mouseenter', function() {
  $(this).animate({opacity: 0.25}, 50);
  guessesRemaining();
  displayGuesses();
});
$('#penguin').on('mouseleave', function() {
  $(this).animate({opacity: 1}, 50);
  $('h1').text('Guess my number!');
  $('#allGuesses').css("color", "#144673");
});
