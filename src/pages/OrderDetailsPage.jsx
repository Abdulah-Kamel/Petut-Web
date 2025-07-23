import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../store/slices/orderSlice';
import { useAuth } from '../context/AuthContext';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { orders, loading, error } = useSelector(state => state.orders);
  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    if (currentUser && !order && !loading) {
      dispatch(fetchUserOrders(currentUser.uid));
    }
  }, [currentUser, order, loading, dispatch]);

  if (loading) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center">Loading order details...</div>;
  }
  if (error) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-red-500">{error}</div>;
  }
  if (!order) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center">Order not found.</div>;
  }

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const { deliveryInfo, cart, paymentInfo, createdAt, status } = order;
  const deliveryDate = new Date(createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-12">
      <button onClick={() => navigate(-1)} className="mb-4 text-primary hover:underline">&larr; Back to Orders</button>
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Order Info</h2>
            <div className="mb-2"><span className="text-gray-600">Order Date:</span> {formatDate(createdAt)}</div>
            <div className="mb-2"><span className="text-gray-600">Status:</span> {status}</div>
            <div className="mb-2"><span className="text-gray-600">Estimated Delivery:</span> {formatDate(deliveryDate)}</div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Shipping Info</h2>
            <div className="mb-2"><span className="text-gray-600">Name:</span> {deliveryInfo?.fullName}</div>
            <div className="mb-2"><span className="text-gray-600">Address:</span> {deliveryInfo?.address}, {deliveryInfo?.city}, {deliveryInfo?.postalCode}</div>
            <div className="mb-2"><span className="text-gray-600">Phone:</span> {deliveryInfo?.phone}</div>
            <div className="mb-2"><span className="text-gray-600">Email:</span> {deliveryInfo?.email}</div>
            <div className="mb-2"><span className="text-gray-600">Delivery Method:</span> {deliveryInfo?.deliveryMethod}</div>
            <div className="mb-2"><span className="text-gray-600">Delivery Time:</span> {deliveryInfo?.deliveryTime}</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="space-y-4 mb-6">
          {cart?.items?.map((item) => (
            <div key={item.id} className="flex items-center pb-4 border-b border-gray-200 last:border-b-0">
              <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                {item.imageURL ? (
                  <img src={item.imageURL} alt={item.productName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.productName}</h3>
                <div className="flex justify-between mt-1">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-medium">{item.totalPrice?.toFixed(2)} €</span>
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
            <span>{deliveryInfo?.deliveryMethod === 'express' ? '9.99 €' : 'Free'}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>{cart?.totalAmount?.toFixed(2)} €</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Info</h2>
        <div className="mb-2"><span className="text-gray-600">Payment Method:</span> {paymentInfo?.paymentMethod}</div>
        <div className="mb-2"><span className="text-gray-600">Cardholder:</span> {paymentInfo?.cardHolder}</div>
      </div>
      <div className="text-center space-y-4">
        <Link to="/profile" className="inline-block py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">Back to Orders</Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 