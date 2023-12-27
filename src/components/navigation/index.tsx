import StatsIcon from "../../assets/stats.png";
import SettingsIcon from "../../assets/settings.png";
import HelpIcon from "../../assets/help.png";

type NavigationProps = {
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const Navigation = ({ setIsGameOver, setMessage }: NavigationProps) => {
  const handleClick = () => {
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
          className={`font-custom rounded-md outline-none ml-2 p-2 text-custom-text hover:bg-custom-light transition-all sm:text-lg`}
          title="coming soon..."
        >
          <img src={StatsIcon} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          className={`font-custom rounded-md outline-none ml-2 p-2 text-custom-text hover:bg-custom-light transition-all sm:text-lg`}
          title="coming soon..."
        >
          <img src={SettingsIcon} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          className={`font-custom rounded-md outline-none ml-2 p-2 text-custom-text hover:bg-custom-light transition-all sm:text-lg`}
          title="coming soon..."
        >
          <img src={HelpIcon} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </nav>
  );
};
