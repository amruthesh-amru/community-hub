import { useState } from "react";
import { db, imgDB } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";

function Home() {
  const [tweetImageUrl, settweetImageUrl] = useState("");
  const uid = localStorage.getItem("uid");
  let imgValue;
  const handletweetImageUpload = (e) => {
    imgValue = e.target.files[0];
    console.log(imgValue);
  };
  const uploadImageToDb = (imgValue) => {
    const imgs = ref(imgDB, `tweetImages/${v4()}`);
    uploadBytes(imgs, imgValue).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        settweetImageUrl(val);
        const docRef = doc(db, "tweets", uid);
        const result = setDoc(
          docRef,
          {
            tweeImgUrl: val,
            tweetTxt: "testing",
          },
          { merge: true }
        );
      });
    });
  };
  return (
    <>
      {/* <div className="min-h-screen w-full">
        <div className="flex flex-col items-center h-full w-60  overflow-hidden text-white bg-black rounded">
          <a className="flex items-center w-full px-5 mt-3" href="#">
            <i className="fa-solid fa-user-graduate"></i>
            <span className="ml-2 text-sm font-bold">Community Hub</span>
          </a>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-heart"></i>
                <span className="ml-2 text-sm font-medium">For You</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-brain"></i>
                <span className="ml-2 text-sm font-medium">
                  Classroom Collab
                </span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-gray-700 rounded"
                href="#"
              >
                <i className="fa-solid fa-book"></i>
                <span className="ml-2 text-sm font-medium">
                  Acadamic Updates
                </span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="ml-2 text-sm font-medium">Lost And Found</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-briefcase"></i>
                <span className="ml-2 text-sm font-medium">
                  Job And Internship
                </span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-person-running"></i>
                <span className="ml-2 text-sm font-medium">Bunk Mate</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-tower-broadcast"></i>
                <span className="ml-2 text-sm font-medium">
                  Emergency Alerts
                </span>
              </a>
            </div>
            <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Products</span>
              </a>
            </div>
          </div>
          <a
            className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300 "
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Account</span>
          </a>
        </div>
      </div> */}
      <div>
        <div className="w-[85%] mx-auto my-0 p-4 flex">
          <div className="w-[22%]">
            <ul className="flex flex-col gap-8 text-[1.5rem] text-[#0f1419] font-[200] w-full">
              <li>
                <i className="fa-solid fa-user-graduate"></i>
                <span className="pl-4 text-[20px]  ml-2 text-sm font-bold">
                  Community Hub
                </span>
              </li>
              <li>
                <i className="fa-solid fa-heart"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  For You
                </span>
              </li>
              <li>
                <i className="fa-solid fa-brain"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Classroom Collab
                </span>
              </li>
              <li>
                <i className="fa-solid fa-book"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Acadamic Updates
                </span>
              </li>
              <li>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Lost And Found
                </span>
              </li>
              <li>
                <i className="fa-solid fa-briefcase"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Job And Internship
                </span>
              </li>
              <li>
                <i className="fa-solid fa-person-running"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Bunk Mate
                </span>
              </li>
              <li>
                <i className="fa-solid fa-tower-broadcast"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Emergency Alerts
                </span>
              </li>
              <li>
                <button className="pl-[32px] pt-2 pb-2 text-center text-white font-[600] bg-[#1d9bf0] pr-[32px] w-full rounded-full">
                  Post
                </button>
              </li>
            </ul>
          </div>
          <div className="w-[50%] ">
            <div className="w-full border border-[rgba(239,243,244,1.00)] p-3 flex gap-3">
              <div className="w-[40px] h-[40px] bg-red-200 rounded-full">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/community-hub-auth.appspot.com/o/tweetImages%2F40164b4e-67bc-4832-bb79-a27b8d6ecf94?alt=media&token=4047b773-375b-4c79-a628-e8a3265a3a96"
                  alt=""
                />
              </div>
              <div className="w-full ">
                <form action="">
                  <textarea
                    className="w-full text-lg resize-none outline-none"
                    placeholder="What's happening?"
                    maxLength={280} // You can adjust the maximum character limit as needed
                    rows={4} // You can adjust the number of rows to display
                  />
                </form>
                <div className="p-3 flex justify-between items-center border-t border-[rgba(239,243,244,1.00)]">
                  <label>
                    <i className="text-[20px] fa-regular fa-image text-[#1d9bf0]"></i>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,image/JPG"
                      className="hidden"
                      onChange={(e) => {
                        handletweetImageUpload(e);
                      }}
                    />
                  </label>
                  <div>
                    <button
                      className="text-white font-[600] rounded-full pl-6 pr-6 pt-1 pb-1 bg-[#1d9bf0]"
                      onClick={(imgValue) => uploadImageToDb(imgValue)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
