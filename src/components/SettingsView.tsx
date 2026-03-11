import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Thermometer, Globe, Shield } from 'lucide-react';

export function SettingsView() {
  const [tempUnit, setTempUnit] = useState('celsius');
  const [notifications, setNotifications] = useState(true);

  return (
    <motion.div 
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-[2rem] p-8 shadow-sm h-full overflow-y-auto hide-scrollbar max-w-3xl mx-auto w-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Settings</h2>
      
      <div className="flex flex-col gap-8">
        {/* Units */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Preferences</h3>
          <div className="flex items-center justify-between p-4 bg-[#F3F6FD] rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Temperature Unit</p>
                <p className="text-xs text-gray-500">Choose your preferred unit</p>
              </div>
            </div>
            <div className="flex bg-white rounded-xl p-1 shadow-sm">
              <button 
                onClick={() => setTempUnit('celsius')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tempUnit === 'celsius' ? 'bg-orange-400 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                °C
              </button>
              <button 
                onClick={() => setTempUnit('fahrenheit')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tempUnit === 'fahrenheit' ? 'bg-orange-400 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                °F
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center justify-between p-4 bg-[#F3F6FD] rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Weather Alerts</p>
                <p className="text-xs text-gray-500">Get notified about severe weather</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-orange-400' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </section>

        {/* Other Settings placeholders */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-between p-4 bg-[#F3F6FD] rounded-2xl hover:bg-[#E2F497]/30 transition-colors w-full">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <p className="font-semibold text-gray-900">Language</p>
              </div>
              <span className="text-sm font-medium text-gray-500">English (US)</span>
            </button>
            <button className="flex items-center justify-between p-4 bg-[#F3F6FD] rounded-2xl hover:bg-[#E2F497]/30 transition-colors w-full">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <p className="font-semibold text-gray-900">Privacy & Security</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
