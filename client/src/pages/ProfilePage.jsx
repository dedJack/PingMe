import { useRef, useState } from "react";
import { Camera, X, User, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  //updating Profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0]; //takes 1st file if selected multiple
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  //convert object date to string
  const date = authUser.createdAt;
  const newdate = new Date(date);
  const formatted = newdate.toLocaleString("en-US", {
    dateStyle: "medium",
  });

  //show files when camera clicks
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-600 shadow-lg z-50 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>
        {/* Content */}
        <div className="p-6">
          <h2 className="text-center font-bold mb-4">
            Your Profile information
          </h2>
          <div className="flex items-center justify-center mb-6">
            {/* Profile Image + Camera */}
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={selectedImage ||authUser.profilePic || "/avatar.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleCameraClick}
                className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-md"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-center mb-5 ">
            {isUpdatingProfile
              ? "Updating..."
              : "Tap camera to update profile."}
          </div>

          <div className="space-y-8 md:space-y-10">
            {/* Username and Email */}
            <div>
              <label className="flex items-center text-gray-100 font-medium">
                <User className="size-4 text-gray-200 mr-2" />
                Username
              </label>
              <div className="py-2 px-3 border-b-2 mb-4 text-gray-300">
                {authUser.fullName}
              </div>

              <label className="flex items-center text-gray-100 font-medium">
                <Mail className="size-4 text-gray-200 mr-2" />
                Email-address
              </label>
              <div className="py-2 px-3 border-b-2 mb-4 text-gray-300">
                {authUser.email}
              </div>
            </div>

            {/* Member since and Status */}
            <div className="flex justify-between text-gray-200">
              <div className="py-4">
                <p className="py-1">Member since</p>
                <p className="py-1">Status</p>
              </div>
              <p className="border-b-2"></p>
              <div className="py-4">
                <p className="text-sm py-1">{formatted}</p>
                <p className="text-sm py-1 text-green-500 font-bold">
                  {authUser ? "Active" : "not active"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
