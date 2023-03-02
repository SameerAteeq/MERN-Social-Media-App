import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser, unFollowUser } from "../../../../redux/actions/UserAction";
import FollowBtn from "../../../common/followBtn";

const Follower = ({ data }) => {
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authReducer.authData);
  // const [following, setFollowing] = useState(
  //   data?.followers?.includes(user?._id)
  // );
  // const handleFollow = () => {
  //   following
  //     ? dispatch(unFollowUser(data?._id, user))
  //     : dispatch(followUser(data?._id, user));
  //   setFollowing((prev) => !prev);
  // };
  const serverPubic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div key={data.id} className="follower">
      <div>
        <img
          src={
            data.profilePicture
              ? serverPubic + data.profilePicture
              : serverPubic + "defaultProfile.png"
          }
          alt="follower img"
          className="followerImg"
        />
        <div
          className="names"
          onClick={() => navigate(`/profile/${data?._id}`)}
        >
          <span>
            {data?.firstname} {data?.lastname}
          </span>
          <span>@{data.username}</span>
        </div>
      </div>

      <FollowBtn data={data} />
      {/* <button
        className={following ? " unfollow-btn" : "btn f-btn"}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button> */}
    </div>
  );
};

export default Follower;
