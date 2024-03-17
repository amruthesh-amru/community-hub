import React, { useState } from "react";
import ShowImage from "./ShowImage";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function LostAndFoundBox({
  uid,
  tweetTxt,
  tweetImg,
  name,
  username,
  userImage,
  v4,
}) {
  const [showImage, setShowImage] = useState(false);
  const [toggleFoundButton, setToggleFoundButton] = useState(false);
  const userId = localStorage.getItem("uid");
  const handleImageClick = () => {
    setShowImage(!showImage);
  };
  const handleCloseImage = () => {
    setShowImage(false);
  };
  const handleFoundItem = async () => {
    const result = confirm("Are You Sure You Want To Mark The Item As Found ?");
    try {
      if (result) {
        const subRef = doc(db, "lostandfound", v4);
        await deleteDoc(subRef);
        console.log("Document successfully deleted!");
      } else {
        return;
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };
  console.log(uid);
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
          {userId === uid ? (
            <div className="flex justify-center gap-10 w-full items-center pt-5 ">
              <h1 className="text-[1.3rem] font-[700]">Found Item ?</h1>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="text-white font-[600] rounded-full pl-6 pr-6 pt-1 pb-1 bg-[#5cb85c]"
                  onClick={handleFoundItem}
                >
                  Yes
                </button>
              </div>
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
    </>
  );
}

export default LostAndFoundBox;
