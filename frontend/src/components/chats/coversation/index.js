import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { getUser } from "../../../redux/api/UserRequest";

const Converations = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);
  const serverPubic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversations">
        <div className="conv-box">
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? serverPubic + userData?.profilePicture
                : serverPubic + "defaultProfile.png"
            }
            alt="profile img..."
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <div className="names" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>{online ? "online" : "offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Converations;
