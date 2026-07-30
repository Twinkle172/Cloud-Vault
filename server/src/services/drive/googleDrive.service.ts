import { google } from "googleapis";

// ==================================================
// GOOGLE OAUTH CONFIG
// ==================================================

const getGoogleConfig = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const redirectUri =
    process.env.GOOGLE_DRIVE_REDIRECT_URI ||
    "http://localhost:5000/api/drive/callback";

  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID is missing");
  }

  if (!clientSecret) {
    throw new Error("GOOGLE_CLIENT_SECRET is missing");
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
  };
};

// ==================================================
// CREATE GOOGLE OAUTH CLIENT
// ==================================================

export const createGoogleOAuthClient = () => {
  const {
    clientId,
    clientSecret,
    redirectUri,
  } = getGoogleConfig();

  return new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );
};

// ==================================================
// GENERATE GOOGLE DRIVE AUTH URL
// ==================================================

export const getGoogleDriveAuthUrl = (
  state: string
) => {
  const oauth2Client =
    createGoogleOAuthClient();

  return oauth2Client.generateAuthUrl({
    access_type: "offline",

    // Force consent so Google can issue a refresh token
    // when reconnecting during development.
    prompt: "consent",

    scope: [
  "https://www.googleapis.com/auth/drive.readonly",
],

    state,
  });
};

// ==================================================
// EXCHANGE GOOGLE AUTH CODE FOR TOKENS
// ==================================================

export const exchangeGoogleCode = async (
  code: string
) => {
  const oauth2Client =
    createGoogleOAuthClient();

  const { tokens } =
    await oauth2Client.getToken(code);

  return tokens;
};

// ==================================================
// CREATE AUTHORIZED GOOGLE DRIVE CLIENT
// ==================================================

export const createAuthorizedDriveClient = (
  refreshToken: string
) => {
  const oauth2Client =
    createGoogleOAuthClient();

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return google.drive({
    version: "v3",
    auth: oauth2Client,
  });
};