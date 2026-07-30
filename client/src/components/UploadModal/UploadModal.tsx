import "./UploadModal.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

interface UploadModalProps {
  onUpload?: (files: File[]) => void;
}

const UploadModal = ({ onUpload }: UploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (files.length === 0) return;
    onUpload?.(files);
  };

  return (
    <div className="uploadModal glass">
      <h2>Upload Files</h2>

      <div {...getRootProps()} className={`dropZone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        <CloudUploadRoundedIcon />
        <p>{isDragActive ? "Drop files here..." : "Drag and drop files here"}</p>
        <button type="button">Select Files</button>
      </div>

      <div className="selectedFiles">
        {files.map((file) => (
          <div key={`${file.name}-${file.size}`} className="fileRow">
            <span>{file.name}</span>
            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        ))}
      </div>

      <button className="uploadBtn" type="button" onClick={handleUpload}>
        Upload Files
      </button>
    </div>
  );
};

export default UploadModal;
