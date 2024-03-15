import React from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import badge1 from "../assets/badge1.png";
import ShowImage from "./ShowImage";
const tweetBox = ({ tweetTxt, tweetImg, name, username, userImage }) => {
  const [showImage, setShowImage] = useState(false);
  const handleImageClick = () => {
    setShowImage(!showImage);
  };
  const handleCloseImage = () => {
    setShowImage(false);
  };
  return (
    <>
      <div className="p-3 flex justify-start gap-4 items-start border border-[rgba(239,243,244,1.00)]">
        <div className="w-[40px] h-[40px] flex items-center justify-center bg-red-200 rounded-full">
          <img
            src={userImage}
            alt=""
            className=" w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col w-full items-start justify-center ">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-[15px] text-[#0f1419]  font-[700]">{name}</h1>
            <h2 className="text-[#5d6d79] text-[15px]">@{username}</h2>
            {/* <h2 className="w-[30px] h-[30px] ">
              <img src={badge1} alt="" className="" />
            </h2> */}
            <h3 className="text-[#5d6d79] text-[15px]">~</h3>
            <h2 className="text-[#5d6d79] text-[15px]">19h</h2>
          </div>
          <div className=" text-[15px] text-[#0f1419]  font-[400]">
            {tweetTxt}
          </div>
          <div className="w-full">
            {tweetImg && (
              <img
                src={tweetImg}
                alt=""
                className="rounded-2xl mt-2 w-[50%] h-[30rem] object-cover"
                onClick={handleImageClick}
              />
            )}
            {showImage && (
              <ShowImage imgUrl={tweetImg} onClose={handleCloseImage} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default tweetBox;
