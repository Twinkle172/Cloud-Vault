import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <button className="new_btn">
        + New
      </button>

      <nav>

        <p>📁 My Files</p>

        <p>🕒 Recent</p>

        <p>⭐ Starred</p>

        <p>🗑 Trash</p>

      </nav>

    </aside>
  );
};

export default Sidebar;