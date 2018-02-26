// Creating the constructor to create the string of underspaces for the letters
// of the word fed into it
function Letter(word) {

    // The word that will need to be masked
    this.word = word;

    // Place holder for the word with inserted spaces that the masked word would have
    this.wordWithSpaces = '';

    // Place holder for the masked word
    this.mysteryWord = '';

    // Function that creates the masked word and pusheds it to the mysteryWord variable
    // Also creates and adds the word being guessed with the additional spaces from the masked word 
    this.createMaskedWord = function () {
        var currentWord = this.word;
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === " ") {
                this.mysteryWord += "  ";
                this.wordWithSpaces += "  ";
            }
            else {
                this.mysteryWord += "_ ";
                this.wordWithSpaces += currentWord[i] + " ";
            }
        }
        this.mysteryWord += "\n";
    }
}

module.exports = Letter;