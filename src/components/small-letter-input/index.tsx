type Props = {
  letter: string;
  color: string;
};
export const SmallLetterInput = ({ letter, color }: Props) => {
  return (
    <div
      className={`mr-2 font-custom text-white flex items-center justify-center w-6 h-6 sm:w-5 sm:h-5 ${color} rounded-sm`}
    >
      <p className="m-2 pt-1">{letter}</p>
    </div>
  );
};
