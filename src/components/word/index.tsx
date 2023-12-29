import { useEffect, useState } from "react";
import { LetterInput } from "../letter-input";

type WordProps = {
  word?: Array<string>;
  secretWord: Array<string>;
  color?: Array<string>;
};

export const Word = ({ secretWord, word, color }: WordProps) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const applyColorsWithDelay = async () => {
      for (let i = 0; i < color!.length; i++) {
        setCurrentColorIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    };
    if (color && color.length > 0) {
      applyColorsWithDelay();
    }
  }, [color]);
  return (
    <div className="flex items-center justify-center">
      {secretWord.map((_, index) => (
        <LetterInput
          letter={word && word[index]}
          key={index}
          color={color ? (index <= currentColorIndex ? color[index] : null) : null}
        />
      ))}
    </div>
  );
};
