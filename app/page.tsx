"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Компоненты
import CitySelector from "@/components/CitySelector";
import DateRangePicker from "@/components/DateRangePicker";
import TravellerSelector from "@/components/TravellerSelector";
import PlaneAnimation from "@/components/PlaneAnimation";
import TransportCard from "@/components/TransportCard";
import HotelCard from "@/components/HotelCard";
import TransportTypeSelector from "@/components/TransportTypeSelector"; 

// Данные и типы
import { travelData } from "../data/hostels"; 
import { transportDatabase } from "../data/transportData"; 
import { PlanOption } from "../lib/types"; 

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Состояния поиска
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0 });
  const [selectedTransportType, setSelectedTransportType] = useState<string>("plane");

  // Выбор пользователя
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  const [selectedAIPlan, setSelectedAIPlan] = useState<PlanOption | null>(null);

  const [result, setResult] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth");
  }, [user, loading, router]);

  const handleSearch = async () => {
    if (!fromCity || !toCity || !startDate || !endDate) {
      alert("Заполните все поля");
      return;
    }
    
    setSearchLoading(true);
    setShowResults(false);
    setSelectedHotel(null);
    setSelectedTransport(null);
    setSelectedAIPlan(null);
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toCity, days: diffDays, travellers: travellers.adults + travellers.children }),
      });

      let aiData = await res.json();

      if (!aiData.plans || aiData.plans.length === 0) {
        aiData.plans = [
          {
            type: 'Эконом',
            description: 'Бюджетный маршрут по бесплатным достопримечательностям.',
            activities: ['Старый город', 'Городской парк', 'Смотровая площадка'],
            savingTips: ['Используйте общественный транспорт', 'Бесплатные дни в музеях'],
            activitiesCost: 5000
          },
          {
            type: 'Стандарт',
            description: 'Оптимальный баланс между комфортом и впечатлениями.',
            activities: ['Главный музей', 'Тематический парк', 'Ужин в центре'],
            savingTips: ['Бронируйте билеты онлайн'],
            activitiesCost: 25000
          },
          {
            type: 'Премиум',
            description: 'Максимальный комфорт и эксклюзивные локации.',
            activities: ['Частная экскурсия', 'VIP-места в театре', 'Luxury SPA'],
            savingTips: ['Закажите консьерж-сервис'],
            activitiesCost: 80000
          }
        ];
      }

      setResult({
        plans: aiData.plans, 
        transportOptions: transportDatabase[selectedTransportType as keyof typeof transportDatabase] || []
      });

      setShowResults(true);
    } catch (error) {
      console.error("Ошибка поиска:", error);
      alert("Не удалось получить данные от ИИ. Попробуйте еще раз.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedHotel || !selectedTransport || !selectedAIPlan) {
      alert("Выберите отель, транспорт и план отдыха");
      return;
    }

    const nights = Math.ceil(Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) || 1;
    const totalPeople = travellers.adults + travellers.children;

    // Расчет: (Отель * ночи * люди) + (Транспорт * люди) + Активности
    const total = (selectedHotel.price * nights * totalPeople) + 
                  (selectedTransport.price * totalPeople) + 
                  (selectedAIPlan.activitiesCost || 0);

    const bookingData = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.uid,
      fromCity,
      toCity,
      startDate,
      endDate,
      travellers, // Сохраняем объект с количеством взрослых и детей
      hotel: selectedHotel,
      transport: selectedTransport,
      aiPlan: selectedAIPlan,
      totalPrice: total,
    };

    const existing = JSON.parse(localStorage.getItem("my_bookings") || "[]");
    localStorage.setItem("my_bookings", JSON.stringify([bookingData, ...existing]));
    
    router.push("/profile");
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-40 relative">
      <PlaneAnimation />
      
      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        <div className="pt-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            AZ AQŞA — <span className="text-indigo-500 italic">KÖP ÄSER</span>
          </h1>
        </div>

        {/* Секция поиска */}
        <div className="bg-[#111218]/80 backdrop-blur-xl border border-white/5 rounded-[30px] p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-3">
              <CitySelector label="Откуда" value={fromCity} onChange={setFromCity} exclude={toCity} />
            </div>
            <div className="md:col-span-3">
              <CitySelector label="Куда" value={toCity} onChange={setToCity} exclude={fromCity} />
            </div>
            <div className="md:col-span-4">
              <DateRangePicker startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} />
            </div>
            <div className="md:col-span-2">
              <TravellerSelector count={travellers} onChange={setTravellers} />
            </div>
            <div className="md:col-span-12 flex flex-col md:flex-row justify-between gap-4 mt-6 pt-6 border-t border-white/5">
              <TransportTypeSelector selected={selectedTransportType} onChange={setSelectedTransportType} />
              <button 
                onClick={handleSearch} 
                disabled={searchLoading}
                className="bg-indigo-600 px-10 py-4 rounded-xl font-black uppercase hover:bg-indigo-500 transition-all disabled:opacity-50"
              >
                {searchLoading ? "ИИ генерирует..." : "Найти варианты"}
              </button>
            </div>
          </div>
        </div>

        {showResults && result && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
            
            {/* 1. Отели */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black uppercase italic">1. Выберите проживание</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(travelData[toCity as keyof typeof travelData] || []).map((hotel: any) => (
                  <div 
                    key={hotel.id} 
                    onClick={() => setSelectedHotel(hotel)}
                    className={`cursor-pointer rounded-[2.5rem] transition-all ${selectedHotel?.id === hotel.id ? 'ring-4 ring-indigo-500 scale-[1.02]' : 'opacity-80 hover:opacity-100'}`}
                  >
                    <HotelCard hotel={hotel} />
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Транспорт */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black uppercase italic">2. Выберите рейс</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.transportOptions.map((opt: any) => (
                  <TransportCard 
                    key={opt.id} 
                    option={opt} 
                    isSelected={selectedTransport?.id === opt.id} 
                    onSelect={() => setSelectedTransport(opt)} 
                  />
                ))}
              </div>
            </section>

            {/* 3. AI Стратегии (С ОБНОВЛЕННЫМ ЦВЕТОМ ШРИФТА) */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black uppercase italic text-indigo-400">3. Стратегия от AI</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.plans?.map((plan: PlanOption, idx: number) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedAIPlan(plan)}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer relative ${
                      selectedAIPlan?.type === plan.type 
                      ? 'bg-indigo-600/20 border-indigo-500' 
                      : 'bg-[#111218] border-white/5 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase bg-indigo-500 px-2 py-1 rounded text-white tracking-widest">{plan.type}</span>
                      <span className="font-black text-xl">{plan.activitiesCost.toLocaleString()} ₸</span>
                    </div>
                    
                    {/* Сделали шрифт описания светлее (text-white) */}
                    <p className="text-sm font-bold text-white mb-4 leading-relaxed">{plan.description}</p>
                    
                    {/* Сделали пункты списка светлее (text-gray-100) */}
                    <ul className="text-xs space-y-3 text-gray-100">
                      {plan.activities.map((a, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-indigo-500 font-black">•</span>
                          <span className="opacity-95">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Кнопка бронирования */}
            <div className="flex flex-col items-center gap-6 pt-10 border-t border-white/5">
               {selectedHotel && selectedTransport && selectedAIPlan ? (
                 <button 
                    onClick={handleBooking}
                    className="bg-green-600 hover:bg-green-500 text-white px-20 py-6 rounded-full font-black text-2xl uppercase tracking-tighter shadow-[0_0_30px_rgba(22,163,74,0.4)] transition-all hover:scale-105 active:scale-95"
                 >
                    Забронировать тур
                 </button>
               ) : (
                 <div className="bg-white/5 px-8 py-4 rounded-2xl border border-white/10">
                    <p className="text-indigo-400 font-bold animate-pulse text-sm uppercase tracking-widest text-center">
                      Для продолжения выберите: {!selectedHotel && "Отель, "}{!selectedTransport && "Транспорт, "}{!selectedAIPlan && "AI План"}
                    </p>
                 </div>
               )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}