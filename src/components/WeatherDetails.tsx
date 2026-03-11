import React from 'react';
import { motion } from 'motion/react';
import { Wind, Droplets, Sun, Sunrise, Sunset, Eye, CloudRain } from 'lucide-react';

interface WeatherDetailsProps {
  data: any;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  if (!data || !data.current || !data.daily) return null;

  const current = data.current;
  const today = data.daily;

  const details = [
    {
      title: 'Humidity',
      value: `${current.relative_humidity_2m}%`,
      icon: Droplets,
      desc: 'Current relative humidity'
    },
    {
      title: 'Wind Speed',
      value: `${current.wind_speed_10m} km/h`,
      icon: Wind,
      desc: 'Current wind speed'
    },
    {
      title: 'UV Index',
      value: today.uv_index_max[0],
      icon: Sun,
      desc: 'Max UV index today'
    },
    {
      title: 'Precipitation',
      value: `${current.precipitation} mm`,
      icon: CloudRain,
      desc: 'Rainfall in last hour'
    },
    {
      title: 'Sunrise',
      value: new Date(today.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: Sunrise,
      desc: 'Morning'
    },
    {
      title: 'Sunset',
      value: new Date(today.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: Sunset,
      desc: 'Evening'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {details.map((detail, i) => (
        <div key={i} className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center text-zinc-400 mb-3">
            <detail.icon className="w-5 h-5 mr-2" strokeWidth={1.5} />
            <span className="text-sm font-medium uppercase tracking-wider">{detail.title}</span>
          </div>
          <span className="text-2xl font-semibold text-zinc-100 mb-1">{detail.value}</span>
          <span className="text-xs text-zinc-500">{detail.desc}</span>
        </div>
      ))}
    </motion.div>
  );
}
