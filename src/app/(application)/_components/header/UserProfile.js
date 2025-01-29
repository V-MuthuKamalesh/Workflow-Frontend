"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile({ isProfileOpen, setIsProfileOpen }) {
  const [userDetails, setUserDetails] = useState({
    fullname: "User",
    email: "user@example.com",
    picture: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await workflowBackend.get("/users/getuserdetails", {
          params: { userId: Cookies.get("userId") },
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        });

        const { fullname, email, picture } = response.data;

        setUserDetails({
          fullname,
          email,
          picture: picture || "",
        });
      } catch (error) {
        console.log("Error fetching user details.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleSignOut = () => {
    Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));

    router.push("/auth/signin");
    setIsProfileOpen(false);
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
    setIsProfileOpen(false);
  };

  if (!isProfileOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setIsProfileOpen(false)}>
          ✖
        </button>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center shadow">{userDetails.picture ? <Image src={userDetails.picture.startsWith("http") ? userDetails.picture : `data:image/png;base64,${userDetails.picture}`} alt="User" className="w-full h-full object-cover" height={100} width={100} /> : <span className="text-4xl text-white font-bold">{userDetails.fullname.charAt(0).toUpperCase()}</span>}</div>

          <h2 className="text-xl font-semibold text-gray-800">{userDetails.fullname}</h2>
          <p className="text-gray-500">{userDetails.email}</p>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md" onClick={handleEditProfile}>
            Edit Profile
          </button>

          <button className="w-full border border-red-500 text-red-500 font-medium py-2 rounded-md hover:bg-red-50" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
