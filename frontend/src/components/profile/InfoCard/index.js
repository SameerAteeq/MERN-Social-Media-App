import React, { useEffect, useState } from "react";
import "./index.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../profileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../redux/api/UserRequest.js";
import { logOut } from "../../../redux/actions/AuthAction";

const InfoCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?._id === id) {
        setProfileUser(user);
      } else {
        const { data } = await UserApi.getUser(id);
        setProfileUser(data);
      }
    };
    fetchUser();
  }, [user, id]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="Info_card">
      <div className="infoHead">
        <h3>Your Info</h3>
        <div>
          {id === user?._id && (
            <UilPen
              width="2rem"
              heigth="1.2rem"
              onClick={() => setOpenModal(true)}
            />
          )}
          <ProfileModal {...{ openModal, setOpenModal, data: user }} />
        </div>
      </div>
      <div className="info">
        <span>
          <b>Status:</b>
        </span>
        <span>
          {profileUser?.relationship
            ? profileUser?.relationship
            : "Add Your Relationship"}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lives in:</b>
        </span>
        <span>
          {profileUser?.livesIn ? profileUser?.livesIn : "Add Your Residence"}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works at:</b>
        </span>
        <span>
          {profileUser?.worksAt
            ? profileUser?.worksAt
            : "Add Your Work destination"}
        </span>
      </div>
      <div className="logout">
        {id === user?._id && (
          <button className="btn logout-btn" onClick={handleLogOut}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
