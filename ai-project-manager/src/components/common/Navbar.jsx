import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { projects, selectedProject, selectProject, createProject } = useProject();
  const [creating, setCreating] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    const name = window.prompt("New project name:");
    if (!name) return;
    setCreating(true);
    try {
      const p = await createProject({ name, description: "" });
      // ensure selection is applied
      selectProject(p._id);
    } catch (err) {
      console.error("Create project failed", err?.message || err);
      alert("Create project failed: " + (err?.message || err));
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    logout();
    // redirect to dashboard or login page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="font-semibold">
          Dashboard
        </Link>
        <Link to="/board" className="font-semibold">
          Board
        </Link>

        <div className="flex items-center gap-2">
          <select
            className="border p-1 rounded"
            value={selectedProject?._id || ""}
            onChange={(e) => selectProject(e.target.value)}
          >
            <option value="">Select project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name || p._id}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreateProject}
            className="bg-blue-600 text-white px-3 py-1 rounded"
            disabled={creating}
          >
            {creating ? "Creating..." : "New"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm text-gray-700 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-sm text-gray-700 hover:underline">
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Prefer explicit name, fall back to email local-part, then full email */}
            <span className="text-sm text-gray-700" title={user.email}>
              {user.name
                ? user.name
                : user.email
                ? user.email.split("@")[0].replace(/^[a-zA-Z]/, (c) => c.toUpperCase())
                : "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
