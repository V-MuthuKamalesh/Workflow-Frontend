"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile({ isProfileOpen, setIsProfileOpen }) {
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    email: "",
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
        });

        console.log(response.data);
        setUserDetails(response.data);
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

  return (
    <Modal open={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-80"
        sx={{ outline: "none" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <Avatar sx={{ width: 64, height: 64 }}>
            {userDetails.email.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" className="text-gray-800">
            {userDetails.fullname}
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 text-center px-4"
          >
            {userDetails.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => alert("View Profile clicked")}
          >
            View Profile
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
