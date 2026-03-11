import React from 'react';
import { Cloud } from 'lucide-react';

export function HumidityCard({ data }: { data: any }) {
  return (
    <div className="bg-[#1E293B] rounded-[1.5rem] p-6 flex flex-col justify-between relative overflow-hidden h-full min-h-[140px] shadow-sm">
      <h3 className="text-white font-medium mb-4 relative z-10">Humidity</h3>
      <div className="relative z-10">
        <p className="text-xs text-gray-400 mb-1">Current Humidity</p>
        <p className="text-3xl font-bold text-white">{data?.current?.relative_humidity_2m || 0}%</p>
      </div>
      <div className="absolute right-[-20px] bottom-[-20px]">
        <Cloud className="w-32 h-32 text-white/10" strokeWidth={1} />
      </div>
    </div>
  );
}
