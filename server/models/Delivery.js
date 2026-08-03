import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    material: String,

    quantity: String,

    supplier: String,

    driverName: String,

    phone: String,

    token: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    latitude: Number,

    longitude: Number,

    destinationLat: Number,

    destinationLng: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Delivery", deliverySchema);