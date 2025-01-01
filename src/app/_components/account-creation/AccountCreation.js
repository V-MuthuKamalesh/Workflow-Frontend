"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { useRouter } from "next/navigation";

export default function AccountCreation() {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  function handleChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await workflowBackend.post("/users/signup", {
        email: localStorage.getItem("email"),
        password: formData.password,
        fullname: formData.fullName,
      });

      console.log(response);
      localStorage.removeItem("email");
      router.push("/auth/signin");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }

    setFormData({
      fullName: "",
      password: "",
    });
  }

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 sm:p-8"
      >
        {errorMessage !== "" && (
          <span className="text-red-600 text-xs">{errorMessage}</span>
        )}
        <h1 className="text-2xl sm:text-3xl mb-4">Create your account</h1>

        <Input
          title="Full name"
          type="text"
          placeholder="Enter your full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <Input
          title="Password"
          type="password"
          placeholder="Enter at least 8 characters"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="mt-4">
          <Button buttonText="Create an account" />
        </div>
      </form>
    </div>
  );
}
