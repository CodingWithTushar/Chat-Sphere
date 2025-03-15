import {
  UserCircleIcon,
  AtSymbolIcon,
  UserGroupIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuth();
  const [selectedImg, setselectedImg] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setselectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center font-semibold">
        <div className="flex flex-col shadow hover:shadow-2xl p-5 text-md font-semibold w-[400px]">
          <div className="flex flex-col items-center rounded-xl">
            <UserGroupIcon className="w-9 h-9" />
            <h1 className="text-2xl mt-2">Profile</h1>
            <p className="text-base-content/60 mt-2">
              {" "}
              Your Profile Information
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 mt-2">
            <div className="relative transition-all duration-200">
              <img
                src={selectedImg || authUser.profilePic || "./avatar.png"}
                alt="Profile"
                className="rounded-full object-cover border-4 w-36 p-0.5"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 hover:scale-100 transition-all duration-200 cursor-pointer rounded-full ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <CameraIcon className="w-9 h-9 bg-gray-400 rounded-full p-1 " />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm">
              {isUpdatingProfile
                ? "Updating..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <UserCircleIcon className="w-8 h-8" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2 mt-3">
              <AtSymbolIcon className="w-8 h-8" />
              Email Address
            </div>
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
            {authUser?.email}
          </p>
        </div>
        <div className="shadow hover:shadow-2xl mt-5 p-7 text-  xl w-[500px]">
          <h1 className="text-center">Account Information</h1>
          <div className="flex items-center justify-between">
            <div>Member Since</div>
            <div>{authUser.createdAt?.split("T")[0]}</div>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <div>Account Status</div>
            <div className="text-green-500">Active</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
