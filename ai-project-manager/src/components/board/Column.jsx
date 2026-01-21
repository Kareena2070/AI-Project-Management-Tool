import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks, canDrag }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 rounded-lg p-3 min-h-[400px]"
    >
      <h2 className="font-semibold mb-3 capitalize">{title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          canDrag={canDrag}
        />
      ))}
    </div>
  );
}
