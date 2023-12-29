type LetterInputProps = {
  letter?: string;
  color?: string | null;
};

export const LetterInput = ({ letter, color }: LetterInputProps) => {
  return (
    <div
      className={`font-custom border-2 flex items-center justify-center m-[3px] rounded-md w-11 h-11 transition-all transform sm:w-14 sm:h-14
      ${letter !== "" ? "border-custom-borderDark scale-105" : ""} ${color} ${
        color === "bg-custom-yellow"
          ? "border-custom-yellow"
          : color === "bg-custom-green"
          ? "border-custom-green"
          : "border-custom-border"
      }`}
    >
      <p
        className={`${
          color && "text-white"
        } font-black text-2xl m-2 items-center pt-2 sm:text-3xl`}
      >
        {letter}
      </p>
    </div>
  );
};
