import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Admin creates project
 */
router.post("/", protect, authorizeRoles("admin"), createProject);

/**
 * All logged-in users can view their projects
 */
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);

export default router;
