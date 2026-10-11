import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../context/PostsContext";
import { OrderContext } from "../context/Ordercontext";
import { useParams } from "react-router-dom";

import api from "../utils/axios";

const ViewDetailPage = () => {
  const { id } = useParams();
  const { viewDetailPost, viewDetail } = useContext(PostContext);
  const { createOrder } = useContext(OrderContext);

  // Main post is selected by default
  const [selectedOption, setSelectedOption] = useState("main");

  // Quantity and error state
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await viewDetail(id);
      } finally {
        console.log("err");
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!viewDetailPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Post not found</p>
      </div>
    );
  }

  // Find selected additional option
  const selectedOptionData =
    selectedOption === "main"
      ? null
      : viewDetailPost.options?.find((option) => option._id === selectedOption);

  // Main price or selected option price
  const originalPrice = selectedOptionData
    ? selectedOptionData.price
    : viewDetailPost.price;

  // Calculate discount
  const discount = viewDetailPost.discount || 0;

  const finalPrice = originalPrice - (originalPrice * discount) / 100;

  // Check post and option availability
  const isAvailable =
    viewDetailPost.available &&
    viewDetailPost.stock > 0 &&
    (selectedOption === "main" ||
      (selectedOptionData && selectedOptionData.available));

  // Buy Now
  const handleBuyNow = async () => {
    setError("");

    // Validate quantity
    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    // Check stock
    if (!viewDetailPost.available || viewDetailPost.stock <= 0) {
      setError("This post is out of stock");
      return;
    }

    if (Number(quantity) > viewDetailPost.stock) {
      setError(`Only ${viewDetailPost.stock} items are available`);
      return;
    }

    // Check selected option
    if (selectedOption !== "main" && !selectedOptionData) {
      setError("Please select a valid option");
      return;
    }

    if (selectedOptionData && !selectedOptionData.available) {
      setError("Selected option is not available");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        postId: viewDetailPost._id,
        selectedOption: selectedOptionData ? selectedOptionData.name : "",
        quantity: Number(quantity),
      };

      const data = await createOrder(orderData);

      if (data) {
        alert("Order created successfully!");
      }
      console.log("Order created:", orderData);

      alert("Order created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Post Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {viewDetailPost.title}
            </h1>

            <p className="text-gray-600 leading-7 mb-6">
              {viewDetailPost.description}
            </p>

            <div className="space-y-4">
              {/* Duration */}
              <div className="flex justify-between border-b pb-3 gap-4">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold text-gray-800">
                  {viewDetailPost.duration || "10 Hours"}
                </span>
              </div>

              {/* Type */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Type</span>
                <span
                  className={`font-semibold ${
                    viewDetailPost.isPremium
                      ? "text-purple-600"
                      : "text-green-600"
                  }`}
                >
                  {viewDetailPost.isPremium ? "Premium" : "Free"}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Status</span>
                <span
                  className={`font-semibold ${
                    viewDetailPost.status === "published"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {viewDetailPost.status}
                </span>
              </div>

              {/* Availability */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Availability</span>
                <span
                  className={`font-semibold ${
                    viewDetailPost.available && viewDetailPost.stock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {viewDetailPost.available && viewDetailPost.stock > 0
                    ? "Available"
                    : "Out of Stock"}
                </span>
              </div>

              {/* Stock */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Available Stock</span>
                <span className="font-semibold text-gray-800">
                  {viewDetailPost.stock}
                </span>
              </div>

              {/* Discount */}
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="font-semibold text-green-600">
                  {discount}%
                </span>
              </div>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Choose Your Option
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Select a duration or package.
            </p>

            <div className="space-y-3">
              {/* Main Post Option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedOption("main");
                  setError("");
                }}
                className={`w-full text-left border rounded-lg p-4 transition ${
                  selectedOption === "main"
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {viewDetailPost.duration || "10 Hours"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Main post</p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                      ₹{viewDetailPost.price}
                    </p>

                    {selectedOption === "main" && (
                      <span className="text-xs text-blue-600 font-semibold">
                        Selected
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* Additional Options */}
              {viewDetailPost.options?.map((option) => (
                <button
                  type="button"
                  key={option._id || option.name}
                  onClick={() => {
                    setSelectedOption(option._id);
                    setError("");
                  }}
                  disabled={!option.available}
                  className={`w-full text-left border rounded-lg p-4 transition ${
                    selectedOption === option._id
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-400"
                  } ${
                    !option.available ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="flex justify-between items-center gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {option.name}
                      </p>

                      <p
                        className={`text-sm mt-1 ${
                          option.available ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {option.available ? "Available" : "Unavailable"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        ₹{option.price}
                      </p>

                      {selectedOption === option._id && (
                        <span className="text-xs text-blue-600 font-semibold">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow empty input temporarily
                  if (value === "") {
                    setQuantity("");
                    setError("");
                    return;
                  }

                  setQuantity(Number(value));
                  setError("");
                }}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-sm text-gray-500 mt-1">
                Available stock: {viewDetailPost.stock}
              </p>
            </div>

            {/* Price Details */}
            <div className="border-t mt-6 pt-5">
              <p className="text-sm text-gray-500 mb-3">
                Selected:{" "}
                <s n className="font-semibold text-gray-800">
                  {selectedOptionData
                    ? selectedOptionData.name
                    : viewDetailPost.duration || "10 Hours"}
                </s>
              </p>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Price per item</span>
                <span className="font-semibold text-gray-800">
                  ₹{originalPrice.toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Discount ({discount}%)</span>
                  <span className="font-semibold text-green-600">
                    -₹{((originalPrice * discount) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold text-gray-800">
                  {quantity === "" ? 0 : quantity}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <span className="text-lg font-bold text-gray-800">
                  Total Price
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  ₹{(finalPrice * (Number(quantity) || 0)).toFixed(2)}
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </p>
              )}

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={loading || !isAvailable}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                  loading || !isAvailable
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Creating Order..."
                  : !isAvailable
                    ? "Out of Stock"
                    : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailPage;
