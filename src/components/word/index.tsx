import { LetterInput } from "../letter-input";

type WordProps = {
  word?: Array<string>;
  secretWord: Array<string>;
  wrongPositionsOfCorrectLetters: Array<number>;
  correctPositions: Array<number>;
};

export const Word = ({
  secretWord,
  word,
  wrongPositionsOfCorrectLetters,
  correctPositions,
}: WordProps) => {
  const getLetterBackgroundColor = (index: number) => {
    if (correctPositions.includes(index)) {
      console.log("green")
      return "custom-green";
    } else if (wrongPositionsOfCorrectLetters.includes(index)) {
      console.log("yellow");
      return "custom-yellow";
    } else if (
      word &&
      word[index] !== "" &&
      word[index] !== secretWord[index]
    ) {
      console.log("dark");
      return "custom-dark";
    } else {
      // Default color
      return "black";
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {secretWord.map((_, index) => (
        <LetterInput
          letter={word && word[index]}
          key={index}
          color={getLetterBackgroundColor(index)}
        />
      ))}
    </div>
  );
};
