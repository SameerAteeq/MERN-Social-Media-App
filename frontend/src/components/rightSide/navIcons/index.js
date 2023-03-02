import React from "react";
import Home from "../../../imgs/home.png";
import Noti from "../../../imgs/noti.png";
import Comment from "../../../imgs/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

const NavIcons = () => {
  const navigate = useNavigate();
  return (
    <div className="navIcons">
      <img onClick={() => navigate("/home")} src={Home} alt="" />
      <UilSetting />
      <img src={Noti} alt="" />
      <img src={Comment} alt="" onClick={() => navigate("/chat")} />
    </div>
  );
};

export default NavIcons;
