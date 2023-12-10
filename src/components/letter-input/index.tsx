import { useEffect, useRef, useState } from "react";

type LetterInputProps = {
  letter?: string;
  onUserInput: (input: string, moveNext: () => void) => void;
  disabled: boolean;
  autoFocus?: boolean;
};
export const LetterInput = ({
  letter,
  onUserInput,
  disabled,
  autoFocus,
}: LetterInputProps) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setInput(userInput);
  };
  const handleMoveNext = () => {
    if (!disabled) {
      onUserInput(input, () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      });
    }
  };
  useEffect(() => {
    // Focus on the input when it becomes the selected input or autoFocus is true
    if ((inputRef.current && !disabled) || autoFocus) {
      inputRef.current?.focus();
    }
  }, [input, disabled, autoFocus]);
  useEffect(() => {
    if (input && !disabled) {
      handleMoveNext();
    }
  }, [disabled, input]);
  return (
    <div
      className={`border-2 flex items-center justify-center bg-customBackground rounded-md w-14 h-14`}
    >
      <input
        type="text"
        className={`text-35 text-center text-letterColor font-semibold uppercase border-none outline-none w-full h-full`}
        value={letter || input}
        onChange={handleChange}
        maxLength={1} // Limit input to one character
        disabled={disabled}
      />
    </div>
  );
};
