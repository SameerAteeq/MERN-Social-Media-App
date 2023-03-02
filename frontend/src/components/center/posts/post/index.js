import React, { useEffect, useState } from "react";
import "./index.css";
import Comment from "../../../../imgs/comment.png";
import Share from "../../../../imgs/share.png";
import Heart from "../../../../imgs/like.png";
import NotLike from "../../../../imgs/notlike.png";
import { useSelector } from "react-redux";
import { likePostApi } from "../../../../redux/api/PostRequest";
import { format } from "timeago.js";
const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (data?.likes?.length) {
      setLiked(data?.likes?.includes(user._id));
      setLikes(data?.likes?.length ?? 0);
    }
  }, [data]);

  const handleLike = async () => {
    await likePostApi(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  // useEffect(()=>{
  //   const userId= data?.find((id)=>id ===user?._id)
  //   const fetchUser =async()=>{
  //     try {
  //       const {data}=
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // },[data])
  return (
    <div className="post">
      <img
        src={
          data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
        }
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "14px" }}>
        {likes} likes
      </span>

      <div className="details">
        <span>
          <b>{data?.name}</b>
        </span>
        <span> {data?.desc}</span>
      </div>
      <span style={{ color: "var(--gray)", fontSize: "11px" }}>
        {format(data?.createdAt)}
      </span>
    </div>
  );
};

export default Post;
