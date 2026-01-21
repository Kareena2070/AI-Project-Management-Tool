import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, canDrag }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    // disabled: !canDrag,
    disabled: false, // 🔥 force enable
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 rounded shadow mb-3 ${
        canDrag ? "cursor-grab" : "cursor-not-allowed opacity-60"
      }`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">
        Assignee: {task.assignee}
      </p>
      <p className="text-sm">Priority: {task.priority}</p>
      <p className="text-xs text-gray-400">
        Due: {task.dueDate}
      </p>
    </div>
  );
}
