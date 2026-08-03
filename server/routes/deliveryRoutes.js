import express from "express";
import {
  createDelivery,
  getDeliveryByToken,
  updateDeliveryLocation,
  getLiveDelivery,
  completeDelivery,
} from "../controllers/deliveryController.js";

const router = express.Router();

// Builder creates a delivery
router.post("/", createDelivery);

// Driver opens the shared delivery link
router.get("/:token", getDeliveryByToken);

// Driver updates live location
router.put("/location/:token", updateDeliveryLocation);

// Builder views live tracking
router.get("/live/:id", getLiveDelivery);

// Driver marks delivery complete
router.put("/complete/:token", completeDelivery);

export default router;