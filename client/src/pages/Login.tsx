import "./Login.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  /* ==========================================
     NORMAL EMAIL + PASSWORD LOGIN
  ========================================== */

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(
        response.data.token,
        response.data.user
      );

      navigate("/dashboard");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
     GOOGLE LOGIN
  ========================================== */

  const handleGoogleLogin = async (
    credential?: string
  ) => {
    if (!credential) {
      alert("Google Sign-In failed. Please try again.");
      return;
    }

    setGoogleLoading(true);

    try {
      const response = await api.post(
        "/auth/google",
        {
          credential,
        }
      );

      login(
        response.data.token,
        response.data.user
      );

      navigate("/dashboard");
    } catch (error: any) {
      console.error(
        "Google login error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Google Sign-In failed"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authBlob blobOne"></div>
      <div className="authBlob blobTwo"></div>

      <div className="authCard glass">
        <div className="authLogo">
          CloudVault
        </div>

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue to your secure
          cloud storage.
        </p>

        {/* EMAIL / PASSWORD LOGIN */}

        <form onSubmit={handleLogin}>
          <div className="inputGroup">
            <EmailRoundedIcon />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="inputGroup">
            <LockRoundedIcon />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

            <button
              className="eyeButton"
              type="button"
              onClick={() =>
                setShowPassword(
                  (value) => !value
                )
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <VisibilityOffRoundedIcon />
              ) : (
                <VisibilityRoundedIcon />
              )}
            </button>
          </div>

          <div className="authOptions">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link to="#">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="loginBtn"
            disabled={loading || googleLoading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        {/* DIVIDER */}

        <div className="divider">
          <span>OR</span>
        </div>

        {/* GOOGLE LOGIN */}

        <div className="googleLoginContainer">
          {googleLoading ? (
            <p>Connecting to Google...</p>
          ) : (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleLogin(
                  credentialResponse.credential
                );
              }}
              onError={() => {
                alert(
                  "Google Sign-In failed. Please try again."
                );
              }}
              text="continue_with"
              shape="rectangular"
              size="large"
              width="320"
            />
          )}
        </div>

        <p className="bottomText">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;