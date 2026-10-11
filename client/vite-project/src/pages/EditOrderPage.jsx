
import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../context/Ordercontext";
import { useParams } from "react-router-dom";

const EditOrderPage = () => {
  const { id } = useParams();

  const { viewSingleOrder, updateOrder } = useContext(OrderContext);

  const [order, setOrder] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Old order data fetch karo
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await viewSingleOrder(id);

        const oldOrder = response.order;

        setOrder(oldOrder);

        // Pehle se selected option
        setSelectedOption(oldOrder.selectedOption || "");

        // Pehle se selected quantity
        setQuantity(oldOrder.quantity || 1);
      } catch (error) {
        console.log("Error fetching order:", error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  // Order update karo
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await updateOrder(id, {
        selectedOption,
        quantity: Number(quantity),
      });

      console.log("Updated Order:", response);

      // Updated data screen par bhi show karo
      setOrder(response.updatedOrder || response.order);
      alert("Order updated successfully");
    } catch (error) {
      console.log("Update Error:", error);
      alert("Order update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return <p className="p-6">Loading order...</p>;
  }

  // Populated post ki details
  const post = order.postId;

  // Selected option ka current price
  const selectedOptionData = post?.options?.find(
    (option) => option.name === selectedOption
  );

  const currentPrice = selectedOption
    ? selectedOptionData?.price || 0
    : post?.price ?? order.price;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-5">Edit Order</h1>

      <form onSubmit={handleUpdate} className="space-y-5">

        {/* Post title */}
        <div>
          <label className="block font-medium mb-1">
            Post
          </label>

          <p className="border rounded p-3">
            {post?.title || "Post details unavailable"}
          </p>
        </div>

        {/* Old option automatically selected */}
        <div>
          <label className="block font-medium mb-1">
            Select Option
          </label>

          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full border rounded p-3"
          >
            <option value="">Default Price</option>

            {post?.options?.map((option) => (
              <option
                key={option._id || option.name}
                value={option.name}
                disabled={!option.available}
              >
                {option.name} - ₹{option.price}
                {!option.available ? " (Unavailable)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Old quantity */}
        <div>
          <label className="block font-medium mb-1">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded p-3"
            required
          />
        </div>

        {/* Updated amount preview */}
        <div className="border rounded p-4 bg-gray-50">
          <p>Price: ₹{currentPrice}</p>
          <p>Quantity: {quantity}</p>

          <p className="font-bold text-lg mt-2">
            Total: ₹{currentPrice * (Number(quantity) || 0)}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || (selectedOption && !selectedOptionData?.available)}
          className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Order"}
        </button>

      </form>
    </div>
  );
};

export default EditOrderPage;
