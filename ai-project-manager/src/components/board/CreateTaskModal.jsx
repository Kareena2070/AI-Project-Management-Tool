import { useState } from "react";
import { useProject } from "../../context/ProjectContext";

export default function CreateTaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const { selectedProject } = useProject();
  // use lowercase default to match backend enum and select option values
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // prevent submission when there's no selected project (or persisted project)
    const persistedProjectId = typeof window !== "undefined" ? localStorage.getItem("projectId") : null;
    if (!selectedProject && !persistedProjectId) {
      // show inline error instead of relying on TaskContext to throw
      setError("No project selected. Please select or create a project before adding tasks.");
      return;
    }

    (async () => {
      try {
        setError(null);
        await onCreate({
          title,
          assignee,
          priority,
          dueDate,
          status: "todo",
        });
        onClose();
      } catch (err) {
        // show a basic alert for now
        console.error("Failed to create task", err?.response?.data || err.message);
        alert("Failed to create task: " + (err?.response?.data?.message || err.message));
      }
    })();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96"
      >
        <h2 className="text-xl font-bold mb-4">Create Task</h2>
          {(!selectedProject && !localStorage.getItem("projectId")) && (
            <div className="mb-3 p-2 bg-yellow-100 text-yellow-800 rounded">
              No project selected. Create or select a project before adding tasks.
            </div>
          )}
          {error && (
            <div className="mb-3 p-2 bg-red-100 text-red-800 rounded">{error}</div>
          )}

        <input
          className="w-full border p-2 mb-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {selectedProject?.members?.length ? (
          <select
            className="w-full border p-2 mb-3"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Unassigned</option>
            {selectedProject.members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.email || m._id}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="w-full border p-2 mb-3"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        )}

        <select
          className="w-full border p-2 mb-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="w-full border p-2 mb-4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-1 rounded"
            disabled={!selectedProject && !localStorage.getItem("projectId")}
            title={!selectedProject && !localStorage.getItem("projectId") ? "Select a project before creating tasks" : "Create task"}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
