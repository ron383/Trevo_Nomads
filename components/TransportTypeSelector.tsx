"use client";

const types = [
  { id: 'plane', label: 'Самолёт',  },
  { id: 'train', label: 'Поезд',  },
  { id: 'car', label: 'Такси',   },
  { id: 'bus', label: 'Автобус', },
];

export default function TransportTypeSelector({ selected, onChange }: { selected: string, onChange: (id: string) => void }) {
  return (
    <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
      {types.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            selected === t.id ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:bg-white/5"
          }`}
        >
          <span>{t.icon}</span>
          <span className="text-sm hidden md:block">{t.label}</span>
        </button>
      ))}
    </div>
  );
}