export async function geocodeAddress(address) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
  
    const data = await res.json();
  
    if (!data.length) {
      throw new Error("Address not found");
    }
  
    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
      displayName: data[0].display_name,
    };
  }