import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Center from "../../components/Center/Center";
import Reels from "../../components/Reels/Reels";
import CreateReelsForm from "../../components/Reels/CreateReelsForm";
import Profile from "../Profile/Profile";
import RightSection from "../../components/RightSection/RightSection";
import SideBar from "../../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <SideBar />
          </div>
        </Grid>
        <Grid
          item
          className="p flex justify-center"
          xs={12}
          lg={location.pathname === "/" ? 6 : 9}
        >
          <Routes>
            <Route path="/" element={<Center />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>

        {location.pathname === "/" && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <RightSection />
            </div>
          </Grid>
        )}
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default HomePage;
