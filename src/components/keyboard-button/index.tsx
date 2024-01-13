import ShiftIcon from "../../assets/up.png";
import DeleteIcon from "../../assets/delete.png";
import EnterIcon from "../../assets/enter.png";
import { Dispatch, SetStateAction, useContext } from "react";
import { letterType } from "../../pages/wordle-page";
import { StatsContext, StatsContextType } from "../../context";
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
  setLetters: React.Dispatch<React.SetStateAction<letterType[]>>;
  secretWord: string[];
  color: string;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
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
  setLetters,
  secretWord,
  color,
  isGameOver,
  setIsGameOver,
  setMessage,
  setWin,
}: KeyboardButtonProps) => {
  const { updateStats, data } = useContext(StatsContext) as StatsContextType;
  const getLetterBackgroundColor = (arr: Array<any>) => {
    const backgroundColors: Array<string> = [];
    let answer: Array<string> = secretWord.slice();
    arr.forEach((letter, index) => {
      if (letter === answer[index]) {
        backgroundColors.push("bg-custom-green");
        setLetters((prev) =>
          prev.map((obj) =>
            obj.letter === letter ? { ...obj, color: "bg-custom-green" } : obj
          )
        );
        answer[index] = "";
      } else backgroundColors.push("");
    });
    arr.forEach((letter, index) => {
      if (answer.includes(letter)) {
        if (backgroundColors[index] !== "bg-custom-green") {
          backgroundColors[index] = "bg-custom-yellow";
          answer[answer.indexOf(letter)] = "";
          setLetters((prev) =>
            prev.map((obj) =>
              obj.letter === letter && obj.color !== "bg-custom-green"
                ? { ...obj, color: "bg-custom-yellow" }
                : obj
            )
          );
        }
      } else {
        if (backgroundColors[index] !== "bg-custom-green") {
          backgroundColors[index] = "bg-custom-dark";
          setLetters((prev) =>
            prev.map((obj) => {
              const isCorrectLetter = obj.letter === letter;
              const isCorrectColor =
                obj.color === "bg-custom-yellow" ||
                obj.color === "bg-custom-green";
              const shouldUpdateColor = isCorrectLetter && !isCorrectColor;
              return shouldUpdateColor
                ? { ...obj, color: "bg-custom-dark" }
                : obj;
            })
          );
        }
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
        if (letterIndex === 6 && !isGameOver) {
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
            setWin(true);
            setMessage("თქვენ გაიმარჯვეთ!");
            updateStats({ won: data.won + 1, played: data.played + 1 });
            if (rowIndex > data.bestTry) {
              updateStats({ bestTry: data.bestTry + 1 });
            }
            return;
          }
          if (
            wordStates[rowIndex].guessedWord.join("") !== secretWord.join("") &&
            rowIndex === 5
          ) {
            setIsGameOver(true);
            setMessage("თქვენ დამარცხდით!");
            setWin(false);
            updateStats({ loses: data.loses + 1, played: data.played + 1 });
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
