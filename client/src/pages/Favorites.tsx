import WorkspacePage from "../components/WorkspacePage/WorkspacePage";

const favoriteFiles = [
  { name: "Resume.pdf", meta: "PDF document", status: "Pinned" },
  { name: "CloudVault pitch deck", meta: "Presentation", status: "Pinned" },
  { name: "College certificates", meta: "Folder", status: "Pinned" },
];

const Favorites = () => {
  return (
    <WorkspacePage
      eyebrow="Saved workspace"
      title="Favorites"
      subtitle="Keep your most important files and folders one click away."
      stats={[
        { label: "Pinned items", value: "3" },
        { label: "Quick access", value: "Ready" },
      ]}
    >
      <section className="workspacePanel glass">
        <h2>Favorite items</h2>

        <div className="workspaceList">
          {favoriteFiles.map((file) => (
            <article className="workspaceListItem" key={file.name}>
              <div>
                <h3>{file.name}</h3>
                <p>{file.meta}</p>
              </div>
              <span className="workspaceBadge">{file.status}</span>
            </article>
          ))}
        </div>
      </section>
    </WorkspacePage>
  );
};

export default Favorites;
