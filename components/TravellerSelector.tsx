"use client";

import { useState, useRef, useEffect } from "react";

interface TravellerValues {
  adults: number;
  children: number;
  infants: number;
}

interface TravellerSelectorProps {
  count: TravellerValues;
  onChange: (values: TravellerValues) => void;
  destinationCity: string; 
  onHotelSelect?: (hotel: any) => void;
}

export default function TravellerSelector({ count, onChange, destinationCity, onHotelSelect }: TravellerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onHotelSelect) onHotelSelect(null);
  }, [destinationCity, onHotelSelect]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateCount = (type: keyof TravellerValues, delta: number) => {
    const newValues = { ...count };
    if (type === 'adults') {
      newValues.adults = Math.max(1, count.adults + delta);
    } else {
      newValues[type] = Math.max(0, count[type] + delta);
    }
    onChange(newValues);
  };

  const total = count.adults + count.children + count.infants;

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
        Путешественники
      </label>
      <div
        className={`w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-4 cursor-pointer flex items-center justify-between hover:bg-white/10 transition-all ${
          isOpen ? "border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="text-white font-medium">{total} чел.</span>
        </div>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {isOpen && (
        <div 
          className="absolute z-[100] mt-2 bg-[#1c1d24] border border-white/10 rounded-2xl shadow-2xl p-5"
          style={{ width: '280px', right: 0 }} // Фиксированная ширина, чтобы кнопки не сжимались
        >
          <div className="space-y-6">
            <CounterRow label="Взрослые" val={count.adults} onMinus={() => updateCount('adults', -1)} onPlus={() => updateCount('adults', 1)} min={1} />
            <CounterRow label="Дети" val={count.children} onMinus={() => updateCount('children', -1)} onPlus={() => updateCount('children', 1)} min={0} />
            <CounterRow label="Младенцы" val={count.infants} onMinus={() => updateCount('infants', -1)} onPlus={() => updateCount('infants', 1)} min={0} />
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all"
          >
            Готово
          </button>
        </div>
      )}
    </div>
  );
}

function CounterRow({ label, val, onMinus, onPlus, min }: any) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-200 text-sm font-medium whitespace-nowrap">{label}</span>
      <div className="flex items-center" style={{ gap: '12px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); onMinus(); }} 
          disabled={val <= min} 
          style={{
            width: '32px',
            height: '32px',
            minWidth: '32px', // Защита от сжатия
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            backgroundColor: val <= min ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            cursor: val <= min ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            transition: 'all 0.2s'
          }}
        >
          −
        </button>
        <span className="text-white font-bold text-base" style={{ minWidth: '20px', textAlign: 'center' }}>
          {val}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onPlus(); }} 
          style={{
            width: '32px',
            height: '32px',
            minWidth: '32px', // Защита от сжатия
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            backgroundColor: '#4f46e5',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'all 0.2s'
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}