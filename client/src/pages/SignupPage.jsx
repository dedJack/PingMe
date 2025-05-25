import React, { useState } from "react";
import {
  MessageSquare,
  User,
  Mail,
  KeyRound,
  Eye,
  EyeClosed,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast  from "react-hot-toast";

const SignupPage = () => {
  const {signUp, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  //changing form value.
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const success = validateForm();
      if(success){
        signUp(formData);
      }
    } catch (e) {
      toast.error("Something went wrong")
      console.log("Client side Issue from singup ", e);
    }
  };

  const validateForm = ()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!formData.fullName.trim()){
      toast.error("Username is required")
      return false;
    }else if(!formData.email.trim()){
      toast.error("Email is required")
      return false;
    }else if(!emailRegex.test(formData.email)){
      toast.error("Invalid email")
      return false;
    }else if(formData.password.length<6){
      toast.error("Password should be atleast 6 characters")
      return false;
    }else{
      return true;
    }
  }


  return (
    <div>
      <div className="min-h-screen flex">
        {/* Left side: Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="text-center">
              {/* Icon + Main Heading */}
              <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                <div className="p-2 rounded-md bg-blue-950">
                  <MessageSquare className="size-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-3xl md:text-4xl font-semibold text-">
                  Create Account
                </h2>
              </div>

              {/* Subheading */}
              <h5 className="text-sm sm:text-base mb-10 font-medium ">
                Get started with your free account
              </h5>
            </div>

            <label
              htmlFor="fullName"
              className="block mb-2 font-medium "
            >
              Name
            </label>
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-950 mb-6">
              <User className="size-5   mr-2" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.name}
                onChange={onChange}
                placeholder="Your full name"
                className="w-full px-2 py-2 bg-transparent focus:outline-none"
              />
            </div>

            <label
              htmlFor="email"
              className="block mb-2 font-medium "
            >
              Email
            </label>
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-950 mb-6">
              <Mail className="size-5   mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full px-2 py-2 bg-transparent focus:outline-none"
              />
            </div>

            <label
              htmlFor="email"
              className="block text-sm font-medium  mb-1"
            >
              Password
            </label>
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-950 mb-6">
              <KeyRound className="size-5   mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder=". . . . . . . . "
                className="w-full px-2 py-2 bg-transparent focus:outline-none"
              />
              {showPassword ? (
                <EyeClosed
                  className="size-5   mr-4"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="size-5   mr-4"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-blue-950 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {isSigningUp ? (
                <>
                  <span className="loading loading-ring loading-xl"></span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <p className="text-sm text-center sm:text-base mt-5 font-medium ">
              Already have an account ?{" "}
              <Link className="underline" to={"/login"}>
                login
              </Link>
            </p>
          </form>
        </div>

        {/* Right side: Content */}
        <div className="w-1/2 flex items-center justify-center p-8  dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
          <div className="w-full max-w-md text-center">
            <h3 className="text-4xl font-extrabold text-blue-950 dark:text-gray-600 mb-8">
              Welcome!
            </h3>

            <ul className="timeline timeline-vertical text-left">
              <li>
                <div className="timeline-start bg-white dark:bg-gray-800 text-sm sm:text-sm text-gray-800 dark:text-gray-600 font-medium p-4 rounded shadow-md">
                  Hey! How have you been?
                </div>
                <hr className=" border-blue-900" />
              </li>
              <li>
                <hr className=" border-blue-900" />
                <div className="timeline-end bg-white dark:bg-gray-800 text-sm sm:text-sm text-gray-800 dark:text-gray-600 font-medium p-4 rounded shadow-md">
                  I’m good, thanks! Just been busy with work lately. You?
                </div>
                <hr className=" border-blue-900" />
              </li>
              <li>
                <hr className=" border-blue-900" />
                <div className="timeline-start bg-white dark:bg-gray-800 text-sm sm:text-sm text-gray-800 dark:text-gray-600 font-medium p-4 rounded shadow-md">
                   Want to grab coffee this weekend?
                </div>
                <hr className=" border-blue-900" />
              </li>
              <li>
                <hr className=" border-blue-900" />
                <div className="timeline-end bg-white dark:bg-gray-800 text-sm sm:text-sm text-gray-800 dark:text-gray-600 font-medium p-4 rounded shadow-md">
                  Sure! Saturday or Sunday?
                </div>
                <hr className=" border-blue-900" />
              </li>
              <li>
                <hr className=" border-blue-900" />
                <div className="timeline-start bg-white dark:bg-gray-800 text-sm sm:text-sm text-gray-800 dark:text-gray-600 font-medium p-4 rounded shadow-md">
                  Sure! Saturday or Sunday?
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
