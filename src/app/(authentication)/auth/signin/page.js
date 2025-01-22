import Link from "next/link";
import BasicAuthSignIn from "../../_components/auth/BasicAuthSignIn";
import SeparatorLine from "@/app/(application)/_components/UI/SeparatorLine";
import GoogleAuthButton from "../../_components/auth/GoogleAuthButton";

export function generateMetadata() {
  return {
    title: "WorkFlow | Signin",
    description: "WorkFlow Signin Page",
  };
}

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg flex flex-col items-center justify-center md:p-8">
        <h1 className="text-3xl md:text-4xl font-light text-center">
          Log in to your account
        </h1>
        <BasicAuthSignIn />

        <div className="w-96 flex justify-start mt-5">
          <Link
            className="text-blue-800 mt-1 underline underline-offset-2"
            href={"/auth/forgot-password"}
          >
            Forgot Password?
          </Link>
        </div>

        <SeparatorLine text="Or Sign in with" />
        <GoogleAuthButton
          text="Google"
          type="login"
          className="w-full md:w-1/4 border border-gray-200 rounded-sm py-2 hover:bg-gray-100 flex items-center justify-center space-x-2"
        />
      </div>

      <p className="mt-4 text-xs md:text-sm text-center">
        Don&apos;t have an account yet?{" "}
        <Link href="/auth/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
