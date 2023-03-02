import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { getUser } from "../../../redux/api/UserRequest";
import PostSide from "../../center";
import PostShare from "../../center/postShare";
import FollowBtn from "../../common/followBtn";
import { createChatApi, userChatsApi } from "../../../redux/api/ChatRequest";
const ProfileCard = ({ location }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts } = useSelector((state) => state.PostReducer);
  const serverPubic = process.env.REACT_APP_PUBLIC_FOLDER;
  let currentUser = user;

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const { data } = await getUser(id);
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUser();
  }, [id]);
  if (id) currentUser = userData;

  //Get the chat in chat section...
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await userChatsApi(user?._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, [user]);

  //handle message to the user profile...
  const handleMessaage = () => {
    const existingChat = chats?.find(
      (chat) =>
        chat?.members?.includes(id) && chat?.members?.includes(user?._id)
    );
    try {
      if (existingChat) {
        navigate("/chat");
      } else {
        const { data } = createChatApi(user?._id, id);
        navigate("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="profileCard"
        style={{ width: location ? "100%" : "18rem" }}
      >
        <div className="profileImages">
          <img
            style={{ maxHeight: location ? "14rem" : "10rem" }}
            src={
              currentUser?.coverPicture
                ? serverPubic + currentUser?.coverPicture
                : serverPubic + "defaultCover.jpg"
            }
            alt="Cover image..."
          />
          <div
            className="profile-Img"
            style={{
              width: location ? "8rem" : "6rem",
              height: location ? "8rem" : "6rem",
            }}
          >
            <img
              src={
                currentUser?.profilePicture
                  ? serverPubic + currentUser?.profilePicture
                  : serverPubic + "defaultProfile.png"
              }
              alt="profile image..."
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem 1rem 0 1rem",
            gap: "20px",
          }}
        >
          <div className="profileName">
            <span>
              {currentUser?.firstname} {currentUser?.lastname}
            </span>
            <span>{currentUser?.worksAt ? currentUser?.worksAt : ""}</span>
          </div>
          {location === "profilePage" && id !== user?._id ? (
            <div className="profile-btn">
              <FollowBtn />
              <button className="btn" onClick={handleMessaage}>
                Message
              </button>
            </div>
          ) : null}
        </div>
        <div className="followStatus">
          <hr />

          <div>
            <div className="follow">
              <span>{currentUser?.followers?.length}</span>
              <span>Followers</span>
            </div>
            <div className="vertical-line"></div>
            <div className="follow">
              <span>{currentUser?.following?.length}</span>
              <span>Following</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="vertical-line"></div>
                <div className="follow">
                  <span>
                    {
                      posts.filter((item) => item.userId === currentUser?._id)
                        .length
                    }
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>

        {location !== "profilePage" && (
          <span className="my-profile">
            <Link
              to={`/profile/${currentUser?._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              My Profile
            </Link>
          </span>
        )}
      </div>
      {location === "profilePage" && id === user?._id ? <PostShare /> : null}
    </>
  );
};

export default ProfileCard;
