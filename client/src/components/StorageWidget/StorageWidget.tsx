import "./StorageWidget.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const StorageWidget = () => {
  const usedStorage = 370;
  const totalStorage = 500;

  const percentage = Math.round(
    (usedStorage / totalStorage) * 100
  );

  return (
    <div className="storageWidget glass fadeUp">

      <h3>Storage Usage</h3>

      <div className="progressWrapper">

        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: "#F8FAFC",
            pathColor: "#3B82F6",
            trailColor: "rgba(255,255,255,.08)",
          })}
        />

      </div>

      <div className="storageInfo">

        <p>
          <strong>{usedStorage} GB</strong> used
        </p>

        <p>{totalStorage - usedStorage} GB remaining</p>

      </div>

      <button className="upgradeBtn">
        Upgrade Storage
      </button>

    </div>
  );
};

export default StorageWidget;