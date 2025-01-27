"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile({ isProfileOpen, setIsProfileOpen }) {
  const [userDetails, setUserDetails] = useState({
    fullname: "User",
    email: "user@example.com",
    picture: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await workflowBackend.get("/users/getuserdetails", {
          params: {
            userId: Cookies.get("userId"),
          },
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        });

        const { fullname, email, picture } = response.data;

        setUserDetails({
          fullname,
          email,
          picture: picture || "",
        });
      } catch (error) {
        console.log("Error fetching user details.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleSignOut = () => {
    const cookies = Cookies.get();

    for (const cookie of Object.keys(cookies)) {
      Cookies.remove(cookie);
    }

    router.push("/auth/signin");
    setIsProfileOpen(false);
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
    setIsProfileOpen(false);
  };

  return (
    <Modal open={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg p-8"
        sx={{
          bgcolor: "background.paper",
          width: "min(95%, 400px)",
          boxShadow: 24,
          borderRadius: "12px",
          outline: "none",
        }}
      >
        <div className="flex flex-col items-center space-y-6">
          <Avatar
            src={
              userDetails.picture.startsWith("http")
                ? userDetails.picture
                : userDetails.picture
                ? `data:image/png;base64,${userDetails.picture}`
                : ""
            }
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#3f51b5",
              fontSize: "2.5rem",
              cursor: !userDetails.picture ? "pointer" : "default",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            {userDetails.fullname.charAt(0).toUpperCase()}
          </Avatar>
          <div className="text-center">
            <Typography
              variant="h5"
              className="font-semibold"
              sx={{ color: "text.primary" }}
            >
              {userDetails.fullname}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontSize: "0.9rem" }}
            >
              {userDetails.email}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              padding: "10px 0",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              padding: "10px 0",
              borderColor: "#f44336",
              color: "#f44336",
              "&:hover": {
                borderColor: "#d32f2f",
                backgroundColor: "#ffebee",
              },
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
