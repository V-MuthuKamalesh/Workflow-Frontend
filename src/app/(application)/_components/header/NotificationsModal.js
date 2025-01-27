"use client";

import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function NotificationsModal({
  isOpen,
  setIsOpen,
  setUnreadCount,
  bgColor,
}) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      socket.emit("getNotifications", {}, (response) => {
        setNotifications(response.notifications);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      status: "Read",
    }));

    setNotifications(updatedNotifications);

    socket.emit(
      "updateNotifications",
      { notifications: updatedNotifications },
      (response) => {
        console.log(response);
      }
    );

    setUnreadCount(0);
    setIsOpen(false);
  };

  const handleRemoveNotification = (notificationId) => {
    const updatedNotifications = notifications.filter((notification) => {
      return notification._id !== notificationId;
    });

    setNotifications(updatedNotifications);

    socket.emit(
      "updateNotifications",
      { notifications: updatedNotifications },
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <div
      className={`fixed right-0 top-16 w-[30rem] rounded-l-3xl bg-zinc-800 text-white shadow-lg h-full z-50 p-5 overflow-y-auto transition-transform duration-1000 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            onClick={handleClose}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
        {notifications.length === 0 && (
          <p className="mt-10 text-gray-400 text-center">No notifications.</p>
        )}
        {notifications.length > 0 && (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`p-3 rounded-md shadow-sm border text-gray-200 ${
                  notification.status === "Unread"
                    ? `${bgColor}`
                    : "bg-gray-700 border-gray-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs">Status: {notification.status}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveNotification(notification._id)}
                    className="text-red-500 hover:text-red-700"
                  >
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
