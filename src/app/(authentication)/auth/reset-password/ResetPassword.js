"use client";

import Button from "@/app/(application)/_components/UI/Button";
import Input from "@/app/(application)/_components/UI/Input";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { useState } from "react";

export default function ResetPasswordForm({ token }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await workflowBackend.post("/users/resetpassword", {
        token,
        newPassword,
      });

      if (response.status !== 200) {
        setError("Failed to reset password. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setError(null);
      setLoading(false);
      window.close();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 mt-7">
      <Input title="New Password" type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border border-gray-300 outline-none rounded" required />
      <Input title="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border border-gray-300 outline-none rounded" required />

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">Password reset successfully!</p>}
      <Button buttonText={loading ? "Resetting..." : "Reset Password"} disabled={loading} />
    </form>
  );
}
