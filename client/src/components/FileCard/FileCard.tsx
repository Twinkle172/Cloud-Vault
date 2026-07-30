import "./FileCard.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import type { CloudFile } from "../../types/file";
import { formatDate, formatFileSize } from "../../utils/helpers";

interface FileCardProps {
  file: CloudFile;
  onView?: (file: CloudFile) => void;
  onDownload?: (file: CloudFile) => void;
  onDelete?: (file: CloudFile) => void;
}

const FileCard = ({ file, onView, onDownload, onDelete }: FileCardProps) => {
  return (
    <article className="fileCard glass">
      <div className="fileCardIcon">
        <InsertDriveFileRoundedIcon />
      </div>

      <div className="fileCardBody">
        <h3>{file.originalname}</h3>
        <p>
          {formatFileSize(file.size)} · {formatDate(file.createdAt)}
        </p>
      </div>

      <div className="fileCardActions">
        {onView && (
          <button onClick={() => onView(file)} aria-label="View file">
            <VisibilityRoundedIcon />
          </button>
        )}
        {onDownload && (
          <button onClick={() => onDownload(file)} aria-label="Download file">
            <DownloadRoundedIcon />
          </button>
        )}
        {onDelete && (
          <button className="danger" onClick={() => onDelete(file)} aria-label="Delete file">
            <DeleteRoundedIcon />
          </button>
        )}
      </div>
    </article>
  );
};

export default FileCard;
