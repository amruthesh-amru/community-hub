import React from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const tweetBox = ({ tweetTxt, tweetImg }) => {
  const [userDetails, setUserDetails] = useState([]);
  const uid = localStorage.getItem("uid");
  useEffect(() => {
    const q = query(collection(db, "user details"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const documents = [];
      QuerySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setUserDetails(documents);
      console.log(userDetails);
    });
    return () => unsubscribe();
  }, [uid]);
  return (
    <>
      <div className="p-3 flex justify-start gap-4 items-start border border-[rgba(239,243,244,1.00)]">
        <div className="w-[40px] h-[40px] bg-red-200 rounded-full">
          <img src="" alt="" />
        </div>
        <div className="flex flex-col w-full items-start justify-center ">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-[15px] text-[#0f1419]  font-[700]">
              {userDetails.name}
            </h1>
            <h2 className="text-[#5d6d79] text-[15px]">
              @{userDetails.username}
            </h2>
            <h3 className="text-[#5d6d79] text-[15px]">~</h3>
            <h2 className="text-[#5d6d79] text-[15px]">19h</h2>
          </div>
          <div className="w-full text-[15px] text-[#0f1419]  font-[400]">
            {tweetTxt}
          </div>
          <div>{tweetImg && <img src={tweetImg} alt="" />}</div>
        </div>
      </div>
    </>
  );
};

export default tweetBox;
