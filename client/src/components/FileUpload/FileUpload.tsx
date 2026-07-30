import { useRef, useState } from "react";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { fileService } from "../../services/file.service";

interface FileUploadProps {
  onUploaded?: () => void;
}

const FileUpload = ({ onUploaded }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      await fileService.uploadFile(file);
      onUploaded?.();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input ref={fileInputRef} type="file" hidden onChange={handleUpload} />

      <button
        className="uploadButton"
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <CloudUploadRoundedIcon />
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default FileUpload;
