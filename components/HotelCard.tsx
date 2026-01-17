"use client";
import Image from "next/image";

interface HotelCardProps {
  hotel: any;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const price = hotel?.price || hotel?.pricePerNight || 0;
  const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800";

  return (
    <div className="bg-[#111218] border border-white/5 rounded-[2rem] overflow-hidden hover:border-indigo-500/50 transition-all group shadow-xl">
      <div className="aspect-video relative overflow-hidden bg-gray-900">
        <Image 
          src={hotel.image && hotel.image.startsWith('http') ? hotel.image : fallbackImage} 
          alt={hotel.name}
          fill
          unoptimized={true}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white z-10 flex items-center gap-1">
          <span className="text-yellow-500">⭐</span> {hotel.rating || '4.5'}
        </div>

        <div className="absolute top-4 right-4 bg-indigo-600/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white z-10 uppercase tracking-wider">
          {hotel.type === 'hostel' ? 'Хостел' : 'Апартаменты'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{hotel.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <span className="text-indigo-500 italic">📍</span>
          <span className="line-clamp-1">{hotel.address}</span>
        </p>
        
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Цена за сутки</p>
            <p className="text-2xl font-black text-white">
              {Number(price).toLocaleString()} <span className="text-indigo-500 text-sm font-bold">₸</span>
            </p>
          </div>
          
          {/* Кнопка удалена. Добавлен декоративный элемент или просто свободное место */}
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
             <span className="text-indigo-500">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}