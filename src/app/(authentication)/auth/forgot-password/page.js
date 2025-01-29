import Image from "next/image";
import ForgotPassword from "./ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-6 md:px-12 bg-white">
        <div className="w-full max-w-lg flex flex-col items-center justify-center">
          <h2 className="text-3xl font-light text-center mb-4">Forgot Your Password?</h2>
          <ForgotPassword />
        </div>
      </div>
      <div className="hidden md:block w-[40%] relative">
        <Image src="/forgotPassword.avif" alt="forgot password" fill className="object-cover" />
      </div>
    </div>
  );
}
