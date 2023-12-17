import { Dispatch, SetStateAction } from "react";

interface KeyboardButtonProps {
  value: string;
  shift: boolean;
  setShift: Dispatch<SetStateAction<boolean>>;
  wordStates: { guessedWord: any[] }[];
  setWordStates: Dispatch<
    SetStateAction<
      {
        guessedWord: Array<String>;
      }[]
    >
  >;
}

export const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  value,
  shift,
  setShift,
  wordStates,
  setWordStates,
}) => {
  const handleClick = () => {
    switch (value) {
      case "shift":
        setShift(!shift);
        break;
      case "del":
        console.log("delete");
        break;
      case "enter":
        console.log("enter");
        break;
      default:
        console.log(value);
        break;
    }
  };

  return (
    <button
      className={`bg-custom-light hover:bg-custom-hover text-custom-text text-sm font-semibold py-2 rounded-md transition-all sm:text-xl sm:p-2
      ${value === "Enter" && "col-span-2"}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};
