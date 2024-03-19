import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import ShowImage from "./ShowImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const tweetBox = ({
  tweetTxt,
  tweetImg,
  name,
  username,
  userImage,
  v4,
  uid,
}) => {
  const [showImage, setShowImage] = useState(false);
  const [toggleDeletePost, setToggleDeletePost] = useState(false);
  const userId = localStorage.getItem("uid");
  const handleImageClick = () => {
    setShowImage(!showImage);
  };
  const handleCloseImage = () => {
    setShowImage(false);
  };

  const handleDeletePost = async () => {
    const result = confirm("Are You Sure You Want To Delete The Post ?");
    try {
      if (result) {
        const subRef = doc(db, "academicTweets", v4);
        await deleteDoc(subRef);
        toast.info("Tweet successfully deleted!");
      } else {
        return;
      }
    } catch (error) {
      toast("Error deleting subject:", error);
    }
  };
  return (
    <>
      <div className="p-3 flex justify-start gap-4 items-start border border-[rgba(239,243,244,1.00)]">
        <div className="w-[40px] h-[40px] flex items-center justify-center bg-red-200 rounded-full">
          <img
            src={userImage}
            className=" w-full h-full object-cover rounded-full"
            onClick={() => setShowImage(!showImage)}
          />
          {showImage && (
            <ShowImage imgUrl={userImage} onClose={handleCloseImage} />
          )}
        </div>
        <div className="flex flex-col w-full items-start justify-center ">
          <div className="flex items-center justify-between w-full gap-2 mb-1">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-[15px] text-[#0f1419]  font-[700]">{name}</h1>
              <h2 className="text-[#5d6d79] text-[15px]">@{username}</h2>
              {/* <h2 className="w-[30px] h-[30px] ">
              <img src={badge1} alt="" className="" />
            </h2> */}
              <h3 className="text-[#5d6d79] text-[15px]">~</h3>
              <h2 className="text-[#5d6d79] text-[15px]">19h</h2>
            </div>
            {userId === uid ? (
              <div
                className="cursor-pointer"
                onClick={() => setToggleDeletePost(!toggleDeletePost)}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            ) : (
              " "
            )}
          </div>
          {userId === uid
            ? toggleDeletePost && (
                <div className="flex justify-end items-end w-full">
                  <button
                    className="bg-gray-100 p-2 relative top-2"
                    onClick={handleDeletePost}
                  >
                    {" "}
                    Delete Post
                  </button>
                </div>
              )
            : " "}
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
