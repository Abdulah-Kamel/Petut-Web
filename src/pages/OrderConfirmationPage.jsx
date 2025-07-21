import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders, clearLastOrderId } from "../store/slices/orderSlice";
import { useAuth } from "../context/AuthContext";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { orders, lastOrderId, loading } = useSelector((state) => state.orders);

  // Find the last placed order
  const order = orders.find((o) => o.id === lastOrderId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser && !order && !loading) {
      dispatch(fetchUserOrders(currentUser.uid));
    }
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading your order...</h1>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="mb-6">
          Thank you for your purchase. Your order has been placed.
        </p>
        <Link
          to="/catalog"
          className="py-2 px-4 bg-primary text-white rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { deliveryInfo, cart, paymentInfo, createdAt } = order;
  const orderNumber = order.id;
  const deliveryDate = new Date(createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase</p>
        <div className="rounded-lg inline-block px-4 py-2 font-mono text-lg">
          Order number:
          {orderNumber}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Order Date</span>
            <span className="font-medium">{formatDate(createdAt)}</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Estimated Delivery</span>
            <span className="font-medium">{formatDate(deliveryDate)}</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Shipping Address</span>
            <span className="font-medium text-right">
              {deliveryInfo?.address}
              <br />
              {deliveryInfo?.city}, {deliveryInfo?.postalCode}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium">
              {paymentInfo?.paymentMethod || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {cart?.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center pb-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                {item.imageURL ? (
                  <img
                    src={item.imageURL}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.productName}</h3>
                <div className="flex justify-between mt-1">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-medium">
                    {item.totalPrice?.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{cart?.totalAmount?.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>
              {deliveryInfo?.deliveryMethod === "express" ? "9.99 €" : "Free"}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>{cart?.totalAmount?.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-600">
          We've sent a confirmation email to{" "}
          <span className="font-medium">
            {deliveryInfo?.email || "your email"}
          </span>{" "}
          with all the details.
        </p>
        <div className="space-x-4">
          <Link
            to="/catalog"
            className="inline-block py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="inline-block py-3 px-6 bg-white text-primary font-semibold rounded-lg border border-primary hover:bg-gray-50 transition-colors"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage
