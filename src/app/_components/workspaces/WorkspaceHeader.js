export default function WorkspaceHeader({ module, workspaceName }) {
  const moduleColors = {
    "work-management": "from-blue-600 to-blue-400",
    dev: "from-green-600 to-green-400",
    crm: "from-yellow-600 to-yellow-400",
    service: "from-purple-600 to-purple-400",
    default: "from-gray-600 to-gray-400",
  };

  const bgColor = moduleColors[module] || moduleColors.default;

  return (
    <div
      className={`bg-gradient-to-r ${bgColor} text-white p-6 rounded-lg shadow-lg flex justify-between items-center`}
    >
      <div>
        <h1 className="text-3xl font-bold leading-tight">{workspaceName}</h1>
        <p className="text-sm opacity-80 mt-1 capitalize">{module.replace("-", " ")}</p>
      </div>
      <button className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2">
        <span>Edit Workspace</span>
      </button>
    </div>
  );
}
