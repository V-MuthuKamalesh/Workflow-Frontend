"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Image from "next/image";

export default function ProfileEditPage() {
  const [userDetails, setUserDetails] = useState({ fullname: "", email: "", picture: "" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await workflowBackend.get("/users/getuserdetails", {
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
          params: { userId: Cookies.get("userId") },
        });

        const { fullname, email, picture } = response.data;
        setUserDetails({ fullname, email, picture: picture || "" });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setUserDetails((prev) => ({ ...prev, picture: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await workflowBackend.put(
        "/users/updateUser",
        {
          userId: Cookies.get("userId"),
          userData: { fullname: userDetails.fullname, imgUrl: userDetails.picture },
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        }
      );
      Cookies.set("fullName", userDetails.fullname);
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden" onClick={handleAvatarClick}>
            {userDetails.picture ? <Image src={`data:image/png;base64,${userDetails.picture}`} alt="Profile" height={100} width={100} className="w-full h-full object-cover" /> : <span className="text-gray-600 text-xl">{userDetails.fullname.charAt(0).toUpperCase()}</span>}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          {loading && <span className="text-sm text-gray-500 mt-2">Uploading...</span>}
        </div>

        <input type="text" name="fullname" value={userDetails.fullname} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" placeholder="Full Name" />
        <input type="email" name="email" value={userDetails.email} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />

        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-200" onClick={() => router.back()}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400" onClick={handleSaveChanges} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
