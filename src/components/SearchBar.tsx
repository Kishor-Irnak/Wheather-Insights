import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { searchLocations, Location } from '../services/weatherApi';

interface SearchBarProps {
  onLocationSelect: (location: Location) => void;
  onCurrentLocationClick: () => void;
  isLocating: boolean;
  hideCurrentLocationBtn?: boolean;
}

export function SearchBar({ onLocationSelect, onCurrentLocationClick, isLocating, hideCurrentLocationBtn }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      const locations = await searchLocations(query);
      setResults(locations);
      setIsSearching(false);
      setShowDropdown(true);
    };

    const debounceTimer = setTimeout(fetchLocations, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (location: Location) => {
    setQuery('');
    setShowDropdown(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative w-full mx-auto z-50" ref={dropdownRef}>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className={`block w-full pl-10 ${hideCurrentLocationBtn ? 'pr-4' : 'pr-12'} py-2.5 bg-white border-none rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm`}
          placeholder="Search Here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
        />
        {!hideCurrentLocationBtn && (
          <button
            onClick={onCurrentLocationClick}
            disabled={isLocating}
            className="absolute inset-y-0 right-2 flex items-center p-2 text-gray-400 hover:text-orange-400 transition-colors disabled:opacity-50"
            title="Use current location"
          >
            {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
          >
            <ul className="max-h-60 overflow-auto py-2">
              {results.map((location) => (
                <li key={location.id}>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex flex-col"
                    onClick={() => handleSelect(location)}
                  >
                    <span className="text-gray-800 font-medium text-sm">{location.name}</span>
                    <span className="text-gray-500 text-xs">
                      {location.admin1 ? `${location.admin1}, ` : ''}{location.country}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
