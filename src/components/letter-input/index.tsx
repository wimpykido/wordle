type LetterInputProps = {
  letter?: string;
};

export const LetterInput = ({ letter }: LetterInputProps) => {
  return (
    <div
      className={`border-2 flex items-center justify-center border-custom-border rounded-md w-11 h-11 transition-all sm:w-14 sm:h-14
      ${letter !== "" && "border-custom-borderDark"} `}
    >
      {letter}
    </div>
  );
};
