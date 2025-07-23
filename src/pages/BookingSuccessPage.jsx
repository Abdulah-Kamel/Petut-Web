import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccessPage = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const iconRef = useRef(null);

  useEffect(() => {
    // تحميل سكريبت dotlottie-wc لعرض الأنيميشن أونلاين
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js";
    script.type = "module";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.animate(
        [
          { transform: "scale(0.5)", opacity: 0 },
          { transform: "scale(1.1)", opacity: 1 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: 800,
          fill: "forwards",
          easing: "cubic-bezier(.68,-0.55,.27,1.55)",
        }
      );
    }

    const textTimeout = setTimeout(() => setShowText(true), 500);
    const navTimeout = setTimeout(() => navigate("/", { replace: true }), 3000);
    return () => {
      clearTimeout(textTimeout);
      clearTimeout(navTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-light">
      <div className="mb-4">
        <dotlottie-wc
          src="https://lottie.host/b6b7cfd2-642c-4266-a6bd-a5f1f359f80e/xq1qKjfsLZ.lottie"
          style={{ width: "120px", height: "120px" }}
          speed="1"
          autoplay
          loop="false"
        ></dotlottie-wc>
      </div>
      <div ref={iconRef}>
        <span
          className="material-icons"
          style={{
            color: "green",
            fontSize: 100,
            opacity: 1,
            transition: "opacity 0.8s",
          }}
        >
          check_circle_rounded
        </span>
      </div>
      <div
        style={{
          opacity: showText ? 1 : 0,
          transition: "opacity 0.6s",
          marginTop: 24,
          fontSize: 24,
          fontWeight: "bold",
          color: "#222",
          textAlign: "center",
        }}
      >
        Appointment Confirmed!
      </div>
      <div
        style={{
          opacity: showText ? 1 : 0,
          transition: "opacity 0.8s",
          marginTop: 12,
          fontSize: 16,
          color: "#888",
          textAlign: "center",
        }}
      >
        Your appointment has been booked successfully.
        <br />
        Returning to home...
      </div>
    </div>
  );
};

export default BookingSuccessPage;
