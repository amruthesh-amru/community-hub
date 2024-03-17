import { useEffect, useState } from "react";
import TweetBox from "../components/TweetBox";
import { db, imgDB } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Leftbar from "../components/Leftbar";
import LostAndFoundBox from "../components/LostAndFoundBox";
function LostAndFound() {
  let [fetchedTweets, setFetchedTweets] = useState([]);
  const [tweetTxt, setTweetTxt] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const uid = localStorage.getItem("uid");
  const handleTweetTxt = (e) => {
    setTweetTxt(e.target.value);
  };

  // get user details to know who is posting the tweet
  let userdetails;
  let tempProfile;

  const fetchUserDetails = async () => {
    try {
      console.log(uid);
      const userRef = doc(db, "user details", uid);
      const response = await getDoc(userRef);
      userdetails = response.data();
      setProfilePicture(userdetails.userImage);
      tempProfile = userdetails.userImage;

      if (response.exists) {
        console.log(response.data().name, "user details🐕‍🦺🐕‍🦺");
        return userdetails;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  //selectedImage is the file/image that has been selected to post the tweet
  const handletweetImageUpload = (e) => {
    let tempImg = e.target.files[0];
    console.log(tempImg, "tempImg🧀🧀");
    if (tempImg) {
      const tempImgSize = tempImg.size / 1024 / 1024; //converted to Mb
      if (tempImgSize > 2) {
        alert("Image size should be less than 2Mb");
        tempImg = "";
      } else {
        setSelectedImage(tempImg);
        const imgUrl = URL.createObjectURL(tempImg);
        setImgPreview(imgUrl);
      }
    }
  };

  const uploadImageToDb = async () => {
    userdetails = await fetchUserDetails();

    console.log(selectedImage, "❤️❤️❤️");
    const imgs = ref(imgDB, `lostandfoundimages/${v4()}`);
    let uploadResponse;
    let uploadedResponse;
    if (selectedImage) {
      uploadResponse = await uploadBytes(imgs, selectedImage);
      uploadedResponse = await getDownloadURL(uploadResponse.ref);
    }
    let v4String = v4();
    console.log("v4", v4String);
    const docRef = doc(db, "lostandfound", v4String);
    const response = await setDoc(
      docRef,
      {
        tweeImgUrl: uploadedResponse ? uploadedResponse : null,
        tweetTxt: tweetTxt,
        uid: uid,
        name: userdetails.name ? userdetails.name : null,
        username: userdetails.username ? userdetails.username : null,
        userImage: userdetails.userImage,
        uploadDateandTime: serverTimestamp(),
        v4: v4String,
      },
      { merge: true }
    );
    console.log("res", response);
    setImgPreview("");
    setTweetTxt("");
    setSelectedImage(null);
  };
  // fetching tweets
  useEffect(() => {
    const collectionRef = collection(db, "lostandfound");
    const q = query(collectionRef, orderBy("uploadDateandTime", "desc"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const documents = [];
      QuerySnapshot.forEach((doc) => {
        documents.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setFetchedTweets(documents);
      console.log(documents, "fetched tweets👌👌");
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="flex items-start justify-center  p-3">
        <Leftbar />
        <div className="w-[50%] ">
          <div className="w-full border border-[rgba(239,243,244,1.00)] p-3 flex gap-3">
            <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
              <img
                src={profilePicture}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="w-full ">
              <form action="">
                <textarea
                  className="w-full text-lg resize-none outline-none"
                  placeholder="What's happening?"
                  maxLength={280}
                  rows={4}
                  onChange={handleTweetTxt}
                  value={tweetTxt}
                />
                {imgPreview && (
                  <img
                    src={imgPreview}
                    alt="Image Preview"
                    className="w-full max-h-80 object-cover rounded-lg"
                  />
                )}
              </form>
              <div className="p-3  flex justify-between items-center border-t border-[rgba(239,243,244,1.00)]">
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
                    type="button"
                    className="text-white font-[600] rounded-full pl-6 pr-6 pt-1 pb-1 bg-[#1d9bf0]"
                    onClick={() => {
                      uploadImageToDb();
                    }}
                    disabled={tweetTxt || imgPreview ? false : true}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            {fetchedTweets.map((fetchedTweet) => {
              return (
                <LostAndFoundBox
                  key={fetchedTweet.id}
                  uid={fetchedTweet.uid}
                  v4={fetchedTweet.v4}
                  tweetImg={fetchedTweet.tweeImgUrl}
                  tweetTxt={fetchedTweet.tweetTxt}
                  name={fetchedTweet.name}
                  username={fetchedTweet.username}
                  userImage={fetchedTweet.userImage}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default LostAndFound;
