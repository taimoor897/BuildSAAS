export async function getNearbyPlaces(lat, lng) {

    const query = `
    [out:json];
    (
      node["amenity"="fuel"](around:5000,${lat},${lng});
      node["amenity"="hospital"](around:5000,${lat},${lng});
      node["shop"="hardware"](around:5000,${lat},${lng});
      node["shop"="building_materials"](around:5000,${lat},${lng});
    );
    out;
    `;
  
    const response = await fetch(
      "https://overpass.kumi.systems/api/interpreter",
      {
        method: "POST",
        body: query,
      }
    );
  
    const text = await response.text();
  
    console.log("OVERPASS RESPONSE:", text);
  
    // If XML comes back, don't try to parse it as JSON
    if (text.startsWith("<?xml")) {
      console.error("Overpass returned XML instead of JSON.");
      return [];
    }
  
    const data = JSON.parse(text);
  
    return data.elements.map(place => ({
      name: place.tags?.name || "Unnamed Place",
      type: place.tags?.amenity || place.tags?.shop || "Unknown",
      lat: place.lat,
      lng: place.lon,
    }));
  }