import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import RecommendedUserCard from "../RecommendedUserCard/RecommendedUserCard";
import { Card } from "@mui/material";

const RightSection = () => {
  const popularUser = [1, 1, 1, 1, 1];

  return (
    <div className="pr-5">
      <SearchUser />

      <Card className="p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95">View all</p>
        </div>
        <div>
          {popularUser.map((item) => (
            <RecommendedUserCard />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RightSection;
