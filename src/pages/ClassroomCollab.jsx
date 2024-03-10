import React from "react";
import { NavLink } from "react-router-dom";
import Leftbar from "../components/Leftbar";

function ClassroomCollab() {
  return (
    <>
      <div className="flex items-start justify-center  p-3">
        <Leftbar />
        <div>
          <NavLink to="/cse">
            <div>CSE</div>
          </NavLink>
          <div>ECE</div>
          <div>CIV</div>
          <div>MEC</div>
        </div>
      </div>
    </>
  );
}

export default ClassroomCollab;
