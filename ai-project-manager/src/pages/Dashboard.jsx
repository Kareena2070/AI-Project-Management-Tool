import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTasks } from "../context/TaskContext";

import Navbar from "../components/common/Navbar";

export default function Dashboard() {
  const { tasks } = useTasks();

  const completed = tasks.filter(
    (t) => t.status === "done"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "todo" || t.status === "in-progress"
  ).length;

  const blocked = tasks.filter(
    (t) => t.status === "review"
  ).length;

  const progressData = [
    { name: "Completed", tasks: completed },
    { name: "Pending", tasks: pending },
    { name: "Blocked", tasks: blocked },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      
      <p className="text-gray-500 mb-6 mt-5">
        Real-time overview of your project
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tasks" value={tasks.length} />
        <StatCard title="Completed" value={completed} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Blocked" value={blocked} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Task Progress
        </h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
