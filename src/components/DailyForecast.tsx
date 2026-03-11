import React from 'react';
import { motion } from 'motion/react';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherMapping';
import { CalendarDays } from 'lucide-react';

interface DailyForecastProps {
  data: any;
}

export function DailyForecast({ data }: DailyForecastProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 shadow-xl"
    >
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6 flex items-center">
        <CalendarDays className="w-4 h-4 mr-2" />
        7-Day Forecast
      </h3>
      <div className="space-y-4">
        {dailyData.map((day: any, i: number) => {
          const Icon = getWeatherIcon(day.code, true);
          const isToday = i === 0;
          
          return (
            <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
              <span className="w-24 text-zinc-300 font-medium">
                {isToday ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              
              <div className="flex items-center flex-1 justify-center space-x-2">
                <Icon className="w-6 h-6 text-zinc-200" strokeWidth={1.5} />
                {day.precipProb > 20 && (
                  <span className="text-xs text-blue-400 font-medium w-8">{day.precipProb}%</span>
                )}
              </div>
              
              <div className="flex items-center justify-end w-32 space-x-4">
                <span className="text-zinc-400 font-medium">{Math.round(day.minTemp)}°</span>
                <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-orange-400 rounded-full"
                    style={{ 
                      width: '100%',
                      opacity: 0.8
                    }}
                  />
                </div>
                <span className="text-zinc-100 font-semibold">{Math.round(day.maxTemp)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
