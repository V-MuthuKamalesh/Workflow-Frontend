"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Cookies from "js-cookie";

export default function JoinUser({ token }) {
  const handleJoinUser = async () => {
    if (!token) return;

    try {
      await workflowBackend.post(
        "/users/addMember",
        { token },
        {
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        }
      );

      window.close();
    } catch (error) {
      console.error("Failed to join workspace:", error);
    }
  };

  return (
    <button className="bg-green-500 hover:bg-green-600 text-white text-xl px-4 py-2 mt-6 rounded-md" onClick={handleJoinUser} disabled={!token}>
      Join
    </button>
  );
}
