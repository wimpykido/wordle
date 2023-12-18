import { useEffect, useState } from "react";
import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";
import { checkWord } from "../../components/gameRules";
import { getRandomWord } from "../../components/gameRules/words";

const WordlePage = () => {
  const [wordStates, setWordStates] = useState(
    Array(6)
      .fill("")
      .map(() => ({ guessedWord: Array(6).fill("") }))
  );
  const [secretWord, setSecretWord] = useState<Array<string>>(
    getRandomWord().split("")
  );
  const [rowIndex, setRowIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [correctPositions, setCorrectPositions] = useState<Array<number>>([]);
  const [wrongPositionsOfCorrectLetters, setWrongPositionsOfCorrectLetters] =
    useState<Array<number>>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      const key = e.key.toLowerCase();
      const currentRow = wordStates[rowIndex];

      if (
        key === "backspace" &&
        (currentRow.guessedWord.every((letter) => letter === "") || checked)
      ) {
        e.preventDefault();
        return;
      }
      // Block Enter if the current row's word is not complete or already is checked
      if (key === "enter" && (currentRow.guessedWord.includes("") || checked)) {
        e.preventDefault();
        return;
      }
      if (checked) {
        e.preventDefault();
        return;
      }
      if (/^[ა-ჰ]$/.test(key)) {
        const updatedWordStates = [...wordStates];
        updatedWordStates[rowIndex].guessedWord[letterIndex] = key;
        setWordStates(updatedWordStates);
        setLetterIndex((prevIndex) => (prevIndex + 1) % 6);
        console.log(letterIndex);
      }
      //enter da backspace shemtxvevebi
      if (key === "enter") {
        checkCurrentRow();
        setChecked(true);
        // if (rowIndex < wordStates.length - 1) {
        //   setRowIndex((prevIndex) => prevIndex + 1);
        //   setLetterIndex(0);
        // }
      } else if (key === "backspace") {
        //needs testing, does not work correctly in every case
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
  }, [checked, letterIndex, rowIndex, wordStates]);

  const checkCurrentRow = () => {
    const currentRow = wordStates[rowIndex].guessedWord;
    const result = checkWord(currentRow, secretWord);
    setCorrectPositions(result.correctPositions);
    setWrongPositionsOfCorrectLetters(result.wrongPositionsOfCorrectLetters);
    console.log(result);
  };

  return (
    <div className="grid items-center justify-center gap-6 m-6">
      <div className="grid gap-2">
        {wordStates.map((wordState, index) => (
          <Word
            key={index}
            secretWord={secretWord}
            word={wordState.guessedWord}
            wrongPositionsOfCorrectLetters={wrongPositionsOfCorrectLetters}
            correctPositions={correctPositions}
            isCurrentRowWord={checked && rowIndex === index}
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
