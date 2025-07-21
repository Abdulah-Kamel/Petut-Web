import React, { useState, useEffect } from "react";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, setUserProfile } from "../../firebase";

const ProfileForm = ({ currentUser }) => {
  const { authUser } = useAuth ? useAuth() : { authUser: null };
  const [fullName, setFullName] = useState(currentUser?.displayName || "");
  const [email] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState(""); // Not stored in Auth
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(""); // base64 string

  // Fetch user profile from Firestore on mount
  useEffect(() => {
    async function fetchProfile() {
      if (currentUser?.uid) {
        const profile = await getUserProfile(currentUser.uid);
        if (profile) {
          setPhone(profile.phone || "");
          setBirthdate(profile.birthdate || "");
          setProfileImage(profile.profileImage || "");
        }
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, [currentUser?.uid]);

  // Handle image upload and convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setLoading(true);
    try {
      if (currentUser) {
        // Save to Firestore
        await setUserProfile(currentUser.uid, {
          phone,
          birthdate,
          profileImage,
        });
        // Optionally update displayName in Auth
        await updateProfile(currentUser, {
          displayName: fullName,
        });
        setProfileMsg("Profile updated successfully!");
      }
    } catch (err) {
      setProfileMsg(err.message || "Failed to update profile.");
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    setPasswordMsg("");
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordMsg("Passwords do not match.");
      return;
    }
    if (!currentPassword) {
      setPasswordMsg("Please enter your current password.");
      return;
    }
    setLoading(true);
    try {
      // Re-authenticate
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Now update password
      await updatePassword(currentUser, newPassword);
      setPasswordMsg("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMsg(err.message || "Failed to update password.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <form className="space-y-6" onSubmit={handleProfileSave}>
        {/* Image upload */}
        <div className="flex max-lg:flex-col items-center space-x-4 mb-4">
          <div className="max-lg:mb-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="flex max-lg:flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="max-lg:w-full py-3 px-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:bg-gray-50 hover:ring-1 hover:ring-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=""
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder=""
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        {profileMsg && (
          <div className="text-green-600 font-medium">{profileMsg}</div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="max-md:w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex md:block justify-end w-full mt-4 md:mt-0">
              <button
                type="button"
                className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                onClick={handleChangePassword}
                disabled={loading}
              >
                Change
              </button>
            </div>
          </div>
          {passwordMsg && (
            <div className="text-green-600 font-medium mt-2">{passwordMsg}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
