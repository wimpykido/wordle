import { useEffect, useState } from "react";
import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";

// TODO 1: we need to implement writing with our custom keyboard
// TODO 2: we need to implement logic to check words and letters (with game rules)
// TODO 3: I HAVE TO FIX DESIGN OF THE WORDS AND INPUTS, ASLO IMPLEMENT (FIX) AUTOFOCUS

const WordlePage = () => {
  const [wordStates, setWordStates] = useState(
    Array(6)
      .fill("")
      .map(() => ({ guessedWord: Array(6).fill("") }))
  );
  const [rowIndex, setRowIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      const key = e.key.toLowerCase();
      if (/^[ა-ჰ]$/.test(key)) {
        const updatedWordStates = [...wordStates];
        updatedWordStates[rowIndex].guessedWord[letterIndex] = key;
        setWordStates(updatedWordStates);
        setLetterIndex((prevIndex) => (prevIndex + 1) % 6);
      }
      //enter da backspace shemtxvevebi
      if (key === "enter") {
      }
      console.log(key);
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [wordStates]);

  console.log(wordStates);
  return (
    <div className="grid items-center justify-center gap-6 m-6">
      <div className="grid gap-2">
        {wordStates.map((wordState, index) => (
          <Word
            key={index}
            secretWord={"კარადა".split("")}
            word={wordState.guessedWord}
          />
        ))}
      </div>
      <Keyboard wordStates={wordStates} setWordStates={setWordStates} />
    </div>
  );
};

export default WordlePage;
