import { useEffect, useState } from "react";

export const Alert = () => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return showComponent ? (
    <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-56 font-custom text-lg py-3 rounded-lg shadow-[rgba(0,_0,_0,_0.3)_0px_2px_30px]">
      <h2 className="pt-[6px] text-center">გამოიცანი სიტყვა!</h2>
    </div>
  ) : (
    <></>
  );
};
