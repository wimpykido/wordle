import { ReactNode, createContext, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

type StatsState = {
  won: number;
  played: number;
  giveUps: number;
  loses: number;
  bestTry: number;
};

export type StatsContextType = {
  data: StatsState;
  updateStats: (statsUpdate: Partial<StatsState>) => void;
};
export const StatsContext = createContext<StatsContextType | undefined>(
  undefined
);
export const StatsContextProvider = ({ children }: Props) => {
  const storedStatsString = localStorage.getItem("stats");
  const initialStats: StatsState = storedStatsString
    ? JSON.parse(storedStatsString)
    : {
        won: 0,
        played: 0,
        giveUps: 0,
        loses: 0,
        bestTry: 0,
      };

  const [stats, setStats] = useState<StatsState>(initialStats);
  const updateStats = (statsUpdate: Partial<StatsState>) => {
    setStats((prevStats) => ({ ...prevStats, ...statsUpdate }));
  };
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);
  const contextValue: StatsContextType = {
    data: stats,
    updateStats,
  };
  return (
    <StatsContext.Provider value={contextValue}>
      {children}
    </StatsContext.Provider>
  );
};
