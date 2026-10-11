import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/Ordercontext";
import { useNavigate } from "react-router-dom";
//For Editing Order or booking event or product
import { useParams } from "react-router-dom";

const ViewOrders = () => {
  const { viewOrders, deleteOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // for editing order
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await viewOrders();

        // Backend response mein orders array
        setOrders(data.orders || []);
        console.log(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cancel Order
  const handleCancel = async (id) => {
    await deleteOrder(id);
  };

  //Edit Order
  const handleEdit = async (id) => {
    navigate(`/editorder/${id}`);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="bg-white p-6 rounded-lg">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-5">
                <h2 className="text-xl font-bold">
                  {order.post?.title || "Post unavailable"}
                </h2>

                <p className="mt-2">
                  Order Code: {order.orderCode || order._id}
                </p>

                <p>Selected Option: {order.selectedOption || "Main Post"}</p>

                <p>Quantity: {order.quantity}</p>

                <p>Total Amount: ₹{order.totalAmount}</p>

                <p>
                  Status: <span className="font-semibold">{order.status}</span>
                </p>
                <button
                  onClick={() => handleCancel(order._id)}
                  className="border  mr-1 p-1"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleEdit(order._id)}
                  className="border p-1"
                >
                  Edit Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
