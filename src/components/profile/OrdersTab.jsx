import React from 'react';
import { useNavigate, Link } from "react-router-dom";

const OrdersTab = ({ orders, loading, error }) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }
  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {!orders || orders.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => navigate("/catalog")}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 p-4 flex flex-wrap max-md:flex-col max-md:items-start justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600">Order ID:</span>
                  <span className="ml-2 font-mono font-medium">{order.id}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Date:</span>
                  <span className="ml-2">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <span
                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="ml-2 font-semibold">
                    {order.cart?.totalAmount?.toFixed(2) || "0.00"} €
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-3">Items</h3>
                <div className="space-y-3">
                  {order.cart?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <img
                        src={item.imageURL}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex items-center">
                        <span className="font-medium">{item.productName}</span>
                        <span className="ml-2 text-sm text-gray-600">
                          x{item.quantity}
                        </span>
                      </div>
                      <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 flex justify-end space-x-4">
                <Link
                  to={`/order/${order.id}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View Details
                </Link>
                {/* <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Track Order
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
