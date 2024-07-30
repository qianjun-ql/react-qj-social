import React from "react";
import { Avatar, Button, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";

const RecommendedUserCard = ({ users }) => {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div>
      {users.map((user) => (
        <CardHeader
          key={user.id}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.firstName[0]}
            </Avatar>
          }
          action={<Button>Follow</Button>}
          title={`${user.firstName} ${user.lastName}`}
          subheader={`@${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`}
        />
      ))}
    </div>
  );
};

export default RecommendedUserCard;
