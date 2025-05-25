import React, { useState } from "react";
import { MessageSquare, Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { isLoggedIn, login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email");
      return false;
    } else if (formData.password.length < 6) {
      toast.error("Password should be atleast 6 characters");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Submit logic
      const success = validateForm();
      if (success) {
        login(formData);
      }
    } catch (e) {
      toast.error("Something went wrong");
      console.log("Client side Issue from login ", e);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-950">
                <MessageSquare className="size-8 text-blue-800 dark:text-blue-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Login
              </h2>
            </div>
            <h5 className="text-sm md:text-base font-medium ">
              Access your account below
            </h5>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium "
            >
              Email
            </label>
            <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-700 focus-within:border-blue-600">
              <Mail className="size-5 text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full px-2 py-2 bg-transparent  focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium "
            >
              Password
            </label>
            <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-700 focus-within:border-blue-600">
              <KeyRound className="size-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full px-2 py-2 bg-transparent  focus:outline-none"
              />
              {showPassword ? (
                <EyeOff
                  className="size-5  cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="size-5  cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggedIn}
            className="w-full bg-blue-950  py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isLoggedIn ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-sm text-center sm:text-base mt-5 font-medium">
            Create an account{" "}
            <Link className="underline" to={"/signup"}>
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Info Panel */}
      <div className="hidden md:flex w-1/2 items-center justify-center   p-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold  mb-4">
            Welcome Back!
          </h3>
          <p className="text-lg ">
            Securely login to explore powerful features and manage your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
