// Initial requires to run the game
var inquire = require('inquirer');
var Guesses = require('./guesses');

// Words to guess in the game
var anime = ['One Punch Man', 'Naruto', 'Dragon Ball Super', 'One Piece', 'Attack on Titan'];
var mainCharacter = ['Saitama', 'Uzumaki Naruto', 'Goku', 'Monkey D Luffy', 'Erin Yeager'];

function Inquirer(array) {
    var awesomeThis = this;
    awesomeThis.wordToGuessObject = new Guesses(array);
    awesomeThis.run = "";
    //Starting the Game
    awesomeThis.gamestart = function () {
        awesomeThis.wordToGuessObject.createGuess();
        return awesomeThis.promptUser();
    };
    //Entering a guess
    awesomeThis.promptUser = function () {
        inquire.prompt([
            {
                name: "guess",
                message: 'Guess a letter!',
            }
        ]).then(function (answer) {
            //validating that user enters a letter
            if (!/[a-z A-Z]/.test(answer.guess)) {
                console.log("Not a valid entry, please try again!\n");
                awesomeThis.promptUser();
            }
            else {
                Guesses.prototype.guess = answer.guess;
                var inputResponse = awesomeThis.wordToGuessObject.validateGuess();
                if (inputResponse === 'Continue') {
                    awesomeThis.promptUser();
                }
                else if (inputResponse === 'Lost') {
                    console.log("Sorry, you have lost. The word is " + awesomeThis.wordToGuessObject.goalWord + '\n');
                    awesomeThis.run = 'Lost';
                    awesomeThis.continue();
                }
                else if (inputResponse === 'Won') {
                    console.log('You won!');
                    awesomeThis.run = 'Won';
                    awesomeThis.continue();
                }
            }
        }
        )
    }
    // Method to check if the user would like to play again
    awesomeThis.continue = function() {

        // If the result of the last game was lost, then the user is asked if they want to play again.
        if (awesomeThis.run === "Lost") {
            inquire.prompt([
                {
                    type: "confirm",
                    name: "continue",
                    message: "Would you like to play again?",
                }
    
            ]).then(function (answer2) {

                // If the user wants to play again, the overall function is called again
                if (answer2.continue) {
                    chooseDifficulty();
                }
                else {
                    console.log("Giving up huh?\n");
                    return;
                }
            })
        }

        // If the result of the last game was won, then the user immediately starts a new game
        else if (awesomeThis.run === "Won") {
            console.log("\nNext word!\n");
            chooseDifficulty();
        }
    }
}

// Creating overall function to run (Initially choosing the difficulty you want to play)
var chooseDifficulty = function() {
    inquire.prompt([
        {
            type: "list",
            name: "difficulty",
            message: "What difficulty do you choose?",
            choices: ["Normal", "Hard"],
        }

    ]).then(function (answer) {

        // If the user wants a challenge, they can guess a mascot for a college team
        if (answer.difficulty === 'Hard') {
            initializeGame(mainCharacter);
        }

        // If the user doesn't want a challenge, then they can guess the name of a college
        else if (answer.difficulty === "Normal") {
            initializeGame(anime);
        }
    })
}

// Funcation that will initialize the game with the difficulty chosen
var initializeGame = function(array) {
    var game = new Inquirer(array);
    game.startGame();   
}

chooseDifficulty();


