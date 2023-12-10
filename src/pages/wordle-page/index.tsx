import { useState } from "react";
import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";

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
