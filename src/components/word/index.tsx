import { useState } from "react";
import { LetterInput } from "../letter-input";

type WordProps = {
  word?: Array<string>;
  secretWord: Array<string>;
  onUserInput: (letter: string) => void;
};
export const Word = ({ secretWord, word, onUserInput }: WordProps) => {
  const [selectedInput, setSelectedInput] = useState<number>(0);
  const handleUserInput = (letter: string) => {
    onUserInput(letter);

    if (selectedInput < secretWord.length - 1) {
      setSelectedInput((prevSelectedInput) => prevSelectedInput + 1);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2">
      {secretWord.map((_, index) => (
        <LetterInput
          letter={word && word[index]}
          key={index}
          onUserInput={(input) =>
            index === selectedInput ? handleUserInput(input) : null
          }
          disabled={index !== selectedInput}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};
