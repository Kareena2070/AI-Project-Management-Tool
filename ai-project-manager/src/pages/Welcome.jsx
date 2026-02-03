import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Project Management Website</h1>
        <p className="text-gray-600 mb-6">
          Manage projects, create tasks, and track progress with a simple Kanban board.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-black text-black px-4 py-2 rounded"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
