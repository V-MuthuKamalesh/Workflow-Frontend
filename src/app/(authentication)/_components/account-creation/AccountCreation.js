"use client";

import { useState } from "react";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { useRouter } from "next/navigation";
import Input from "@/app/(application)/_components/UI/Input";
import Button from "@/app/(application)/_components/UI/Button";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";

export function generateMetadata() {
  return {
    title: "WorkFlow | Account Creation",
    description: "Create a new WorkFlow account",
  };
}

export default function AccountCreation() {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const signupEmail = Cookies.get("signupEmail");

  function handleChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.fullName === "") {
      setErrorMessage("Full name is required.");
      return;
    }

    if (formData.password === "") {
      setErrorMessage("Password is required.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      await workflowBackend.post("/users/signup", {
        email: signupEmail,
        password: formData.password,
        fullname: formData.fullName,
      });

      Cookies.remove("signupEmail");
      router.push("/auth/signin");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-6 md:px-12 bg-white">
        <div className="w-full max-w-lg flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-light text-center mb-6">
            Create your account
          </h1>

          {errorMessage && (
            <div className="mb-4 w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <span className="block font-medium">Error</span>
              <p className="text-sm mt-1">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <Input
              title="Email"
              type="email"
              value={signupEmail}
              readOnly
              required
              cssClasses="bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <Input
              title="Full Name"
              type="text"
              placeholder="Enter your full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="off"
            />
            <Input
              title="Password"
              type="password"
              placeholder="Enter at least 8 characters"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="mt-4">
              <Button buttonText="Create an account" />
            </div>
          </form>

          <p className="mt-4 text-xs md:text-sm text-center">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block w-[40%] relative">
        <Image
          src="/accountCreation.avif"
          alt="Account Creation"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
