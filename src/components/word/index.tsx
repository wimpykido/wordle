import { LetterInput } from "../letter-input";

type WordProps = {
  word?: Array<string>;
  secretWord: Array<string>;
};

export const Word = ({ secretWord, word }: WordProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {secretWord.map((_, index) => (
        <LetterInput letter={word && word[index]} key={index} />
      ))}
    </div>
  );
};
