import React, { useState, useContext } from "react";
import { PostContext } from "../context/PostsContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../utils/axios";

const CreatePost = () => {
  const { createPost, updatePost } = useContext(PostContext);
  const { id } = useParams();

  const [form, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    isPremium: false,
    status: "draft",
    available: true,
    stock: 0,
    options: [],
    // Temporary for nested price options
    newOption: "",
    newOptionPrice: "",
    newOptionAvailable: true,
    discount: 0,
  });

  // edit Form Data

  useEffect(() => {
    const putPost = async () => {
      try {
        const { data } = await api.get("/posts/getsingleuserposts");
        const post = data.posts.find((post) => post._id === id);
        if (post) {
          setFormData({
            title: post.title || "",
            description: post.description || "",
            price: post.price || "",
            isPremium: post.isPremium || false,
            status: post.status || "draft",
            available: post.available ?? true,
            stock: post.stock || 0,
            options: post.options || [],
            newOption: "",
            newOptionPrice: "",
            newOptionAvailable: true,
            discount: post.discount || 0,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (id) {
      putPost();
    }
  }, [id]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      isPremium: form.isPremium,
      status: "published",
      available: form.available,
      stock: form.stock,
      options: form.options,
      discount: Number(form.discount),
    };
    if (id) {
      // Existing post update
      await updatePost(id, postData);
      console.log("Post Updated");
    } else {
      // New post create
      await createPost(postData);
      console.log("Post Created");
    }
  };

  // Draft submit
  const handeDraft = async (e) => {
    e.preventDefault();
    const postData = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      isPremium: form.isPremium,
      status: "draft",
      available: form.available,
      stock: form.stock,
      options: form.options,
      discount: Number(form.discount),
    };

    if (id) {
      // Existing post ko draft karo
      await updatePost(id, postData);
      console.log("Draft Updated");
    } else {
      // New draft create karo
      await createPost(postData);
      console.log("Draft Created");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Post</h1>

        <p className="text-gray-500 mb-6">
          Create your post and add all the required details.
        </p>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Title</label>

          <input
            type="text"
            placeholder="Enter post title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            value={form.title}
            onChange={(e) =>
              setFormData({
                ...form,
                title: e.target.value,
              })
            }
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Enter post description"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            value={form.description}
            onChange={(e) =>
              setFormData({
                ...form,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>

        {/* Price + Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              value={form.price}
              onChange={(e) =>
                setFormData({
                  ...form,
                  price: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Discount (%)
            </label>

            <input
              type="number"
              placeholder="Enter discount"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              value={form.discount}
              onChange={(e) =>
                setFormData({
                  ...form,
                  discount: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Premium */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Post Type
          </label>

          <select
            value={form.isPremium ? "premium" : "free"}
            onChange={(e) =>
              setFormData({
                ...form,
                isPremium: e.target.value === "premium",
              })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select Post Type</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Status</label>
        </div>

        {/* Availability + Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Availability
            </label>

            <select
              value={form.available ? "true" : "false"}
              onChange={(e) =>
                setFormData({
                  ...form,
                  available: e.target.value === "true",
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Stock
            </label>

            <input
              type="number"
              placeholder="Enter stock"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              value={form.stock}
              onChange={(e) =>
                setFormData({
                  ...form,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Options */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Options
          </label>

          {/* Fill option  */}
          <input
            type="text"
            placeholder="Example: 1 Month, 3 Months, Lifetime"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            value={form.newOption}
            onChange={(e) =>
              setFormData({
                ...form,
                newOption: e.target.value,
              })
            }
          />
          {/* fill option available price */}
          <input
            type="text"
            placeholder="price"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            value={form.newOptionPrice}
            onChange={(e) =>
              setFormData({
                ...form,
                newOptionPrice: e.target.value,
              })
            }
          />

          {/* Option Availability */}
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            value={form.newOptionAvailable ? "true" : "false"}
            onChange={(e) =>
              setFormData({
                ...form,
                newOptionAvailable: e.target.value === "true",
              })
            }
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...form,
                options: [
                  ...form.options,
                  {
                    name: form.newOption,
                    price: Number(form.newOptionPrice),
                    available: form.newOptionAvailable,
                  },
                ],
                newOption: "",
                newOptionPrice: "",
                newOptionAvailable: true,
              })
            }
          >
            Add Option
          </button>

          <p className="text-sm text-gray-500 mt-2">
            You can add options according to your post.
          </p>
        </div>
        {/* Show Added Options */}
        <div className="mt-4 space-y-2">
          {form.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between border p-3 rounded-lg"
            >
              <div>
                <span className="font-medium">{option.name}</span>

                <span className="ml-4">₹{option.price}</span>

                <span className="ml-4">
                  {option.available ? "Available" : "Not Available"}
                </span>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...form,
                    options: form.options.filter((_, i) => i !== index),
                  });
                }}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
            onClick={handeDraft}
          >
            Save Draft
          </button>
          <button
            onClick={handlePostSubmit}
            type="button"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            {id ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
