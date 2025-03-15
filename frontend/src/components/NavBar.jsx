import React from "react";
import { useAuth } from "../hooks/useAuth";
import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowLeftStartOnRectangleIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { logout} = useAuth();

  return (
    <header className="border-b border-base-300 fixed w-full top-0 h-16 backdrop-blur-lg bg-base-100/80 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-full">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold text-base-content hidden md:inline-block">
            ChatSphere
          </span>
        </Link>

       
        <div className="flex items-center gap-6">
          
          <Link
            to="/setting"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 transition-all duration-200"
          >
            <CogIcon className="w-6 h-6 text-base-content" />
            <span className="hidden sm:inline font-medium text-base-content">
              Settings
            </span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 transition-all duration-200"
          >
            <UserCircleIcon className="w-6 h-6 text-base-content" />
            <span className="hidden sm:inline font-medium text-base-content">
              Profile
            </span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-error/10 text-error transition-all duration-200 cursor-pointer"
          >
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
