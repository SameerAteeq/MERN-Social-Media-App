import React, { useState } from "react";

import "../../styles/right.css";
import TrendCard from "./TrendCard";
import ShareModal from "./shareModal";
import { useNavigate } from "react-router-dom";
import NavIcons from "./navIcons";
const RightSide = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="RightSide">
      <NavIcons />

      <TrendCard />

      <button className="btn tr-btn" onClick={() => setOpenModal(true)}>
        Shares
      </button>
      <ShareModal {...{ openModal, setOpenModal }} />
    </div>
  );
};

export default RightSide;
