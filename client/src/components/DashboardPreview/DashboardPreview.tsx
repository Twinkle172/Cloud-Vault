import "./DashboardPreview.css";

const DashboardPreview = () => {
  return (
    <section className="dashboardPreview">

      <h2>Modern Dashboard Experience</h2>

      <p>
        A secure workspace to upload, organize and collaborate on your files.
      </p>

      <div className="browserWindow glass">

        <div className="browserTop">

          <div className="browserDots">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>

          <div className="browserAddress">
            cloudvault.app/dashboard
          </div>

        </div>

        <div className="browserBody">

          <aside className="mockSidebar">

            <div className="mockLogo"></div>

            <div className="mockMenu active"></div>
            <div className="mockMenu"></div>
            <div className="mockMenu"></div>
            <div className="mockMenu"></div>
            <div className="mockMenu"></div>

          </aside>

          <main className="mockContent">

            <div className="mockHeader">

              <div className="headerTitle"></div>

              <div className="headerSearch"></div>

            </div>

            <div className="mockStats">

              <div className="stat"></div>
              <div className="stat"></div>
              <div className="stat"></div>
              <div className="stat"></div>

            </div>

            <div className="mockFolders">

              <div className="folder"></div>
              <div className="folder"></div>
              <div className="folder"></div>

            </div>

            <div className="mockTable">

              <div className="row"></div>
              <div className="row"></div>
              <div className="row"></div>
              <div className="row"></div>

            </div>

          </main>

        </div>

      </div>

    </section>
  );
};

export default DashboardPreview;