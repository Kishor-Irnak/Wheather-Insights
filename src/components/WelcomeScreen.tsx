import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, Cloud, AlertCircle } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Location } from '../services/weatherApi';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
  onLocationSelect: (loc: Location) => void;
  onCurrentLocationClick: () => void;
  isLocating: boolean;
  error: string | null;
}

export function WelcomeScreen({ onComplete, onLocationSelect, onCurrentLocationClick, isLocating, error }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F6FD] flex items-center justify-center p-4 font-sans absolute inset-0 z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl max-w-md w-full flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-orange-400/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-20 h-20 bg-orange-400 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-400/40 mb-8 relative z-10">
          <Cloud className="w-10 h-10 text-white" />
        </div>
        
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleNext} 
              className="w-full flex flex-col items-center relative z-10"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Weather Insight</h1>
              <p className="text-gray-500 mb-8">Let's start by getting to know you.</p>
              
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-6 text-center text-lg font-medium transition-all"
                autoFocus
              />
              
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-4 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl font-bold text-lg transition-colors shadow-md shadow-orange-400/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="w-full flex flex-col items-center relative z-10"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Hello, {name}!</h1>
              <p className="text-gray-500 mb-8">How would you like to set your location?</p>
              
              {error && (
                <div className="w-full mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm flex items-start gap-3 text-left">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <button
                onClick={onCurrentLocationClick}
                disabled={isLocating}
                className="w-full py-4 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl font-bold text-lg transition-colors shadow-md shadow-orange-400/30 mb-6 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLocating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Locating...
                  </span>
                ) : (
                  <><MapPin className="w-5 h-5" /> Use Current Location</>
                )}
              </button>
              
              <div className="relative w-full flex items-center justify-center mb-6">
                <div className="absolute w-full border-t border-gray-200"></div>
                <span className="bg-white px-4 text-gray-400 text-sm relative z-10 font-medium">OR SEARCH</span>
              </div>
              
              <div className="w-full text-left">
                <SearchBar 
                  onLocationSelect={onLocationSelect}
                  onCurrentLocationClick={onCurrentLocationClick}
                  isLocating={isLocating}
                  hideCurrentLocationBtn={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
