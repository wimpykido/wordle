import { useState, useEffect } from "react";
import { LetterInput } from "../letter-input";

type WordProps = {
  word?: Array<string>;
  secretWord: Array<string>;
  wrongPositionsOfCorrectLetters: Array<number>;
  correctPositions: Array<number>;
  isCurrentRowWord: boolean;
  // onEnterPress: () => void;
};

export const Word = ({
  secretWord,
  word,
  wrongPositionsOfCorrectLetters,
  correctPositions,
  isCurrentRowWord,
}: WordProps) => {
  console.log(isCurrentRowWord);
  const getLetterBackgroundColor = (index: number) => {
    if (correctPositions.includes(index)) {
      console.log("green");
      return "bg-custom-green";
    } else if (wrongPositionsOfCorrectLetters.includes(index)) {
      console.log("yellow");
      return "bg-custom-yellow";
    } else if (
      word &&
      word[index] !== "" &&
      word[index] !== secretWord[index]
    ) {
      console.log("dark");
      return "bg-custom-dark";
    }
    console.log("no-color");
    return "";
  };
  return (
    <div className="flex items-center justify-center gap-2">
      {secretWord.map((_, index) => (
        <LetterInput
          letter={word && word[index]}
          key={index}
          color={isCurrentRowWord ? getLetterBackgroundColor(index) : undefined}
        />
      ))}
    </div>
  );
};
