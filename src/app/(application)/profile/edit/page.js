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
    <div className="flex min-h-screen">
      <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-6 md:px-12 bg-white">
        <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-xl space-y-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-purple-500">Edit Profile</h1>
          <p className="text-center text-gray-300">Update your personal details and profile picture.</p>

          <div className="flex flex-col items-center space-y-4">
            {loading ? (
              <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse" />
            ) : (
              <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-300" onClick={handleAvatarClick}>
                {userDetails.picture ? <Image src={`data:image/png;base64,${userDetails.picture}`} alt="Profile" height={100} width={100} className="w-full h-full object-cover" /> : <span className="text-gray-600 text-xl font-semibold">{userDetails.fullname.charAt(0).toUpperCase()}</span>}
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-xs text-center py-1">Change</div>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-300 font-semibold">Full Name</label>
              <input type="text" name="fullname" value={userDetails.fullname} onChange={handleInputChange} className="w-full p-3 outline-none rounded-md " placeholder="Enter your full name" />
            </div>
            <div>
              <label className="text-gray-300 font-semibold">Email</label>
              <input title="Not editable" type="email" name="email" value={userDetails.email} disabled className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition" onClick={() => router.back()}>
              Cancel
            </button>
            <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition disabled:bg-gray-400" onClick={handleSaveChanges} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[40%] relative">
        <Image src="/editProfile.avif" alt="Welcome" fill className="object-cover" />
      </div>
    </div>
  );
}
