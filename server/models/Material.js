import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
   

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    unit: {
      type: String,
      default: "Pieces",
    },

    costPerUnit: {
      type: Number,
      default: 0,
    },

    supplier: {
      type: String,
      default: "",
    },

    lowStockLimit: {
      type: Number,
      default: 20,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Material", materialSchema);