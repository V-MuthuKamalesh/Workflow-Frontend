import { cookies } from "next/headers";
import { workflowBackend } from "../_utils/api/axiosConfig";
import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";

export default async function ApplicationLayout({ children }) {
  const cookieStore = await cookies();

  const response = await workflowBackend.get("/users/getuserdetails", {
    params: {
      userId: cookieStore.get("userId").value,
    },
    headers: {
      Authorization: `Bearer ${cookieStore.get("authToken").value}`,
    },
  });

  const userDetails = response.data;

  return (
    <>
      <Header userDetails={userDetails} />
      {children}
      <Footer />
    </>
  );
}
