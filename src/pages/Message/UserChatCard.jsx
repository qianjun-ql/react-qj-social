import { Avatar, CardHeader } from "@mui/material";
import React from "react";

const UserChatCard = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rbg(88, 199, 250",
            }}
            src=""
          />
        }
      ></CardHeader>
    </div>
  );
};

export default UserChatCard;
