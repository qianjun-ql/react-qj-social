import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage";
import Message from "./pages/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, [jwt]);

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={auth.user ? <HomePage /> : <Auth />} />
        <Route path="/*" element={<Auth />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
