import { Avatar } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AvatarList = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar sx={{ width: "5rem", height: "5rem" }} className="">
          <AddIcon sx={{ fontSize: "3rem" }} />
        </Avatar>
        <p>Cheryl</p>
      </div>
    </div>
  );
};

export default AvatarList;
