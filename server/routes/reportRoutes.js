import express from "express";

import {
  getDashboardReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/dashboard", getDashboardReport);

export default router;