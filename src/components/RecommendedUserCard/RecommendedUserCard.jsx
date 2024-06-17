import { Avatar, Button, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";

const RecommendedUserCard = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={<Button>Follow</Button>}
        title="Cheryl"
        subheader="September 14, 2023"
      />
    </div>
  );
};

export default RecommendedUserCard;
