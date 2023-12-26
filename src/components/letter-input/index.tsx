type LetterInputProps = {
  letter?: string;
  color?: string | null;
};

export const LetterInput = ({ letter, color }: LetterInputProps) => {
  return (
    <div
      className={`font-custom leading-3 border-2 flex items-center justify-center border-custom-border rounded-md w-11 h-11 transition-all sm:w-14 sm:h-14
      ${letter !== "" && "border-custom-borderDark"} ${color}`}
    >
      <p
        className={`${
          color && "text-white"
        } font-black text-3xl m-2 items-center`}
      >
        {letter}
      </p>
    </div>
  );
};
