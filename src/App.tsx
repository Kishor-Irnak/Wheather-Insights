import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { MapWidget } from './components/MapWidget';
import { OtherCities } from './components/OtherCities';
import { HumidityCard } from './components/HumidityCard';
import { TodayTemperature } from './components/TodayTemperature';
import { TomorrowForecast } from './components/TomorrowForecast';
import { Sidebar, TabType } from './components/Sidebar';
import { CalendarView } from './components/CalendarView';
import { MapView } from './components/MapView';
import { SettingsView } from './components/SettingsView';
import { MessagesView } from './components/MessagesView';
import { WelcomeScreen } from './components/WelcomeScreen';
import { getWeatherData, getReverseGeocoding, Location } from './services/weatherApi';
import { Loader2, AlertCircle, Calendar, MessageSquare, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  const fetchWeather = async (loc: Location) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(loc.latitude, loc.longitude);
      setWeatherData(data);
      setLocation(loc);
      setShowWelcome(false);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    setIsLocating(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const loc = await getReverseGeocoding(latitude, longitude);
          if (loc) {
            await fetchWeather(loc);
            setShowWelcome(false);
          }
        } catch (err) {
          setError("Failed to get location details.");
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location. Please check permissions or search manually.");
        setIsLocating(false);
      }
    );
  };

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onComplete={(name) => setUserName(name)}
        onLocationSelect={fetchWeather}
        onCurrentLocationClick={handleCurrentLocation}
        isLocating={isLocating}
        error={error}
      />
    );
  }

  const renderContent = () => {
    if (isLoading || isLocating) {
      return (
        <motion.div 
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex flex-col items-center justify-center h-full"
        >
          <Loader2 className="w-12 h-12 text-orange-400 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">
            {isLocating ? "Detecting your location..." : "Fetching weather data..."}
          </p>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div 
          key="error"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto h-full"
        >
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={handleCurrentLocation}
            className="px-6 py-2.5 bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-medium transition-colors shadow-md shadow-orange-400/30"
          >
            Try Again
          </button>
        </motion.div>
      );
    }

    if (!weatherData || !location) return null;

    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6 pb-6"
          >
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <CurrentWeather data={weatherData} location={location} />
              </div>
              <div className="lg:col-span-7">
                <MapWidget data={weatherData} location={location} />
              </div>
            </div>
            
            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3 flex flex-col gap-6">
                <OtherCities />
                <HumidityCard data={weatherData} />
              </div>
              <div className="lg:col-span-6">
                <TodayTemperature data={weatherData} />
              </div>
              <div className="lg:col-span-3">
                <TomorrowForecast data={weatherData} location={location} />
              </div>
            </div>
          </motion.div>
        );
      case 'calendar':
        return <CalendarView data={weatherData} location={location} />;
      case 'map':
        return <MapView data={weatherData} location={location} />;
      case 'settings':
        return <SettingsView />;
      case 'messages':
        return <MessagesView />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-[#F3F6FD] p-4 lg:p-6 flex gap-6 font-sans text-gray-800 overflow-hidden">
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto hide-scrollbar pr-2">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shrink-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0 shadow-sm border-2 border-white">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=f97316&color=fff&bold=true`} 
                alt={userName} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Hello,</span>
              <span className="text-sm font-bold text-gray-900">{userName}</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <SearchBar 
              onLocationSelect={fetchWeather} 
              onCurrentLocationClick={handleCurrentLocation}
              isLocating={isLocating}
            />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${activeTab === 'calendar' ? 'bg-orange-400 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${activeTab === 'messages' ? 'bg-orange-400 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 relative min-h-0">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
