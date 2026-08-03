import express from "express";

import {
  createInvoice,
  getInvoices,
  getInvoice,
  updatePayment,
  deleteInvoice,
} from "../controllers/invoiceController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.post(
  "/",
  authMiddleware,
  createInvoice
);


router.get(
  "/",
  authMiddleware,
  getInvoices
);


router.get(
  "/:id",
  authMiddleware,
  getInvoice
);


router.put(
  "/:id/payment",
  authMiddleware,
  updatePayment
);


router.delete(
  "/:id",
  authMiddleware,
  deleteInvoice
);


export default router;