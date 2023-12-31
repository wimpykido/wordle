import { useEffect, useState } from "react";
import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";
import keys from "../../components/keyboard/keys";
import { Navigation } from "../../components/navigation";
import GameOver from "../../components/game-over";
import { HowToPlay } from "../../components/how-to-play";
import { Alert } from "../../components/alert";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import { getRandomWord } from "../../api";


export type letterType = {
  letter: string;
  color: string;
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
  const [secretWord, setSecretWord] = useState<Array<string>>([]);
  const [rowIndex, setRowIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [letters, setLetters] = useState<Array<letterType>>(keys);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [win, setWin] = useState(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const fetchDataAndSetWord = async () => {
      try {
        const word = await getRandomWord();
        setSecretWord(word.split(""));
        console.log("hi");
      } catch (error) {
        console.error("Error setting secret word:", error);
      }
    };

    fetchDataAndSetWord();
  }, []);

  const getLetterBackgroundColor = (arr: Array<any>) => {
    const backgroundColors: Array<string> = [];
    const correctLetters: Array<string> = [];
    arr.forEach(async (letter, index) => {
      if (secretWord[index] === letter) {
        backgroundColors.push("bg-custom-green");
        correctLetters.push(letter);
        setLetters((prev) =>
          prev.map((obj) =>
            obj.letter === letter ? { ...obj, color: "bg-custom-green" } : obj
          )
        );
      } else if (
        secretWord.includes(letter) &&
        !correctLetters.includes(letter)
      ) {
        backgroundColors.push("bg-custom-yellow");
        setLetters((prev) =>
          prev.map((obj) =>
            obj.letter === letter && obj.color !== "bg-custom-green"
              ? { ...obj, color: "bg-custom-yellow" }
              : obj
          )
        );
      } else {
        setLetters((prev) =>
          prev.map((obj) => {
            const isCorrectLetter = obj.letter === letter;
            const isCorrectColor =
              obj.color === "bg-custom-yellow" ||
              obj.color === "bg-custom-green";
            const shouldUpdateColor =
              isCorrectLetter &&
              !correctLetters.includes(letter) &&
              !isCorrectColor;

            return shouldUpdateColor
              ? { ...obj, color: "bg-custom-dark" }
              : obj;
          })
        );
        backgroundColors.push("bg-custom-dark");
      }
    });
    return backgroundColors;
  };

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      const key = e.key.toLowerCase();
      if (/^[ა-ჰ]$/.test(key) && letterIndex < 6 && !isGameOver) {
        const updatedWordStates = [...wordStates];
        updatedWordStates[rowIndex].guessedWord[letterIndex] = key;
        setWordStates(updatedWordStates);
        setLetterIndex((prevIndex) => prevIndex + 1);
      }
      if (key === "enter" && letterIndex === 6 && !isGameOver) {
        const colors = getLetterBackgroundColor(
          wordStates[rowIndex].guessedWord
        );
        setWordStates((prevWordStates) =>
          prevWordStates.map((wordState, index) =>
            index === rowIndex ? { ...wordState, colors: colors } : wordState
          )
        );
        if (wordStates[rowIndex].guessedWord.join("") === secretWord.join("")) {
          setIsGameOver(true);
          setWin(true);
          setMessage("თქვენ გაიმარჯვეთ!");
          return;
        }
        if (
          wordStates[rowIndex].guessedWord.join("") !== secretWord.join("") &&
          rowIndex === 5
        ) {
          setIsGameOver(true);
          setMessage("თქვენ დამარცხდით!");
          setWin(false);
          return;
        }
        setRowIndex((prevIndex) => prevIndex + 1);
        setLetterIndex(0);
      }
      if (key === "backspace" && letterIndex > 0 && !isGameOver) {
        const updatedWordStates = [...wordStates];
        updatedWordStates[rowIndex].guessedWord[letterIndex - 1] = "";
        setLetterIndex((prevIndex) => prevIndex - 1);
        setWordStates(updatedWordStates);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [letterIndex, rowIndex, wordStates]);

  console.log(secretWord);
  return (
    <div className="grid items-center justify-center gap-6">
      {isGameOver && (
        <GameOver
          message={message}
          answer={secretWord}
          setSecretWord={setSecretWord}
          setWordStates={setWordStates}
          setRowIndex={setRowIndex}
          setLetterIndex={setLetterIndex}
          setIsGameOver={setIsGameOver}
          setMessage={setMessage}
          setLetters={setLetters}
          setWin={setWin}
        />
      )}
      <Alert />
      {win && (
        <Confetti
          recycle={false}
          run={true}
          numberOfPieces={600}
          tweenDuration={3000}
          width={width!}
          height={height!}
        />
      )}
      <Navigation
        setShowRules={setShowRules}
        setIsGameOver={setIsGameOver}
        setMessage={setMessage}
        showRules={showRules}
      />
      <div className="grid relative">
        {showRules && <HowToPlay setShowRules={setShowRules} />}
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
        letters={letters}
        wordStates={wordStates}
        setWordStates={setWordStates}
        rowIndex={rowIndex}
        setRowIndex={setRowIndex}
        letterIndex={letterIndex}
        setLetterIndex={setLetterIndex}
        secretWord={secretWord}
        setIsGameOver={setIsGameOver}
        setMessage={setMessage}
      />
    </div>
  );
};
export default WordlePage;
