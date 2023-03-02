import React from "react";
import Logo from "../../../imgs/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./index.css";
import { useNavigate } from "react-router-dom";
const LogoSearch = () => {
  const navigate = useNavigate();
  return (
    <div className="logoSearch">
      <img
        src={Logo}
        alt="Logo.."
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />
      <div className="search">
        <input type="text" placeholder="Explore.." />
        <div className="search-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
