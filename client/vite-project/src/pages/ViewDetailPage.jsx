import React, { useContext } from "react";
import { PostContext } from "../context/PostsContext";

const ViewDetailPage = () => {
  const { viewDetailPost } = useContext(PostContext);

  console.log(viewDetailPost);

  if (!viewDetailPost) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{viewDetailPost.title}</h1>

      <p>{viewDetailPost.description}</p>

      <p>Price: ₹{viewDetailPost.price}</p>

      <p>
        Type: {viewDetailPost.isPremium ? "Premium" : "Free"}
      </p>

      <p>
        Status: {viewDetailPost.status}
      </p>

      <p>
        Availability:{" "}
        {viewDetailPost.available ? "Available" : "Unavailable"}
      </p>

      <p>Stock: {viewDetailPost.stock}</p>

      {viewDetailPost.discount > 0 && (
        <p>Discount: {viewDetailPost.discount}%</p>
      )}

      {/* Options */}
      {viewDetailPost.options &&
        viewDetailPost.options.length > 0 && (
          <div>
            <h2>Options</h2>

            {viewDetailPost.options.map((option, index) => (
              <div key={index}>
                <p>{option.name}</p>
                <p>₹{option.price}</p>
                <p>
                  {option.available
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default ViewDetailPage;