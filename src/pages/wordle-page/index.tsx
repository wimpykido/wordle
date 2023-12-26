import { useEffect, useState } from "react";
import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";
import { getRandomWord } from "../../components/gameRules/words";

// კაი იქნება ამ ტიპს თუ გამოვიყენებთ any-s ნაცვლად
type Word = {
  guessedWord: Array<any>;
  colors: Array<any>;
  checked: boolean;
};

const WordlePage = () => {
  const [wordStates, setWordStates] = useState(
    Array(6)
      .fill("")
      .map(() => ({
        guessedWord: Array(6).fill(""),
        colors: Array(6).fill(""),
      }))
  );
  const [secretWord] = useState<Array<string>>(getRandomWord().split(""));
  const [rowIndex, setRowIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);


  const getLetterBackgroundColor = (arr: Array<any>) => {
    const backgroundColors: Array<string> = [];
    arr.forEach((letter, index) => {
      const correctLetters: Array<string> = [];
      if (secretWord[index] === letter) {
        backgroundColors.push("bg-custom-green");
        correctLetters.push(letter);
      } else if (
        secretWord.includes(letter) &&
        !correctLetters.includes(letter)
      ) {
        backgroundColors.push("bg-custom-yellow");
      } else {
        backgroundColors.push("bg-custom-dark");
      }
    });
    return backgroundColors;
  };

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      const key = e.key.toLowerCase();
      if (/^[ა-ჰ]$/.test(key) && letterIndex < 6) {
        const updatedWordStates = [...wordStates];
        updatedWordStates[rowIndex].guessedWord[letterIndex] = key;
        setWordStates(updatedWordStates);
        setLetterIndex((prevIndex) => prevIndex + 1);
        console.log(letterIndex);
      }
      if (key === "enter" && letterIndex === 6) {
        setRowIndex(rowIndex + 1);
        setLetterIndex(0);
        const colors = getLetterBackgroundColor(
          wordStates[rowIndex].guessedWord
        );

        // Update colors for the current word
        setWordStates((prevWordStates) =>
          prevWordStates.map((wordState, index) =>
            index === rowIndex ? { ...wordState, colors: colors } : wordState
          )
        );

        console.log("backgrounds:", colors);
        console.log("ეს", rowIndex);
      }
      if (key === "backspace" && letterIndex > 0) {
        console.log("წაშლა", letterIndex);
        const updatedWordStates = [...wordStates];
        updatedWordStates[rowIndex].guessedWord[letterIndex - 1] = "";
        setLetterIndex((prevIndex) => prevIndex - 1);
        setWordStates(updatedWordStates);
      }
      console.log(key);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [letterIndex, rowIndex, wordStates]);

  console.log(wordStates);

  return (
    <div className="grid items-center justify-center gap-6 m-6">
      <div className="grid gap-2">
        {wordStates.map((wordState, index) => (
          <Word
            key={index}
            secretWord={secretWord}
            word={wordState.guessedWord}
            color={wordState.colors}
          />
        ))}
      </div>
      <Keyboard
        wordStates={wordStates}
        setWordStates={setWordStates}
        rowIndex={rowIndex}
        setRowIndex={setRowIndex}
        letterIndex={letterIndex}
        setLetterIndex={setLetterIndex}
        secretWord={secretWord}
      />
    </div>
  );
};

export default WordlePage;
