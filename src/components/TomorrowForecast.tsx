import React from 'react';
import { getWeatherDescription } from '../utils/weatherMapping';
import { CloudRain } from 'lucide-react';

export function TomorrowForecast({ data, location }: { data: any, location: any }) {
  if (!data || !data.daily) return null;

  const tomorrow = {
    temp: Math.round(data.daily.temperature_2m_max[1]),
    code: data.daily.weather_code[1],
    desc: getWeatherDescription(data.daily.weather_code[1])
  };

  return (
    <div className="bg-gradient-to-b from-[#E2F497] to-[#CDE474] rounded-[2rem] p-6 flex flex-col justify-between h-full relative overflow-hidden min-h-[300px]">
      <div className="relative z-10">
        <p className="text-sm text-gray-700 font-medium mb-1">Tomorrow</p>
        <h3 className="text-xl font-semibold text-gray-900 leading-tight w-3/4">
          {location?.name}, {location?.country}
        </h3>
      </div>

      <div className="relative z-10 mt-8">
        <span className="text-5xl font-bold text-gray-900">{tomorrow.temp}°C</span>
        <p className="text-sm text-gray-700 font-medium mt-1">{tomorrow.desc}</p>
      </div>

      <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 opacity-90 pointer-events-none">
         <CloudRain className="w-full h-full text-gray-800 drop-shadow-xl translate-x-4 translate-y-4" strokeWidth={1} />
      </div>
    </div>
  );
}
