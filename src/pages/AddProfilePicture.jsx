import { useState } from "react";
import blankImage from "../assets/avatar-1577909_1280.png";
import { v4 } from "uuid";
import { db, imgDB } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
function AddProfilePicture() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  const handleProfileUpload = (e) => {
    let tempImg = e.target.files[0];
    console.log(tempImg, "tempImg🧀🧀");
    setSelectedImage(tempImg);
    const imgUrl = URL.createObjectURL(tempImg);
    setImgPreview(imgUrl);
  };
  const removeImage = () => {
    setImgPreview(null);
  };
  const uploadImageToDb = async () => {
    console.log(selectedImage, "❤️❤️❤️");
    const imgs = ref(imgDB, `profilePicture/${v4()}`);
    let uploadResponse;
    let uploadedResponse;
    if (selectedImage) {
      uploadResponse = await uploadBytes(imgs, selectedImage);
      uploadedResponse = await getDownloadURL(uploadResponse.ref);
    } else {
      navigate("/login");
      return;
    }
    const docRef = doc(db, "user details", uid);
    const response = await setDoc(
      docRef,
      {
        userImage: uploadedResponse ? uploadedResponse : null,
      },
      { merge: true }
    );
    navigate("/login");
    console.log("res", response);
    setImgPreview("");
    setSelectedImage(null);
  };
  return (
    <div className="flex justify-center">
      <div className="w-[28%] h-[100vh] flex items-center justify-center flex-col gap-6">
        <h1 className="text-[1.8rem] font-[700] text-left w-full ">
          Profile Photo
        </h1>
        <div className="w-full">
          <label>
            <h1 className="text-[15px] font-[600] p-2 bg-[#F0F2F5] w-full text-center rounded-md">
              Add/Change Photo
            </h1>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,image/JPG"
              className="hidden"
              onChange={(e) => {
                handleProfileUpload(e);
              }}
            />
          </label>
        </div>
        <div className="w-full h-[23rem]">
          <label>
            {imgPreview ? (
              <img
                src={imgPreview}
                alt="Image Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src={blankImage}
                alt="Image Preview"
                className="w-full h-full object-fill rounded-lg "
              />
            )}
          </label>
        </div>
        <div className="w-full text-center">
          <button
            className="text-[15px] w-full font-[700]"
            onClick={removeImage}
          >
            Remove
          </button>
        </div>
        <div className="w-full ">
          <button
            className="text-[15px] text-white round-md bg-[#1A80E5] font-[600] p-2 rounded-md w-full"
            onClick={uploadImageToDb}
          >
            Save
          </button>
        </div>
        {/* <div className="w-full ">
          <button className="text-[15px]  round-md bg-[#F0F2F5] font-[600] p-2 rounded-md w-full">
            Skip
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default AddProfilePicture;
