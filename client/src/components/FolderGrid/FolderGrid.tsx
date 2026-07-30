import "./FolderGrid.css";
import FolderCard from "../FolderCard/FolderCard";

const FolderGrid = () => {

  const folders = [

    {
      title:"Projects",
      files:15,
      size:"2.4 GB",
      updated:"Updated Today",
    },

    {
      title:"College",
      files:42,
      size:"8.1 GB",
      updated:"Yesterday",
    },

    {
      title:"Photos",
      files:125,
      size:"14.6 GB",
      updated:"2 Days Ago",
    },

    {
      title:"Certificates",
      files:18,
      size:"640 MB",
      updated:"Last Week",
    }

  ];

  return (

    <section>

      <h2>Recent Folders</h2>

      <div className="folderGrid">

        {folders.map((folder,index)=>(

          <FolderCard
            key={index}
            title={folder.title}
            files={folder.files}
            size={folder.size}
            updated={folder.updated}
          />

        ))}

      </div>

    </section>

  );
};

export default FolderGrid;