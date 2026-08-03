import express from "express";

import {
  getMaterials,
  getProjectMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materialController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


// All materials
router.get(
  "/",
  authMiddleware,
  getMaterials
);


// Materials for one project
router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectMaterials
);


// Create
router.post(
  "/",
  authMiddleware,
  createMaterial
);


// Update
router.put(
  "/:id",
  authMiddleware,
  updateMaterial
);


// Delete
router.delete(
  "/:id",
  authMiddleware,
  deleteMaterial
);


export default router;