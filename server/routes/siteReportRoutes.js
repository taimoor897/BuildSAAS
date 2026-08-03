import express from "express";

import {
  createReport,
  getLatestReport,
  getProjectReports,
  updateReport,
  deleteReport,
} from "../controllers/siteReportController.js";

const router = express.Router();

router.post("/", createReport);

router.get(
  "/latest/:projectId",
  getLatestReport
);

router.get(
  "/project/:projectId",
  getProjectReports
);

router.put("/:id", updateReport);

router.delete("/:id", deleteReport);

export default router;