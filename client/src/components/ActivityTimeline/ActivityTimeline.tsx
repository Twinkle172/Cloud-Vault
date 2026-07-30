import "./ActivityTimeline.css";

import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const activities = [

    {
        icon: <UploadRoundedIcon />,
        title: "Uploaded Resume.pdf",
        time: "2 mins ago"
    },

    {
        icon: <FolderRoundedIcon />,
        title: "Created Projects Folder",
        time: "20 mins ago"
    },

    {
        icon: <ShareRoundedIcon />,
        title: "Shared DBMS Notes.pdf",
        time: "Yesterday"
    },

    {
        icon: <DeleteRoundedIcon />,
        title: "Deleted Old Resume.pdf",
        time: "3 days ago"
    }

];

const ActivityTimeline = () => {

    return (

        <section className="activity glass fadeUp">

            <h2>Recent Activity</h2>

            <div className="timeline">

                {activities.map((item,index)=>(

                    <div className="activityItem" key={index}>

                        <div className="activityIcon">

                            {item.icon}

                        </div>

                        <div>

                            <h4>{item.title}</h4>

                            <span>{item.time}</span>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

};

export default ActivityTimeline;