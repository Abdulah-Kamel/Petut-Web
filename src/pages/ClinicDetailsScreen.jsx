import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorHeader from "../components/clinics/DoctorHeader";
import ClinicInfoRows from "../components/clinics/ClinicInfoRows";
import AvailableDays from "../components/clinics/AvailableDays";
import AvailableTimes from "../components/clinics/AvailableTimes";
import Reviews from "../components/clinics/Reviews";
import ActionButtons from "../components/clinics/ActionButtons";

const ClinicDetailsScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const clinic = state?.clinic;

  if (!clinic) {
    return (
      <div className="p-8 text-center text-neutral">No clinic data found.</div>
    );
  }

  const rating = clinic.rating || 0;
  const availableDays = clinic.availableDays || [
    "Today",
    "Tomorrow",
    "Wednesday",
    "Thursday",
  ];
  const availableTimes = clinic.availableTimes || [
    "2:00 PM",
    "3:30 PM",
    "5:00 PM",
    "6:30 PM",
  ];
  const reviews = clinic.reviews || [
    {
      name: "Ahmed M.",
      text: "Very professional doctor, listened carefully and explained everything.",
    },
    {
      name: "Sara A.",
      text: "The clinic was clean and the staff was helpful.",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-light pb-8 font-sans">
      <div className="max-w-xl mx-auto px-4 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-secondary hover:text-primary"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-primary">
            {clinic.clinicName || clinic.doctorName}
          </h1>
        </div>
   
        <DoctorHeader clinic={clinic} />
 
        <ClinicInfoRows clinic={clinic} />
 
        <AvailableDays availableDays={availableDays} />

        <AvailableTimes availableTimes={availableTimes} />
 
        <Reviews reviews={reviews} />
    
        <ActionButtons clinic={clinic} />
      </div>
    </div>
  );
};

export default ClinicDetailsScreen;
