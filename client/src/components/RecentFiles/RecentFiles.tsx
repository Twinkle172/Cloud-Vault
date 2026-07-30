import "./RecentFiles.css";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const files = [
  {
    name: "Resume.pdf",
    type: "PDF",
    size: "2.4 MB",
    modified: "Today",
    icon: <PictureAsPdfRoundedIcon />
  },
  {
    name: "DBMS Notes.pdf",
    type: "PDF",
    size: "8.7 MB",
    modified: "Yesterday",
    icon: <PictureAsPdfRoundedIcon />
  },
  {
    name: "CloudVault_UI.fig",
    type: "FIG",
    size: "15 MB",
    modified: "2 Days Ago",
    icon: <DescriptionRoundedIcon />
  },
  {
    name: "Vacation.png",
    type: "PNG",
    size: "5.3 MB",
    modified: "Last Week",
    icon: <ImageRoundedIcon />
  }
];

const RecentFiles = () => {
  return (
    <section className="recentFiles glass fadeUp">

      <h2>Recent Files</h2>

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Modified</th>
            <th></th>
          </tr>

        </thead>

        <tbody>

          {files.map((file, index) => (

            <tr key={index}>

              <td className="fileName">
                {file.icon}
                {file.name}
              </td>

              <td>{file.type}</td>

              <td>{file.size}</td>

              <td>{file.modified}</td>

              <td>
                <MoreHorizRoundedIcon className="more" />
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>
  );
};

export default RecentFiles;