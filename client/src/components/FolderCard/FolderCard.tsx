import "./FolderCard.css";

import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

interface FolderCardProps {
  title: string;
  files: number;
  size: string;
  updated: string;
}

const FolderCard = ({
  title,
  files,
  size,
  updated,
}: FolderCardProps) => {
  return (
    <div className="folderCard glass glow fadeUp">

      <div className="folderTop">

        <div className="folderIcon">
          <FolderRoundedIcon />
        </div>

        <MoreHorizRoundedIcon className="moreIcon" />

      </div>

      <h3>{title}</h3>

      <p>{files} Files</p>

      <p>{size}</p>

      <span>{updated}</span>

      <button className="openBtn">
        Open Folder
        <ArrowForwardRoundedIcon />
      </button>

    </div>
  );
};

export default FolderCard;