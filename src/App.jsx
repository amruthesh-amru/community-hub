import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AddProfilePicture from "./pages/AddProfilePicture";
import ClassroomCollab from "./pages/ClassroomCollab";
import Leftbar from "./components/Leftbar";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase";
import Cse from "./pages/notes/Cse";
import FirstSem from "./pages/notes/FirstSem";
import LostAndFound from "./pages/LostAndFound";
import JobAndInternship from "./pages/JobAndInternship";
import Bunkmate from "./pages/Bunkmate";
import ForgotPassword from "./pages/ForgotPassword";
import Exam from "./pages/Exam";
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
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
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
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/collab"
            element={
              <ProtectedRoute user={user}>
                <ClassroomCollab />
              </ProtectedRoute>
            }
          />
          <Route path="/leftbar" element={<Leftbar />} />
          <Route path="collab/cse" element={<Cse />} />
          <Route path="collab/cse/firstsem" element={<FirstSem />} />

          <Route
            path="/addProfilePicture"
            element={
              <ProtectedRoute user={user}>
                <AddProfilePicture />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lostandfound"
            element={
              <ProtectedRoute user={user}>
                <LostAndFound />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobandinternship"
            element={
              <ProtectedRoute user={user}>
                <JobAndInternship />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bunkmate"
            element={
              <ProtectedRoute user={user}>
                <Bunkmate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam"
            element={
              <ProtectedRoute user={user}>
                <Exam />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
