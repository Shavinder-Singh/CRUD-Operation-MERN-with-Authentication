import React, { useEffect, useContext, useState } from "react";
import { OrderContext } from "../context/Ordercontext";

const AdminDashboard = () => {
  const { adminViewOrders, adminStatus } = useContext(OrderContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real orders from backend
  const loadOrderedData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminViewOrders();

      // Backend response se real orders
      setOrders(response.allOrders || []);
    } catch (err) {
      console.log("Error fetching orders:", err);
      setError(err.response?.data?.message || "Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderedData();
  }, []);

  // Dynamic counts from real orders
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "confirmed",
  ).length;

  const failedOrders = orders.filter(
    (order) => order.status === "failed",
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled",
  ).length;

  // Update status in backend and frontend
  const handleStatus = async (orderId, status) => {
    try {
      await adminStatus(orderId, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
    } catch (err) {
      console.log("Status update error:", err);
      alert(err.response?.data?.message || "Unable to update order status");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-center text-gray-600">
        Loading orders...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p className="rounded-lg bg-white p-5 text-red-600 shadow">{error}</p>

        <button
          onClick={loadOrderedData}
          className="mt-4 rounded-lg bg-gray-900 px-5 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

          <p className="mt-2 text-gray-500">
            Manage customer orders and update their status
          </p>
        </div>

        <button
          onClick={loadOrderedData}
          className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
        >
          Refresh Orders
        </button>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-xl border border-yellow-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingOrders}
          </h2>
        </div>

        <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Confirmed Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {confirmedOrders}
          </h2>
        </div>

        <div className="rounded-xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Failed Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-orange-600">
            {failedOrders}
          </h2>
        </div>

        <div className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Cancelled Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {cancelledOrders}
          </h2>
        </div>
      </div>

      {/* Orders Heading */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">All Orders</h2>

        <p className="mt-1 text-sm text-gray-500">
          {totalOrders} order(s) found
        </p>
      </div>

      {/* Real Orders */}
      {orders.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">
            No orders found
          </h3>

          <p className="mt-2 text-gray-500">
            Orders will appear here when customers place them.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              {/* Order Title and Status */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-all text-xs text-gray-500">
                    ORDER #{order.orderCode || order._id}
                  </p>

                  <h3 className="mt-2 break-words text-lg font-bold text-gray-800">
                    {order.postId?.title || "Post unavailable"}
                  </h3>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "failed"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Real Customer and Order Details */}
              <div className="space-y-3 border-t border-gray-100 py-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Customer</span>
                  <span className="text-right font-medium text-gray-800">
                    {order.userId?.name || "Unknown"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Email</span>
                  <span className="break-all text-right text-gray-800">
                    {order.userId?.email || "Not available"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Selected Option</span>
                  <span className="text-right font-medium text-gray-800">
                    {order.selectedOption || "Main Post"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Quantity</span>
                  <span className="font-medium text-gray-800">
                    {order.quantity}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Unit Price</span>
                  <span className="font-medium text-gray-800">
                    ₹{order.price}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
                  <span className="font-semibold text-gray-700">
                    Total Amount
                  </span>

                  <span className="text-lg font-bold text-gray-900">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Status Buttons */}
              <div className="border-t border-gray-100 pt-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Update Order Status
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatus(order._id, "pending")}
                    disabled={order.status === "pending"}
                    className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => handleStatus(order._id, "confirmed")}
                    disabled={order.status === "confirmed"}
                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Confirmed
                  </button>

                  <button
                    onClick={() => handleStatus(order._id, "failed")}
                    disabled={order.status === "failed"}
                    className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Failed
                  </button>

                  <button
                    onClick={() => handleStatus(order._id, "cancelled")}
                    disabled={order.status === "cancelled"}
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
