import { LetterInput } from "../letter-input";

type WordProps = {
  word?: Array<string>;
  secretWord: Array<string>;
  color?: Array<string>;
};

export const Word = ({ secretWord, word, color }: WordProps) => {
  return (
    <div className="flex items-center justify-center">
      {secretWord.map((_, index) => (
        <LetterInput
          letter={word && word[index]}
          key={index}
          color={color ? color[index] : null}
        />
      ))}
    </div>
  );
};
