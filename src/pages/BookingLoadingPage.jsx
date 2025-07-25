import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const messages = [
  "Confirming your appointment...",
  "Processing payment...",
  "Almost done...",
];

const BookingLoadingPage = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { clinic, selectedDay, selectedTime, selectedPayment, coupon } =
    state || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1000);
    const timeout = setTimeout(() => {
      navigate("/booking-success", { replace: true });
    }, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, clinic, selectedDay, selectedTime, selectedPayment, coupon]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://lottie.host/a4efe5f7-194d-429b-8d14-0f7a4e565fc5/HR3EAogwVr.lottie";
    script.type = "module";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <dotlottie-wc
        src="https://lottie.host/a4efe5f7-194d-429b-8d14-0f7a4e565fc5/HR3EAogwVr.lottie"
        style={{ width: "300px", height: "300px" }}
        speed="1"
        autoplay
        loop
      ></dotlottie-wc>
    </div>
  );
};

export default BookingLoadingPage;
