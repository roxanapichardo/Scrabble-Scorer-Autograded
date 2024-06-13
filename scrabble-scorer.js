// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! \n\n");
   word = input.question("Enter a word:");

};

function simpleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints++;
   }
   return letterPoints;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowels = "AEIOU"
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += 3
      }
      else { letterPoints++ };
   }
   return letterPoints;
}

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      for (item in newPointStructure) {
         if (item === word[i]) {
            letterPoints += newPointStructure[item]
         }
      }
   }
   return letterPoints;
};




const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'A function that returns a score based on the number of vowels and consonants.',
      scorerFunction: vowelBonusScorer
   },

   {
      name: 'Scrabble',
      description: 'Uses the scrabbleScorer() function to determine the score for a given word.',
      scorerFunction: scrabbleScorer
   }
];



function scorerPrompt() {
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i}: ${scoringAlgorithms[i].name}. ${scoringAlgorithms[i].description}`);
   }

   let scorerToUse = input.question("\nWhich scoring algorithm would you like to use? \nEnter 0, 1, or 2: ");
   scorerToUse = Number(scorerToUse)
   while
      (scorerToUse < 0 || scorerToUse > 2 || isNaN(scorerToUse)) {
      scorerToUse = input.question("Invalid input. Please enter the number beetween 0 and 2: ");
      scorerToUse = Number(scorerToUse)
   }
   console.log(`\nYour choice is ${scoringAlgorithms[scorerToUse].name} Algorithm.`);
   console.log(`\nScore for your word '${word}': ${scoringAlgorithms[scorerToUse].scorerFunction(word)}`);
}



function transform(object) {
   let newObject = {}
   for (item in object) {
      for (i = 0; i < object[item].length; i++) {
         let newLetterKey = object[item][i];
         newLetterKey = newLetterKey.toLowerCase();
         newObject[newLetterKey] = Number(item);
      }
   }
   return newObject
};

let newPointStructure = transform(oldPointStructure);
function runProgram() {
   let word = initialPrompt();
   console.log(scorerPrompt(word));

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
