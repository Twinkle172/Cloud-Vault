export const COLORS = {
  PRIMARY: "#2563EB",
  SECONDARY: "#0F172A",
  BACKGROUND: "#F8FAFC",
  ACCENT: "#14B8A6",
  SUCCESS: "#22C55E",
  ERROR: "#EF4444",
  TEXT: "#1E293B",
  BORDER: "#E2E8F0",
};
export const APP_NAME = "CloudVault";

export const STORAGE_LIMIT_GB = 500;

export const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api"
).replace(/\/api\/?$/, "");
