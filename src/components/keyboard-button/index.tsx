//unda dawero type propsebistvis, unda iyos dinamiuri

interface KeyboardButtonProps {
  value: string;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KeyboardButton: React.FC<KeyboardButtonProps> = (props) => {
  const { value, shift, setShift } = props;
  const handleClick = () => {
    if (value === "shift") setShift(!shift);
  };

  return (
    <button
      className={`bg-custom-light hover:bg-custom-hover text-custom-text text-sm font-semibold py-2 rounded-md transition-all sm:text-xl sm:p-2
      ${value === "Enter" && "col-span-2"}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};
