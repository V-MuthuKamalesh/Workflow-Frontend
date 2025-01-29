"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Image from "next/image";

export default function ProfileEditPage() {
  const [userDetails, setUserDetails] = useState({ fullname: "", email: "", picture: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const fetchUserDetails = useCallback(async () => {
    try {
      const { data } = await workflowBackend.get("/users/getuserdetails", {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        params: { userId: Cookies.get("userId") },
      });
      setUserDetails({ fullname: data.fullname, email: data.email, picture: data.picture || "" });
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const handleInputChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails((prev) => ({ ...prev, picture: reader.result.split(",")[1] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      await workflowBackend.put("/users/updateUser", { userId: Cookies.get("userId"), userData: { fullname: userDetails.fullname, imgUrl: userDetails.picture } }, { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } });
      Cookies.set("fullName", userDetails.fullname);
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden" onClick={handleAvatarClick}>
              {userDetails.picture ? <Image src={`data:image/png;base64,${userDetails.picture}`} alt="Profile" height={100} width={100} className="w-full h-full object-cover" /> : <span className="text-gray-600 text-xl">{userDetails.fullname.charAt(0).toUpperCase()}</span>}
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>

        {loading ? <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse" /> : <input type="text" name="fullname" value={userDetails.fullname} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" placeholder="Full Name" />}

        {loading ? <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse" /> : <input type="email" name="email" value={userDetails.email} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />}

        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-200" onClick={() => router.back()}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400" onClick={handleSaveChanges} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
