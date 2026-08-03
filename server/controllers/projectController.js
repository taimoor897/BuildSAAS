import Project from "../models/Project.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({

      ...req.body,
     
      createdBy:req.user._id
     
     });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id:req.params.id,
        createdBy:req.user._id
      },
      req.body,
      {
        new:true,
        runValidators:true,
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProject = async (req,res)=>{
  try {

    let project;


    if(req.user.role === "Manager"){

      project = await Project.findOne({
        _id:req.params.id,
        createdBy:req.user._id
      });


    } else if(req.user.role === "Worker"){

      project = await Project.findById(req.params.id);

    }



    if(!project){
      return res.status(404).json({
        message:"Project not found"
      });
    }


    res.json({
      project
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

// Get All Projects
// Get All Projects
export const getProjects = async (req, res) => {
  try {

    let projects;


    if (req.user.role === "Manager") {

      // Manager only sees his own projects
      projects = await Project.find({
        createdBy: req.user._id,
      });


    } else if (req.user.role === "Worker") {

      // Worker sees all company projects
      projects = await Project.find();

    }


    res.json({
      success: true,
      count: projects.length,
      projects,
    });


  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};

export const deleteProjectPhoto = async (req,res)=>{
  try {

    const { url } = req.body;

    const project = await Project.findById(req.params.id);


    if(!project){
      return res.status(404).json({
        message:"Project not found"
      });
    }


    project.photos = project.photos.filter(
      photo => photo !== url
    );


    await project.save();


    res.json({
      success:true,
      photos: project.photos
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};



export const addMilestone = async (req,res)=>{
  try {

    const project = await Project.findById(req.params.id);


    if(!project){
      return res.status(404).json({
        message:"Project not found"
      });
    }


    project.milestones.push({
      name:req.body.name,
      completed:false
    });


    await project.save();


    res.json({
      success:true,
      milestones:project.milestones
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }
};



export const completeMilestone = async(req,res)=>{
  try {

    const project = await Project.findById(req.params.id);


    if(!project){
      return res.status(404).json({
        message:"Project not found"
      });
    }


    const milestone =
      project.milestones.id(req.params.milestoneId);


    if(!milestone){
      return res.status(404).json({
        message:"Milestone not found"
      });
    }


    milestone.completed = true;
    milestone.completedAt = new Date();


    await project.save();


    res.json({
      success:true,
      milestones:project.milestones
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

export const deleteMilestone = async (req,res)=>{
  try {

    if(req.user.role !== "Manager"){
      return res.status(403).json({
        message:"Only managers can delete milestones"
      });
    }


    const project = await Project.findOne({
      _id:req.params.id,
      createdBy:req.user._id
    });


    if(!project){
      return res.status(404).json({
        message:"Project not found"
      });
    }


    project.milestones = project.milestones.filter(
      milestone =>
      milestone._id.toString() !== req.params.milestoneId
    );


    await project.save();


    res.json({
      success:true,
      milestones:project.milestones
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};