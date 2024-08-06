import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage";
import Message from "./pages/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme/DarkTheme";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import CommunityPage from "./pages/Community/CommunityPage";
import CreateReelsForm from "./components/Reels/CreateReelsForm";
import Profile from "./pages/Profile/Profile";
import Reels from "./components/Reels/Reels";
import Account from "./pages/Account/Account";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [theme, setTheme] = useState(darkTheme);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
    setLoading(false);
  }, [dispatch, jwt]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  const currentThemeClass = theme === darkTheme ? "dark" : "light";

  return (
    <ThemeProvider theme={theme}>
      <div className={`app-container ${currentThemeClass}`}>
        <Routes>
          <Route path="/*" element={auth.user ? <HomePage /> : <Auth />} />
          <Route path="/*" element={<Auth />} />
          <Route path="/message" element={<Message />} />
          <Route path="/community/*" element={<CommunityPage />} />
        </Routes>
        <Button onClick={toggleTheme}>
          Switch to {theme === darkTheme ? "Light" : "Dark"} Mode
        </Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </ThemeProvider>
  );
}

export default App;
