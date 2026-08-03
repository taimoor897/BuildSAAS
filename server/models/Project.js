import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    client: {
      type: String,
      default: "",
    },

    // Client WhatsApp number
    clientPhone: {
      type: String,
      default: "",
    },
    year: {
  type: Number,
  required: true,
  default: new Date().getFullYear(),
},

    location: String,
   

    description: String,

    budget: {
      type: Number,
      default: 0,
    },

    progress: {
      type: Number,
      default: 0,
    },

    photos: [
      {
        type: String,
      }
    ],

    milestones: [
      {
        name: {
          type: String,
          required: true,
        },
    
        completed: {
          type: Boolean,
          default: false,
        },
    
        completedAt: {
          type: Date,
          default: null,
        },
      },
    ],

    status: {
      type: String,
      enum: [
        "Planning",
        "In Progress",
        "Completed",
        "On Hold",
      ],
      default: "Planning",
    },

    startDate: Date,

    endDate: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);