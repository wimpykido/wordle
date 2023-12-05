import { LetterInput } from "../letter-input";

type WordProps = {
  word?: string;
  length: number;
};
export const Word = ({ length }: WordProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: length }).map((_, index) => (
        <LetterInput key={index} />
      ))}
    </div>
  );
};
