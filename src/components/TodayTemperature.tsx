import React, { useState } from 'react';
import { getWeatherIcon } from '../utils/weatherMapping';

export function TodayTemperature({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState('temp');
  
  if (!data || !data.hourly) return null;

  const currentHourIndex = data.hourly.time.findIndex((t: string) => new Date(t).getTime() >= new Date().getTime());
  const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
  
  const periods = [
    { name: 'Morning', offset: 0 },
    { name: 'Afternoon', offset: 6 },
    { name: 'Evening', offset: 12 },
    { name: 'Night', offset: 18 }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm h-full flex flex-col justify-between">
      <div className="flex items-start justify-between mb-8">
        <h3 className="text-xl font-semibold text-gray-800 leading-tight">How is the<br/>temperature today?</h3>
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full">
          <button onClick={() => setActiveTab('temp')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeTab === 'temp' ? 'bg-orange-400 text-white shadow-md shadow-orange-400/30' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}>
            <span className="text-xs font-bold">°C</span>
          </button>
          <button onClick={() => setActiveTab('wind')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeTab === 'wind' ? 'bg-orange-400 text-white shadow-md shadow-orange-400/30' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}>
            <span className="text-xs font-bold">W</span>
          </button>
          <button onClick={() => setActiveTab('rain')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeTab === 'rain' ? 'bg-orange-400 text-white shadow-md shadow-orange-400/30' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}>
            <span className="text-xs font-bold">R</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end flex-1 px-2">
        {periods.map((period, i) => {
          const idx = startIndex + period.offset;
          const temp = Math.round(data.hourly.temperature_2m[idx]);
          const code = data.hourly.weather_code[idx];
          const Icon = getWeatherIcon(code, true);
          const isActive = i === 1; // Highlight afternoon

          return (
            <div key={i} className="flex flex-col items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#1E293B] text-white shadow-lg' : 'bg-transparent text-gray-400'}`}>
                <Icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-900">{temp}°</span>
                <span className="text-xs text-gray-500 mt-1">{period.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
