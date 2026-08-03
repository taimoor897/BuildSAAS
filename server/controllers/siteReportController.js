import SiteReport from "../models/SiteReport.js";

/*
------------------------------------
Create Report
POST /api/site-report
------------------------------------
*/

export const createReport = async (req, res) => {
  try {
    const {
      projectId,
      workersPresent,
      concreteUsed,
      completedWork,
      issues,
      weather,
      notes,
    } = req.body;

    const report = await SiteReport.create({
      projectId,
      workersPresent,
      concreteUsed,
      completedWork,
      issues,
      weather,
      notes,
    });

    res.status(201).json({
      success: true,
      report,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to create report.",
    });
  }
};

/*
------------------------------------
Get Latest Report
GET /api/site-report/latest/:projectId
------------------------------------
*/

export const getLatestReport = async (req, res) => {
  try {
    const report = await SiteReport.findOne({
      projectId: req.params.projectId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      report,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
------------------------------------
Get All Reports
GET /api/site-report/project/:projectId
------------------------------------
*/

export const getProjectReports = async (req, res) => {
  try {
    const reports = await SiteReport.find({
      projectId: req.params.projectId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      reports,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
------------------------------------
Update Report
PUT /api/site-report/:id
------------------------------------
*/

export const updateReport = async (req, res) => {
  try {
    const report = await SiteReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    res.json({
      success: true,
      report,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Update failed.",
    });
  }
};

/*
------------------------------------
Delete Report
DELETE /api/site-report/:id
------------------------------------
*/

export const deleteReport = async (req, res) => {
  try {
    const report = await SiteReport.findByIdAndDelete(
      req.params.id
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    res.json({
      success: true,
      message: "Report deleted successfully.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Delete failed.",
    });
  }
};