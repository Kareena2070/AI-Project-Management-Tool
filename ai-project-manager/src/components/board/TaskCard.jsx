import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTasks } from "../../context/TaskContext";

export default function TaskCard({ task, canDrag }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task._id,
    disabled: !canDrag,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { deleteTask } = useTasks();

  const handleDelete = async (e) => {
    // prevent this click from triggering drag or other card-level handlers
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(task._id);
    } catch (error) {
      alert("Failed to delete task. See console for details.");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 rounded shadow mb-3 relative ${
        canDrag ? "cursor-grab" : "cursor-not-allowed opacity-60"
      }`}
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
        title="Delete task"
      >
        Delete
      </button>

      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">Assignee: {task.assignee}</p>
      <p className="text-sm">Priority: {task.priority}</p>
      <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
    </div>
  );
}
