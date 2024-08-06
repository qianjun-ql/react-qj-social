import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPostAction } from "../../Redux/Post/post.action";
import { getUserSavedPosts } from "../../Redux/Auth/auth.action";

const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = useState("posts");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { auth, post } = useSelector((store) => store);

  useEffect(() => {
    if (id) {
      dispatch(getUsersPostAction(id));
      dispatch(getUserSavedPosts(id));
    }
  }, [id, dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tabs = [
    { value: "posts", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" },
    { value: "repost", name: "Repost" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reels = [1, 1, 1, 1, 1]; // Dummy data for reels
  // const savePosts = [1, 1, 1, 1, 1]; // Dummy data for saved posts

  return (
    <Card className="my-10 w-[70%] ">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src={auth.user.bannerPhoto}
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src={auth.user.profilePhoto}
          />

          {true ? (
            <Button
              onClick={handleOpen}
              variant="outlined"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
              Follow
            </Button>
          )}
        </div>

        <div className="p-5">
          <h1 className="py-1 font-bold text-xl">
            {auth.user?.firstName + " " + auth.user.lastName}
          </h1>
          <p>@{auth.user?.firstName + "_" + auth.user.lastName}</p>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
