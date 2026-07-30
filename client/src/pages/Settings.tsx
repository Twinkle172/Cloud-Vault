import { useNavigate } from "react-router-dom";
import WorkspacePage from "../components/WorkspacePage/WorkspacePage";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <WorkspacePage
      eyebrow="Preferences"
      title="Settings"
      subtitle="Manage account actions, security preferences, and workspace behavior."
      stats={[
        { label: "Theme", value: "Dark" },
        { label: "Session", value: "Active" },
      ]}
    >
      <section className="workspacePanel glass">
        <h2>Account actions</h2>

        <div className="workspaceList">
          <article className="workspaceListItem">
            <div>
              <h3>Sign out</h3>
              <p>End this browser session and return to the login page.</p>
            </div>
            <button className="dangerButton" onClick={handleLogout}>
              Logout
            </button>
          </article>
        </div>
      </section>
    </WorkspacePage>
  );
};

export default Settings;
