// LoginPage.js

import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      toast("Successfully Logged Into Your Account");
      console.log(response);
      localStorage.setItem("uid", response.user.uid);

      navigate("/");
    } catch (error) {
      toast(error);
    }
  };

  return (
    <>
      <div className=" w-full  h-screen bg-[#000000e1]">
        <div className="font-mono ">
          <div className="container mx-auto h-[100vh] flex justify-center flex-col">
            <div className="flex justify-center  px-6">
              <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg  bgImagelogin"></div>

                <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none glass flex flex-col gap-5">
                  <h3 className="pt-4 text-2xl text-center">
                    Login To Your Account!
                  </h3>
                  <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded glass">
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
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="password"
                        onChange={handlePasswordChange}
                        value={password}
                      />
                    </div>

                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-[#1e1e1e] rounded-full hover:bg-[#8f8f8f] focus:outline-none focus:shadow-outline
                        active:bg-[#1e1e1e] transition-colors"
                        onClick={handleSignIn}
                      >
                        Login
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
                      <NavLink to="/signUp">
                        <div
                          className="inline-block text-sm text-[#1e1e1e] align-baseline hover:text-[#8f8f8f]"
                          href="#"
                        >
                          Not Registered Yet? SignUp!
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
    </>
  );
};

export default Login;
