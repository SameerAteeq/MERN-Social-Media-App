import React, { useEffect, useState } from "react";
import { Followers } from "../../../data/FollowersData";
import { getAllUsersApi } from "../../../redux/api/UserRequest";
import Follower from "./Follower";
import { useSelector } from "react-redux";
import "./index.css";
import { useNavigate } from "react-router-dom";
const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPeople = async () => {
      const { data } = await getAllUsersApi();
      setPersons(data);
    };
    fetchPeople();
  }, []);
  return (
    <div className="followersCard">
      <h3>People you may know</h3>
      {persons?.map((item, id) => {
        if (item._id !== user._id) {
          return <Follower data={item} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
