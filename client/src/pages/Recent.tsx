import WorkspacePage from "../components/WorkspacePage/WorkspacePage";

const recentItems = [
  { name: "Resume.pdf", meta: "Opened today", status: "Document" },
  { name: "Vacation.png", meta: "Uploaded yesterday", status: "Image" },
  { name: "CloudVault_UI.fig", meta: "Edited 2 days ago", status: "Design" },
];

const Recent = () => {
  return (
    <WorkspacePage
      eyebrow="Activity"
      title="Recent"
      subtitle="Review the latest files touched in your CloudVault workspace."
      stats={[
        { label: "Recent files", value: "3" },
        { label: "Last sync", value: "Now" },
      ]}
    >
      <section className="workspacePanel glass">
        <h2>Latest activity</h2>

        <div className="workspaceList">
          {recentItems.map((item) => (
            <article className="workspaceListItem" key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.meta}</p>
              </div>
              <span className="workspaceBadge">{item.status}</span>
            </article>
          ))}
        </div>
      </section>
    </WorkspacePage>
  );
};

export default Recent;
