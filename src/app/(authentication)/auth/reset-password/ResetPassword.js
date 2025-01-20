"use client";

import Button from "@/app/_components/UI/Button";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { useState } from "react";

export default function ResetPasswordForm({ token }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await workflowBackend.post("/users/resetpassword", {
        token,
        newPassword,
      });

      if (response.status !== 200) {
        setError("Failed to reset password. Please try again.");
        return;
      }

      setSuccess(true);
      setError(null);
      window.close();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && (
        <p className="text-sm text-green-500">Password reset successfully!</p>
      )}
      <Button buttonText="Send Reset Link" />
    </form>
  );
}
