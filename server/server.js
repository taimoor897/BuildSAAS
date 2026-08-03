import "dotenv/config";

import express from "express";



import mongoose from "mongoose";


import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import siteReportRoutes from "./routes/siteReportRoutes.js";
import backupRoutes from "./routes/backupRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";
import {
    connectWhatsApp
   } from "./utils/whatsapp.js";


   await connectWhatsApp();
   await import("./jobs/invoiceReminder.js");








const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/site-report", siteReportRoutes);
app.use("/api/backup", backupRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use(
    "/api/notifications",
    notificationRoutes
  );
  app.use(
    "/api/whatsapp",
    whatsappRoutes
  );



app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "BuildPilot AI Backend Running 🚀"
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));