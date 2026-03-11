import React from 'react';
import { motion } from 'motion/react';
import { getWeatherIcon } from '../utils/weatherMapping';

interface HourlyForecastProps {
  data: any;
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  if (!data || !data.hourly) return null;

  // Get next 24 hours starting from current hour
  const currentHourIndex = data.hourly.time.findIndex((timeStr: string) => {
    return new Date(timeStr).getTime() >= new Date().getTime();
  });
  
  const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
  const hourlyData = data.hourly.time.slice(startIndex, startIndex + 24).map((timeStr: string, index: number) => {
    const actualIndex = startIndex + index;
    return {
      time: new Date(timeStr),
      temp: data.hourly.temperature_2m[actualIndex],
      code: data.hourly.weather_code[actualIndex],
      isDay: data.hourly.time[actualIndex].includes('T') ? 1 : 1, // Simplified, ideally check against sunrise/sunset
    };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 shadow-xl"
    >
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6 flex items-center">
        Today
      </h3>
      <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-6 snap-x">
        {hourlyData.map((hour: any, i: number) => {
          const Icon = getWeatherIcon(hour.code, hour.isDay);
          const isNow = i === 0;
          
          return (
            <div key={i} className="flex flex-col items-center space-y-3 min-w-[60px] snap-center">
              <span className={`text-sm font-medium ${isNow ? 'text-indigo-400' : 'text-zinc-400'}`}>
                {isNow ? 'Now' : hour.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <Icon className="w-8 h-8 text-zinc-200" strokeWidth={1.5} />
              <span className="text-lg font-semibold text-zinc-100">
                {Math.round(hour.temp)}°
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
