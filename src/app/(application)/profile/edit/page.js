"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Avatar,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";

export default function ProfileEditPage() {
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    email: "",
    picture: "",
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await workflowBackend.get("/users/getuserdetails", {
          params: { userId: Cookies.get("userId") },
        });

        const { fullname, email, picture } = response.data;

        setUserDetails({ fullname, email, picture: picture || "" });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setUserDetails((prev) => ({ ...prev, picture: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);

      await workflowBackend.put("/users/updateUser", {
        userId: Cookies.get("userId"),
        userData: {
          fullname: userDetails.fullname,
          imgUrl: userDetails.picture,
        },
      });

      Cookies.set("fullName", userDetails.fullname);

      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen p-6 flex flex-col justify-center items-center bg-gray-100">
      <Typography
        variant="h4"
        className="text-gray-900 font-bold mb-6"
        gutterBottom
      >
        Edit Profile
      </Typography>
      <Box className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center">
          <Avatar
            src={
              userDetails.picture.startsWith("http")
                ? userDetails.picture
                : userDetails.picture
                ? `data:image/png;base64,${userDetails.picture}`
                : ""
            }
            sx={{ width: 100, height: 100, cursor: "pointer" }}
            onClick={handleAvatarClick}
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
          {loading && <CircularProgress size={24} className="mt-2" />}
        </div>

        <TextField
          fullWidth
          label="Full Name"
          name="fullname"
          value={userDetails.fullname}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={userDetails.email}
          disabled
        />

        <div className="flex justify-end space-x-4">
          <Button
            variant="outlined"
            onClick={() => router.push("/work-management/dashboard")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Box>
    </Box>
  );
}
