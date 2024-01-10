type Props = {
  title: String;
  stats: number | string;
};

export const StatsContainer = ({ title, stats }: Props) => {
  return (
    <div className="bg-custom-veryLightGrey rounded-lg pt-2 pb-3 text-center">
      <h3 className="text-5xl font-sans font-medium">{stats}</h3>
      <p className="text-sm leading-8 sm:leading-10">{title}</p>
    </div>
  );
};
