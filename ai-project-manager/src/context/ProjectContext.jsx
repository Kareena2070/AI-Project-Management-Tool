import { createContext, useContext, useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProjects(data);
        // if no selection, pick first project and persist selection for other contexts
        if (!selectedProject && data && data.length > 0) {
          setSelectedProject(data[0]);
          try {
            localStorage.setItem("projectId", data[0]._id);
          } catch (err) {
            // ignore localStorage failures in strict environments
          }
        }
      } else {
        console.error("Failed to fetch projects", data);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const selectProject = (projectId) => {
    const p = projects.find((x) => x._id === projectId);
    setSelectedProject(p || null);
    // optionally persist selection for convenience
    if (p) localStorage.setItem("projectId", p._id);
  };

  const createProject = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setProjects((prev) => [data, ...prev]);
        // select the newly created project and persist selection so other contexts can use it
        setSelectedProject(data);
        try {
          localStorage.setItem("projectId", data._id);
        } catch (err) {
          /* ignore localStorage errors */
        }
        return data;
      }
      throw new Error(data.message || "Create project failed");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, selectedProject, selectProject, createProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
