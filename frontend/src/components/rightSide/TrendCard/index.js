import React from "react";
import { TrendData } from "../../../data/TrendCardData";
import "./index.css";
const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>
      {TrendData.map((item, id) => (
        <div key={id} className="trend">
          <span>#{item.name}</span>
          <span>{item.shares}k shares</span>
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
