import mongoose from "mongoose";

const siteReportSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    reportDate: {
      type: Date,
      default: Date.now,
    },

    workersPresent: {
      type: Number,
      default: 0,
    },

    concreteUsed: {
      type: String,
      default: "",
    },

    completedWork: [
      {
        type: String,
      },
    ],

    issues: {
      type: String,
      default: "None",
    },

    weather: {
      type: String,
      default: "",
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

export default mongoose.model("SiteReport", siteReportSchema);