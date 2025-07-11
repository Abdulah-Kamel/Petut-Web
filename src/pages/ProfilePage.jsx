import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileForm from "../components/profile/ProfileForm";
import OrdersTab from "../components/profile/OrdersTab";
import AddressesTab from "../components/profile/AddressesTab";
import FavoritesTab from "../components/profile/FavoritesTab";
import SettingsTab from "../components/profile/SettingsTab";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await signOut(auth);
        navigate("/");
      } catch (error) {
        console.error("Failed to log out", error);
      }
    }
  };

  // Mock data - in a real app, this would come from an API
  const orders = [
    {
      id: "PET-123456",
      date: "2023-05-15",
      status: "Delivered",
      total: 433.18,
      items: [
        { name: "Brit Care", quantity: 2, price: 159.0 },
        { name: "Vitamax", quantity: 1, price: 115.18 },
      ],
    },
    {
      id: "PET-789012",
      date: "2023-04-02",
      status: "Delivered",
      total: 212.48,
      items: [
        { name: "Trixie", quantity: 1, price: 94.48 },
        { name: "Tetra", quantity: 2, price: 59.0 },
      ],
    },
  ];

  const addresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Main Street",
      city: "New York",
      postalCode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Office Avenue",
      city: "New York",
      postalCode: "10002",
      isDefault: false,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm currentUser={currentUser} />;
      case "orders":
        return <OrdersTab orders={orders} />;
      case "addresses":
        return <AddressesTab addresses={addresses} />;
      case "favorites":
        return <FavoritesTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <ProfileForm currentUser={currentUser} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-12">
      <div className="flex flex-col md:flex-row gap-8">
        <ProfileSidebar
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />

        <div className="md:w-3/4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
