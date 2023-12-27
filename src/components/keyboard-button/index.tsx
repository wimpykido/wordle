import ShiftIcon from "../../assets/up.png";
import DeleteIcon from "../../assets/delete.png";
import EnterIcon from "../../assets/enter.png";
import { Dispatch, SetStateAction } from "react";
interface KeyboardButtonProps {
  value: string;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
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
  color: string;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const KeyboardButton = ({
  value,
  shift,
  setShift,
  wordStates,
  setWordStates,
  rowIndex,
  setRowIndex,
  letterIndex,
  setLetterIndex,
  secretWord,
  color,
  setIsGameOver,
  setMessage,
}: KeyboardButtonProps) => {
  const getLetterBackgroundColor = (arr: Array<any>) => {
    const backgroundColors: Array<string> = [];
    arr.forEach((letter, index) => {
      if (secretWord[index] === letter) {
        backgroundColors.push("bg-custom-green");
      } else if (secretWord.includes(letter)) {
        backgroundColors.push("bg-custom-yellow");
      } else {
        backgroundColors.push("bg-custom-dark");
      }
    });
    return backgroundColors;
  };

  const handleClick = () => {
    switch (value) {
      case "shift":
        setShift(!shift);
        break;
      case "del":
        if (letterIndex > 0) {
          setWordStates((prevWordStates) => {
            const updatedWordStates = [...prevWordStates];
            updatedWordStates[rowIndex].guessedWord[letterIndex - 1] = "";
            setLetterIndex((prevIndex) => prevIndex - 1);
            return updatedWordStates;
          });
        }
        break;
      case "Enter":
        if (letterIndex === 6) {
          const colors = getLetterBackgroundColor(
            wordStates[rowIndex].guessedWord
          );
          setWordStates((prevWordStates) =>
            prevWordStates.map((wordState, index) =>
              index === rowIndex ? { ...wordState, colors: colors } : wordState
            )
          );
          if (
            wordStates[rowIndex].guessedWord.join("") === secretWord.join("")
          ) {
            setIsGameOver(true);
            setMessage("თქვენ გაიმარჯვეთ!");
            return;
          }
          if (
            wordStates[rowIndex].guessedWord.join("") !== secretWord.join("") &&
            rowIndex === 5
          ) {
            setIsGameOver(true);
            setMessage("თქვენ დამარცხდით!");
            return;
          }
          setRowIndex((prevIndex) => prevIndex + 1);
          setLetterIndex(0);
        }
        break;
      default:
        if (letterIndex < 6) {
          setWordStates((prevWordStates) => {
            const updatedWordStates = [...prevWordStates];
            updatedWordStates[rowIndex].guessedWord[letterIndex] = value;
            setLetterIndex((prevIndex) => prevIndex + 1);
            return updatedWordStates;
          });
          setShift(false);
        }
        break;
    }
  };

  return (
    <button
      className={`flex justify-center items-center text-custom-text text-sm font-custom rounded-md outline-none transition-all sm:text-xl py-1 sm:px-4
       ${color} ${color === "bg-custom-light" && "hover:bg-custom-hover"}
       ${value === "Enter" && "col-span-2"}`}
      onClick={handleClick}
    >
      {value === "shift" ? (
        <img src={ShiftIcon} className="w-3 h-3 sm:w-5 sm:h-5" />
      ) : value === "del" ? (
        <img src={DeleteIcon} className="w-3 h-3 sm:w-5 sm:h-5" />
      ) : value === "Enter" ? (
        <img src={EnterIcon} className="w-3 h-3 sm:w-5 sm:h-5" />
      ) : (
        <p className="mt-2">{value}</p>
      )}
    </button>
  );
};
