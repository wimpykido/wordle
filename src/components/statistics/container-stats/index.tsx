type Props = {
  title: String;
  stats: number | string;
};

export const StatsContainer = ({ title, stats }: Props) => {
  return (
    <div className="bg-custom-veryLightGrey rounded-lg p-2 text-center">
      <h3 className="text-5xl">{stats}</h3>
      <p>{title}</p>
    </div>
  );
};
