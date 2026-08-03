import express from "express";
import { downloadBackup } from "../controllers/backupController.js";

const router = express.Router();

router.get("/", downloadBackup);

export default router;