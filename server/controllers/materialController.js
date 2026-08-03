import Material from "../models/Material.js";

// =========================
// Get All Materials
// =========================

export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate("project", "name client location")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      materials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Materials By Project
// =========================

export const getProjectMaterials = async (req, res) => {
  try {
    const materials = await Material.find({
      project: req.params.projectId,
      
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      materials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Create Material
// =========================

export const createMaterial = async (req, res) => {
  try {
    const material = await Material.create({
      project: req.body.project,
      
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      unit: req.body.unit,
      costPerUnit: req.body.costPerUnit,
      supplier: req.body.supplier,
      lowStockLimit: req.body.lowStockLimit,
      notes: req.body.notes,
    });

    res.status(201).json({
      success: true,
      material,
    });
  } catch (error) {
    console.log("CREATE MATERIAL ERROR:");
    console.log(error);
  
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Update Material
// =========================

export const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true,
      }
    );
    res.json({
      success: true,
      material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Material
// =========================

export const deleteMaterial = async (req, res) => {
  try {

    const material = await Material.findByIdAndDelete(
      req.params.id
    );


    if (!material) {
      return res.status(404).json({
        message:"Material not found"
      });
    }


    res.json({
      success:true,
      message:"Material deleted successfully",
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};