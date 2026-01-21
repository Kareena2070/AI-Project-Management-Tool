import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design Dashboard UI",
      description: "Create cards and charts",
      status: "todo",
      priority: "high",
      assignee: "Kareena",
      dueDate: "2026-01-25",
    },
    {
      id: "2",
      title: "Build Login Page",
      description: "Auth UI",
      status: "inprogress",
      priority: "medium",
      assignee: "Alex",
      dueDate: "2026-01-23",
    },
    {
      id: "2",
      title: "Build Login Page",
      description: "Auth UI",
      status: "done",
      priority: "medium",
      assignee: "Alex",
      dueDate: "2026-01-23",
    },
  ]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
