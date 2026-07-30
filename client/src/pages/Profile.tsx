import WorkspacePage from "../components/WorkspacePage/WorkspacePage";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <WorkspacePage
      eyebrow="Account"
      title={user?.name || "Your Profile"}
      subtitle="Review the account information used to personalize your CloudVault workspace."
      stats={[
        { label: "Plan", value: "Free" },
        { label: "Security", value: "JWT" },
      ]}
    >
      <section className="workspacePanel glass">
        <h2>Account details</h2>

        <div className="workspaceList">
          <article className="workspaceListItem">
            <div>
              <h3>Name</h3>
              <p>{user?.name || "Not available"}</p>
            </div>
          </article>

          <article className="workspaceListItem">
            <div>
              <h3>Email</h3>
              <p>{user?.email || "Not available"}</p>
            </div>
          </article>
        </div>
      </section>
    </WorkspacePage>
  );
};

export default Profile;
