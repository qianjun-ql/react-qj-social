import React from "react";
import { Avatar, Button, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../../Redux/Auth/auth.action";

const RecommendedUserCard = ({ users }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const followList = loggedInUser?.followList || [];

  if (!users || users.length === 0) {
    return null;
  }

  const handleFollowToggle = (userId) => {
    dispatch(followUserAction(loggedInUser.id, userId));
    console.log(
      `${followList.includes(userId) ? "Unfollow" : "Follow"} ${userId} by ${
        loggedInUser.id
      }`
    );
  };

  return (
    <div>
      {users.map((user) => (
        <CardHeader
          key={user.id}
          avatar={<Avatar aria-label="recipe">{user.profilePhoto}</Avatar>}
          action={
            <Button onClick={() => handleFollowToggle(user.id)}>
              {followList.includes(user.id) ? "Unfollow" : "Follow"}
            </Button>
          }
          title={`${user.firstName} ${user.lastName}`}
          subheader={`@${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`}
        />
      ))}
    </div>
  );
};

export default RecommendedUserCard;
