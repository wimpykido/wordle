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
    <div className="absolute flex justify-center items-center w-screen h-screen z-20">
      <div className="font-custom bg-white p-6 rounded-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <h2 className="pt-2">გამოიცანი სიტყვა!</h2>
      </div>
    </div>
  ) : (
    <></>
  );
};
