import api from "./api";

export const createInvoice = async (data) => {
  const response = await api.post("/invoices", data);
  return response.data;
};


export const getInvoices = async () => {
  const response = await api.get("/invoices");
  return response.data;
};


export const updatePayment = async (id, paidAmount) => {
  const response = await api.put(
    `/invoices/${id}/payment`,
    {
      paidAmount,
    }
  );

  return response.data;
};