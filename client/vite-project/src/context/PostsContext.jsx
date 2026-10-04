import { useState, useEffect, createContext } from "react";
import api from "../utils/axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  // provide posts to all app
  const [posts, setPosts] = useState([]);
  //for only logged in user
  const [specificPosts, setSpecificPosts] = useState([]);

  //for view detail post page
  const [viewDetailPost, setViewDetailPost] = useState(null);

  // Create A post
  const createPost = async (postData) => {
    try {
      const { data } = await api.post("/posts/createpost", postData);
      console.log("Post Created Successfully");
      return data;
    } catch (err) {
      console.log("Creating Post Error Frontend", err.response?.data);
    }
  };

  //Show All users Posts
  const showAllUsersPosts = async () => {
    try {
      const { data } = await api.get("/posts/getallposts");
      console.log("All Posts of every user", data.posts);
      setPosts(data.posts);
      return data.posts;
    } catch (err) {
      console.log(
        "Showing All users Posts Frontend Error: ",
        err.response?.data,
      );
    }
  };

  //Show only user Post in dashboard
  const showMyPosts = async () => {
    try {
      const { data } = await api.get("/posts/getsingleuserposts");
      setSpecificPosts(data.posts);
      return data.posts;
    } catch (err) {
      console.log("Show My Posts Error:", err.response?.data);
    }
  };

  //Update Post
  const updatePost = async (id, postData) => {
    const { data } = await api.put(`/posts/updatepost/${id}`, postData);
    return data;
  };

  //Delete Post
  const deletePost = async (id) => {
    await api.delete(`/posts/deletepost/${id}`);
    console.log("Deleted Successfully");
  };

  //view detail of post
  const viewDetail = async (id) => {
    try {
      const { data } = await api.get(`/posts/singlepostview/${id}`);
      setViewDetailPost(data.singlePost);
      
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  //Show all posts first time
  useEffect(() => {
    showAllUsersPosts();
  }, []);
  return (
    <PostContext.Provider
      value={{
        posts,
        createPost,
        showAllUsersPosts,
        showMyPosts,
        specificPosts,
        updatePost,
        deletePost,
        viewDetail,
        viewDetailPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
