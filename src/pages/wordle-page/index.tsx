import { useState } from "react";
import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";

// TODO 1: we need to implement writing with our custom keyboard
// TODO 2: we need to implement logic to check words and letters (with game rules)
// TODO 3: I HAVE TO FIX DESIGN OF THE WORDS AND INPUTS, ASLO IMPLEMENT (FIX) AUTOFOCUS

const WordlePage = () => {
  const [wordStates, setWordStates] = useState(
    Array(6).fill("").map(() => ({ guessedWord: Array(6).fill("") }))
  );
  const [selectedInput, setSelectedInput] = useState<number>(0);
  const handleUserInput = (index: number, input: string, moveNext: () => void) => {
    setWordStates((prevWordStates) => {
      const updatedStates = [...prevWordStates];
      updatedStates[index].guessedWord[selectedInput] = input;
      return updatedStates;
    });
    moveNext();
  };
  console.log(wordStates)
  return (
    <div className="grid items-center justify-center">
      <div className="grid gap-2">
        {wordStates.map((wordState, index) => (
          <Word
            key={index}
            secretWord={"კარადა".split("")}
            word={wordState.guessedWord}
            onUserInput={(input) => {
              handleUserInput(index, input, () => {
                // Move to the next input if not at the end
                if (selectedInput < wordState.guessedWord.length - 1) {
                  setSelectedInput((prevSelectedInput) => prevSelectedInput + 1);
                }
              });
            }}
          />
        ))}
      </div>
      <Keyboard />
    </div>
  );
};

export default WordlePage;
