import Project from "../models/Project.js";

export const getDashboardStats = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user._id
    });

    const totalProjects = projects.length;

    const activeProjects = projects.filter(
      p => p.status === "In Progress"
    ).length;

    const completedProjects = projects.filter(
      p => p.status === "Completed"
    ).length;

    const totalBudget = projects.reduce(
      (sum, project) => sum + (project.budget || 0),
      0
    );

    res.json({
      totalProjects,
      activeProjects,
      completedProjects,
      totalBudget,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};