import "./CreateFolderModal.css";
import { useState } from "react";
import type { FormEvent } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";

interface CreateFolderModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateFolderModal = ({ open, onClose, onCreate }: CreateFolderModalProps) => {
  const [name, setName] = useState("");

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const folderName = name.trim();
    if (!folderName) return;

    onCreate(folderName);
    setName("");
    onClose();
  };

  return (
    <div className="folderModalOverlay" role="dialog" aria-modal="true">
      <form className="folderModal glass" onSubmit={handleSubmit}>
        <div className="folderModalHeader">
          <div>
            <CreateNewFolderRoundedIcon />
            <h2>Create folder</h2>
          </div>

          <button type="button" onClick={onClose} aria-label="Close folder modal">
            <CloseRoundedIcon />
          </button>
        </div>

        <label>
          Folder name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Placement documents"
            autoFocus
          />
        </label>

        <div className="folderModalActions">
          <button type="button" className="secondaryAction" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primaryAction">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolderModal;
