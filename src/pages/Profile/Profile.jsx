import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import ProfileModal from "./ProfileModal";
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

          <div className="flex gap-5 items-center py-3">
            <span>{post.userPosts.length} posts</span>
            <span>{auth.user.followList.length} following</span>
            <span>{auth.user.followers.length} followers</span>
          </div>

          <div>
            <p>{auth.user?.bio}</p>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab key={item.value} value={item.value} label={item.name} />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "posts" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.userPosts.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-100 rounded-md"
                  >
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex gap-2 flex-wrap justify-center my-10 ">
                {reels.map((item, index) => (
                  <div key={index}>
                    <UserReelCard />
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {auth.savedPosts &&
                  auth.savedPosts.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-100 rounded-md"
                    >
                      <PostCard item={item} />
                    </div>
                  ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose} user={auth.user} />
      </section>
    </Card>
  );
};

export default Profile;
