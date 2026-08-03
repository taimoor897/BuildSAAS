import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createProject,
  getProjects,
    deleteProject,
    updateProject,
     getProject,
     deleteProjectPhoto,
     addMilestone,
     completeMilestone,
     deleteMilestone,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/:id/photos", async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message:"Project not found"
      });
    }


    project.photos.push(req.body.url);

    await project.save();


    res.json({
      message:"Photo saved",
      photos: project.photos
    });


  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }

});

router.post(
  "/",
  authMiddleware,
  createProject
 );
router.get(
  "/",
  authMiddleware,
  getProjects
);
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

router.put(
  "/:id",
  authMiddleware,
  updateProject
);
router.get(
  "/:id",
  authMiddleware,
  getProject
);
router.delete(
  "/:id/photos",
  authMiddleware,
  deleteProjectPhoto
);

router.post(
  "/:id/milestones",
  authMiddleware,
  addMilestone
);


router.put(
  "/:id/milestones/:milestoneId/complete",
  authMiddleware,
  completeMilestone
);

router.delete(
  "/:id/milestones/:milestoneId",
  authMiddleware,
  deleteMilestone
);

export default router;