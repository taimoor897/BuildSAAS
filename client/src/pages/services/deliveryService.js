const API = "http://localhost:5000/api/delivery";

export async function createDelivery(delivery) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(delivery),
  });

  return response.json();
}