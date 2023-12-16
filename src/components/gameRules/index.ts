//needs testing on different words
export const checkWord = (
  guessedWord: Array<string>,
  secretWord: Array<string>
) => {
  const correctPositions: Array<number> = [];
  const wrongLetterPositions: Array<number> = [];
  const wrongPositionsOfCorrectLetters: Array<number> = [];
  const correctLetters: Array<string> = [];
  guessedWord.forEach((letter, index) => {
    if (secretWord[index] === letter) {
      correctPositions.push(index);
      correctLetters.push(letter);
    } else {
      wrongLetterPositions.push(index);
    } 
    if (secretWord.includes(letter) && !correctLetters.includes(letter)) {
      wrongPositionsOfCorrectLetters.push(index);
    }
  });

  return {
    correctPositions,
    wrongPositionsOfCorrectLetters,
    wrongLetterPositions,
  };
};
