"use client";

import { useState, useRef, useEffect } from "react";

const KZ_CITIES = [
  "Астана",
  "Алматы",
  "Шымкент",
  "Караганда",
  "Актобе",
  "Тараз",
  "Павлодар",
  "Усть-Каменогорск (Оскемен)",
  "Костанай",
  "Кызылорда",
];

interface CitySelectorProps {
  label: string;
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
  exclude?: string;
}

export default function CitySelector({ label, value, onChange, placeholder, exclude }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCities = KZ_CITIES.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase()) && city !== exclude
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group z-[60]" ref={wrapperRef}>
      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 ml-1">
        {label}
      </label>
      
      <div
        className={`w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-4 cursor-pointer flex items-center justify-between hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-lg ${
          isOpen ? "ring-2 ring-indigo-500/50 border-indigo-500" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 overflow-hidden">
           <div className={`p-2 rounded-lg ${value ? 'bg-indigo-500/20 text-indigo-300' : 'bg-gray-700/50 text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
           </div>
           <span className={`truncate font-medium ${value ? "text-white text-lg" : "text-gray-400"}`}>
             {value || placeholder || "Select City"}
           </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-[100] w-full mt-2 bg-[#1a1b2e] border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-3 bg-[#131424] border-b border-white/5">
            <div className="relative">
               <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               <input
                 type="text"
                 className="w-full bg-gray-800/50 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-white/5 transition-all placeholder-gray-600"
                 placeholder="Search city..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 onClick={(e) => e.stopPropagation()}
                 autoFocus
               />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto 
            scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-white/10
            [&::-webkit-scrollbar-thumb]:rounded-full">
            
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-3 hover:bg-indigo-600/10 cursor-pointer text-gray-300 hover:text-white transition-colors flex items-center justify-between group/item"
                  onClick={() => {
                    onChange(city);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  <span className="font-medium text-sm">{city}</span>
                  {value === city && (
                     <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                  )}
                </div>
              ))
            ) : (
               <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  <p>No cities found</p>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}