import "./AuthLayout.css";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="authPage">
      <div className="authBackground">
        <div className="authBlob blobOne"></div>
        <div className="authBlob blobTwo"></div>
      </div>

      <div className="authCard glass">
        <div className="authBrand">
          <h1>CloudVault</h1>
          <p>{subtitle}</p>
        </div>

        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
