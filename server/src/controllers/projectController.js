import Project from "../models/Project.js";

/**
 * CREATE PROJECT (Admin only)
 */
export const createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
      members: members || [],
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL PROJECTS FOR LOGGED-IN USER
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { members: req.user.id },
      ],
    })
      .populate("owner", "email role")
      .populate("members", "email role");

    return res.json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET SINGLE PROJECT BY ID
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "email role")
      .populate("members", "email role");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isAuthorized =
      project.owner._id.toString() === req.user.id ||
      project.members.some(
        (member) => member._id.toString() === req.user.id
      );

    if (!isAuthorized) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
