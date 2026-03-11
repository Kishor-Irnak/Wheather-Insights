import React from 'react';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherMapping';
import { motion } from 'motion/react';

export function CalendarView({ data, location }: { data: any, location: any }) {
  if (!data || !data.daily) return null;

  const dailyData = data.daily.time.map((timeStr: string, index: number) => ({
    date: new Date(timeStr),
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
    code: data.daily.weather_code[index],
    precipProb: data.daily.precipitation_probability_max[index],
  }));

  return (
    <motion.div 
      key="calendar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-[2rem] p-8 shadow-sm h-full overflow-y-auto hide-scrollbar"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Forecast for {location?.name}</h2>
      <div className="flex flex-col gap-4">
        {dailyData.map((day: any, i: number) => {
          const Icon = getWeatherIcon(day.code, true);
          const desc = getWeatherDescription(day.code);
          const isToday = i === 0;

          return (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#F3F6FD] hover:bg-[#E2F497]/30 transition-colors">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{isToday ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                  <p className="text-xs text-gray-500">{day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              
              <div className="flex-1 text-center">
                <p className="font-medium text-gray-800">{desc}</p>
                {day.precipProb > 0 && <p className="text-xs text-blue-500 font-medium mt-1">{day.precipProb}% Rain Chance</p>}
              </div>

              <div className="flex items-center justify-end gap-4 w-1/3">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{Math.round(day.maxTemp)}°C</p>
                  <p className="text-xs text-gray-500">High</p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-left">
                  <p className="font-bold text-gray-600">{Math.round(day.minTemp)}°C</p>
                  <p className="text-xs text-gray-500">Low</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
