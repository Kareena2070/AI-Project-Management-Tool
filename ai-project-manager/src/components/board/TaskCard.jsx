import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

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
      className="bg-white p-3 rounded shadow mb-3 cursor-grab"
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

