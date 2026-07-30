import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: <DashboardRoundedIcon /> },
  { to: "/files", label: "My Files", icon: <FolderRoundedIcon /> },
  { to: "/drive", label: "Google Drive", icon: <GoogleIcon /> },
  { to: "/shared", label: "Shared", icon: <GroupsRoundedIcon /> },
  { to: "/favorites", label: "Favorites", icon: <StarRoundedIcon /> },
  { to: "/recent", label: "Recent", icon: <HistoryRoundedIcon /> },
  { to: "/trash", label: "Trash", icon: <DeleteRoundedIcon /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar glass fadeUp">
      <button className="new_btn" onClick={() => navigate("/files")}>
        <AddRoundedIcon />
        <span>New Upload</span>
      </button>

      <nav className="menu" aria-label="Main navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "menu_item active" : "menu_item"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar_bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "menu_item active" : "menu_item"
          }
        >
          <SettingsRoundedIcon />
          <span>Settings</span>
        </NavLink>

        <button className="menu_item menuButton" type="button" onClick={handleLogout}>
          <LogoutRoundedIcon />
          <span>Logout</span>
        </button>

        <div className="cloud_status">
          <CloudRoundedIcon />

          <div>
            <h4>Cloud Connected</h4>
            <p>Ready to sync files</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
