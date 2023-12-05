type LetterInputProps = {
  letter?: string;
};
export const LetterInput = ({ letter }: LetterInputProps) => {
  return (
    <div
      className={`border-2 flex items-center justify-center bg-customBackground rounded-md w-14 h-14
        ${letter ? "border-customBorder2" : "border-customBorder"}`}
    >
      <p className="text-35 text-center text-letterColor font-semibold">
        {letter ? letter : null}
      </p>
    </div>
  );
};
