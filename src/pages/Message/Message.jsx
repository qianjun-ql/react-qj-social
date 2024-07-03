import { Avatar, Grid, IconButton } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

const Message = () => {
  const handleSelectImage = () => {
    console.log("select image");
  };

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5 " item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <ArrowBackIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">Search User</div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  User Chat Card
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full " item xs={9}>
          <div>
            <div className="flex justify-between items-center border-l p-5">
              <div className="flex items-center space-x-3">
                <Avatar />
                <p>Cheryl</p>
              </div>

              <div className="flex space-x-3">
                <IconButton>
                  <CallIcon />
                </IconButton>
                <IconButton>
                  <VideocamIcon />
                </IconButton>
              </div>
            </div>
            <div className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
              message
            </div>
          </div>

          <div className="sticky bottom-0 border-l">
            <div className="py-5 flex items-center justify-center space-x-5">
              <input
                className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                placeholder="Please enter message"
                type="text"
              />
              <input
                className="hidden"
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleSelectImage}
              />
              <label htmlFor="image-input">
                <InsertPhotoIcon />
              </label>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
