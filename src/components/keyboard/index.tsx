//KeyboardButton componentis sashualebit keyboardi
import { useState } from "react";
import { KeyboardButton } from "../keyboard-button";
import keys from "./keys";

export const Keyboard = () => {
  const [shift, setShift] = useState<boolean>(false);
  const shiftValue = (value: string) => {
    switch (value) {
      case "წ":
        return "ჭ";
      case "რ":
        return "ღ";
      case "ტ":
        return "თ";
      case "ს":
        return "შ";
      case "ჯ":
        return "ჟ";
      case "ზ":
        return "ძ";
      case "ც":
        return "ჩ";
      default:
        return value;
    }
  };

  return (
    <div className="grid grid-rows-3 grid-cols-10 max-w-[38rem] m-1 gap-1 sm:gap-2">
      {keys.map((value, i) => (
        <KeyboardButton
          key={i}
          value={shift ? shiftValue(value) : value}
          shift={shift}
          setShift={setShift}
        />
      ))}
    </div>
  );
};
