// lib/types.ts

export interface PlanOption {
  type: 'Эконом' | 'Стандарт' | 'Премиум';
  description: string;
  activities: string[];     // Список мест и достопримечательностей
  savingTips: string[];     // Советы по экономии денег
  activitiesCost: number;   // Стоимость только развлечений (KZT)
}

export interface Booking {
  id: string;
  userId: string;
  fromCity: string;
  toCity: string;
  startDate: string;
  endDate: string;
  travellers: {
    adults: number;
    children: number;
    infants: number;
  };
  hotel: {
    name: string;
    address: string;
    price: number;
    image: string;
  };
  transport: {
    type: string;
    provider: string;
    price: number;
    currency: string;
    departureTime: string;
    arrivalTime: string;
  };
  aiPlan: PlanOption; // Выбранная стратегия отдыха
  totalPrice: number;
}