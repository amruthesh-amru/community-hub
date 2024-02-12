import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import AddProfilePicture from "../pages/AddProfilePicture";

const appRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/addProfilePicture" element={<AddProfilePicture />} />
    </Routes>
  );
};

export default appRouter;
