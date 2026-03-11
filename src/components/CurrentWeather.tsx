import React from 'react';
import { motion } from 'motion/react';
import { getWeatherIcon } from '../utils/weatherMapping';
import { Location } from '../services/weatherApi';
import { MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  data: any;
  location: Location;
}

export function CurrentWeather({ data, location }: CurrentWeatherProps) {
  if (!data || !data.current) return null;

  const current = data.current;
  const WeatherIcon = getWeatherIcon(current.weather_code, current.is_day);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-[#DCEFE0] to-[#F4E6D9] rounded-[2rem] p-6 flex flex-col justify-between h-full relative overflow-hidden min-h-[300px]"
    >
      <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm w-fit px-3 py-1.5 rounded-full mb-4 relative z-10">
        <MapPin className="w-4 h-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-800">
          {location.name}, {location.country}
        </span>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800">Weather</h2>
        <p className="text-sm text-gray-600 mb-6">Now</p>
        
        <div className="flex items-end gap-2">
          <span className="text-7xl font-bold text-gray-900 tracking-tighter">
            {Math.round(current.temperature_2m)}°C
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 font-medium">
          Feels like {Math.round(current.apparent_temperature)}°C
        </p>
      </div>
      
      <div className="flex gap-3 mt-6 relative z-10">
        <div className="bg-[#DDF08B] px-5 py-2.5 rounded-2xl flex flex-col items-center justify-center shadow-sm">
          <span className="text-xs text-gray-700 font-medium mb-0.5">Visibility</span>
          <span className="font-bold text-gray-900">
            {current.visibility ? `${(current.visibility / 1000).toFixed(1)} Km` : 'N/A'}
          </span>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-2xl flex flex-col items-center justify-center shadow-sm">
          <span className="text-xs text-gray-500 font-medium mb-0.5">Humidity</span>
          <span className="font-bold text-gray-900">{current.relative_humidity_2m}%</span>
        </div>
      </div>
      
      <div className="absolute right-[-40px] top-[10px] w-64 h-64 pointer-events-none">
        <WeatherIcon className="w-full h-full text-yellow-400 drop-shadow-2xl" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}
