import "../styles/Landing.css";
import { Link } from "react-router-dom";

import StatsSection from "../components/StatsSection/StatsSection";
import DashboardPreview from "../components/DashboardPreview/DashboardPreview";
import Footer from "../components/Footer/Footer";

import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const Landing = () => {
  return (
    <div className="landing">

      {/* Background Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Navbar */}
      <nav className="landing_nav">

        <div className="brand">
          <div className="brand_logo">☁</div>
          <h2>CloudVault</h2>
        </div>

        <div className="nav_links">

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/register"
            className="primaryBtn"
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero */}
      <section className="hero">

        <h1>
          Secure Cloud Storage
          <br />
          For Your Digital Universe
        </h1>

        <p>
          Store, organize, preview and share your files securely
          from anywhere.
        </p>

        <div className="hero_buttons">

          <Link
            to="/register"
            className="primaryBtn"
          >
            Get Started
          </Link>

          <Link
            to="/demo"
            className="secondaryBtn"
          >
            Live Demo
          </Link>

        </div>

      </section>

      {/* Features */}
      <section className="features">

        <div className="featureCard glass">

          <SecurityRoundedIcon className="featureIcon" />

          <h3>Military-grade Security</h3>

          <p>
            AES-256 encryption keeps every file protected.
          </p>

        </div>

        <div className="featureCard glass">

          <CloudUploadRoundedIcon className="featureIcon" />

          <h3>Lightning Uploads</h3>

          <p>
            Upload files instantly with blazing speed.
          </p>

        </div>

        <div className="featureCard glass">

          <FolderRoundedIcon className="featureIcon" />

          <h3>Smart Organization</h3>

          <p>
            Organize documents using folders and tags.
          </p>

        </div>

        <div className="featureCard glass">

          <GroupsRoundedIcon className="featureIcon" />

          <h3>Easy Collaboration</h3>

          <p>
            Share files securely with your team.
          </p>

        </div>

      </section>

      {/* Stats */}
      <section>
        <StatsSection />
      </section>

      {/* Dashboard Preview */}
      <section>
        <DashboardPreview />
      </section>

      {/* CTA */}
      <section className="ctaSection">

        <h2>Ready to secure your files?</h2>

        <p>
          Join thousands of users storing, organizing and sharing
          files with CloudVault.
        </p>

        <div className="ctaButtons">

          <Link
            to="/register"
            className="primaryBtn"
          >
            Create Free Account
          </Link>

          <Link
            to="/login"
            className="secondaryLink"
          >
            Sign In
          </Link>

        </div>

      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Landing;