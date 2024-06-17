import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";

const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState("posts");

  const tabs = [
    { value: "posts", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" },
    { value: "repost", name: "Repost" },
  ];

  const posts = [1, 1, 1, 1, 1];
  const reels = [1, 1, 1, 1, 1];
  const savePosts = [1, 1, 1, 1, 1];

  const handleChange = (value, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="my-10 w-[70%] ">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://cdn.pixabay.com/photo/2024/05/26/15/27/anime-8788959_1280.jpg"
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src=""
          />

          {true ? (
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
              Follow
            </Button>
          )}
        </div>

        <div className="p-5">
          <h1 className="py-1 font-bold text-xl">Cheryl</h1>
          <p>@Cheryl</p>

          <div className="flex gap-5 items-center py-3">
            <span>40 posts</span>
            <span>35 followers</span>
            <span>10 followers</span>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              itaque voluptate ipsam maxime qui tempora. Possimus, quia, quod
              fugit eligendi officia, deleniti consequuntur ducimus dolorem est
              soluta doloremque aliquam temporibus!
            </p>
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
                <Tab value={item.value} label={item.name} />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "posts" ? (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex gap-2 flex-wrap justify-center my-10 ">
                {reels.map((item) => (
                  <div>
                    <UserReelCard />
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {savePosts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
    </Card>
  );
};

export default Profile;
