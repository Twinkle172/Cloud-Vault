import WorkspacePage from "../components/WorkspacePage/WorkspacePage";

const deletedItems = [
  { name: "old-resume.pdf", meta: "Deleted 2 days ago", status: "Recoverable" },
  { name: "draft-notes.txt", meta: "Deleted 5 days ago", status: "Recoverable" },
];

const Trash = () => {
  return (
    <WorkspacePage
      eyebrow="Recovery center"
      title="Trash"
      subtitle="Deleted files stay here before permanent removal. Restore support can be connected to the backend next."
      stats={[
        { label: "Deleted items", value: "2" },
        { label: "Retention", value: "30d" },
      ]}
    >
      <section className="workspacePanel glass">
        <h2>Deleted files</h2>

        <div className="workspaceList">
          {deletedItems.map((item) => (
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

export default Trash;
