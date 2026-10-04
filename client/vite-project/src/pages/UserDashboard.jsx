import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { specificPosts, showMyPosts ,deletePost} = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    showMyPosts();
  }, []);

  //handle Edit button and navigate to edit page
  const handleEdit = async (id) => {
    navigate(`/editpost/${id}`);
  };
  const handleDelete=async(id)=>{
    await deletePost(id);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>

          <p className="text-gray-500 mt-1">Manage your posts</p>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 bg-gray-800 text-white p-4 font-semibold">
            <div>Title</div>
            <div>Status</div>
            <div>Published</div>
            <div>Draft</div>
            <div>Edit</div>
            <div>Delete</div>
          </div>

          {/* Posts */}
          {specificPosts.map((data) => (
            <div
              key={data._id}
              className="grid grid-cols-6 gap-4 items-center p-4 border-b"
            >
              {/* Title */}
              <div className="font-medium text-gray-800">{data.title}</div>

              {/* Status */}
              <div>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {data.status}
                </span>
              </div>

              {/* Published */}
              <div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Published
                </button>
              </div>

              {/* Draft */}
              <div>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                  Draft
                </button>
              </div>

              {/* Edit */}
              <div>
                <button
                  onClick={() => handleEdit(data._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>

              {/* Delete */}
              <div>
                <button
                  onClick={() => handleDelete(data._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
