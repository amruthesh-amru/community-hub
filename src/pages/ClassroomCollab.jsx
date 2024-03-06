import React from "react";
import { NavLink } from "react-router-dom";

function ClassroomCollab() {
  return (
    <div>
      <div className="w-[85%] mx-auto my-0 p-4 flex">
        <div className="w-[22%] flex   ">
          <ul className="flex flex-col gap-8 text-[1.5rem] text-[#0f1419] font-[200]  fixed ">
            <li className="flex items-center justify-start">
              <i className="fa-solid fa-user-graduate"></i>
              <span className="pl-4 text-[20px]  ml-2 text-sm font-bold uppercase">
                Community Hub
              </span>
            </li>
            <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3   ">
              <i className="fa-solid fa-heart"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                For You
              </span>
            </li>
            <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
              <i className="fa-solid fa-brain"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                Classroom Collab
              </span>
            </li>
            <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
              <i className="fa-solid fa-book"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                <NavLink to="/">Acadamic Updates</NavLink>
              </span>
            </li>
            <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                Lost And Found
              </span>
            </li>
            <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
              <i className="fa-solid fa-briefcase"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                Job And Internship
              </span>
            </li>
            <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
              <i className="fa-solid fa-person-running"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                Bunk Mate
              </span>
            </li>
            <li className="flex items-center justify-start p-2 hover:bg-[#e7e7e8] rounded-full pr-3 transition-colors pl-3 ">
              <i className="fa-solid fa-tower-broadcast"></i>
              <span className="pl-4 text-[1.1rem] ml-2 text-sm font-[400]">
                Emergency Alerts
              </span>
            </li>
            <li className="flex items-center justify-start">
              <button className="pl-[32px] pt-2 pb-2 text-center text-white font-[600] bg-[#1d9bf0] pr-[32px] rounded-full self-start">
                Post
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClassroomCollab;
