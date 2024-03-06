import { useEffect, useState } from "react";
import TweetBox from "../components/TweetBox";
import { db, imgDB } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import TweetsContainer from "./TweetsContainer";

function Home() {
  let [fetchedTweets, setFetchedTweets] = useState([]);
  const [tweetTxt, setTweetTxt] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const uid = localStorage.getItem("uid");
  const handleTweetTxt = (e) => {
    setTweetTxt(e.target.value);
  };

  // get user details to know who is posting the tweet

  const fetchUserDetails = async () => {
    try {
      const userRef = doc(db, "user details", uid);
      const response = await getDoc(userRef);
      const userdetails = response.data();
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
    setSelectedImage(tempImg);
    const imgUrl = URL.createObjectURL(tempImg);
    setImgPreview(imgUrl);
  };

  const uploadImageToDb = async () => {
    const userdetails = await fetchUserDetails();

    console.log(selectedImage, "❤️❤️❤️");
    const imgs = ref(imgDB, `tweetImages/${v4()}`);
    let uploadResponse;
    let uploadedResponse;
    if (selectedImage) {
      uploadResponse = await uploadBytes(imgs, selectedImage);
      uploadedResponse = await getDownloadURL(uploadResponse.ref);
    }
    const docRef = doc(db, "academicTweets", v4());
    const uploadDateandTime = new Date().toISOString();
    const response = await setDoc(
      docRef,
      {
        tweeImgUrl: uploadedResponse ? uploadedResponse : null,
        tweetTxt: tweetTxt,
        uid: uid,
        name: userdetails.name ? userdetails.name : null,
        username: userdetails.username ? userdetails.username : null,
        userImage: null,
        uploadDateandTime: uploadDateandTime,
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
    const q = query(collection(db, "academicTweets"));
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

  //fetch username and userId using UID

  //   const querySnapshot = await getDocs(collection(db, "tweets"));
  //   const documents = [];

  //   querySnapshot.forEach((doc) => {
  //     // Each doc.data() is a document from the collection
  //     documents.push({ id: doc.id, ...doc.data() });
  //   });
  //   return documents;
  // } catch (e) {
  //   console.error("Error fetching documents: ", e);
  //   return [];
  // }
  // };
  // useEffect(() => {
  //   fetchTweet()
  //     .then((documents) => {
  //       setFetchedTweets(documents);
  //       console.log("Fetched documents: ", documents);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching documents: ", error);
  //     });
  // }, []);

  return (
    <>
      {/* <div>
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
                  Acadamic Updates
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
          <TweetsContainer />
        </div>
      </div> */}
    </>
  );
}

export default Home;
