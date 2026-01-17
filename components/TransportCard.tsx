"use client";

import { TransportOption } from "@/data/transportData";

interface TransportCardProps {
  option: TransportOption;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function TransportCard({ option, isSelected, onSelect }: TransportCardProps) {
  // Качественные SVG-иконки для каждого типа транспорта
  const typeIcons: Record<string, React.ReactNode> = {
    plane: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    train: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    bus: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    car: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  };

  const getLabel = (type: string) => {
    switch(type) {
      case 'plane': return 'Flight';
      case 'train': return 'Train';
      case 'bus': return 'Bus / Tour';
      case 'car': return 'Taxi / Transfer';
      default: return type;
    }
  };

  return (
    <div 
      onClick={onSelect}
      className={`relative p-5 rounded-[2rem] border cursor-pointer transition-all duration-300 group ${
        isSelected 
          ? "bg-indigo-600/20 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.2)]" 
          : "bg-[#111218] border-white/5 hover:bg-gray-800/60 hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Иконка типа транспорта */}
        <div className={`p-3 rounded-xl ${
          isSelected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400 group-hover:text-indigo-400'
        } transition-colors`}>
           {typeIcons[option.type] || typeIcons.car}
        </div>
        
        {/* Цена */}
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {option.price.toLocaleString()} <span className="text-indigo-500 text-sm">₸</span>
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">per person</div>
        </div>
      </div>
      
      <div>
        {/* Название и Провайдер */}
        <div className="mb-2">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mb-1">
            {getLabel(option.type)} by
          </p>
          <h4 className="text-lg font-bold text-white leading-tight">
            {option.provider || "Local Carrier"}
          </h4>
        </div>
        
        {/* Длительность и Время */}
        <div className="flex items-center text-sm text-gray-400 gap-3 pt-3 border-t border-white/5">
           <div className="flex flex-col">
             <span className="text-[10px] text-gray-600 uppercase">Duration</span>
             <span className="font-medium">{option.duration}</span>
           </div>
           <div className="w-px h-6 bg-white/5" />
           <div className="flex flex-col">
             <span className="text-[10px] text-gray-600 uppercase">Schedule</span>
             <span className="font-medium">{option.departureTime} - {option.arrivalTime}</span>
           </div>
        </div>
      </div>

      {/* Маркер выбора (Чекбокс) */}
      {isSelected && (
        <div className="absolute top-4 right-4 translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center border-4 border-black shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      {/* Описание (Details) */}
      <p className="mt-4 text-[11px] text-gray-500 italic line-clamp-1 border-t border-white/5 pt-3">
        {option.details}
      </p>
    </div>
  );
}