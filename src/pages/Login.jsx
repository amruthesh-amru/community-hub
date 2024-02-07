// LoginPage.js

import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      alert("Account successfully Logged In");
      console.log(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className=" ">
        <div className="font-mono ">
          <div className="container mx-auto h-[100vh] flex justify-center flex-col">
            <div className="flex justify-center  px-6">
              <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg bgImagelogin"></div>

                <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                  <h3 className="pt-4 text-2xl text-center">
                    Login To Your Account!
                  </h3>
                  <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
                    {/* <div className="mb-4 md:flex md:justify-between">
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
                    </div> */}
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        onClick={handleSignIn}
                      >
                        Login
                      </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <div className="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="#"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <NavLink to="/signUp">
                        <div
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
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
