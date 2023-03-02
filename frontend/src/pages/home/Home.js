import React from "react";
import PostSide from "../../components/center";
import LeftSide from "../../components/leftSide";
import RightSide from "../../components/rightSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="home">
      <div className="leftBox">
        <LeftSide />
      </div>
      <div>
        <PostSide />
      </div>
      <div>
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
