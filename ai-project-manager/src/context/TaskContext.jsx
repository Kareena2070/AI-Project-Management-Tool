// // import { createContext, useContext, useState } from "react";

// // const TaskContext = createContext();

// // export function TaskProvider({ children }) {
// //   const [tasks, setTasks] = useState([
// //     {
// //       id: "1",
// //       title: "Design Dashboard UI",
// //       description: "Create cards and charts",
// //       status: "todo",
// //       priority: "high",
// //       assignee: "Kareena",
// //       dueDate: "2026-01-25",
// //     },
// //     {
// //       id: "2",
// //       title: "Build Login Page",
// //       description: "Auth UI",
// //       status: "inprogress",
// //       priority: "medium",
// //       assignee: "Alex",
// //       dueDate: "2026-01-23",
// //     },
// //     {
// //       id: "2",
// //       title: "Build Login Page",
// //       description: "Auth UI",
// //       status: "done",
// //       priority: "medium",
// //       assignee: "Alex",
// //       dueDate: "2026-01-23",
// //     },
// //   ]);

// //   const addTask = (task) => {
// //     setTasks((prev) => [...prev, task]);
// //   };

// //   const updateTaskStatus = (taskId, newStatus) => {
// //     setTasks((prev) =>
// //       prev.map((task) =>
// //         task.id === taskId
// //           ? { ...task, status: newStatus }
// //           : task
// //       )
// //     );
// //   };

// //   return (
// //     <TaskContext.Provider
// //       value={{ tasks, addTask, updateTaskStatus }}
// //     >
// //       {children}
// //     </TaskContext.Provider>
// //   );
// // }

// // export function useTasks() {
// //   return useContext(TaskContext);
// // }


// import { createContext, useContext, useState } from "react";

// const TaskContext = createContext();

// export function TaskProvider({ children }) {
//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       title: "Design Dashboard UI",
//       description: "Create cards and charts",
//       status: "todo",
//       priority: "high",
//       assignee: "Kareena",
//       dueDate: "2026-01-25",
//     },
//     {
//       id: "2",
//       title: "Build Login Page",
//       description: "Auth UI",
//       status: "inprogress",
//       priority: "medium",
//       assignee: "Alex",
//       dueDate: "2026-01-23",
//     },
//     {
//       id: "2",
//       title: "Build Login Page",
//       description: "Auth UI",
//       status: "done",
//       priority: "medium",
//       assignee: "Alex",
//       dueDate: "2026-01-23",
//     },
//   ]);

//   const addTask = (task) => {
//     setTasks((prev) => [...prev, task]);
//   };

//   const updateTaskStatus = (taskId, newStatus) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === taskId
//           ? { ...task, status: newStatus }
//           : task
//       )
//     );
//   };

//   return (
//     <TaskContext.Provider
//       value={{ tasks, addTask, updateTaskStatus }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// }

// export function useTasks() {
//   return useContext(TaskContext);
// }


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useProject } from "./ProjectContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const { selectedProject } = useProject();
  // prefer the selected project from context, but fall back to any persisted selection
  const storedProjectId = localStorage.getItem("projectId");
  const projectId = selectedProject?._id || storedProjectId;

  // 🔹 FETCH TASKS FROM BACKEND
  const fetchTasks = async () => {
    if (!projectId) return;

    const res = await axios.get(
      `http://localhost:5000/api/tasks?projectId=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks(res.data);
  };

  // 🔹 CREATE TASK
  const addTask = async (task) => {
    const projectId = selectedProject?._id || localStorage.getItem("projectId");
    if (!projectId) {
      const err = new Error(
        "No project selected. Please select a project before creating tasks."
      );
      console.error(err.message);
      throw err;
    }

    try {
      const payload = {
        title: task.title,
        description: task.description || "",
        status: task.status || "todo",
        priority: (task.priority || "medium").toLowerCase(),
        dueDate: task.dueDate ? task.dueDate : undefined,
        assignee: task.assignee && task.assignee.length === 24 ? task.assignee : undefined,
        projectId,
      };

      const res = await axios.post("http://localhost:5000/api/tasks", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.error("Create task failed", error?.response?.data || error.message);
      throw error;
    }
  };

  // 🔹 UPDATE TASK STATUS (DRAG & DROP)
  const updateTaskStatus = async (taskId, status) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId ? { ...t, status } : t
      )
    );
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

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
