import ResetPassword from "./ResetPassword";

export default async function ResetPasswordPage({ searchParams }) {
  const { token } = searchParams;

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
        <ResetPassword token={token} />
      </div>
    </section>
  );
}
