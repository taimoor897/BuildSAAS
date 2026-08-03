import Project from "../models/Project.js";
import Material from "../models/Material.js";
import Worker from "../models/Worker.js";

export const getDashboardReport = async (req, res) => {
  try {
    const projects = await Project.countDocuments();

    const materials = await Material.countDocuments();

    const workers = await Worker.countDocuments();

    const inventory = await Material.find();

    const budget = inventory.reduce(
      (total, item) =>
        total + item.stock * item.costPerUnit,
      0
    );

    res.json({
      success: true,
      projects,
      materials,
      workers,
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};