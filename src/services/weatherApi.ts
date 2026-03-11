export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export async function searchLocations(query: string): Promise<Location[]> {
  if (!query) return [];
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
}

export async function getReverseGeocoding(lat: number, lon: number): Promise<Location | null> {
  try {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const data = await res.json();
    return {
      id: 0,
      name: data.city || data.locality || "Unknown Location",
      latitude: lat,
      longitude: lon,
      country: data.countryName,
      admin1: data.principalSubdivision
    };
  } catch (e) {
    return {
      id: 0,
      name: "Current Location",
      latitude: lat,
      longitude: lon,
      country: ""
    };
  }
}

export async function getWeatherData(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,visibility&hourly=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
}
