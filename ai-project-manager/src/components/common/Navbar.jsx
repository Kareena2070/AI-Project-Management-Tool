import { Link } from "react-router-dom";
import { useState } from "react";
import { useProject } from "../../context/ProjectContext";

export default function Navbar() {
  const { projects, selectedProject, selectProject, createProject } = useProject();
  const [creating, setCreating] = useState(false);

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

      <div />
    </nav>
  );
}
