import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const UserChatCard = () => {
  return (
    <div>
      <Card>
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
          acion={
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          }
          title="Cheryl"
          subheader={"new message"}
        ></CardHeader>
      </Card>
    </div>
  );
};

export default UserChatCard;
