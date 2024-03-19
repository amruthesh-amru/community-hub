// SignupPage.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [isStudent, setIsStudent] = useState(true);

  const [creds, setCreds] = useState();
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");

  const [user, setUser] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleCurrentYearChange = (e) => {
    setCurrentYear(e.target.value);
  };
  const handleIsStudentChange = (e) => {
    setIsStudent(e.target.value);
  };
  // console.log(name, userName, email, currentYear, isStudent, password);

  const handleSignup = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        toast("Account successfully created");
        console.log("🧀", credentials);
        setCreds(credentials);
        setToken(credentials.user.accessToken);
        setEmail(credentials.user.email);
        setUid(credentials.user.uid);
        localStorage.setItem("uid", credentials.user.uid);
        //saving uid in loacal storage
        console.log("UID:", credentials.user.uid);
        const docRef = doc(db, "user details", credentials.user.uid);
        const result = setDoc(
          docRef,
          {
            name: name,
            username: userName,
            email: email,
            currentYear: currentYear,
            student: isStudent,
            userId: credentials.user.uid,
          },
          { merge: true }
        );
        navigate("/addProfilePicture");
      })
      .catch((error) => {
        // Handle error if createUserWithEmailAndPassword fails
        toast("Error signing up:", error);
        // You might want to show an error message to the user
      });
  };

  return (
    <div className=" w-full  h-screen bg-[#000000e1] bg-opacity-">
      <div className="font-mono ">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg bgImage"></div>

              <div className="w-full lg:w-7/12  p-5 rounded-lg lg:rounded-l-none glass flex flex-col gap-4">
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
                <form className="px-8 pt-6 pb-3 mb-4  rounded glass ">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder=" Name"
                        onChange={handleNameChange}
                        value={name}
                      />
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        Username
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="Username"
                        onChange={handleUserNameChange}
                        value={userName}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleEmailChange}
                      value={email}
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="currentYear"
                      >
                        Current Year
                      </label>

                      <select
                        id="currentYear"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        onChange={handleCurrentYearChange}
                        value={currentYear}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="isStudent"
                      >
                        Student ?
                      </label>
                      <select
                        id="isStudent"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        onChange={handleIsStudentChange}
                        value={isStudent}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        onChange={handlePasswordChange}
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-[#1e1e1e] rounded-full hover:bg-[#8f8f8f] focus:outline-none focus:shadow-outline active:bg-[#1e1e1e] transition-colors"
                      onClick={handleSignup}
                    >
                      Register Account
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <NavLink
                      to="/forgotpassword"
                      className="inline-block text-sm text-[#1e1e1e] align-baseline hover:text-[#8f8f8f]"
                      href="#"
                    >
                      Forgot Password?
                    </NavLink>
                  </div>
                  <div className="text-center">
                    <NavLink to="/login">
                      <div
                        className="inline-block text-sm text-[#1e1e1e] align-baseline hover:text-[#8f8f8f]"
                        href="#"
                      >
                        Already have an account? Login!
                      </div>
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
