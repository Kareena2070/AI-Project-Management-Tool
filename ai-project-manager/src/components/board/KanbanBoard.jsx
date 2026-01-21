import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Column from "./Column";
import CreateTaskModal from "./CreateTaskModal";
import { useAuth } from "../../context/AuthContext";

const columns = ["todo", "inprogress", "review", "done"];

export default function KanbanBoard() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design Dashboard UI",
      description: "Create cards and charts",
      status: "todo",
      assignee: "Kareena",
      priority: "high",
      dueDate: "2026-01-25",
    },
    {
      id: "2",
      title: "Build Login Page",
      description: "Auth UI",
      status: "inprogress",
      assignee: "Alex",
      priority: "medium",
      dueDate: "2026-01-23",
    },
    {
      id: "3",
      title: "DSA",
      description: "Auth UI",
      status: "done",
      assignee: "Alex",
      priority: "medium",
      dueDate: "2026-01-23",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const canDrag = user?.role === "admin" || user?.role === "member";
  const canCreate = user?.role === "admin";

  const handleDragEnd = (event) => {
    if (!canDrag) return;

    const { active, over } = event;
    if (!over) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id
          ? { ...task, status: over.id }
          : task
      )
    );
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
                items={columnTasks.map((t) => t.id)}   // 🔥 IMPORTANT
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

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={(task) =>
            setTasks((prev) => [...prev, task])
          }
        />
      )}
    </>
  );
}
