import { useContext } from "react";
import x from "../../assets/x-solid.svg";
import { StatsContainer } from "./container-stats";
import { StatsContext, StatsContextType } from "../../context";

type Props = {
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Statistics = ({ setShowStats }: Props) => {
  const { data, updateStats } = useContext(StatsContext) as StatsContextType;
  return (
    <div className="flex flex-col items-center gap-4 font-custom w-full absolute bg-white z-50 sm:w-[592px]">
      <div className="w-full rounded-lg bg-custom-div flex items-center justify-center p-2 relative">
        <h2 className="pt-1 sm:text-lg">სტატისტიკა</h2>
        <button
          onClick={() => setShowStats(false)}
          className="absolute right-4"
        >
          <img src={x} alt="x" />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsContainer stats={data.played} title={"ნათამაშები"} />
        <StatsContainer stats={data.won} title={"მოგებული"} />
        <StatsContainer stats={data.giveUps} title={"დანებება"} />
        <StatsContainer
          stats={"#" + data.bestTry}
          title={"საუკეთესო მცდელობა"}
        />
      </div>
      <button
        onClick={() =>
          updateStats({ won: 0, loses: 0, bestTry: 0, giveUps: 0, played: 0 })
        }
        className="border-2 rounded-lg px-4 pb-2 pt-3 mb-4 sm:mb-48 border-custom-text text-custom-text hover:border-rose-600 hover:text-rose-600 scale-90 transition-all"
      >
        სტატისტიკის გასუფთავება
      </button>
    </div>
  );
};
