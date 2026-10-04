import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { posts, viewDetail } = useContext(PostContext);
  const navigate = useNavigate();

  const viewDetails = async (id) => {
    navigate(`/viewdetail/${id}`);
    await viewDetail(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-blue-200 font-medium mb-3">
              Welcome to our marketplace
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Amazing Posts & Products
            </h1>

            <p className="mt-5 text-blue-100 text-lg">
              Explore posts created by our users and find something that matches
              your needs.
            </p>

            <button className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Explore Posts
            </button>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-blue-600 font-semibold mb-2">EXPLORE</p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Latest Posts
            </h2>

            <p className="text-gray-500 mt-2">
              Explore the latest posts created by our users.
            </p>
          </div>

          <div className="mt-5 md:mt-0">
            <span className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
              {posts.length} Posts
            </span>
          </div>
        </div>

        {/* Post Cards */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No posts available
            </h3>

            <p className="text-gray-500 mt-2">
              There are no posts to show right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((data) => (
              <div
                key={data._id}
                onClick={() => viewDetails(data._id)}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Card Top */}
                <div className="h-2 bg-blue-600"></div>

                <div className="p-6">
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        data.isPremium
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {data.isPremium ? "Premium" : "Free"}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        data.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {data.available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {data.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 mt-3 text-sm leading-6 line-clamp-3">
                    {data.description}
                  </p>

                  {/* Price */}
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Price</p>

                      <p className="text-2xl font-bold text-gray-800">
                        ₹{data.price}
                      </p>
                    </div>

                    {data.discount > 0 && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-semibold">
                        {data.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Stock</span>

                      <span className="font-semibold text-gray-700">
                        {data.stock}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(data.stock * 10, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Options */}
                  {data.options && data.options.length > 0 && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Available Options
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {data.options.slice(0, 3).map((option, index) => (
                          <span
                            key={index}
                            className={`text-xs px-3 py-1 rounded-lg border ${
                              option.available
                                ? "bg-gray-50 text-gray-600 border-gray-200"
                                : "bg-red-50 text-red-400 border-red-100"
                            }`}
                          >
                            {option.name} - ₹{option.price}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Button */}
                  <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;
