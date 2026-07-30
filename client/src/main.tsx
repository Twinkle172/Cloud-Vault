import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./context/AuthContext";
import App from "./App";

import "./styles/theme.css";
import "./styles/globals.css";
import "./styles/animations.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("Google Client ID:", googleClientId);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);