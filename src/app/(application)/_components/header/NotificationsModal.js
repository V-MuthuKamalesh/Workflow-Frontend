"use client";

import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { useEffect } from "react";
import { Trash2, X } from "lucide-react";

export default function NotificationsModal({ isOpen, setIsOpen, setUnreadCount, notifications, setNotifications, bgColor }) {
  useEffect(() => {
    if (isOpen) {
      socket.emit("getNotifications", {}, (response) => {
        setNotifications(response.notifications);
      });
    }
  }, [isOpen, setNotifications]);

  const handleClose = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      status: "Read",
    }));

    setNotifications(updatedNotifications);

    socket.emit("updateNotifications", { notifications: updatedNotifications }, (response) => {
      if (!response) {
        console.error("Error updating notifications.");
      }
    });

    setUnreadCount(0);
    setIsOpen(false);
  };

  const handleRemoveNotification = (notificationId) => {
    const updatedNotifications = notifications.filter((notification) => {
      return notification._id !== notificationId;
    });

    setNotifications(updatedNotifications);

    socket.emit("updateNotifications", { notifications: updatedNotifications }, (response) => {
      if (!response) {
        console.error("Error deleting notification.");
      }
    });
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);

    socket.emit("updateNotifications", { notifications: [] }, (response) => {
      if (!response) {
        console.error("Error clearing all notifications.");
      }
    });

    setUnreadCount(0);
  };

  return (
    <div className={`fixed right-0 top-16 w-[30rem] rounded-l-3xl bg-zinc-800 text-white shadow-lg h-full z-50 p-5 overflow-y-auto transition-transform duration-700 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex gap-2">
            {notifications.length > 0 && (
              <button onClick={handleClearAllNotifications} className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-1">
                <Trash2 size={14} /> Clear All
              </button>
            )}
            <button onClick={handleClose} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              Close
            </button>
          </div>
        </div>
        {notifications.length === 0 ? (
          <p className="mt-10 text-gray-400 text-center">No notifications.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li key={notification._id} className={`p-3 rounded-md shadow-sm border text-gray-200 ${notification.status === "Unread" ? bgColor : "bg-gray-700 border-gray-500"}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs">Status: {notification.status}</p>
                  </div>
                  <button onClick={() => handleRemoveNotification(notification._id)} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
