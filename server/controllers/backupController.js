import Project from "../models/Project.js";
import Worker from "../models/Worker.js";
import Material from "../models/Material.js";

export const downloadBackup = async (req, res) => {
  try {
    const projects = await Project.find();
    const workers = await Worker.find();
    const materials = await Material.find();

    const backup = {
      version: "1.0",
      exportedAt: new Date(),
      projects,
      workers,
      materials,
    };

    res.json(backup);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};