import React from "react";
import ProfileLeft from "../../components/profile/profileLeftSide";
import ProfileCard from "../../components/leftSide/profileCard";
import PostSide from "../../components/center";
import RightSide from "../../components/rightSide";
import "./Profile.css";
const Profile = () => {
  return (
    <div className="profile">
      <ProfileLeft />
      <div className="profile-center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
