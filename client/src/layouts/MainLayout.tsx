import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="app">
      <Header />

      <div className="app_body">
        <Sidebar />

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;