import React from "react";
import { Avatar, Button, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../../Redux/Auth/auth.action";

const RecommendedUserCard = ({ users }) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.user?.id);

  if (!users || users.length === 0) {
    return null;
  }

  const handleFollow = (userId) => {
    dispatch(followUserAction(loggedInUserId, userId));
    console.log("Flw", userId, "by", loggedInUserId);
  };

  return (
    <div>
      {users.map((user) => (
        <CardHeader
          key={user.id}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.profilePhoto}
            </Avatar>
          }
          action={<Button onClick={() => handleFollow(user.id)}>Follow</Button>}
          title={`${user.firstName} ${user.lastName}`}
          subheader={`@${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`}
        />
      ))}
    </div>
  );
};

export default RecommendedUserCard;
