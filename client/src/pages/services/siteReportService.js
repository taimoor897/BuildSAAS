import axios from "axios";

const API = "http://localhost:5000/api/site-report";

export const createReport = async (report) => {
  const res = await axios.post(API, report);
  return res.data;
};

export const getLatestReport = async (projectId) => {
  const res = await axios.get(
    `${API}/latest/${projectId}`
  );
  return res.data;
};

export const getProjectReports = async (projectId) => {
  const res = await axios.get(
    `${API}/project/${projectId}`
  );
  return res.data;
};