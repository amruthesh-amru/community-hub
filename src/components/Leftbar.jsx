import React from "react";
import TweetsContainer from "../pages/TweetsContainer";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
function Leftbar() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className=" p-4 flex">
        <div className=" flex   ">
          <ul className="flex flex-col gap-8 text-[1.5rem] text-[#0f1419] font-[200] ">
            <li id="active" className="flex items-center justify-start">
              <i className="fa-solid fa-user-graduate"></i>
              <span className="pl-4 text-[20px]  ml-2 text-sm font-bold uppercase">
                Community Hub
              </span>
            </li>
            {/* <li
              id="active"
              className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3   "
            >
              <i className="fa-solid fa-heart"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                For You
              </span>
            </li> */}
            {/* <NavLink id="active" to="/collab">
              <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
                <i className="fa-solid fa-brain"></i>
                <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                  Classroom Collab
                </span>
              </li>
            </NavLink> */}
            <NavLink id="active" to="/">
              <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
                <i className="fa-solid fa-book"></i>
                <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                  Acadamic Updates
                </span>
              </li>
            </NavLink>
            <NavLink id="active" to="/lostandfound">
              <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                  Lost And Found
                </span>
              </li>
            </NavLink>
            <NavLink id="active" to="/jobandinternship">
              <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
                <i className="fa-solid fa-briefcase"></i>
                <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                  Job And Internship
                </span>
              </li>
            </NavLink>
            <NavLink id="active" to="/bunkmate">
              <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
                <i className="fa-solid fa-person-running"></i>
                <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                  Bunk Mate
                </span>
              </li>
            </NavLink>
            {/* <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
              <i className="fa-solid fa-tower-broadcast"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                Emergency Alerts
              </span>
            </li> */}
            <li id="active" className="flex items-center justify-start">
              <button
                className="pl-[32px] pt-2 pb-2 text-center text-white font-[600] bg-[#1d9bf0] pr-[32px] rounded-full self-start"
                onClick={handleSignOut}
              >
                SignOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Leftbar;
