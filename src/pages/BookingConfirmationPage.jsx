import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const paymentMethods = [
  { key: "card", label: "💳 Visa / Mastercard" },
  { key: "cash", label: "💵 Cash on arrival" },
];

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { clinic, selectedDay, selectedTime, selectedDate } = state || {};

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!clinic || !selectedDay || !selectedTime || !selectedDate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 font-bold">Missing booking data.</div>
      </div>
    );
  }

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        clinicId: clinic.id,
        clinicName: clinic.clinicName || clinic.name || clinic.doctorName,
        clinicPhone: clinic.phone || clinic.phoneNumber,
        clinicLocation: clinic.clinicAddress || clinic.location,
        day: selectedDay,
        time: selectedTime,
        date: selectedDate,
        price: clinic.price,
        paymentMethod:
          selectedPayment === "card" ? "Visa / Mastercard" : "Cash on arrival",
        timestamp: serverTimestamp(),
        status: "Confirmed",
      });
      navigate("/booking-loading", {
        state: {
          clinic,
          selectedDay,
          selectedTime,
          selectedPayment:
            selectedPayment === "card"
              ? "Visa / Mastercard"
              : "Cash on arrival",
        },
      });
    } catch (e) {
      setLoading(false);
      alert("Booking failed: " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-light flex flex-col">
      {/* AppBar */}
      <div className="bg-white shadow p-4 flex items-center justify-center">
        <h2 className="font-bold text-lg">Confirm appointment</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Clinic Info */}
        <div className="flex items-center mb-6">
          <img
            src={clinic.image}
            alt={clinic.clinicName || clinic.name}
            className="w-20 h-20 rounded-full object-cover border"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="ml-4 flex-1">
            <div className="font-bold text-lg">
              {clinic.clinicName || clinic.name}
            </div>
            <div className="text-gray-500">
              {clinic.clinicAddress || clinic.location}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{clinic.rating ? `${clinic.rating}/5` : "No rating"}</span>
            </div>
          </div>
        </div>

        {/* Appointment Time */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center mb-6">
          <span className="material-icons text-primary mr-3">event</span>
          <div>
            <div className="text-gray-500">Appointment time</div>
            <div className="font-bold">
              {selectedDay}, {selectedTime}
            </div>
          </div>
        </div>

        {/* Billing Details */}
        <div className="mb-6">
          <div className="font-bold mb-2">Billing details</div>
          <InfoRow label="Consultation fee" value={`${clinic.price} EGP`} />
          <InfoRow label="Service fee & tax" value="FREE" />
          <InfoRow label="Total payable" value={`${clinic.price} EGP`} isBold />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold">Payment method</span>
            <button
              className="text-primary font-semibold"
              onClick={() => setShowPaymentModal(true)}
            >
              CHANGE
            </button>
          </div>
          <div className="mt-2">
            {paymentMethods.find((m) => m.key === selectedPayment).label}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white p-4 flex items-center shadow">
        <div className="font-bold text-lg flex-1">{clinic.price} EGP</div>
        <button
          className="btn-primary w-1/2"
          onClick={handleConfirmBooking}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm and pay"}
        </button>
      </div>

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <div className="font-bold text-lg mb-4">Select payment method</div>
            {paymentMethods.map((method) => (
              <label
                key={method.key}
                className="flex items-center py-2 cursor-pointer"
              >
                <input
                  type="radio"
                  className="mr-3"
                  checked={selectedPayment === method.key}
                  onChange={() => {
                    setSelectedPayment(method.key);
                    setShowPaymentModal(false);
                  }}
                />
                {method.label}
              </label>
            ))}
            <button
              className="mt-4 btn-secondary w-full"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function InfoRow({ label, value, isBold }) {
  return (
    <div className="flex justify-between py-1">
      <span>{label}</span>
      <span className={isBold ? "font-bold" : ""}>{value}</span>
    </div>
  );
}

export default BookingConfirmationPage;
