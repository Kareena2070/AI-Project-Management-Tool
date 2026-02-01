import Task from "../models/Task.js";

/**
 * CREATE TASK
 */
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      assignee,
      projectId,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignee,
      project: projectId,
      createdBy: req.user.id,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET TASKS BY PROJECT
 */
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    const tasks = await Task.find({ project: projectId })
      .populate("assignee", "email role")
      .sort({ createdAt: -1 });

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE TASK (Drag & Drop / Edit)
 */
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE TASK
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
