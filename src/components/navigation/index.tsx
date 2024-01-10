import StatsIcon from "../../assets/stats.png";
import SettingsIcon from "../../assets/settings.png";
import HelpIcon from "../../assets/help.png";
import { Dispatch, SetStateAction, useContext } from "react";
import { StatsContext, StatsContextType } from "../../context";

type NavigationProps = {
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowRules: Dispatch<SetStateAction<boolean>>;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
  showRules: boolean;
  showStats: boolean;
};

export const Navigation = ({
  setIsGameOver,
  setMessage,
  setShowRules,
  showRules,
  setShowStats,
  showStats,
}: NavigationProps) => {
  const { updateStats, data } = useContext(StatsContext) as StatsContextType;
  const handleClick = () => {
    updateStats({ played: data.played + 1, giveUps: data.giveUps + 1 });
    setMessage("თქვენ დამარცხდით!");
    setIsGameOver(true);
  };
  return (
    <nav className="flex justify-between mt-2">
      <button
        className={`font-custom rounded-md outline-none text-custom-text hover:bg-custom-light transition-all sm:text-lg`}
      >
        <p className="px-2 pt-1 sm:pt-[6px] sm:px-4" onClick={handleClick}>
          დანებება
        </p>
      </button>
      <div className="flex">
        <button
          onClick={() => {
            setShowStats(!showStats);
            setShowRules(false);
          }}
          className={`font-custom rounded-md outline-none ml-2 p-2 text-custom-text hover:bg-custom-lightGreen transition-all sm:text-lg
          ${showStats && "bg-custom-lightGreen"}`}
        >
          <img src={StatsIcon} alt="logo" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          className={`font-custom rounded-md outline-none ml-2 p-2 text-custom-text hover:bg-custom-lightGreen transition-all sm:text-lg`}
          title="coming soon..."
        >
          <img
            src={SettingsIcon}
            alt="logo"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </button>
        <button
          onClick={() => {
            setShowRules(!showRules);
            setShowStats(false);
          }}
          className={`font-custom rounded-md outline-none ml-2 p-2 text-custom-text hover:bg-custom-lightGreen transition-all sm:text-lg
          ${showRules && "bg-custom-lightGreen"}`}
        >
          <img src={HelpIcon} alt="logo" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </nav>
  );
};
