import React from "react";
import LogoSearch from "./logoSearch";
import "../../styles/left.css";
import ProfileCard from "./profileCard";
import FollowersCard from "./followersCard";
const LeftSide = () => {
  return (
    <div className="leftSide">
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default LeftSide;
