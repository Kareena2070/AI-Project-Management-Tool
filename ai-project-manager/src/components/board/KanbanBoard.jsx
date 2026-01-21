import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Column from "./Column";
import CreateTaskModal from "./CreateTaskModal";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";

const columns = ["todo", "inprogress", "review", "done"];

export default function KanbanBoard() {
  const { user } = useAuth();
  const { tasks, addTask, updateTaskStatus } = useTasks();

  const [showModal, setShowModal] = useState(false); // ✅ MISSING EARLIER

  const canDrag = user?.role === "admin" || user?.role === "member";
  const canCreate = user?.role === "admin";

  const handleDragEnd = (event) => {
    if (!canDrag) return;

    const { active, over } = event;
    if (!over) return;

    // 🔥 this must match column id
    updateTaskStatus(active.id, over.id);
  };

  return (
    <>
      {canCreate && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-black text-white px-4 py-2 rounded"
        >
          + Create Task
        </button>
      )}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => {
            const columnTasks = tasks.filter(
              (task) => task.status === col
            );

            return (
              <SortableContext
                key={col}
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <Column
                  id={col}
                  title={col}
                  tasks={columnTasks}
                  canDrag={canDrag}
                />
              </SortableContext>
            );
          })}
        </div>
      </DndContext>

      {canCreate && showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={addTask}
        />
      )}
    </>
  );
}
