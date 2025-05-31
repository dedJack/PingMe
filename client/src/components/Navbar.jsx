import React, { useState } from "react";
import { Settings, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [profileModel, setProfileModel] = useState(false);

  return (
    <div>
      <nav className="bg-blue-950 shadow px-6 py-4 my-5 mx-3 rounded-full bg-neutral outline-none gap-3 flex items-center justify-between">
        {/* Left Side: App Name */}
        {/* Full name for md and up */}
        <div className="text-2xl font-bold font-serif hidden sm:block text-white ml-0 sm:ml-0 md:ml-8 lg:ml-16">
          <Link to={"/"}>PingMe</Link>
        </div>

        {/* Only "P" for small screens */}
        <div className="text-2xl font-bold font-serif sm:hidden text-white ml-0">
          <Link to={"/"}>P</Link>
        </div>

        {/* Right Side: App features */}
        <div className="flex items-center space-x-6 ">
          <button
            className="flex items-center gap-2 text-white hover:text-gray-300 font-medium"
            onClick={() => setProfileModel(true)}
          >
            {/* <User className="w-5 h-5" /> */}
            <img
              className="rounded-full  w-[30px] h-[30px]"
              src={authUser.profilePic || "./avatar.jpg"}
            />
            Profile
          </button>
          {profileModel && (
            <ProfilePage
              isOpen={profileModel}
              onClose={() => setProfileModel(false)}
            />
          )}
          <button
            className="flex items-center gap-2 text-white hover:text-gray-300 font-medium"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
