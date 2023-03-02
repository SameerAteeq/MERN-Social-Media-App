import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import ProfileImage from "../../../imgs/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { UploadImage, uploadPost } from "../../../redux/actions/uploadAction";
const PostShare = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPubic = process.env.REACT_APP_PUBLIC_FOLDER;
  const loading = useSelector((state) => state.PostReducer.loading);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const ImageRef = useRef();
  const desc = useRef();

  //Image Handler..
  const ImageHandler = (e) => {
    const img = e.target.files?.[0];
    if (img) {
      setImage(img);
    }
  };

  // Upload post handler..

  const handleUpload = async (e) => {
    e.preventDefault();
    if (desc.current.value === "" || image === null) {
      return;
    }
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image?.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      try {
        dispatch(UploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(newPost));

    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className="postShare">
      <img
        src={
          user.profilePicture
            ? serverPubic + user.profilePicture
            : serverPubic + "defaultProfile.png"
        }
        alt="userImage"
      />
      <div>
        <input ref={desc} type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => ImageRef.current.click()}
          >
            <UilScenery />
            Photos
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Videos
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn ps-btn"
          >
            {loading ? "Uploading..." : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={ImageRef} onChange={ImageHandler} />
          </div>
        </div>
        {image && (
          <div className="privewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
