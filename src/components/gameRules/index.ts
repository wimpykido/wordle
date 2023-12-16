export const checkWord = (
  guessedWord: Array<string>,
  secretWord: Array<string>
) => {
  const correctPositions: Array<number> = [];
  const wrongPositionsOfCorrectLetters: Array<number> = [];

  return {
    correctPositions,
    wrongPositionsOfCorrectLetters,
  };
};
