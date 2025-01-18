import {
  BuildRounded,
  CodeRounded,
  GroupRounded,
  WorkRounded,
} from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import Link from "next/link";

const moduleDetails = [
  {
    name: "Work Management",
    icon: <WorkRounded fontSize="large" className="text-purple-600" />,
    path: "/work-management/dashboard",
  },
  {
    name: "Development",
    icon: <CodeRounded fontSize="large" className="text-green-600" />,
    path: "/dev/dashboard",
  },
  {
    name: "CRM",
    icon: <GroupRounded fontSize="large" className="text-yellow-600" />,
    path: "/crm/dashboard",
  },
  {
    name: "Service",
    icon: <BuildRounded fontSize="large" className="text-teal-600" />,
    path: "/service/dashboard",
  },
];

export default function ModuleSwitcher({ isModalOpen, setIsModalOpen }) {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-96"
        sx={{ outline: "none" }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Select Module
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {moduleDetails.map((module) => (
            <Link
              key={module.name}
              href={`${module.path}`}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300"
            >
              {module.icon}
              <span className="text-sm font-medium text-gray-700 mt-2">
                {module.name}
              </span>
            </Link>
          ))}
        </div>
      </Box>
    </Modal>
  );
}
