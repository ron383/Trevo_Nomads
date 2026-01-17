"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Booking } from "@/lib/types";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    } else if (user) {
      const localData = localStorage.getItem("my_bookings");
      if (localData) {
        setBookings(JSON.parse(localData));
      }
    }
  }, [user, loading, router]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const clearHistory = () => {
    if (confirm("Вы уверены, что хотите очистить всю историю поездок?")) {
      localStorage.removeItem("my_bookings");
      setBookings([]);
    }
  };

  if (loading || !user) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Профиль пользователя */}
        <div className="bg-[#111218] border border-white/5 rounded-[40px] p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          <div className="w-20 h-20 bg-indigo-500/10 rounded-full mx-auto mb-4 flex items-center justify-center border border-indigo-500/30">
             <span className="text-3xl font-black text-indigo-500 uppercase">
               {user.email?.charAt(0)}
             </span>
          </div>
          <h1 className="text-xl font-black">{user.displayName || "Путешественник"}</h1>
          <p className="text-gray-500 text-xs tracking-widest uppercase">{user.email}</p>
        </div>

        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-black uppercase tracking-tighter">История приключений</h2>
          {bookings.length > 0 && (
            <button onClick={clearHistory} className="text-[10px] text-gray-600 hover:text-red-500 uppercase font-bold transition-colors">
              Очистить историю
            </button>
          )}
        </div>

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <div className="text-center py-20 bg-[#111218] rounded-[32px] border border-dashed border-white/10">
              <p className="text-gray-500 font-medium">Здесь пока пусто...</p>
              <button onClick={() => router.push('/')} className="mt-4 text-indigo-500 font-bold hover:underline">Найти первый тур</button>
            </div>
          ) : bookings.map((booking) => (
            <div 
              key={booking.id} 
              className={`bg-[#111218] border transition-all duration-500 rounded-[32px] overflow-hidden ${
                expandedId === booking.id ? 'border-indigo-500/50 shadow-[0_0_40px_rgba(79,70,229,0.15)]' : 'border-white/5'
              }`}
            >
              {/* Верхняя часть карточки */}
              <div className="p-6 flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(booking.id)}>
                <div className="flex gap-6 items-center">
                  <div className="text-center bg-indigo-500/5 p-3 rounded-2xl min-w-[90px] border border-indigo-500/10">
                    <p className="text-[9px] text-indigo-500/50 uppercase font-black mb-1">Направление</p>
                    <p className="font-black text-indigo-400 uppercase text-sm tracking-tighter">{booking.toCity}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      {booking.startDate} — {booking.endDate} • {booking.travellers.adults + booking.travellers.children} чел.
                    </p>
                    <p className="text-xl font-black text-green-400">{booking.totalPrice?.toLocaleString()} ₸</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden md:block text-right">
                    <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-gray-400 uppercase font-black">
                      {booking.aiPlan.type}
                    </span>
                  </div>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/5 transition-transform duration-300 ${expandedId === booking.id ? 'rotate-180 bg-indigo-500/20' : ''}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke={expandedId === booking.id ? "#6366f1" : "#4b5563"} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Детали (разворачиваются) */}
              {expandedId === booking.id && (
                <div className="px-6 pb-8 pt-4 border-t border-white/5 bg-gradient-to-b from-indigo-500/[0.03] to-transparent animate-in fade-in zoom-in-95 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Отель */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] text-indigo-400 font-black uppercase tracking-widest flex items-center gap-2">
                        <span>🏨</span> Проживание
                      </h4>
                      <div className="bg-white/5 p-5 rounded-[24px] border border-white/5 h-full">
                        <p className="font-black text-sm mb-1">{booking.hotel.name}</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed mb-4">{booking.hotel.address}</p>
                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                          <span className="text-[9px] text-gray-600 uppercase font-bold">За ночь</span>
                          <span className="text-xs font-black text-indigo-300">{booking.hotel.price.toLocaleString()} ₸</span>
                        </div>
                      </div>
                    </div>

                    {/* Транспорт */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] text-indigo-400 font-black uppercase tracking-widest flex items-center gap-2">
                        <span>✈️</span> Транспорт
                      </h4>
                      <div className="bg-white/5 p-5 rounded-[24px] border border-white/5 h-full">
                        <p className="font-black text-sm mb-1">{booking.transport.provider}</p>
                        <div className="flex items-center gap-3 my-3">
                          <div className="text-center">
                            <p className="text-[9px] text-gray-600 font-bold uppercase">Вылет</p>
                            <p className="text-xs font-black">{booking.transport.departureTime}</p>
                          </div>
                          <div className="flex-1 h-[1px] bg-white/10 relative">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px]">✈️</div>
                          </div>
                          <div className="text-center">
                            <p className="text-[9px] text-gray-600 font-bold uppercase">Прилет</p>
                            <p className="text-xs font-black">{booking.transport.arrivalTime}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                          <span className="text-[9px] text-gray-600 uppercase font-bold">Билет</span>
                          <span className="text-xs font-black text-indigo-300">{booking.transport.price.toLocaleString()} ₸</span>
                        </div>
                      </div>
                    </div>

                    {/* AI План (ТЕКСТ СДЕЛАН СВЕТЛЕЕ) */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] text-indigo-400 font-black uppercase tracking-widest flex items-center gap-2">
                        <span>🤖</span> AI План: {booking.aiPlan.type}
                      </h4>
                      <div className="bg-white/5 p-5 rounded-[24px] border border-white/5 h-full flex flex-col">
                        <ul className="text-[11px] text-gray-200 space-y-2 flex-1">
                          {booking.aiPlan.activities.map((act: string, i: number) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-indigo-500 font-bold">•</span> 
                              <span className="leading-tight opacity-95">{act}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <p className="text-[10px] text-gray-100 italic leading-snug">
                            <span className="text-indigo-400 not-italic font-bold">Совет:</span> {booking.aiPlan.savingTips[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Итоговый бюджет */}
                  <div className="mt-8 bg-indigo-600 p-6 rounded-[28px] flex justify-between items-center shadow-[0_10px_30px_rgba(79,70,229,0.3)]">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200 mb-1">Итого за тур</p>
                      <p className="text-xs text-white/70 font-medium italic">Расчет на {booking.travellers.adults + booking.travellers.children} чел.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-white">{booking.totalPrice?.toLocaleString()} ₸</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}