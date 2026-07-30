import "./Footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footerTop">

        <div className="footerBrand">

          <h2>☁ CloudVault</h2>

          <p>
            Secure cloud storage built with the MERN Stack.
          </p>

        </div>

        <div className="footerLinks">

          <div>

            <h4>Product</h4>

            <a href="#">Features</a>
            <a href="#">Dashboard</a>
            <a href="#">Security</a>

          </div>

          <div>

            <h4>Resources</h4>

            <a href="#">Documentation</a>
            <a href="#">GitHub</a>
            <a href="#">Support</a>

          </div>

          <div>

            <h4>Connect</h4>

            <a href="#">
              <GitHubIcon />
              GitHub
            </a>

            <a href="#">
              <LinkedInIcon />
              LinkedIn
            </a>

            <a href="#">
              <EmailRoundedIcon />
              Contact
            </a>

          </div>

        </div>

      </div>

      <div className="footerBottom">

        © 2026 CloudVault • Built with React + TypeScript + Node.js

      </div>

    </footer>
  );
};

export default Footer;