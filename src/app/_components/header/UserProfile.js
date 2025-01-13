"use client";

import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UserProfile({ isProfileOpen, setIsProfileOpen }) {
  const router = useRouter();

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
          <Avatar
            alt="User Avatar"
            src="/avatar.jpg"
            sx={{ width: 64, height: 64 }}
          />
          <Typography variant="h6" className="text-gray-800">
            John Doe
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 text-center px-4"
          >
            johndoe@example.com
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
