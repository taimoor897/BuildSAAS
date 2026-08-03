import express from "express";

import {
  getNotifications,
  markNotificationRead,
  completeInvoicePayment,
} from "../controllers/notificationController.js";


const router = express.Router();


router.get(
  "/",
  getNotifications
);


router.put(
  "/:id/read",
  markNotificationRead
);
router.put(
    "/:id/payment",
    completeInvoicePayment
  );


export default router;