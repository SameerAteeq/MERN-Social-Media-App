import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./index.css";
import Post from "./post";
import { getTimelinePosts } from "../../../redux/actions/PostAction";
const Posts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.PostReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts) return "No Posts....";

  if (id) posts = posts.filter((item) => item.userId === id);

  return (
    <div className="posts">
      {posts?.map((item, id) => (
        <Post data={item} key={id} />
      ))}
    </div>
  );
};

export default Posts;
