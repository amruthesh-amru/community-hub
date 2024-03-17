import React, { useState } from "react";

function ShowImage({ imgUrl, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center  bg-opacity-50 w-full h-screen ">
        <div className="relative w-full h-screen flex items-center justify-center">
          <button
            className="absolute text-[3rem] top-4 right-4 text-black text-4xl"
            onClick={onClose}
          >
            &times;
          </button>
          <img src={imgUrl} className="max-w-full max-h-full" />
        </div>
      </div>
    </>
  );
}

export default ShowImage;