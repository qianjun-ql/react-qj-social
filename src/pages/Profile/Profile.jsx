import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState("posts");

  const tabs = [
    { value: "posts", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" },
    { value: "repost", name: "Repost" },
  ];

  const handleChange = (value, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="py-10 w-[70%] ">
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
        </section>
      </div>
    </div>
  );
};

export default Profile;
