import WorkspacePage from "../components/WorkspacePage/WorkspacePage";

const sharedItems = [
  { name: "Project proposal.pdf", meta: "Shared with placement team", status: "View only" },
  { name: "UI references", meta: "Shared with collaborators", status: "Editor" },
  { name: "DBMS notes.pdf", meta: "Shared with classmates", status: "View only" },
];

const Shared = () => {
  return (
    <WorkspacePage
      eyebrow="Collaboration"
      title="Shared Files"
      subtitle="Track files you have shared and keep visibility over collaboration access."
      stats={[
        { label: "Shared items", value: "3" },
        { label: "Collaborators", value: "8" },
      ]}
    >
      <section className="workspacePanel glass">
        <h2>Recently shared</h2>

        <div className="workspaceList">
          {sharedItems.map((item) => (
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

export default Shared;
