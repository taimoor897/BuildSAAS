import { useState } from "react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import NorthArrow from "../components/NorthArrow";
import {
  MapContainer,
  TileLayer,
  Marker,
ZoomControl
} from "react-leaflet";

import L from "leaflet";

import DashboardLayout from "../components/layout/DashboardLayout";

import { geocodeAddress } from "./services/siteService";
import { getWeather } from "./services/weatherService";
import { getNearbyPlaces } from "./services/nearbyService";
import PlotMeasurement from "../components/PlotMeasurement";


delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

});

function ResizeMap() {
    const map = useMap();
  
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }, [map]);
  
    return null;
  }




export default function SiteIntelligence() {


  const [address,setAddress] = useState("");

  const [location,setLocation] = useState(null);

  const [loading,setLoading] = useState(false);

  const [weather,setWeather] = useState(null);

  const [places,setPlaces] = useState([]);
  const [area, setArea] = useState(null);



  const handleAnalyze = async () => {

    try {

      setLoading(true);


      console.log("Searching address:", address);



      // 1. Convert address to coordinates

      const result = await geocodeAddress(address);


      console.log("LOCATION:", result);


      if(!result){
        throw new Error("Location not found");
      }


      setLocation(result);



      // 2. Get weather

      const weatherData = await getWeather(
        result.lat,
        result.lng
      );


      console.log(
        "WEATHER:",
        weatherData
      );


      setWeather(weatherData);



      // 3. Get nearby places

      const nearbyData = await getNearbyPlaces(
        result.lat,
        result.lng
      );


      console.log(
        "NEARBY:",
        nearbyData
      );


      setPlaces(nearbyData);



    }

    catch(err){

      console.error(
        "ANALYSIS ERROR:",
        err
      );


      alert(
        err.message ||
        "Failed to analyze site"
      );

    }


    finally{

      setLoading(false);

    }

  };



  return (

    <DashboardLayout>


      <div className="space-y-6">


        <div className="rounded-3xl bg-white p-8 shadow">


          <h1 className="text-4xl font-bold">

            🌍 Site Intelligence

          </h1>


          <p className="mt-2 text-slate-500">

            AI powered construction site analysis.

          </p>



          <div className="mt-8 flex gap-4">


            <input

              value={address}

              onChange={(e)=>setAddress(e.target.value)}

              placeholder="Enter complete site address..."

              className="flex-1 rounded-xl border p-4"

            />



            <button

              onClick={handleAnalyze}

              className="rounded-xl bg-blue-600 px-6 text-white"

            >

              {
                loading
                ?
                "Analyzing..."
                :
                "Analyze"
              }


            </button>


          </div>


        </div>





        {location && (

          <>


          <div className="rounded-3xl bg-white p-6 shadow">


            <h2 className="text-2xl font-bold">

              📍 Location

            </h2>


            <p className="mt-3 text-slate-600">

              {location.displayName}

            </p>


          </div>





          <div className="relative overflow-hidden rounded-3xl shadow">
          <NorthArrow />

          <MapContainer
  center={[
    location.lat,
    location.lng
  ]}
  zoom={16}
  minZoom={10}
  maxZoom={19}
  scrollWheelZoom={true}
  zoomControl={true}
  doubleClickZoom={false}
  style={{
    height: "600px",
    width: "100%"
  }}
>


<TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  maxZoom={19}
/>




              <Marker

                position={[
                  location.lat,
                  location.lng
                ]}

              />

<ZoomControl position="bottomright" />
<PlotMeasurement
  onMeasure={(sqm) => setArea(sqm)}
/>



            </MapContainer>


          </div>


          </>

        )}



{area && (
  <div className="rounded-3xl bg-white p-8 shadow">
    <h2 className="text-3xl font-bold">
      📐 Plot Measurements
    </h2>

    <div className="mt-6 grid gap-5 md:grid-cols-5">
      <Card
        title="Square Meters"
        value={area.toFixed(2)}
      />

      <Card
        title="Square Feet"
        value={(area * 10.7639).toFixed(2)}
      />

      <Card
        title="Marla"
        value={(area / 225).toFixed(2)}
      />

      <Card
        title="Kanal"
        value={(area / 4500).toFixed(2)}
      />

      <Card
        title="Acres"
        value={(area / 4046.86).toFixed(3)}
      />
    </div>
  </div>
)}

        







        {weather && (


          <div className="rounded-3xl bg-white p-8 shadow">


            <h2 className="text-3xl font-bold">

              🌦 Site Weather

            </h2>



            <div className="mt-6 grid gap-5 md:grid-cols-3">


              <Card

                title="Temperature"

                value={`${weather.temperature}°C`}

              />


              <Card

                title="Wind"

                value={`${weather.wind} km/h`}

              />


              <Card

                title="Rain Chance"

                value={`${weather.rain}%`}

              />


            </div>


          </div>


        )}







        {places.length > 0 && (


          <div className="rounded-3xl bg-white p-8 shadow">


            <h2 className="text-3xl font-bold">

              🏪 Nearby Facilities

            </h2>



            <div className="mt-6 grid gap-5 md:grid-cols-3">


            {places.map((place, index) => {

const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

const icon =
  place.type === "hospital"
    ? "🏥"
    : place.type === "fuel"
    ? "⛽"
    : place.type === "hardware"
    ? "🔨"
    : place.type === "building_materials"
    ? "🏗️"
    : "📍";

return (
  <div
    key={index}
    onClick={() => window.open(mapsUrl, "_blank")}
    className="cursor-pointer rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
  >
    <div className="flex items-center justify-between">

      <div>
        <h3 className="text-lg font-bold">
          {icon} {place.name}
        </h3>

        <p className="mt-2 text-slate-500 capitalize">
          {place.type.replace("_", " ")}
        </p>
      </div>

      <div className="text-3xl">
        ➜
      </div>

    </div>

    <button
      className="mt-5 w-full rounded-xl bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
    >
      Open in Google Maps
    </button>
  </div>
);
})}


            </div>


          </div>


        )}



      </div>


    </DashboardLayout>

  );

}





function Card({title,value}){


  return (

    <div className="rounded-2xl bg-white p-5 shadow">


      <p className="text-slate-500">

        {title}

      </p>


      <h2 className="mt-2 text-2xl font-bold">

        {value}

      </h2>


    </div>

  );

}