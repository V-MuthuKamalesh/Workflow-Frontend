export default function RecentActivity() {
  return (
    <div className="mx-auto max-w-4xl p-5 border border-gray-300 rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 to-white">
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
      <ul className="space-y-3 text-gray-600">
        <li>User A created a new task: "Design homepage wireframe".</li>
        <li>User B updated the project status to "In Progress".</li>
        <li>User C commented on task: "Add dark mode feature".</li>
      </ul>
    </div>
  );
}
