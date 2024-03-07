import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AddProfilePicture from "./pages/AddProfilePicture";
import ClassroomCollab from "./pages/ClassroomCollab";
import Leftbar from "./components/Leftbar";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user present");
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
      return () => unsubscribe;
    });
  }, []);
  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/collab" element={<ClassroomCollab />} />
          <Route path="/leftbar" element={<Leftbar />} />
          <Route path="/addProfilePicture" element={<AddProfilePicture />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
