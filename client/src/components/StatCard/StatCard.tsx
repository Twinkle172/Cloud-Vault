import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="statCard glass glow fadeUp">

      <div className="statIcon">
        {icon}
      </div>

      <div>

        <h4>{title}</h4>

        <h2>{value}</h2>

      </div>

    </div>
  );
};

export default StatCard;