"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserProfile({ isProfileOpen, setIsProfileOpen }) {
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    email: "",
    picture: "",
  });
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await workflowBackend.get("/users/getuserdetails", {
          params: {
            userId: Cookies.get("userId"),
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

  const handleAvatarClick = () => {
    if (!userDetails.picture) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", Cookies.get("userId"));

      try {
        const response = await workflowBackend.post(
          "/users/uploadPicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUserDetails((prev) => ({
          ...prev,
          picture: response.data.picture,
        }));
      } catch (error) {
        console.error("Error uploading picture:", error);
      }
    }
  };

  return (
    <Modal open={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-96"
        sx={{ outline: "none" }}
      >
        <div className="flex flex-col items-center space-y-6">
          <Avatar
            src={userDetails.picture}
            onClick={handleAvatarClick}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#3f51b5",
              fontSize: "2rem",
              cursor: !userDetails.picture ? "pointer" : "default",
            }}
          >
            {userDetails.fullname.charAt(0).toUpperCase()}
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="text-center">
            <Typography variant="h5" className="text-gray-900 font-semibold">
              {userDetails.fullname}
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {userDetails.email}
            </Typography>
          </div>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
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
