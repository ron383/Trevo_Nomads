// data/transportData.ts

export interface TransportOption {
  id: string;
  type: 'plane' | 'train' | 'car' | 'bus';
  provider: string;
  price: number;
  currency: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  details: string;
}

// База данных транспорта, типизированная как Record
export const transportDatabase: Record<string, TransportOption[]> = {
  plane: [
    { 
      id: 'p1', 
      type: 'plane', 
      provider: 'Air Astana', 
      price: 65000, 
      currency: 'KZT', 
      duration: '1h 40m', 
      departureTime: '10:00', 
      arrivalTime: '11:40', 
      details: 'Гибкий тариф, багаж включен' 
    },
    { 
      id: 'p2', 
      type: 'plane', 
      provider: 'FlyArystan', 
      price: 42000, 
      currency: 'KZT', 
      duration: '1h 45m', 
      departureTime: '14:20', 
      arrivalTime: '16:05', 
      details: 'Лоукостер, без багажа (тариф Эконом)' 
    },
    { 
      id: 'p3', 
      type: 'plane', 
      provider: 'SCAT Airlines', 
      price: 48000, 
      currency: 'KZT', 
      duration: '1h 50m', 
      departureTime: '08:15', 
      arrivalTime: '10:05', 
      details: 'Регулярный рейс, питание на борту' 
    }
  ],
  train: [
    { 
      id: 't1', 
      type: 'train', 
      provider: 'Talgo (Купе)', 
      price: 18500, 
      currency: 'KZT', 
      duration: '15h 00m', 
      departureTime: '19:00', 
      arrivalTime: '10:00', 
      details: 'Скоростной фирменный поезд' 
    },
    { 
      id: 't2', 
      type: 'train', 
      provider: 'Стандарт (Купе)', 
      price: 12000, 
      currency: 'KZT', 
      duration: '22h 30m', 
      departureTime: '12:00', 
      arrivalTime: '10:30', 
      details: 'Классический пассажирский состав' 
    },
    { 
      id: 't3', 
      type: 'train', 
      provider: 'Стандарт (Плацкарт)', 
      price: 8500, 
      currency: 'KZT', 
      duration: '23h 00m', 
      departureTime: '11:00', 
      arrivalTime: '10:00', 
      details: 'Бюджетное перемещение' 
    }
  ],
  car: [
    { 
      id: 'c1', 
      type: 'car', 
      provider: 'Yandex Business', 
      price: 12500, 
      currency: 'KZT', 
      duration: 'Индивидуально', 
      departureTime: 'Любое', 
      arrivalTime: 'Любое', 
      details: 'Комфортный трансфер "от двери до двери"' 
    },
    { 
      id: 'c2', 
      type: 'car', 
      provider: 'InDriver (Межгород)', 
      price: 9000, 
      currency: 'KZT', 
      duration: 'Договорная', 
      departureTime: 'По набору', 
      arrivalTime: 'По прибытию', 
      details: 'Популярный способ поездок между городами' 
    },
    { 
      id: 'c3', 
      type: 'car', 
      provider: 'VIP Transfer', 
      price: 25000, 
      currency: 'KZT', 
      duration: 'Премиум', 
      departureTime: 'Под заказ', 
      arrivalTime: 'Под заказ', 
      details: 'Авто представительного класса' 
    }
  ],
  bus: [
    { 
      id: 'b1', 
      type: 'bus', 
      provider: 'Golden Eagle Travel', 
      price: 35000, 
      currency: 'KZT', 
      duration: 'Весь день', 
      departureTime: '08:00', 
      arrivalTime: '20:00', 
      details: 'Организованный групповой тур, гид и обед включены' 
    },
    { 
      id: 'b2', 
      type: 'bus', 
      provider: 'Nomad Tours', 
      price: 25000, 
      currency: 'KZT', 
      duration: '9 часов', 
      departureTime: '09:00', 
      arrivalTime: '18:00', 
      details: 'Тематический автобусный маршрут по святым местам' 
    },
    { 
      id: 'b3', 
      type: 'bus', 
      provider: 'Межгород (Автовокзал)', 
      price: 7500, 
      currency: 'KZT', 
      duration: '11 часов', 
      departureTime: '21:00', 
      arrivalTime: '08:00', 
      details: 'Рейсовый автобус со спальными местами' 
    }
  ]
};