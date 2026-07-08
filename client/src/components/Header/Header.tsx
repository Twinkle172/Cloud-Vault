import "./Header.css";

const Header = () => {
  return (
    <header className="header">

      <div className="header_left">
        <h2>☁️ CloudVault</h2>
      </div>

      <div className="header_center">
        <input
          type="text"
          placeholder="Search files..."
        />
      </div>

      <div className="header_right">

        <button>🔔</button>

        <button>⚙️</button>

        <button>👤</button>

      </div>

    </header>
  );
};

export default Header;