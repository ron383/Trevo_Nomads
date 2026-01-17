export interface TransportOption {
  id: string;
  type: 'plane' | 'train' | 'bus' | 'car';
  provider: string;
  price: number;
  currency: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
}

export interface HotelOption {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  image: string;
  address: string;
}

// Новый интерфейс для вариантов планов от ИИ
export interface PlanOption {
  type: "Эконом" | "Стандарт" | "Премиум";
  budget: number; // Стоимость активностей в KZT
  locations: string[]; // Список достопримечательностей
  tips: string[]; // Советы по сохранению денег
  description: string;
}

export interface AIResponse {
  summary: string;
  transportOptions: TransportOption[];
  hotels: HotelOption[];
  plans: PlanOption[]; // Массив из 3-х планов
}

export async function generateTripPlan(
  from: string,
  to: string,
  startDate: string,
  endDate: string,
  travellers: number
): Promise<AIResponse> {
  // Имитация задержки API
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    summary: `Trip for ${travellers} person(s) from ${from} to ${to} (${startDate} - ${endDate}).`,
    transportOptions: [
      {
        id: "plane-1",
        type: "plane",
        provider: "Air Astana",
        price: 25000 * travellers,
        currency: "KZT",
        duration: "1h 30m",
        departureTime: "09:00",
        arrivalTime: "10:30",
      },
      {
        id: "train-1",
        type: "train",
        provider: "Talgo",
        price: 12000 * travellers,
        currency: "KZT",
        duration: "12h 45m",
        departureTime: "18:00",
        arrivalTime: "06:45",
      },
      {
        id: "bus-1",
        type: "bus",
        provider: "Sapar",
        price: 7000 * travellers,
        currency: "KZT",
        duration: "16h 00m",
        departureTime: "20:00",
        arrivalTime: "12:00",
      },
      {
        id: "car-1",
        type: "car",
        provider: "InDrive / Taxi",
        price: 15000 * travellers,
        currency: "KZT",
        duration: "14h 00m",
        departureTime: "Anytime",
        arrivalTime: "Flexible",
      },
    ],
    hotels: [
      {
        id: "hotel-1",
        name: "Rixos President",
        rating: 5,
        pricePerNight: 85000,
        currency: "KZT",
        address: "7 Kunaev Street",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: "hotel-2",
        name: "Hilton Garden Inn",
        rating: 4,
        pricePerNight: 45000,
        currency: "KZT",
        address: "15 Kabanbay Batyr Ave",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: "hotel-3",
        name: "Ibis City Center",
        rating: 3,
        pricePerNight: 25000,
        currency: "KZT",
        address: "27 Tauelsizdik Ave",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000",
      }
    ],
    plans: [
      {
        type: "Эконом",
        description: "Бюджетный отдых с фокусом на бесплатные достопримечательности и пешие прогулки.",
        budget: 15000 * travellers,
        locations: ["Центральный парк", "Старый город", "Бесплатные смотровые площадки"],
        tips: ["Пользуйтесь общественным транспортом", "Ищите столовые для местных", "Бесплатные дни в музеях"],
      },
      {
        type: "Стандарт",
        description: "Оптимальный баланс между комфортом и интересными платными экскурсиями.",
        budget: 45000 * travellers,
        locations: ["Национальный музей", "Торговые центры", "Популярные кафе с местной кухней"],
        tips: ["Бронируйте билеты онлайн", "Используйте групповые экскурсии"],
      },
      {
        type: "Премиум",
        description: "Эксклюзивный опыт с лучшими ресторанами и индивидуальными турами.",
        budget: 120000 * travellers,
        locations: ["Частные галереи", "VIP-ложи в театрах", "Рестораны с панорамным видом"],
        tips: ["Заказывайте столы заранее", "Пользуйтесь услугами персонального гида"],
      }
    ]
  };
}