"use client";
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-32 relative overflow-hidden">
      {/* Мягкое фоновое свечение по центру */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Ограничиваем общую ширину контента */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Заголовок */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Trevo <span className="text-indigo-500">Nomads</span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Ваш персональный ИИ-ассистент для путешествий по бескрайним просторам Казахстана.
          </p>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Карточка 1 */}
          <div className="bg-[#111218] border border-white/5 p-8 rounded-[32px] hover:border-indigo-500/20 transition-all shadow-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#4f46e5]" />
              Что это такое?
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
              Trevo Nomad — это тревел-ассистент, который помогает удобно и быстро планировать поездки по Казахстану. 
              С его помощью вы можете заранее рассчитать примерный бюджет путешествия всего за несколько кликов.
            </p>
          </div>

          {/* Карточка 2 */}
          <div className="bg-[#111218] border border-white/5 p-8 rounded-[32px] hover:border-indigo-500/20 transition-all shadow-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#4f46e5]" />
              Планирование бюджета
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
              Сервис учитывает расходы на транспорт, проживание и еду, используя средние цены. 
              Это помогает избежать неожиданных трат и лучше подготовиться к поездке.
            </p>
          </div>

          {/* Карточка 3: Интеллектуальный движок (в том же стиле) */}
          <div className="bg-[#111218] border border-white/5 p-8 rounded-[32px] hover:border-indigo-500/20 transition-all shadow-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#4f46e5]" />
              Технологии ИИ
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
              Для работы всех функций мы используем вычислительные мощности <strong>Groq</strong>. 
              Это позволяет нашему ассистенту обрабатывать запросы и создавать готовые планы путешествий практически мгновенно.
            </p>
          </div>

          {/* Карточка 4 */}
          <div className="bg-[#111218] border border-white/5 p-8 rounded-[32px] hover:border-indigo-500/20 transition-all shadow-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#4f46e5]" />
              Мгновенный результат
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
              Благодаря оптимизированным моделям, вы получаете подробный маршрут сразу после заполнения формы, 
              не тратя время на долгое ожидание ответа системы.
            </p>
          </div>
        </div>

        {/* Нижняя широкая карточка */}
        <div className="bg-[#111218] border border-white/5 p-8 md:p-12 rounded-[32px] hover:border-indigo-500/20 transition-all shadow-2xl">
          <div className="space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#4f46e5]" />
              Всё в одном месте
            </h3>
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light">
                Сайт подойдёт как для коротких выездов, так и для путешествий на несколько дней. 
                Вся необходимая информация собрана в одном месте, поэтому вам не нужно искать её на разных ресурсах.
              </p>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light italic border-l border-indigo-500/30 pl-6">
                Тревел-ассистент ориентирован только на поездки внутри Казахстана и создан для того, 
                чтобы сделать планирование путешествий лёгким и доступным.
              </p>
            </div>
          </div>
        </div>

        {/* Футер страницы */}
        <div className="text-center pt-20 mt-12 border-t border-white/5">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold">
            Путешествуйте с умом вместе с Trevo Nomads
          </p>
        </div>
      </div>
    </div>
  );
}