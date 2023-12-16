import { LetterInput } from "../letter-input";

type WordProps = {
  word?: Array<string>;
  secretWord: Array<string>;
  correctLettersInWrongPositions: any;
  correctLettersAndPositions: any;
};

export const Word = ({
  secretWord,
  word,
  correctLettersInWrongPositions,
  correctLettersAndPositions,
}: WordProps) => {
  const getLetterBackgroundColor = (letter: string, index: number) => {
    ///needs implementation
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {secretWord.map((_, index) => (
        <LetterInput letter={word && word[index]} key={index} />
      ))}
    </div>
  );
};
