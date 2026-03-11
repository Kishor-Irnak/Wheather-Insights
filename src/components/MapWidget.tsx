import React from 'react';
import { MapPin } from 'lucide-react';

export function MapWidget({ data, location }: { data: any, location: any }) {
  return (
    <div className="bg-[#4CA8B9] rounded-[2rem] p-6 relative overflow-hidden h-full flex items-end justify-center min-h-[300px]">
      {/* Abstract Map Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }}
      ></div>
      
      {/* Decorative Pins */}
      <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
        <span className="text-white text-xs font-bold mb-1">25°C</span>
        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
      </div>
      <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
        <span className="text-white text-xs font-bold mb-1">22°C</span>
        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 flex flex-col items-center">
        <span className="text-white text-xs font-bold mb-1">27°C</span>
        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
      </div>

      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
         <MapPin className="text-red-500 w-8 h-8 fill-red-500 drop-shadow-md" />
      </div>

      <div className="bg-white rounded-2xl px-6 py-3 flex items-center gap-4 shadow-lg relative z-10 mb-2">
        <span className="text-2xl font-bold text-gray-900">{Math.round(data?.current?.temperature_2m || 0)}°C</span>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-800">Today</span>
          <span className="text-xs text-gray-500">{location?.name}</span>
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors font-medium text-lg">+</button>
        <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors font-medium text-lg">-</button>
      </div>
    </div>
  );
}
