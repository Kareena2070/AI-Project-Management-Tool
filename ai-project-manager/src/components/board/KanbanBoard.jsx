import { useState } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Column from "./Column";
import CreateTaskModal from "./CreateTaskModal";

const columns = ["todo", "inprogress", "review", "done"];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design Dashboard UI",
      status: "todo",
      assignee: "Kareena",
      priority: "High",
      dueDate: "2026-01-25",
    },
    {
      id: "2",
      title: "Build Login Page",
      status: "inprogress",
      assignee: "Alex",
      priority: "Medium",
      dueDate: "2026-01-22",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleDragEnd = (event) => {
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

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-black text-white px-4 py-2 rounded"
      >
        + Create Task
      </button>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => (
            <SortableContext
              key={col}
              items={tasks.filter((t) => t.status === col)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                id={col}
                title={col}
                tasks={tasks.filter((t) => t.status === col)}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={addTask}
        />
      )}
    </>
  );
}

