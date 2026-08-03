import api from "./api";

export const downloadBackup = async () => {
  const res = await api.get("/backup");

  return res.data;
};