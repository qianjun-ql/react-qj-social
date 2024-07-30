// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import Auth from "./pages/Auth/Auth";
// import HomePage from "./pages/HomePage/HomePage";
// import Message from "./pages/Message/Message";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getProfileAction } from "./Redux/Auth/auth.action";
// import { ThemeProvider } from "@emotion/react";
// import { darkTheme } from "./theme/DarkTheme";

// function App() {
//   const auth = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     dispatch(getProfileAction(jwt));
//   }, [jwt]);

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Routes>
//         <Route path="/*" element={auth.user ? <HomePage /> : <Auth />} />
//         <Route path="/*" element={<Auth />} />
//         <Route path="/message" element={<Message />} />
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;

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
import { Button } from "@mui/material";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    dispatch(getProfileAction(jwt));
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
        </Routes>
        <Button onClick={toggleTheme}>
          Switch to {theme === darkTheme ? "Light" : "Dark"} Mode
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
