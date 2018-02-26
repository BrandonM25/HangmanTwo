// Requires in the constructors that will be used to pull the mystery word and mask it
var Letter = require("./letter");
var Word = require("./word");

function Guess(array) {

    // Variable to ensure that the "this" being used is always the "this" for the Guess constructor
    var awesomeThis = this;

    // Pulls a random word from the array fed in
    awesomeThis.goalWord = new Word(array).target;

    // Creates the letter constructor that will be used to mask the word chosen from previous variable
    awesomeThis.maskedWordObject = new Letter(awesomeThis.goalWord);

    // Place holder for target word with added spaces from maskedWord
    awesomeThis.goalWordWithSpaces = '';

    // Place holder for masked word
    awesomeThis.maskedWord = '';

    // Creates number of guesses. Always 5 more than the length of the word
    awesomeThis.guesses = superThis.goalWord.length + 5;

    // Array to hold all of the guessed characters
    awesomeThis.guessedChars = [];

    // Function to replace the characters at a certain index in the string fed in
    awesomeThis.replaceAt = function (str, index, char) {
        var a = str.split("");
        a[index] = char;
        return a.join("");
    }

    // Creates the masked word
    awesomeThis.createGuess = function () {
        awesomeThis.maskedWordObject.createMaskedWord();
        awesomeThis.maskedWord = awesomeThis.maskedWordObject.mysteryWord;
        awesomeThis.goalWordWithSpaces = awesomeThis.maskedWordObject.wordWithSpaces;
    }

    // Logic to validate the guesses the user will feed in
    awesomeThis.validateGuess = function () {

        // Checks to see if the letter fed in has already been guessed
        if (awesomeThis.guessedChars.indexOf(awesomeThis.guess.toLowerCase()) > -1 || awesomeThis.guessedChars.indexOf(awesomeThis.guess.toUpperCase()) > -1) {
            console.log("You have already guessed that character! Try again.\n");
            return "Continue";
        }
        else {
            // Pushes current guess to charater array to ensure it can't be guessed again
            awesomeThis.guessedChars.push(awesomeThis.guess);

            // If the current guess is in target word, proceed with this line of code
            if (awesomeThis.goalWordWithSpaces.indexOf(awesomeThis.guess.toLowerCase()) > -1 || awesomeThis.goalWordWithSpaces.indexOf(awesomeThis.guess.toUpperCase()) > -1) {

                // Creates array of character indices just in case there are multiple instances of the same character
                var charIndices = [];

                // Loops through the target word to pull all of the instances of the character guessed
                for (var i = 0; i < awesomeThis.goalWordWithSpaces.length; i++) {
                    if (awesomeThis.goalWordWithSpaces[i].toUpperCase() === awesomeThis.guess || awesomeThis.goalWordWithSpaces[i].toLowerCase() === awesomeThis.guess) {

                        // Pushes index to character index array
                        charIndices.push(i);
                    }
                }

                // Loops thorugh character index array to replace all of the instances of the guess in the masked word
                for (var i = 0; i < charIndices.length; i++) {

                    // Code to capitilize the first letter of the masked Word
                    if (charIndices[i] === 0) {
                        awesomeThis.maskedWord = awesomeThis.replaceAt(awesomeThis.maskedWord, charIndices[i], awesomeThis.guess.toUpperCase());
                    }
                    else { awesomeThis.maskedWord = awesomeThis.replaceAt(awesomeThis.maskedWord, charIndices[i], awesomeThis.guess); }
                }

                // Outputs updated masked word, tells user they were correct, decrements guesses, and checks to see if user has won
                console.log(awesomeThis.maskedWord);
                console.log("Correct!!!!\n");
                awesomeThis.guesses--;
                console.log(awesomeThis.guesses + " guesses remaining!!!\n");
                if (awesomeThis.maskedWord.toLowerCase().replace(/\s/g, '') === awesomeThis.goalWordWithSpaces.toLowerCase().replace(/\s/g, '')) {
                    return "Won"
                }
                else if (awesomeThis.guesses === 0) {
                    return "Lost"
                }
                else { return "Continue" }
            }

            // If guess isn't in the word
            else {

                // Outputs masked word, tells user they were wrong, decrements guesses, and checks to see if user has lost
                console.log(awesomeThis.maskedWord);
                console.log("Incorrect!!!!\n");
                awesomeThis.guesses--;
                console.log(awesomeThis.guesses + " guesses remaining!!!\n");
                if (awsomeThis.guesses === 0) {
                    return "Lost"
                }
                else { return "Continue" }
            }
        }
    }
}

module.exports = Guesses;