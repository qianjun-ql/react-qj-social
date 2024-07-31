import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Reels from "../../components/Reels/Reels";
import CreateReelsForm from "../../components/Reels/CreateReelsForm";
import Profile from "../Profile/Profile";
import RightSection from "../../components/RightSection/RightSection";
import SideBar from "../../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";
import CommunityCenter from "../../components/Center/CommunityCenter";

const CommunityPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <div className="sticky top-0">
            <SideBar />
          </div>
        </Grid>
        <Grid item xs={6} className="flex justify-center">
          <Routes>
            <Route path="/" element={<CommunityCenter />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>
        <Grid item xs={3} className="relative">
          {location.pathname === "/community" && (
            <div className="sticky top-0 w-full right-section">
              <RightSection />
            </div>
          )}
        </Grid>
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

export default CommunityPage;
