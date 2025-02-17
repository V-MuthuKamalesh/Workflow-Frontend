import { cookies } from "next/headers";
import { workflowBackend } from "../_utils/api/axiosConfig";
import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";

export default async function ApplicationLayout({ children }) {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;
  const authToken = cookieStore.get("authToken")?.value;

  let userDetails;

  try {
    const response = await workflowBackend.get("/users/tokenexpired", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200 && userId && authToken) {
      const response = await workflowBackend.get("/users/getuserdetails", {
        params: {
          userId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      userDetails = response.data;
    }
  } catch (err) {
    console.error("Error fetching user details:", err);
  }

  return (
    <>
      <Header userDetails={userDetails} />
      {children}
      <Footer />
    </>
  );
}
