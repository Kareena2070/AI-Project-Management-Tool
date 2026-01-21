import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  // 🔹 Dummy dashboard data
  const stats = {
    totalProjects: 3,
    completedTasks: 18,
    pendingTasks: 7,
    blockedTasks: 2,
  };

  const progressData = [
    { name: "Completed", tasks: 18 },
    { name: "Pending", tasks: 7 },
    { name: "Blocked", tasks: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Projects" value={stats.totalProjects} />
        <StatCard title="Tasks Completed" value={stats.completedTasks} />
        <StatCard title="Tasks Pending" value={stats.pendingTasks} />
        <StatCard title="Blocked Tasks" value={stats.blockedTasks} />
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Task Progress</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Stat Card Component
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default Dashboard