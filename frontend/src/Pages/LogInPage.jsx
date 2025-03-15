import React, { useState } from "react";
import { Input } from "../components/Input";
import {
  AtSymbolIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";
import { AuthImagePattern } from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
const LogInPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      <div className=" h-screen flex items-center justify-center font-semibold">
        <div className="flex rounded border-gray-300 shadow-xl hover:shadow-2xl">
          {/* Left-Side */}
          <div className="flex items-center justify-center font-semibold p-7 sm:p-12 lg:w-[600px] ">
            <div className="w-full max-w-md ">
              <div className="text-center mb-8">
                <div className="flex flex-col items-center rounded-xl">
                  <ChatBubbleLeftRightIcon className="w-9 h-9" />
                  <h1 className="text-2xl mt-2">Welcome Back!</h1>
                  <p className="text-base-content/60 mt-2">
                    {" "}
                    Connect, chat, and stay updated.
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col py-3 text-md "
              >
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
                  className="flex items-center justify-center w-full bg-linear-to-r to-blue-500 from-blue-700 hover:to-blue-600 text-white rounded-full text-2xl py-1 cursor-pointer"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <ArrowPathIcon className="animate-spin w-9 h-9 text-gray-400" />
                      Loading
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>

              <div className="flex justify-center gap-3 text-center">
                <p>Don't have an Account?</p>
                <Link
                  to={"/signup"}
                  className="text-center text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <AuthImagePattern
            title={"Join the Conversation 🌍"}
            subtitle={"Log in and start chatting in real-time."}
            img={
              "https://c8.alamy.com/comp/M51YWC/cartoon-people-group-in-the-crowd-M51YWC.jpg"
            }
          />
        </div>
      </div>
    </>
  );
};

export default LogInPage;
