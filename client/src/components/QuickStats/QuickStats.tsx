import "./QuickStats.css";

import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import StatCard from "../StatCard/StatCard";

const QuickStats = () => {

  return (

    <section className="quickStats">

      <StatCard
        title="Folders"
        value={28}
        icon={<FolderRoundedIcon />}
      />

      <StatCard
        title="Files"
        value={142}
        icon={<DescriptionRoundedIcon />}
      />

      <StatCard
        title="Shared"
        value={13}
        icon={<GroupRoundedIcon />}
      />

      <StatCard
        title="Favorites"
        value={7}
        icon={<StarRoundedIcon />}
      />

    </section>

  );
};

export default QuickStats;