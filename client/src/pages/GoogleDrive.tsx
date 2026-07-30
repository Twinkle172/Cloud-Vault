import "./GoogleDrive.css";

import { useCallback, useEffect, useState } from "react";

import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import {
  connectGoogleDrive,
  getDriveFiles,
  getDriveStatus,
  importDriveFile,
  type DriveFile,
} from "../api/drive";

const GoogleDrive = () => {
  const [connected, setConnected] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const checkDriveConnection = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDriveStatus();
      const isConnected = data.connected === true;

      setConnected(isConnected);

      if (isConnected) {
        const driveFiles = await getDriveFiles();
        setFiles(driveFiles);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error("Drive status error:", error);
      setError("Could not load Google Drive.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void checkDriveConnection();
  }, [checkDriveConnection]);

  const handleConnect = () => {
    try {
      setError("");
      connectGoogleDrive();
    } catch (error) {
      console.error("Drive connection error:", error);
      setError("Unable to connect Google Drive.");
    }
  };

  const handleImport = async (file: DriveFile) => {
    try {
      setImporting(file.id);
      setError("");

      await importDriveFile(file.id);

      alert(`${file.name} imported successfully into CloudVault!`);
    } catch (error: any) {
      console.error("Drive import error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to import this file."
      );
    } finally {
      setImporting(null);
    }
  };

  if (loading) {
    return (
      <main className="drivePage">
        <div className="driveLoading">
          Loading Google Drive...
        </div>
      </main>
    );
  }

  return (
    <main className="drivePage">
      <div className="driveHeader">
        <div>
          <p className="driveEyebrow">
            Cloud integration
          </p>

          <h1>Google Drive</h1>

          <p>
            Browse your Drive files and import them directly
            into your CloudVault workspace.
          </p>

          {connected && (
            <div className="driveStatus">
              <span className="driveStatusDot" />
              Google Drive connected
            </div>
          )}
        </div>

        {connected && (
          <button
            type="button"
            className="driveButton driveSecondary"
            onClick={() => void checkDriveConnection()}
          >
            <RefreshRoundedIcon />
            Refresh
          </button>
        )}
      </div>

      {error && (
        <div className="driveError">
          {error}
        </div>
      )}

      {!connected ? (
        <section className="driveConnectCard">
          <div className="driveConnectIcon">
            <CloudRoundedIcon />
          </div>

          <h2>Connect Google Drive</h2>

          <p>
            Authorize CloudVault to browse your Google Drive
            files and import the documents you choose.
          </p>

          <button
            type="button"
            className="driveButton drivePrimary"
            onClick={handleConnect}
          >
            <CloudRoundedIcon />
            Connect Google Drive
          </button>
        </section>
      ) : (
        <section>
          <div className="driveFileHeader">
            <div>
              <h2>Your Drive Files</h2>

              <p>
                {files.length}{" "}
                {files.length === 1 ? "file" : "files"} found
              </p>
            </div>
          </div>

          {files.length === 0 ? (
            <div className="driveEmpty">
              No files were found in this Google Drive account.
            </div>
          ) : (
            <div className="driveFiles">
              {files.map((file) => (
                <article
                  className="driveFile"
                  key={file.id}
                >
                  <div className="driveFileInfo">
                    <div className="driveFileIcon">
                      <InsertDriveFileRoundedIcon />
                    </div>

                    <div className="driveFileText">
                      <strong>{file.name}</strong>

                      {file.modifiedTime && (
                        <p>
                          Modified{" "}
                          {new Date(
                            file.modifiedTime
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="driveButton drivePrimary"
                    disabled={importing === file.id}
                    onClick={() =>
                      void handleImport(file)
                    }
                  >
                    <DownloadRoundedIcon />

                    {importing === file.id
                      ? "Importing..."
                      : "Import"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default GoogleDrive;