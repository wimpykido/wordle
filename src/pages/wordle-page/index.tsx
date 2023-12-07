import { Keyboard } from "../../components/keyboard";
import { Word } from "../../components/word";

const WordlePage = () => {
  return (
    (
    <div>
      <div className="grid gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Word length={6} />
      ))}
    </div>
  )
      <Keyboard />
    </div>
  );
};

export default WordlePage;
