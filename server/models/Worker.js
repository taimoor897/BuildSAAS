import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    phone: String,

    email: String,

    address: String,

    emergencyContact: String,

    salary: {
      type: Number,
      default: 0,
    },

    employmentType: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      default: "Monthly",
    },

    assignedProject: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },

    joinDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Worker", workerSchema);