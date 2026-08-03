import { useState } from "react";
import { createDelivery } from "../services/deliveryService";
import { useNavigate } from "react-router-dom";

export default function CreateDeliveryModal({
  project,
  onClose,
}) {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    supplier: "",
    material: "",
    quantity: "",
    driverName: "",
    phone: "",
  });

  const [generatedLink, setGeneratedLink] = useState("");
  const [deliveryId, setDeliveryId] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleCreate = async () => {

    try {

      setLoading(true);

      const data = await createDelivery({

        projectId: project._id,

        supplier: form.supplier,
        material: form.material,
        quantity: form.quantity,
        driverName: form.driverName,
        phone: form.phone,

        destinationLat: project.latitude,
destinationLng: project.longitude,

      });


      console.log("Delivery Response:", data);


      if (data.success) {

        setGeneratedLink(data.driverLink);

        setDeliveryId(data.delivery._id);

      }


    } catch(err){

      console.error(err);

      alert("Delivery creation failed");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">


        <h2 className="mb-2 text-3xl font-bold">
          🚚 Request Material Delivery
        </h2>


        <p className="mb-6 text-slate-500">
          Create a delivery request and track the driver live.
        </p>



        {!generatedLink ? (

          <>


          <div className="space-y-4">


            <input
              name="supplier"
              placeholder="Supplier Name"
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />


            <input
              name="material"
              placeholder="Material"
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />


            <input
              name="quantity"
              placeholder="Quantity"
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />


            <input
              name="driverName"
              placeholder="Driver Name"
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />


            <input
              name="phone"
              placeholder="Driver Phone"
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />


          </div>



          <button

            onClick={handleCreate}

            disabled={loading}

            className="mt-6 w-full rounded-xl bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"

          >

            {
              loading
              ?
              "Creating Delivery..."
              :
              "🚚 Generate Delivery Link"
            }

          </button>


          </>


        ) : (


          <div className="space-y-5">


            <div className="rounded-2xl bg-green-50 p-5">

              <h3 className="text-xl font-bold text-green-700">
                ✅ Delivery Created
              </h3>

              <p className="mt-2 text-slate-600">
                Send this link to the driver.
              </p>

            </div>



            <input

              value={generatedLink}

              readOnly

              className="w-full rounded-xl border p-4"

            />



            <div className="flex gap-3">


              <button

                onClick={() =>
                  navigator.clipboard.writeText(generatedLink)
                }

                className="flex-1 rounded-xl bg-green-600 py-3 text-white hover:bg-green-700"

              >

                📋 Copy Link

              </button>



              <button

                onClick={() =>
                  navigate(`/delivery/live/${deliveryId}`)
                }

                className="flex-1 rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"

              >

                📍 Live Tracking

              </button>


            </div>


          </div>


        )}



        <button

          onClick={onClose}

          className="mt-8 w-full rounded-xl border py-3 text-slate-600 hover:bg-slate-100"

        >

          Close

        </button>


      </div>

    </div>

  );

}