import "./StorageChart.css";

interface StorageChartProps {
  used: number;
  total: number;
}

const StorageChart = ({ used, total }: StorageChartProps) => {
  const percentage = total > 0 ? Math.min(Math.round((used / total) * 100), 100) : 0;

  return (
    <div className="storageChart" style={{ ["--storage" as string]: `${percentage}%` }}>
      <div className="storageChartCircle">
        <strong>{percentage}%</strong>
        <span>used</span>
      </div>
      <p>
        {used} GB of {total} GB
      </p>
    </div>
  );
};

export default StorageChart;
