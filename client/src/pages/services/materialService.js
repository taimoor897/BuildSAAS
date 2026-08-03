import api from "./api";

// Get all materials
export const getMaterials = async () => {
  const response = await api.get("/materials");
  return response.data;
};

// Get materials for one project
export const getProjectMaterials = async (projectId) => {
  const response = await api.get(
    `/materials/project/${projectId}`
  );
  return response.data;
};

// Create material
export const createMaterial = async (data) => {
  const response = await api.post("/materials", data);
  return response.data;
};

// Update material
export const updateMaterial = async (id, data) => {
  const response = await api.put(
    `/materials/${id}`,
    data
  );
  return response.data;
};

// Delete material
export const deleteMaterial = async (id) => {
  const response = await api.delete(
    `/materials/${id}`
  );
  return response.data;
};