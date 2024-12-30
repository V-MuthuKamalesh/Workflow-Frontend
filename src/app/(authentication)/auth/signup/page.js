import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col items-center justify-center md:w-2/3 lg:w-1/3">
        <h1 className="text-3xl md:text-4xl font-medium mb-3 text-center">
          Welcome to WorkFlow
        </h1>
        <p className="text-base md:text-lg mb-8 text-center">
          Get started - it&apos;s free. No Credit card needed.
        </p>

        <button className="w-full border border-gray-200 rounded-sm py-2 hover:bg-gray-100">
          Continue with Google
        </button>

        <div className="flex items-center my-4 w-full">
          <hr className="flex-grow border-gray-300" />
          <p className="px-2 text-sm md:text-base">Or</p>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form className="flex flex-col items-center justify-center space-y-4 w-full">
          <input
            className="w-full outline-none border border-gray-200 p-2 rounded-sm"
            type="email"
            placeholder="name@company.com"
          />
          <button className="w-full text-white bg-blue-600 hover:bg-blue-700 border border-gray-200 rounded-sm py-2">
            Continue
          </button>
        </form>

        <p className="mt-10 text-sm text-center">
          By proceeding, you agree to the{" "}
          <Link href={"/terms-of-service"} className="text-blue-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={"/privacy-policy"} className="text-blue-600">
            Privacy Policy
          </Link>
        </p>

        <p className="mt-2 text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
