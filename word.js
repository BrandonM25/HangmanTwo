// Creating the constructor to pull a random word from array fed into Word
function Word(array) {
    
    // Creates a random number for a word in the array fed in
    this.number = Math.floor(Math.random() * array.length);

    // Pulls and saves the random word
    this.target = array[this.number];
}

module.exports = Word;