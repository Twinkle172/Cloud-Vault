import "./Dashboard.css";
import ActivityTimeline from "../ActivityTimeline/ActivityTimeline";
import FolderGrid from "../FolderGrid/FolderGrid";
import QuickStats from "../QuickStats/QuickStats";
import RecentFiles from "../RecentFiles/RecentFiles";
import StorageWidget from "../StorageWidget/StorageWidget";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="dashboard">
      <section className="dashboardTop">
        <div className="dashboardWelcome">
          <span className="eyebrow">CloudVault overview</span>
          <h1>Welcome back, {user?.name || "there"}</h1>
          <p>Track storage, review recent files, and keep your workspace tidy.</p>
        </div>

        <StorageWidget />
      </section>

      <QuickStats />

      <FolderGrid />

      <div className="bottomGrid">
        <RecentFiles />
        <ActivityTimeline />
      </div>
    </main>
  );
};

export default Dashboard;
