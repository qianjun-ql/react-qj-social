import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import CreateIcon from "@mui/icons-material/Create";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import MessageIcon from "@mui/icons-material/Message";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ListIcon from "@mui/icons-material/List";

export const sidebarMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Reels",
    icon: <ExploreIcon />,
    path: "/reels",
  },
  {
    title: "Create Reels",
    icon: <CreateIcon />,
    path: "/create-reels",
  },
  {
    title: "Notification",
    icon: <AddAlertIcon />,
    path: "/",
  },
  {
    title: "Message",
    icon: <MessageIcon />,
    path: "/message",
  },
  {
    title: "List",
    icon: <ListIcon />,
    path: "/",
  },
  {
    title: "Community",
    icon: <GroupIcon />,
    path: "/",
  },
  {
    title: "Profile",
    icon: <PersonIcon />,
  },
];
