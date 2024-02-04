// SignupPage.js

import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creds, setCreds] = useState();
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        alert("Account successfully created");
        console.log(credentials);
        setCreds(credentials);
      })
      .then(() => {
        setToken(creds.user.accessToken);
        setEmail(creds.user.email);
        setUid(creds.user.reloadUserInfo.localId);
      })
      .then(() => {
        console.log(token + "🍩" + uid + "🍩" + email);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // uid of a user
  // console.log(creds.user.reloadUserInfo.localId);

  return (
    <div className="bg-slate-100">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <form action="">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Your password"
              />
            </div>
            <button
              onClick={handleSignup}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            <NavLink to="/login">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Login
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
