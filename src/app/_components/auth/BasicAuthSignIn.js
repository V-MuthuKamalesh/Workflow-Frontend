"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BasicAuthSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    // TODO: Backend Signin
    const response = { status: 200 };

    setFormData({ email: "", password: "" });

    if (response.status === 409) {
      setError(true);
      return;
    }

    router.push("/dashboard");
  }

  function handleFormDataChange(event) {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col items-center mt-8"
    >
      <p className="text-sm md:text-base text-left w-full">
        Your Email Address
      </p>
      <input
        className="w-full outline-none border border-gray-300 p-2 rounded-sm mt-1 mb-4 text-sm md:text-base"
        type="email"
        placeholder="name@company.com"
        name="email"
        value={formData.email}
        onChange={handleFormDataChange}
        required
      />

      <p className="text-sm md:text-base text-left w-full">Your Password</p>
      <input
        className="w-full outline-none border border-gray-300 p-2 rounded-sm mt-1 mb-4 text-sm md:text-base"
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleFormDataChange}
        required
      />

      {error && (
        <span className="text-red-600 text-xs">Invalid Credentials</span>
      )}

      <button className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-sm py-2 text-sm md:text-base">
        Log In
      </button>
    </form>
  );
}
