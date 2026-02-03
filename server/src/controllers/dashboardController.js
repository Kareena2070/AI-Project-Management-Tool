import Task from "../models/Task.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTasks = await Task.countDocuments({ createdBy: userId });
    const completedTasks = await Task.countDocuments({
      createdBy: userId,
      status: "done",
    });

    const pendingTasks = await Task.countDocuments({
      createdBy: userId,
      status: { $in: ["todo", "in-progress"] },
    });

    const blockedTasks = await Task.countDocuments({
      createdBy: userId,
      status: "blocked",
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      blockedTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard data fetch failed" });
  }
};
