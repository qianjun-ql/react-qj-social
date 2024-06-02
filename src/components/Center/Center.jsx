import { Avatar, Card, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AvatarList from "./AvatarList";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import DescriptionIcon from "@mui/icons-material/Description";
import PostCard from "../Post/PostCard";

const Center = () => {
  const list = [11, 1, 1, 1, 1, 1];

  const posts = [1, 1, 1, 1, 1];

  const handleCreatePost = () => {
    console.log("open post");
  };

  return (
    <div className="px-20">
      <section className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "5rem", height: "5rem" }} className="">
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {list.map((item) => (
          <AvatarList />
        ))}
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <input
            readOnly
            className="outline-none w-[90%] rounded-full px-5 border bg-transparent border-[#3b4054]"
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleCreatePost}>
              <ImageIcon />
            </IconButton>

            <span>Media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleCreatePost}>
              <VideocamIcon />
            </IconButton>

            <span>Video</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleCreatePost}>
              <DescriptionIcon />
            </IconButton>

            <span>Article</span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
        {posts.map((item) => (
          <PostCard />
        ))}
      </div>
    </div>
  );
};

export default Center;
