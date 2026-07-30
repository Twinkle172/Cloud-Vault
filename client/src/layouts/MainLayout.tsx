import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />

        <main className="mainContent">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
