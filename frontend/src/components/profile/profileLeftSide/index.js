import React from "react";
import FollowersCard from "../../leftSide/followersCard";
import LogoSearch from "../../leftSide/logoSearch";
import InfoCard from "../InfoCard";
import "./index.css";
const ProfileLeft = () => {
  return (
    <div className="profile-Left">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
