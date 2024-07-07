import { Avatar, Card, CardHeader } from "@mui/material";
import React from "react";

const SearchUser = () => {
  const handleSearchUser = () => {
    console.log("search user...");
  };

  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <div>
      <div>
        <div className="py-5 relative">
          <input
            className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 right-full"
            placeholder="Please enter user"
            onChange={handleSearchUser}
            type="text"
          />
        </div>
        <CardHeader></CardHeader>
        {false && (
          <Card>
            <CardHeader
              onClick={() => {
                handleClick();
              }}
              avatar={<Avatar src="" />}
              title="Cheryl"
              subheader={"Cheryl"}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
