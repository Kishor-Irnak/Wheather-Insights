import React from 'react';
import { Cloud, LayoutDashboard, MessageSquare, MapPin, Calendar, Settings } from 'lucide-react';

export type TabType = 'dashboard' | 'messages' | 'map' | 'calendar' | 'settings';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard },
    { id: 'messages', icon: MessageSquare },
    { id: 'map', icon: MapPin },
    { id: 'calendar', icon: Calendar },
    { id: 'settings', icon: Settings },
  ] as const;

  return (
    <aside className="w-20 lg:w-24 bg-white rounded-[2.5rem] flex flex-col items-center py-8 shadow-sm h-full shrink-0">
      <div className="mb-12">
        <div className="w-12 h-12 bg-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-400/40">
          <Cloud className="w-7 h-7 text-white" />
        </div>
      </div>
      
      <nav className="flex flex-col gap-6 flex-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                isActive 
                  ? 'bg-orange-400 text-white shadow-md shadow-orange-400/30' 
                  : 'text-gray-400 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
