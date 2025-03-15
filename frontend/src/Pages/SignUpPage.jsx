import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import {
  AtSymbolIcon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthImagePattern } from "../components/AuthImagePattern";
import { Input } from "../components/Input";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigingUp } = useAuth();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Full Name is  Required")
    }
    if (!formData.email.trim()) {
      return toast.error("Email is Required")
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("InValid Email Format")
    }
    if (!formData.password.trim()) {
      return toast.error("Password is Required")
    }
    if (formData.fullName.length < 6) {
      return toast.error("Password must have more then 6 characters ")
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success  = validateForm()

    if (!success) {
      console.error
      console.log("Error in Handle Submit")
    }
    if (success === true) {
        signup(formData)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center font-semibold ">
      <div className="flex rounded border-gray-300 shadow-xl hover:shadow-2xl">
      {/* Left-Side */}
      <div className="flex items-center justify-center font-semibold p-7 sm:p-12 lg:w-[600px] ">
        <div className="w-full max-w-md ">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center rounded-xl">
              <ChatBubbleLeftRightIcon className="w-9 h-9" />
              <h1 className="text-2xl mt-2">Create Account</h1>
              <p className="text-base-content/60 mt-2">Get Started</p> 
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col py-3 text-md ">
            <Input
              label={"Full Name"}
              Icons={<UserCircleIcon className="w-9 h-9 text-gray-400" />}
              type={"text"}
              placeholder={"John Wick"}
              value={formData.fullName}
              OnChange={(e) =>
                setformData({ ...formData, fullName: e.target.value })
              }
            />

            <Input
              label={"Email"}
              Icons={<AtSymbolIcon className="w-9 h-9 text-gray-400" />}
              type={"email"}
              placeholder={"username01@gmail.com"}
              value={formData.email}
              OnChange={(e) =>
                setformData({ ...formData, email: e.target.value })
              }
            />
            <label className="my-2">Password</label>
            <div className="flex p-1 items-center justify-end rounded gap-3 mb-5 border border-gray-300 hover:ring-2 hover:ring-blue-400">
              <LockClosedIcon className="w-9 h-9 text-gray-400" />
              <input
                required
                type={showPassword ? "password" : "text"}
                placeholder="Enter Your Password"
                className="pr-10 pl-3 py-2 font-semibold w-full outline-none "
                value={formData.password}
                onChange={(e) =>
                  setformData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="flex justify-center items-center cursor-pointer absolute pr-2"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-linear-to-r to-blue-500 from-blue-700 text-white rounded-full text-2xl py-1 cursor-pointer  hover:to-blue-600"
              disabled={isSigingUp}
            >
              {isSigingUp ? (
                <> 
                  <ArrowPathIcon className="animate-spin w-9 h-9 text-gray-400" />
                  Loading
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="flex justify-center gap-3 text-center">
            <p>Already have an account?</p>
            <Link
              to={"/login"}
              className="text-center text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <AuthImagePattern title={"Join Our Community"} subtitle={"Your space for real-time interactions."} img={"https://imgs.search.brave.com/73Qu7ofHavkqvNHbMo5k433n6B4V9XyFINdOGZG_DK8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by8z/ZC1wb3J0cmFpdC1o/YXBweS1mcmllbmRz/XzIzLTIxNTA3OTM5/MDcuanBnP3NlbXQ9/YWlzX2h5YnJpZA"} />
      </div>
    </div>
  );
};

export default SignUpPage;
