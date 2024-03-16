import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { NavLink } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Password reset email sent. Check your inbox.");
        setError("");
        setTimeout(() => {
          setMessage("");
          setEmail("");
        }, 5000); // Clear the message after 5 seconds
      })
      .catch((error) => {
        setError(`Error: ${error.message}`);
        setMessage("");
        setTimeout(() => {
          setError("");
          setEmail("");
        }, 5000);
      });
  };

  return (
    // <div>
    //   <h2>Forgot Password</h2>
    //   <input
    //     type="email"
    //     placeholder="Enter your email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <button onClick={handlePasswordReset}>Reset Password</button>
    //   {message && <p>{message}</p>}
    //   {error && <p>{error}</p>}
    // </div>
    <div className="">
      <div className=" bg-[#1e1e1e] h-screen flex items-center">
        <div className="w-[40rem]  h-[30rem] mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 flex flex-col gap-6    justify-center glass">
          <h1 className="text-4xl font-medium">Reset password</h1>
          <p className="text-black">Fill up the form to reset the password</p>

          <form>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-black pb-2">Email address</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>

              <button
                className="w-full py-3 font-medium text-white bg-[#1e1e1e] hover:bg-[#8f8f8f] rounded-lg  hover:shadow inline-flex space-x-2 items-center justify-center active:bg-[#1e1e1e] transition-colors"
                onClick={handlePasswordReset}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>

                <span>Reset password</span>
              </button>
              {message && (
                <p className="text-center bg-[#5cb85c] text-white rounded-md pt-2 pb-2">
                  {message}
                </p>
              )}
              {error && (
                <p className="text-center bg-[#ff0000] text-white rounded-md pt-2 pb-2">
                  {error}
                </p>
              )}
              <p className="text-center">
                Not registered yet?{" "}
                <NavLink
                  to="/signup"
                  className="text-[#1e1e1e]
                   font-medium inline-flex space-x-1 items-center"
                >
                  <span>Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
