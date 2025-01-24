import { cookies } from "next/headers";
import AccountCreation from "../../_components/account-creation/AccountCreation";
import { redirect } from "next/navigation";

export default async function AccountCreationPage() {
  const cookieStore = await cookies();

  const signupEmail = cookieStore.get("signupEmail");

  if (!signupEmail) {
    redirect("/auth/signup");
  }

  return <AccountCreation />;
}
