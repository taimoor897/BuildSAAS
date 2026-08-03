export async function getWeather(lat, lng) {

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m&hourly=precipitation_probability`
    );
  
    const data = await res.json();
  
    return {
      temperature:
        data.current.temperature_2m,
  
      wind:
        data.current.wind_speed_10m,
  
      rain:
        data.hourly.precipitation_probability[0],
    };
  }