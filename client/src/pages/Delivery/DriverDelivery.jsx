import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DriverDelivery() {
  const { token } = useParams();

  const [delivery, setDelivery] = useState(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    loadDelivery();
  }, []);

  const loadDelivery = async () => {
    const res = await fetch(
      `http://localhost:5000/api/delivery/${token}`
    );

    const data = await res.json();

    if (data.success) {
      setDelivery(data.delivery);
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setTracking(true);

    navigator.geolocation.watchPosition(
      async (position) => {
        await fetch(
          `http://localhost:5000/api/delivery/location/${token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          }
        );
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  };

  const completeDelivery = async () => {
    await fetch(
      `http://localhost:5000/api/delivery/complete/${token}`,
      {
        method: "PUT",
      }
    );

    alert("Delivery Completed");
  };

  if (!delivery) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">

        <h1 className="text-4xl font-bold">
          🚚 Material Delivery
        </h1>

        <div className="mt-8 space-y-5">

          <Info title="Material" value={delivery.material} />

          <Info title="Quantity" value={delivery.quantity} />

          <Info title="Supplier" value={delivery.supplier} />

          <Info title="Driver" value={delivery.driverName} />

          <Info title="Phone" value={delivery.phone} />

          <Info title="Status" value={delivery.status} />

        </div>

        {!tracking && (
          <button
            onClick={startTracking}
            className="mt-10 w-full rounded-xl bg-blue-600 py-4 text-white"
          >
            Start Delivery
          </button>
        )}

        <button
          onClick={completeDelivery}
          className="mt-4 w-full rounded-xl bg-green-600 py-4 text-white"
        >
          Mark Delivered
        </button>

      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="flex justify-between rounded-xl bg-slate-100 p-4">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}