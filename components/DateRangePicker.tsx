"use client";
import { useState, useRef, useEffect } from "react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [month, setMonth] = useState(new Date());

  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const formatDate = (d: string) => {
    if (!d) return "";
    const [y, m, day] = d.split("-").map(Number);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(y, m - 1, day));
  };

  const daysInMonth = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const first = new Date(y, m, 1).getDay();
    const last = new Date(y, m + 1, 0).getDate();
    return { y, m, first, last };
  };

  const toDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  // ОСНОВНАЯ ЛОГИКА ИСПРАВЛЕНИЯ
  const pickDate = (day: number, isStart: boolean) => {
    const { y, m } = daysInMonth(month);
    const selectedDateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const selectedDateObj = new Date(y, m, day);

    if (isStart) {
      onStartDateChange(selectedDateStr);
      setShowStart(false);
      
      // Если новая дата отправления позже текущей даты возврата — сбрасываем возврат
      const currentEndDate = toDate(endDate);
      if (currentEndDate && currentEndDate < selectedDateObj) {
        onEndDateChange("");
      }
      // Автоматически открываем выбор даты возврата для удобства
      setShowEnd(true);
    } else {
      // Проверка: не даем выбрать дату возврата раньше даты отправления
      const currentStartDate = toDate(startDate);
      if (currentStartDate && selectedDateObj < currentStartDate) {
        return; 
      }
      onEndDateChange(selectedDateStr);
      setShowEnd(false);
    }
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!startRef.current?.contains(e.target as Node)) setShowStart(false);
      if (!endRef.current?.contains(e.target as Node)) setShowEnd(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const Calendar = ({ isStart }: { isStart: boolean }) => {
    const { y, m, first, last } = daysInMonth(month);
    const empty = first === 0 ? 6 : first - 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className="absolute top-full mt-2 left-0 z-[120] bg-gray-900 border border-white/20 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,1)] p-4 w-80">
        <div className="flex justify-between items-center mb-3 text-white">
          <button onClick={() => setMonth(new Date(y, m - 1, 1))}>‹</button>
          <span className="font-semibold text-sm">
            {new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(month)}
          </span>
          <button onClick={() => setMonth(new Date(y, m + 1, 1))}>›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: empty }).map((_, i) => <div key={i} />)}
          {Array.from({ length: last }, (_, i) => i + 1).map((d) => {
            const currentIterDate = new Date(y, m, d);
            
            // Логика блокировки кнопок (disabled):
            // 1. Нельзя выбрать дату в прошлом
            // 2. Для даты возврата нельзя выбрать день раньше даты отправления
            const isPast = currentIterDate < today;
            const startDateObj = toDate(startDate);
            const isBeforeStart = !isStart && startDateObj ? currentIterDate < startDateObj : false;
            const isDisabled = isPast || isBeforeStart;

            return (
              <button
                key={d}
                disabled={isDisabled}
                onClick={() => pickDate(d, isStart)}
                className={`aspect-square rounded-lg text-sm transition-colors ${
                  isDisabled 
                    ? "text-gray-600 cursor-not-allowed" 
                    : "text-white hover:bg-indigo-600"
                } ${
                  startDate === `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` ||
                  endDate === `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
                    ? "bg-indigo-500"
                    : ""
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const DateCard = ({ label, value, onClick, active }: { label: string; value: string; onClick: () => void; active: boolean }) => (
    <div
      onClick={onClick}
      className={`h-[72px] w-full flex items-center px-4 backdrop-blur-xl border rounded-xl cursor-pointer transition-all ${
        active ? "bg-white/15 border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.2)]" : "bg-white/5 border-white/10 hover:bg-white/10"
      }`}
    >
      <div className="flex flex-col justify-center leading-tight">
        <span className="text-white text-[15px] font-medium whitespace-nowrap">
          {value || "Select date"}
        </span>
        <span className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="relative z-[50] flex gap-3">
      <div ref={startRef} className="relative w-[190px]">
        <DateCard
          label="Departure Date"
          active={showStart}
          value={startDate && formatDate(startDate)}
          onClick={() => { setShowStart(!showStart); setShowEnd(false); }}
        />
        {showStart && <Calendar isStart />}
      </div>

      <div ref={endRef} className="relative w-[190px]">
        <DateCard
          label="Return Date"
          active={showEnd}
          value={endDate && formatDate(endDate)}
          onClick={() => { setShowEnd(!showEnd); setShowStart(false); }}
        />
        {showEnd && <Calendar isStart={false} />}
      </div>
    </div>
  );
}