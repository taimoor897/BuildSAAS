import api from "./api";

export const getWorkers = async () => {
  const response = await api.get("/workers");
  return response.data;
};

export const createWorker = async (data) => {
  const response = await api.post("/workers", data);
  return response.data;
};
export const updateWorker = async (id, data) => {
  const response = await api.put(
    `/workers/${id}`,
    data
  );

  return response.data;
};


export const deleteWorker = async (id) => {
  const response = await api.delete(`/workers/${id}`);
  return response.data;
};