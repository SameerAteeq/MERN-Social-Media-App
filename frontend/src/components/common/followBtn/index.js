import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser, unFollowUser } from "../../../redux/actions/UserAction";
import { userChatsApi } from "../../../redux/api/ChatRequest";
import { getUser } from "../../../redux/api/UserRequest";

const FollowBtn = ({ data }) => {
  const { id } = useParams();
  let currentUser = data;
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    currentUser?.followers?.includes(user?._id)
  );

  //Get chatss

  // useEffect(()=>{
  //   const getChats = async()=>{
  //     try {
  //       const{data}= await userChatsApi()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // },[])

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const { data } = await getUser(id);
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUser();
  }, [currentUser]);
  if (id) currentUser = userData;

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(currentUser?._id, user))
      : dispatch(followUser(currentUser?._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <button
      className={following ? " unfollow-btn" : "btn f-btn"}
      onClick={handleFollow}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowBtn;
