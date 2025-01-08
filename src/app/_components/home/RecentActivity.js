export default function RecentActivity() {
  return (
    <div className="mx-32 my-10 p-5 border border-gray-400 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-2">
        <li>User A created a new task: "Design homepage wireframe".</li>
        <li>User B updated the project status to "In Progress".</li>
        <li>User C commented on task: "Add dark mode feature".</li>
      </ul>
    </div>
  );
}
