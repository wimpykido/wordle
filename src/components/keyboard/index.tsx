import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardButton } from "../keyboard-button";
import { letterType } from "../../pages/wordle-page";

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
        return "ჭ";
      case "რ":
        return "ღ";
      case "ტ":
        return "თ";
      case "ს":
        return "შ";
      case "ჯ":
        return "ჟ";
      case "ზ":
        return "ძ";
      case "ც":
        return "ჩ";
      default:
        return value;
    }
  };
  return (
    <div className="grid grid-rows-3 grid-cols-10 gap-1 sm:gap-2">
      {letters.map((value, i) => (
        <KeyboardButton
          color={value.color}
          key={i}
          value={shift ? shiftValue(value.letter) : value.letter}
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
      ))}
    </div>
  );
};
