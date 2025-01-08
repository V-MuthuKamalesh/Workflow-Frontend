export default function ActivityFeed({ workspaceId }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-4">
      <h3 className="font-bold mb-4">Recent Activity</h3>
      <div className="space-y-2">
        <p>Task "Design Homepage" completed by John</p>
        <p>New comment on task "Fix Bug #101"</p>
        <p>Board "Development" updated</p>
      </div>
    </div>
  );
}
