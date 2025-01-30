import Image from "next/image";
import ResetPassword from "./ResetPassword";
import Link from "next/link";

export function generateMetadata() {
  return {
    title: "WorkFlow | Reset Password",
    description: "Reset your WorkFlow account password",
  };
}

export default async function ResetPasswordPage({ searchParams }) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-6 md:px-12 bg-white">
        <div className="w-full max-w-lg flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-light text-center">Reset Your Password</h1>
          <ResetPassword token={token} />

          <p className="mt-4 text-xs md:text-sm text-center">
            Remembered your password?{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block w-[40%] relative">
        <Image src="/resetPassword.avif" alt="Reset Password" fill className="object-cover" />
      </div>
    </div>
  );
}
