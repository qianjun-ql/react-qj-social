import React, { useEffect, useState } from "react";
import { Card, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedUsersAction } from "../../Redux/Auth/auth.action";
import SearchUser from "../SearchUser/SearchUser";
import RecommendedUserCard from "../RecommendedUserCard/RecommendedUserCard";
import { useNavigate } from "react-router-dom";

const RightSection = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.auth.recommendedUsers);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRecommendedUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      const getRandomUsers = (users, num) => {
        const shuffled = [...users].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };
      setRecommendedUsers(getRandomUsers(allUsers, 5));
    }
  }, [allUsers]);

  const handleToggle = () => setShowAllUsers((prevShowAll) => !prevShowAll);

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="pr-5">
      <SearchUser onUserClick={navigateToProfile} />

      <Card className="p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <Button
            className="text-xs font-semibold opacity-95"
            onClick={handleToggle}
          >
            {showAllUsers ? "Show less" : "View all"}
          </Button>
        </div>
        <div>
          <RecommendedUserCard
            users={showAllUsers ? allUsers : recommendedUsers}
          />
        </div>
      </Card>
    </div>
  );
};

export default RightSection;
