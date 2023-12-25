import { useEffect, useState } from "react";
import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";
import { getRandomWord } from "../../components/gameRules/words";

// კაი იქნება ამ ტიპს თუ გამოვიყენებთ any-s ნაცვლად 
type Word = {
  guessedWord: Array<any>
  colors: Array<any>
  checked: boolean;
}

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

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      const key = e.key.toLowerCase();

      if (/^[ა-ჰ]$/.test(key)) {
        const updatedWordStates = [...wordStates];
        updatedWordStates[rowIndex].guessedWord[letterIndex] = key;
        setWordStates(updatedWordStates);
        setLetterIndex((prevIndex) => (prevIndex + 1) % 6);
        console.log(letterIndex);
      }
      //enter da backspace shemtxvevebi
      if (key === "enter") {
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
      } else if (key === "backspace") {
        console.log("წაშლა", letterIndex);
        const updatedWordStates = [...wordStates];
        const newLetterIndex = (letterIndex - 1 + 6) % 6;
        updatedWordStates[rowIndex].guessedWord[newLetterIndex] = "";
        setLetterIndex(newLetterIndex);
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
      />
    </div>
  );
};

export default WordlePage;
