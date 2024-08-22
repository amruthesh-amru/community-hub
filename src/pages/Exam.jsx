import React from "react";
import Leftbar from "../components/Leftbar";

function Exam() {
  return (
    <>
      <div className="flex items-start justify-center gap-[5rem] p-3 glass color">
        <Leftbar />
        <div className="w-[50%]">This is Exam Time Table page</div>
      </div>
    </>
  );
}

export default Exam;
