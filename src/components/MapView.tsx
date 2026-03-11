import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { MapWidget } from './MapWidget';
import { OtherCities } from './OtherCities';

export function MapView({ data, location }: { data: any, location: any }) {
  return (
    <motion.div 
      key="map"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Regional Map & Saved Locations</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="h-[400px] lg:h-full">
          <MapWidget data={data} location={location} />
        </div>
        <div className="bg-white rounded-[2rem] p-8 shadow-sm flex flex-col gap-6 overflow-y-auto hide-scrollbar">
          <h3 className="text-lg font-semibold text-gray-800">Saved Cities</h3>
          <OtherCities />
          <div className="mt-2 p-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-400 transition-colors cursor-pointer bg-gray-50/50">
            <MapPin className="w-8 h-8 mb-2" />
            <span className="font-medium">Add New Location</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
