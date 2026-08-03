import api from "./api";


export const getNotifications = async () => {

  const response = await api.get(
    "/notifications"
  );

  return response.data;

};



export const markNotificationRead = async (id) => {

  const response = await api.put(
    `/notifications/${id}/read`
  );

  return response.data;

};
export const completePayment = async(id, amount)=>{

    const response = await api.put(
        `/invoices/${id}/payment`,
        {
          paidAmount: amount
        }
    );

    return response.data;

};