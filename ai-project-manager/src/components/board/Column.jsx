import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  const formatTitle = (t) =>
    t.replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 rounded-lg p-3 min-h-[400px]"
    >
      <h2 className="font-semibold mb-3">
        {formatTitle(title)}
      </h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
