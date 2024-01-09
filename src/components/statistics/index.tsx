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
    <div className="font-custom w-full mb-4 absolute bg-white z-50 sm:w-[592px]">
      <div className="mb-2.5 w-full rounded-lg bg-custom-div flex items-center justify-center p-2 relative">
        <h2 className="pt-1 text-lg">სტატისტიკა</h2>
        <button
          onClick={() => setShowStats(false)}
          className="absolute right-4"
        >
          <img src={x} alt="x" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsContainer stats={data.played} title={"ნათამაშები"} />
        <StatsContainer stats={data.won} title={"მოგებული"} />
        <StatsContainer stats={"#" + data.bestTry} title={"საუკეთესო მცდელობა"} />
        <StatsContainer stats={data.giveUps} title={"დანებება"} />
      </div>
      <button
        onClick={() =>
          updateStats({ won: 0, loses: 0, bestTry: 0, giveUps: 0, played: 0 })
        }
      >
        სტატისტიკის გადატვირთვა
      </button>
    </div>
  );
};
