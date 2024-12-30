import BasicAuthSignIn from "@/app/_components/auth/BasicAuthSignIn";
import Google from "@/app/_components/svg/Google";
import Link from "next/link";

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

        <div className="flex items-center my-6 w-full">
          <hr className="flex-grow border-gray-300" />
          <p className="px-2 text-gray-600 text-xs md:text-sm">
            Or Sign in with
          </p>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full md:w-1/4 border border-gray-200 rounded-sm py-2 hover:bg-gray-100 flex items-center justify-center space-x-2">
          <Google />
          <span className="text-sm md:text-base">Google</span>
        </button>
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
