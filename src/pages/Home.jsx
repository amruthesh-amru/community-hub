import { useEffect, useState } from "react";
import TweetBox from "../components/TweetBox";
import { db, imgDB } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

function Home() {
  let [fetchedTweets, setFetchedTweets] = useState([]);
  const [tweetTxt, setTweetTxt] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const uid = localStorage.getItem("uid");

  const handleTweetTxt = (e) => {
    setTweetTxt(e.target.value);
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
    console.log(selectedImage, "❤️❤️❤️");
    const imgs = ref(imgDB, `tweetImages/${v4()}`);
    let uploadResponse;
    let uploadedResponse;
    if (selectedImage) {
      uploadResponse = await uploadBytes(imgs, selectedImage);
      uploadedResponse = await getDownloadURL(uploadResponse.ref);
    }
    const docRef = doc(db, "tweets", v4());
    const uploadDateandTime = new Date().toISOString();
    const response = await setDoc(
      docRef,
      {
        tweeImgUrl: uploadedResponse ? uploadedResponse : null,
        tweetTxt: tweetTxt,
        uid: uid,
        uploadDateandTime: uploadDateandTime,
      },
      { merge: true }
    );
    console.log("res", response);
    setImgPreview("");
    setTweetTxt("");
    setSelectedImage(null);
    // if(selectedImage){
    //   uploadBytes(imgs, selectedImage ? selectedImage : null).then((data) => {
    //     console.log(data, "imgs");
    //     getDownloadURL(data.ref).then((val) => {
    //       console.log(val);
    //       const date = new Date();
    //       const uploadDateandTime = date.toISOString();
    //       const docRef = doc(db, "tweets", v4());
    //       const result = setDoc(
    //         docRef,
    //         {
    //           tweeImgUrl: val ? val : null,
    //           tweetTxt: tweetTxt,
    //           uid: uid,
    //           uploadDateandTime: uploadDateandTime,
    //         },
    //         { merge: true }
    //       );
    //       setImgPreview("");
    //       setTweetTxt("");
    //       setSelectedImage(null);
    //     });
    //   });
    // }
  };
  // const fetchTweet = async () => {
  useEffect(() => {
    const q = query(collection(db, "tweets"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const documents = [];
      QuerySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setFetchedTweets(documents);
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
      <div>
        <div className="w-[85%] mx-auto my-0 p-4 flex">
          <div className="w-[22%] flex ">
            <ul className="flex flex-col gap-8 text-[1.5rem] text-[#0f1419] font-[200] w-full">
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-user-graduate"></i>
                <span className="pl-4 text-[20px]  ml-2 text-sm font-bold uppercase">
                  Community Hub
                </span>
              </li>
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-heart"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  For You
                </span>
              </li>
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-brain"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Classroom Collab
                </span>
              </li>
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-book"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Acadamic Updates
                </span>
              </li>
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Lost And Found
                </span>
              </li>
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-briefcase"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Job And Internship
                </span>
              </li>
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-person-running"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Bunk Mate
                </span>
              </li>
              <li className="flex items-center justify-start">
                <i className="fa-solid fa-tower-broadcast"></i>
                <span className="pl-4 text-[20px] ml-2 text-sm font-[400]">
                  Emergency Alerts
                </span>
              </li>
              <li className="flex items-center justify-start">
                <button className="pl-[32px] pt-2 pb-2 text-center text-white font-[600] bg-[#1d9bf0] pr-[32px] w-full rounded-full">
                  Post
                </button>
              </li>
            </ul>
          </div>
          <div className="w-[50%] ">
            <div className="w-full border border-[rgba(239,243,244,1.00)] p-3 flex gap-3">
              <div className="w-[40px] h-[40px] bg-red-200 rounded-full">
                <img src="" alt="" />
              </div>
              <div className="w-full ">
                <form action="">
                  <textarea
                    className="w-full text-lg resize-none outline-none"
                    placeholder="What's happening?"
                    maxLength={280} // You can adjust the maximum character limit as needed
                    rows={4} // You can adjust the number of rows to display
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
                      type="button"
                      className="text-white font-[600] rounded-full pl-6 pr-6 pt-1 pb-1 bg-[#1d9bf0]"
                      // onClick={(selectedImage) => uploadImageToDb(selectedImage)}
                      onClick={() => {
                        uploadImageToDb();
                      }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {fetchedTweets.map((fetchedTweet) => {
              return (
                <TweetBox
                  key={fetchedTweet.id}
                  tweetImg={fetchedTweet.tweeImgUrl}
                  tweetTxt={fetchedTweet.tweetTxt}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
