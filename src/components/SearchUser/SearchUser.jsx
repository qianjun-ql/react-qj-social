import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/Auth/auth.action";

const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { searchUser, loading } = useSelector((state) => state.auth);

  const handleSearchUser = (e) => {
    const value = e.target.value;
    setUserName(value);
    if (value) {
      dispatch(searchUserAction(value));
    }
  };

  const handleClick = (id) => {
    console.log("User ID clicked:", id);
  };

  const filteredUsers = userName
    ? searchUser.filter(
        (user) =>
          user.firstName.toLowerCase().includes(userName.toLowerCase()) ||
          user.lastName.toLowerCase().includes(userName.toLowerCase())
      )
    : [];

  return (
    <div className="relative py-5">
      <input
        className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3"
        placeholder="Please enter user"
        onChange={handleSearchUser}
        type="text"
        value={userName}
      />
      {loading && <p>Loading...</p>}
      {userName && filteredUsers.length > 0 && (
        <div className="absolute w-full z-20 bg-white border border-gray-300 shadow-lg mt-1">
          {filteredUsers.map((item) => (
            <Card
              className="cursor-pointer mb-2"
              key={item.id}
              onClick={() => {
                handleClick(item.id);
                setUserName("");
              }}
            >
              <CardHeader
                avatar={<Avatar src={item.avatar} />}
                title={`${item.firstName} ${item.lastName}`}
                subheader={`${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`}
              />
            </Card>
          ))}
        </div>
      )}
      {userName && filteredUsers.length === 0 && !loading && (
        <p>No users found</p>
      )}
    </div>
  );
};

export default SearchUser;
