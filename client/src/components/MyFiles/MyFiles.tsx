import "./MyFiles.css";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import api from "../../api/axios";

import {
  summarizeFile,
  askFileAI,
} from "../../services/ai";


interface FileData {
  _id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

type ViewMode = "grid" | "list";

type FilterType =
  | "All"
  | "Documents"
  | "Images"
  | "Videos";


const API_ORIGIN =
  (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:5000/api"
  ).replace(/\/api\/?$/, "");


const filters: FilterType[] = [
  "All",
  "Documents",
  "Images",
  "Videos",
];


const getFileCategory = (
  mimetype: string
): Exclude<FilterType, "All"> => {
  if (mimetype.startsWith("image/")) {
    return "Images";
  }

  if (mimetype.startsWith("video/")) {
    return "Videos";
  }

  return "Documents";
};


const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  return `${(bytes / 1024).toFixed(2)} KB`;
};


const getFileIcon = (mimetype: string) => {
  if (mimetype.startsWith("image/")) {
    return <ImageRoundedIcon />;
  }

  if (mimetype.startsWith("video/")) {
    return <MovieRoundedIcon />;
  }

  return <InsertDriveFileRoundedIcon />;
};


const isAISupported = (mimetype: string) => {
  const supportedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  return supportedTypes.includes(mimetype);
};


const MyFiles = () => {
  const [view, setView] =
    useState<ViewMode>("list");

  const [files, setFiles] =
    useState<FileData[]>([]);

  const [search, setSearch] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("All");

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);


  // ==================================================
  // SUMMARY STATES
  // ==================================================

  const [summarizingId, setSummarizingId] =
    useState<string | null>(null);

  const [summary, setSummary] =
    useState("");

  const [summaryFile, setSummaryFile] =
    useState<FileData | null>(null);

  const [summaryError, setSummaryError] =
    useState("");


  // ==================================================
  // FILE CHAT STATES
  // ==================================================

  const [chatFile, setChatFile] =
    useState<FileData | null>(null);

  const [fileQuestion, setFileQuestion] =
    useState("");

  const [fileAnswer, setFileAnswer] =
    useState("");

  const [fileChatLoading, setFileChatLoading] =
    useState(false);

  const [fileChatError, setFileChatError] =
    useState("");


  const fileInputRef =
    useRef<HTMLInputElement>(null);


  // ==================================================
  // FETCH FILES
  // ==================================================

  const fetchFiles = async () => {
    try {
      const response =
        await api.get<FileData[]>("/files");

      setFiles(response.data);
    } catch (error) {
      console.error(
        "Fetch files error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchFiles();
  }, []);


  // ==================================================
  // SEARCH + FILTER
  // ==================================================

  const filteredFiles = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return files.filter((file) => {
      const matchesSearch =
        file.originalname
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        activeFilter === "All" ||
        getFileCategory(file.mimetype) ===
          activeFilter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [
    activeFilter,
    files,
    search,
  ]);


  // ==================================================
  // UPLOAD
  // ==================================================

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.length) {
      return;
    }

    const selectedFile =
      event.target.files[0];

    const formData =
      new FormData();

    formData.append(
      "file",
      selectedFile
    );

    setUploading(true);

    try {
      await api.post(
        "/files/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await fetchFiles();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };


  // ==================================================
  // VIEW
  // ==================================================

  const handleView = (
    file: FileData
  ) => {
    window.open(
      `${API_ORIGIN}/uploads/${file.filename}`,
      "_blank"
    );
  };


// ==================================================
// DOWNLOAD
// ==================================================

const handleDownload = async (
  file: FileData
) => {
  try {
    const response = await api.get(
      `/files/download/${file._id}`,
      {
        responseType: "blob",
      }
    );

    const blobUrl = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = file.originalname;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error(
      "Download error:",
      error
    );

    alert("Download failed");
  }
};


  // ==================================================
  // AI SUMMARIZE
  // ==================================================

  const handleSummarize = async (
    file: FileData
  ) => {
    if (!isAISupported(file.mimetype)) {
      alert(
        "AI summary is currently available for PDF, DOCX, and TXT files."
      );

      return;
    }

    try {
      setSummarizingId(file._id);

      setSummaryFile(file);

      setSummary("");

      setSummaryError("");

      const response =
        await summarizeFile(
          file._id
        );

      setSummary(
        response.answer ||
          "CloudVault AI couldn't generate a summary."
      );
    } catch (error: any) {
      console.error(
        "AI Summary Error:",
        error
      );

      setSummaryError(
        error?.response?.data?.message ||
          "CloudVault AI couldn't summarize this file."
      );
    } finally {
      setSummarizingId(null);
    }
  };


  // ==================================================
  // OPEN FILE CHAT
  // ==================================================

  const openFileChat = (
    file: FileData
  ) => {
    if (!isAISupported(file.mimetype)) {
      alert(
        "AI chat is currently available for PDF, DOCX, and TXT files."
      );

      return;
    }

    setChatFile(file);

    setFileQuestion("");

    setFileAnswer("");

    setFileChatError("");
  };


  // ==================================================
  // ASK ONE FILE
  // ==================================================

  const handleAskFile = async () => {
    if (
      !chatFile ||
      !fileQuestion.trim()
    ) {
      return;
    }

    try {
      setFileChatLoading(true);

      setFileAnswer("");

      setFileChatError("");

      const response =
        await askFileAI(
          chatFile._id,
          fileQuestion.trim()
        );

      setFileAnswer(
        response.answer ||
          "CloudVault AI couldn't generate an answer."
      );
    } catch (error: any) {
      console.error(
        "File AI Chat Error:",
        error
      );

      setFileChatError(
        error?.response?.data?.message ||
          "CloudVault AI couldn't answer this question."
      );
    } finally {
      setFileChatLoading(false);
    }
  };


  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = async (
    id: string
  ) => {
    if (
      !window.confirm(
        "Delete this file?"
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/files/${id}`
      );


      if (
        summaryFile?._id === id
      ) {
        setSummaryFile(null);

        setSummary("");

        setSummaryError("");
      }


      if (
        chatFile?._id === id
      ) {
        setChatFile(null);

        setFileQuestion("");

        setFileAnswer("");

        setFileChatError("");
      }


      await fetchFiles();
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      alert("Delete failed");
    }
  };


  return (
    <main className="myFiles">


      {/* ==================================================
          HIDDEN FILE INPUT
      ================================================== */}

      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleUpload}
      />


      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="filesHeader">

        <div>

          <span className="eyebrow">
            Cloud workspace
          </span>

          <h1>
            My Files
          </h1>

          <p>
            Upload, search, preview,
            download, and analyze your
            documents with CloudVault AI.
          </p>

        </div>


        <div className="headerActions">

          <button
            className={
              view === "grid"
                ? "viewBtn activeView"
                : "viewBtn"
            }
            onClick={() =>
              setView("grid")
            }
            aria-label="Grid view"
          >
            <ViewModuleRoundedIcon />
          </button>


          <button
            className={
              view === "list"
                ? "viewBtn activeView"
                : "viewBtn"
            }
            onClick={() =>
              setView("list")
            }
            aria-label="List view"
          >
            <ViewListRoundedIcon />
          </button>


          <button
            className="uploadButton"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={uploading}
          >
            <CloudUploadRoundedIcon />

            {uploading
              ? "Uploading..."
              : "Upload"}
          </button>

        </div>

      </div>


      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="searchBar glass">

        <SearchRoundedIcon />

        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

      </div>


      {/* ==================================================
          FILTERS
      ================================================== */}

      <div className="filterRow">

        {filters.map((filter) => (

          <button
            key={filter}
            className={
              activeFilter === filter
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(filter)
            }
          >
            {filter}
          </button>

        ))}

      </div>


      {/* ==================================================
          LOADING
      ================================================== */}

      {loading && (

        <div className="emptyFiles glass">
          Loading your files...
        </div>

      )}


      {/* ==================================================
          EMPTY
      ================================================== */}

      {!loading &&
        filteredFiles.length === 0 && (

          <div className="emptyFiles glass">

            <InsertDriveFileRoundedIcon />

            <h2>
              No Files Found
            </h2>

            <p>
              Upload your first document
              or adjust the current filter.
            </p>

          </div>

        )}


      {/* ==================================================
          LIST VIEW
      ================================================== */}

      {view === "list" &&
        filteredFiles.length > 0 && (

          <div className="filesTable glass">

            {filteredFiles.map(
              (file) => (

                <div
                  className="fileRow"
                  key={file._id}
                >

                  {/* FILE NAME */}

                  <div className="fileName">

                    {getFileIcon(
                      file.mimetype
                    )}

                    <span>
                      {file.originalname}
                    </span>

                  </div>


                  {/* CATEGORY */}

                  <span>
                    {getFileCategory(
                      file.mimetype
                    )}
                  </span>


                  {/* SIZE */}

                  <span>
                    {formatFileSize(
                      file.size
                    )}
                  </span>


                  {/* DATE */}

                  <span>
                    {new Date(
                      file.createdAt
                    ).toLocaleDateString()}
                  </span>


                  {/* ACTIONS */}

                  <div className="fileActions">


                    {/* FAVORITE */}

                    <button
                      className="iconBtn"
                      aria-label="Favorite file"
                      title="Favorite"
                    >
                      <StarBorderRoundedIcon />
                    </button>


                    {/* VIEW */}

                    <button
                      className="actionBtn viewAction"
                      onClick={() =>
                        handleView(file)
                      }
                      aria-label="View file"
                      title="View"
                    >
                      <VisibilityRoundedIcon />
                    </button>


                    {/* SUMMARIZE */}

                    {isAISupported(
                      file.mimetype
                    ) && (

                      <button
                        className="actionBtn aiAction"
                        onClick={() =>
                          handleSummarize(
                            file
                          )
                        }
                        disabled={
                          summarizingId ===
                          file._id
                        }
                        aria-label="Summarize file"
                        title="Summarize with AI"
                      >
                        <AutoAwesomeRoundedIcon />
                      </button>

                    )}


                    {/* ASK THIS FILE */}

                    {isAISupported(
                      file.mimetype
                    ) && (

                      <button
                        className="actionBtn aiAction"
                        onClick={() =>
                          openFileChat(
                            file
                          )
                        }
                        aria-label="Ask AI about file"
                        title="Ask AI"
                      >
                        <ChatRoundedIcon />
                      </button>

                    )}


                    {/* DOWNLOAD */}

                    <button
  className="actionBtn downloadBtn"
  onClick={() => handleDownload(file)}
  aria-label="Download file"
  title="Download"
>
  <DownloadRoundedIcon />
</button>


                    {/* DELETE */}

                    <button
                      className="actionBtn deleteBtn"
                      onClick={() =>
                        handleDelete(
                          file._id
                        )
                      }
                      aria-label="Delete file"
                      title="Delete"
                    >
                      <DeleteRoundedIcon />
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}


      {/* ==================================================
          GRID VIEW
      ================================================== */}

      {view === "grid" &&
        filteredFiles.length > 0 && (

          <div className="gridView">

            {filteredFiles.map(
              (file) => (

                <div
                  className="gridCard glass"
                  key={file._id}
                >

                  <StarBorderRoundedIcon
                    className="favoriteIcon"
                  />


                  <div className="gridIcon">

                    {getFileIcon(
                      file.mimetype
                    )}

                  </div>


                  <h3>
                    {file.originalname}
                  </h3>


                  <p>
                    {formatFileSize(
                      file.size
                    )}
                  </p>


                  <div className="gridActions">


                    {/* VIEW */}

                    <button
                      className="viewAction"
                      onClick={() =>
                        handleView(file)
                      }
                    >
                      View
                    </button>


                    {/* SUMMARIZE */}

                    {isAISupported(
                      file.mimetype
                    ) && (

                      <button
                        className="aiAction"
                        onClick={() =>
                          handleSummarize(
                            file
                          )
                        }
                        disabled={
                          summarizingId ===
                          file._id
                        }
                      >

                        {summarizingId ===
                        file._id
                          ? "Summarizing..."
                          : "✨ Summarize"}

                      </button>

                    )}


                    {/* ASK THIS FILE */}

                    {isAISupported(
                      file.mimetype
                    ) && (

                      <button
                        className="aiAction"
                        onClick={() =>
                          openFileChat(
                            file
                          )
                        }
                      >
                        💬 Ask AI
                      </button>

                    )}


                    {/* DOWNLOAD */}

                    <button
  className="downloadBtn"
  onClick={() => handleDownload(file)}
>
  Download
</button>


                    {/* DELETE */}

                    <button
                      className="deleteBtn"
                      onClick={() =>
                        handleDelete(
                          file._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}


      {/* ==================================================
          SUMMARY MODAL
      ================================================== */}

      {summaryFile && (

        <div className="summaryOverlay">

          <div className="summaryModal glass">


            {/* HEADER */}

            <div className="summaryHeader">

              <div>

                <span className="eyebrow">
                  CloudVault AI
                </span>


                <h2>

                  <AutoAwesomeRoundedIcon />

                  AI Summary

                </h2>


                <p>
                  {summaryFile.originalname}
                </p>

              </div>


              <button
                className="summaryClose"
                onClick={() => {
                  setSummaryFile(null);
                  setSummary("");
                  setSummaryError("");
                }}
                aria-label="Close summary"
              >
                <CloseRoundedIcon />
              </button>

            </div>


            {/* LOADING */}

            {summarizingId ===
              summaryFile._id && (

              <div className="summaryLoading">

                <div className="summarySpinner" />

                <p>
                  CloudVault AI is reading
                  your document...
                </p>

              </div>

            )}


            {/* ERROR */}

            {summaryError && (

              <div className="summaryError">
                {summaryError}
              </div>

            )}


            {/* SUMMARY */}

            {summary &&
              summarizingId !==
                summaryFile._id && (

                <div className="summaryContent">
                  {summary}
                </div>

              )}

          </div>

        </div>

      )}


      {/* ==================================================
          ASK THIS FILE MODAL
      ================================================== */}

      {chatFile && (

        <div className="summaryOverlay">

          <div className="summaryModal glass">


            {/* HEADER */}

            <div className="summaryHeader">

              <div>

                <span className="eyebrow">
                  CloudVault AI
                </span>


                <h2>

                  <ChatRoundedIcon />

                  Ask This File

                </h2>


                <p>
                  {chatFile.originalname}
                </p>

              </div>


              <button
                className="summaryClose"
                onClick={() => {
                  setChatFile(null);

                  setFileQuestion("");

                  setFileAnswer("");

                  setFileChatError("");
                }}
                aria-label="Close AI chat"
              >
                <CloseRoundedIcon />
              </button>

            </div>


            {/* QUESTION */}

            <div className="fileChatForm">

              <textarea
                value={fileQuestion}
                placeholder="What would you like to know about this document?"
                onChange={(event) =>
                  setFileQuestion(
                    event.target.value
                  )
                }
                disabled={
                  fileChatLoading
                }
                rows={4}
              />


              <button
                className="fileAskButton"
                onClick={
                  handleAskFile
                }
                disabled={
                  fileChatLoading ||
                  !fileQuestion.trim()
                }
              >

                <ChatRoundedIcon />


                {fileChatLoading
                  ? "Thinking..."
                  : "Ask AI"}

              </button>

            </div>


            {/* LOADING */}

            {fileChatLoading && (

              <div className="summaryLoading">

                <div className="summarySpinner" />

                <p>
                  Searching this document
                  and generating an answer...
                </p>

              </div>

            )}


            {/* ERROR */}

            {fileChatError && (

              <div className="summaryError">
                {fileChatError}
              </div>

            )}


            {/* ANSWER */}

            {fileAnswer &&
              !fileChatLoading && (

                <div className="fileAIAnswer">

                  <span className="eyebrow">
                    AI Response
                  </span>


                  <div className="summaryContent">

                    {fileAnswer}

                  </div>


                  <div className="fileAISource">

                    📄 Source:{" "}
                    {chatFile.originalname}

                  </div>

                </div>

              )}

          </div>

        </div>

      )}

    </main>
  );
};


export default MyFiles;