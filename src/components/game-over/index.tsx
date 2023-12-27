import { getRandomWord } from "../gameRules/words";

type GameOverProps = {
  message: string;
  answer: string[];
  setSecretWord: React.Dispatch<React.SetStateAction<string[]>>;
  setWordStates: React.Dispatch<
    React.SetStateAction<
      {
        guessedWord: any[];
        colors: any[];
      }[]
    >
  >;
  setRowIndex: React.Dispatch<React.SetStateAction<number>>;
  setLetterIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const GameOver = ({
  message,
  answer,
  setSecretWord,
  setWordStates,
  setRowIndex,
  setLetterIndex,
  setIsGameOver,
  setMessage,
}: GameOverProps) => {
  const handleClick = () => {
    setSecretWord(getRandomWord().split(""));
    setWordStates(
      Array(6)
        .fill("")
        .map(() => ({
          guessedWord: Array(6).fill(""),
          colors: Array(6).fill(""),
        }))
    );
    setRowIndex(0);
    setLetterIndex(0);
    setIsGameOver(false);
    setMessage("");
  };
  return (
    <div className="absolute flex justify-center items-center bg-custom-light bg-opacity-50 w-screen h-screen">
      <div className="flex flex-col items-center justify-center gap-3 p-6 font-custom bg-white rounded-lg shadow-2xl">
        <h1 className="text-2xl">{message}</h1>
        <p>სწორი პასუხი იყო</p>
        <div className="px-4 py-1 border-2 border-custom-dark border-dashed rounded-md tracking-widest">
          <p className="text-xl pt-2">{answer}</p>
        </div>
        <button
          className="px-4 py-1 mt-4 bg-custom-green hover:scale-105 text-white rounded-md transition-all"
          onClick={handleClick}
        >
          <p className="pt-1">ახალი თამაში</p>
        </button>
      </div>
    </div>
  );
};

export default GameOver;
