import { useContext, useEffect, useState } from "react";
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
import { Statistics } from "../../components/statistics";
import { StatsContext, StatsContextType } from "../../context";

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
  const [showStats, setShowStats] = useState(false);
  const [win, setWin] = useState(false);

  const { width, height } = useWindowSize();
  const { updateStats, data } = useContext(StatsContext) as StatsContextType;

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

  const countElement = (arr: Array<string>, target: string) => {
    return arr.reduce(function (count, element) {
      return count + (element === target ? 1 : 0);
    }, 0);
  };
  const getLetterBackgroundColor = (arr: Array<any>) => {
    const backgroundColors: Array<string> = [];
    const correctLetters: Array<string> = [];
    const letterQuantity: { [key: string]: number } = {};
    const incorrectPos: Array<string> = [];

    secretWord.forEach((letter) => {
      letterQuantity[letter] = (letterQuantity[letter] || 0) + 1;
    });

    arr.forEach((letter, index) => {
      if (secretWord[index] === letter) {
        correctLetters.push(letter);
      }
    });
    arr.forEach((letter, index) => {
      if (secretWord[index] === letter) {
        backgroundColors.push("bg-custom-green");
        setLetters((prev) =>
          prev.map((obj) =>
            obj.letter === letter ? { ...obj, color: "bg-custom-green" } : obj
          )
        );
      } else if (
        secretWord.includes(letter) &&
        !correctLetters.includes(letter) &&
        letterQuantity[letter] > countElement(incorrectPos, letter)
      ) {
        incorrectPos.push(letter);
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
        console.log(letters);
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
          updateStats({ won: data.won + 1, played: data.played + 1 });
          if (rowIndex > data.bestTry) {
            updateStats({ bestTry: rowIndex + 1 });
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
        setShowStats={setShowStats}
        setIsGameOver={setIsGameOver}
        setMessage={setMessage}
        showRules={showRules}
        showStats={showStats}
      />
      <div className="grid relative">
        <Alert />
        {showRules && <HowToPlay setShowRules={setShowRules} />}
        {showStats && <Statistics setShowStats={setShowStats} />}
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
