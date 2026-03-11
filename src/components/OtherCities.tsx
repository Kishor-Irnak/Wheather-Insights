import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../services/weatherApi';
import { Sun, CloudRain } from 'lucide-react';

export function OtherCities() {
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // NY and London
        const [ny, lon] = await Promise.all([
          getWeatherData(40.7128, -74.0060),
          getWeatherData(51.5074, -0.1278)
        ]);
        setCities([
          { name: 'New York', condition: 'Sunny', temp: Math.round(ny.current.temperature_2m), max: Math.round(ny.daily.temperature_2m_max[0]), min: Math.round(ny.daily.temperature_2m_min[0]), icon: Sun },
          { name: 'London', condition: 'Rainy', temp: Math.round(lon.current.temperature_2m), max: Math.round(lon.daily.temperature_2m_max[0]), min: Math.round(lon.daily.temperature_2m_min[0]), icon: CloudRain }
        ]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {cities.map((city, i) => (
        <div key={i} className="bg-white rounded-[1.5rem] p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <city.icon className="w-8 h-8 text-yellow-400" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">{city.name}</span>
              <span className="text-xs text-gray-500">{city.condition}</span>
            </div>
          </div>
          <span className="text-sm font-medium text-orange-400">
            {city.max}°C <span className="text-gray-400">/ {city.min}°C</span>
          </span>
        </div>
      ))}
    </div>
  );
}
