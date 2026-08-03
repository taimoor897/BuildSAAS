import crypto from "crypto";
import Delivery from "../models/Delivery.js";

/*
--------------------------------------------------
Create Delivery
POST /api/delivery
--------------------------------------------------
*/
export const createDelivery = async (req, res) => {
  try {
    const {
      projectId,
      material,
      quantity,
      supplier,
      driverName,
      phone,
      destinationLat,
      destinationLng,
    } = req.body;

    const token = crypto.randomBytes(16).toString("hex");

    const delivery = await Delivery.create({
      projectId,
      material,
      quantity,
      supplier,
      driverName,
      phone,
      destinationLat,
      destinationLng,
      token,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Delivery created successfully.",
      delivery,
      driverLink: `http://localhost:5173/delivery/${token}`,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to create delivery.",
    });
  }
};

/*
--------------------------------------------------
Driver opens delivery link
GET /api/delivery/:token
--------------------------------------------------
*/
export const getDeliveryByToken = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({
      token: req.params.token,
    }).populate("projectId");

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    res.json({
      success: true,
      delivery,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
--------------------------------------------------
Driver updates live location
PUT /api/delivery/location/:token
--------------------------------------------------
*/
export const updateDeliveryLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const delivery = await Delivery.findOneAndUpdate(
      {
        token: req.params.token,
      },
      {
        latitude,
        longitude,
        status: "On The Way",
      },
      {
        new: true,
      }
    );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    res.json({
      success: true,
      delivery,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update location.",
    });
  }
};

/*
--------------------------------------------------
Builder tracks delivery
GET /api/delivery/live/:id
--------------------------------------------------
*/
export const getLiveDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate("projectId");

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    res.json({
      success: true,
      delivery,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
--------------------------------------------------
Driver marks delivery completed
PUT /api/delivery/complete/:token
--------------------------------------------------
*/
export const completeDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findOneAndUpdate(
      {
        token: req.params.token,
      },
      {
        status: "Delivered",
      },
      {
        new: true,
      }
    );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    res.json({
      success: true,
      message: "Delivery completed successfully.",
      delivery,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to complete delivery.",
    });
  }
};