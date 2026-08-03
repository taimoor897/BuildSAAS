import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


export default function LiveDelivery() {

  const { id } = useParams();

  const [delivery, setDelivery] = useState(null);


  useEffect(() => {

    loadDelivery();

    const interval = setInterval(
      loadDelivery,
      3000
    );


    return () =>
      clearInterval(interval);


  }, []);



 const loadDelivery = async () => {

  try {

    const res = await fetch(
      `http://localhost:5000/api/delivery/live/${id}`
    );

    const data = await res.json();

    console.log("DELIVERY OBJECT:", data.delivery);

    if(data.success){
      setDelivery(data.delivery);
    }

  } catch(err){

    console.log("ERROR:", err);

  }

};



  const calculateETA = () => {


    if(
 delivery.latitude == null ||
 delivery.longitude == null ||
 delivery.destinationLat == null ||
 delivery.destinationLng == null
){




    console.log({
  driverLat: delivery.latitude,
  driverLng: delivery.longitude,
  siteLat: delivery.destinationLat,
  siteLng: delivery.destinationLng
});

      return {

        distance:
          "Waiting for driver",

        eta:
          "Calculating..."

      };

    }



    const R = 6371;


    const dLat =
      (delivery.destinationLat -
      delivery.latitude)
      *
      Math.PI / 180;



    const dLng =
      (delivery.destinationLng -
      delivery.longitude)
      *
      Math.PI / 180;



    const a =

      Math.sin(dLat / 2) *
      Math.sin(dLat / 2)

      +

      Math.cos(
        delivery.latitude *
        Math.PI / 180
      )

      *

      Math.cos(
        delivery.destinationLat *
        Math.PI / 180
      )

      *

      Math.sin(dLng / 2)

      *

      Math.sin(dLng / 2);



    const distance =
      R *
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1-a)
      );



    const speed = 40;


    const minutes =
      Math.round(
        (distance / speed) * 60
      );



    return {

      distance:
        `${distance.toFixed(2)} km`,

      eta:
        minutes <= 1
        ?
        "Arriving now"
        :
        `${minutes} minutes`

    };


  };



  if(!delivery){

    return(

      <DashboardLayout>

        <div className="rounded-3xl bg-white p-8 shadow">

          Loading delivery...

        </div>

      </DashboardLayout>

    );

  }



  const eta = calculateETA();



  return (

    <DashboardLayout>


      <div className="space-y-6">



        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">


          <h1 className="text-4xl font-bold">

            🚚 Live Delivery Tracking

          </h1>


          <p className="mt-2 text-blue-100">

            Track material delivery in real time

          </p>


        </div>





        <div className="overflow-hidden rounded-3xl shadow-xl">


          <MapContainer

  center={[

    delivery.destinationLat || 33.6844,

    delivery.destinationLng || 73.0479

  ]}

  zoom={14}

  style={{
    height:"600px"
  }}

>


            <TileLayer

              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />



           {
delivery.destinationLat &&
delivery.destinationLng && (

<Marker

position={[

delivery.destinationLat,

delivery.destinationLng

]}

>

<Popup>

🏗️ Construction Site

</Popup>


</Marker>

)
}




            {delivery.latitude && (


              <Marker

                position={[

                  delivery.latitude,

                  delivery.longitude

                ]}

              >

                <Popup>

                  🚚 Driver Location

                </Popup>


              </Marker>


            )}



          </MapContainer>



        </div>






        <div className="grid gap-6 md:grid-cols-6">



          <Card

            title="Material"

            value={delivery.material}

          />


          <Card

            title="Quantity"

            value={delivery.quantity}

          />


          <Card

            title="Driver"

            value={delivery.driverName}

          />



          <Card

            title="Status"

            value={delivery.status}

          />



          <Card

            title="Distance"

            value={eta.distance}

          />



          <Card

            title="ETA"

            value={eta.eta}

          />



        </div>



      </div>


    </DashboardLayout>

  );

}




function Card({

  title,

  value

}) {


  return (

    <div className="rounded-2xl bg-white p-5 shadow">


      <p className="text-slate-500">

        {title}

      </p>


      <h2 className="mt-2 text-xl font-bold">

        {value || "-"}

      </h2>


    </div>

  );

}