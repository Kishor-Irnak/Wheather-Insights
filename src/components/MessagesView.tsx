import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Info, CloudLightning } from 'lucide-react';

export function MessagesView() {
  const alerts = [
    { id: 1, type: 'warning', title: 'Heavy Rain Expected', time: '2 hours ago', desc: 'Expect heavy rainfall in your area starting from 4 PM. Please carry an umbrella if you plan to go outside.', icon: CloudLightning, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 2, type: 'info', title: 'Air Quality Update', time: '5 hours ago', desc: 'Air quality index has improved to Good (45). Great time for outdoor activities and exercise.', icon: Info, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 3, type: 'alert', title: 'Strong Winds Advisory', time: '1 day ago', desc: 'Wind gusts up to 40km/h expected tomorrow morning. Please secure any loose outdoor objects.', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' },
  ];

  return (
    <motion.div 
      key="messages"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-[2rem] p-8 shadow-sm h-full overflow-y-auto hide-scrollbar max-w-3xl mx-auto w-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Weather Alerts & Messages</h2>
      
      <div className="flex flex-col gap-4">
        {alerts.map(alert => (
          <div key={alert.id} className="p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-5 hover:shadow-md transition-shadow bg-white">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${alert.bg}`}>
              <alert.icon className={`w-6 h-6 ${alert.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 text-lg">{alert.title}</h3>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-4">{alert.time}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
