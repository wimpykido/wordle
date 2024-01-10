import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardButton } from "../keyboard-button";
import { letterType } from "../../pages/wordle-page";
import { LetterInput } from "../letter-input";

interface KeyboardProps {
  wordStates: {
    guessedWord: any[];
    colors: any[];
  }[];
  setWordStates: Dispatch<
    SetStateAction<{ guessedWord: any[]; colors: any[] }[]>
  >;
  rowIndex: number;
  setRowIndex: React.Dispatch<React.SetStateAction<number>>;
  letterIndex: number;
  setLetterIndex: React.Dispatch<React.SetStateAction<number>>;
  secretWord: string[];
  letters: Array<letterType>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const Keyboard = ({
  wordStates,
  setWordStates,
  rowIndex,
  setRowIndex,
  letterIndex,
  setLetterIndex,
  secretWord,
  letters,
  setIsGameOver,
  setMessage,
}: KeyboardProps) => {
  const [shift, setShift] = useState<boolean>(false);
  const shiftValue = (value: string) => {
    switch (value) {
      case "წ":
        return letters[letters.length - 7];
      case "რ":
        return letters[letters.length - 6];
      case "ტ":
        return letters[letters.length - 5];
      case "ს":
        return letters[letters.length - 4];
      case "ჯ":
        return letters[letters.length - 3];
      case "ზ":
        return letters[letters.length - 2];
      case "ც":
        return letters[letters.length - 1];
      default:
        return letters.find(letterObj => letterObj.letter === value);
    }
  };

  return (
    <div className="grid grid-rows-3 grid-cols-10 gap-1 sm:gap-2">
      {letters.map(
        (value, i) =>
          i <= letters.length - 8 && (
            <KeyboardButton
              color={shift ? shiftValue(value.letter)?.color ?? value.color : value.color}
              key={i}
              value={shift ? shiftValue(value.letter)?.letter ?? value.letter : value.letter}
              shift={shift}
              setShift={setShift}
              wordStates={wordStates}
              setWordStates={setWordStates}
              rowIndex={rowIndex}
              setRowIndex={setRowIndex}
              letterIndex={letterIndex}
              setLetterIndex={setLetterIndex}
              secretWord={secretWord}
              setIsGameOver={setIsGameOver}
              setMessage={setMessage}
            />
          )
      )}
    </div>
  );
};
