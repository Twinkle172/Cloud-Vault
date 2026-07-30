import "./Header.css";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Header = () => {
  return (
    <header className="header glass fadeUp">

      <div className="header_left">

        <MenuRoundedIcon className="icon"/>

        <div className="logo">

          <div className="logo_circle">
            ☁
          </div>

          <div>

            <h2>CloudVault</h2>

            <span>Secure • Store • Share</span>

          </div>

        </div>

      </div>

      <div className="header_search">

        <SearchRoundedIcon/>

        <input
          placeholder="Search files, folders..."
        />

      </div>

      <div className="header_right">

        <NotificationsNoneRoundedIcon className="icon"/>

        <SettingsRoundedIcon className="icon"/>

        <AppsRoundedIcon className="icon"/>

        <AccountCircleRoundedIcon
        className="avatar"/>

      </div>

    </header>
  );
};

export default Header;