import "./StatsSection.css";

const stats = [
  {
    number: "100K+",
    title: "Files Stored",
  },
  {
    number: "25K+",
    title: "Active Users",
  },
  {
    number: "99.9%",
    title: "Uptime",
  },
  {
    number: "256-bit",
    title: "Encryption",
  },
];

const StatsSection = () => {
  return (
    <section className="statsSection">
      {stats.map((item, index) => (
        <div className="statBox glass" key={index}>
          <h2>{item.number}</h2>
          <p>{item.title}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;