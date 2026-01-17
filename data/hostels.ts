// // data/hotels.ts

export interface Accommodation {
  id: string;
  name: string;
  price: number;
  rating: number;
  type: 'hostel' | 'apartment';
  image: string;
  address: string; // Теперь обязательное поле
  currency: string;
}

export interface CityData {
  [cityName: string]: Accommodation[];
}

export const travelData: CityData = {
  "Астана": [
    { id: "ast-h1", name: "Hostel Forum", price: 6500, rating: 4.8, type: 'hostel', image: "https://lh3.googleusercontent.com/p/AF1QipO9V6y7irCaJ7uYgDefpwJ2DxGCHiPTaw22DXV0=s680-w680-h510-rw", address: "ул. Кунаева, 12", currency: "KZT" },
    { id: "ast-h2", name: "Sulu hostel", price: 5500, rating: 4.9, type: 'hostel', image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx3cipznfsGdq6WcOc0FyXzj-Z_DU_ScxH6MC8dXwkNgGfbOaImf-skC-sHks5rCapBGJ8qiu51MxW0sVUNJcRJT-qz-i6hi3cibBbp8ivHQ68zliPcUq-Q8u0HklhxEX4tRCAkR2MKSbo0=s680-w680-h510-rw", address: "ул. Сарыарка, 31", currency: "KZT" },
    { id: "ast-a1", name: "Апарт-отель YE'S Astana", price: 25000, rating: 4.5, type: 'apartment', image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800", address: "пр. Мангилик Ел, 55/18", currency: "KZT" },
    { id: "ast-a2", name: "Posutochno Arenda", price: 18000, rating: 4.9, type: 'apartment', image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800", address: "ул. Туркестан, 8", currency: "KZT" },
  ],
  "Алматы": [
    { id: "alm-h1", name: "Evergreen Hostel Almaty", price: 7000, rating: 4.7, type: 'hostel', image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/403938281.jpg?k=c13f44488c287789aef8d35282c0b21aea4df1d3e90cb19a79c0b04add2de22e&o=", address: "ул. Толе би, 82", currency: "KZT" },
    { id: "alm-h2", name: "Interhouse Almaty", price: 6000, rating: 4.6, type: 'hostel', image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800", address: "ул. Байтурсынова, 98", currency: "KZT" },
    { id: "alm-a1", name: "Opera Apartments Almaty", price: 22000, rating: 4.8, type: 'apartment', image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800", address: "ул. Панфилова, 110", currency: "KZT" },
  ],
  "Шымкент": [
    { id: "shm-h1", name: "Asia Hostel", price: 4500, rating: 4.9, type: 'hostel', image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501762401.jpg?k=38c22c0159b650ba9ae53fcadcdef3f74809ccfc9fb812c9b0fac6186c546462&o=", address: "пр. Тауке хана, 45", currency: "KZT" },
    { id: "shm-a1", name: "ЖК Capital City", price: 15000, rating: 4.9, type: 'apartment', image: "https://otbasybank.kz/Image/GetImage/2d99926a-a0eb-41d8-9cf5-6220aaa8efeb", address: "ул. Байдибек би, 126", currency: "KZT" },
  ],
  "Караганда": [
    { id: "kar-h1", name: "Chemodan Hostel", price: 5000, rating: 4.8, type: 'hostel', image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800", address: "ул. Бухар Жырау, 52", currency: "KZT" },
    { id: "kar-a1", name: "Arenda Karaganda", price: 14000, rating: 5.0, type: 'apartment', image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=800", address: "ул. Ермекова, 75", currency: "KZT" },
  ],
  "Актобе": [
    { id: "akt-h1", name: "Хостел White Hill Aqtobe", price: 4500, rating: 4.7, type: 'hostel', image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/492167358.jpg?k=3c4220314b7f90686a7087b270600f1147c9821e174eabc942c1aa0edcc4f51f&o=", address: "ул. Абулхаир хана, 68", currency: "KZT" },
    { id: "akt-a1", name: "ЖК Бавария", price: 16000, rating: 5.0, type: 'apartment', image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800", address: "ул. Маресьева, 91", currency: "KZT" },
  ],
  "Тараз": [
    { id: "tar-h1", name: "Lux apartment", price: 4000, rating: 4.6, type: 'apartment', image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523408869.jpg?k=28129aefc03e72e5da7c2064bbfd2d13a70b2708f7b739175ca63cf4b8a0c4a1&o=", address: "ул. Толе би, 89", currency: "KZT" },
    { id: "tar-a1", name: "Apartments in Taraz, Kazakhstan", price: 12000, rating: 4.7, type: 'apartment', image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/655346897.jpg?k=685ef8f67740c6c12a8303446852489689fee3748cb415a18b7c8ac887b34cd7&o=", address: "ул. Сулейменова, 14", currency: "KZT" },
  ],
  "Павлодар": [
    { id: "pav-h1", name: "Light House Pavlodar", price: 5000, rating: 4.3, type: 'hostel', image: "https://cdn.worldota.net/t/640x400/content/ec/ca/eccad447ebfc2122a5d2d4365d6e1b04687f3071.jpeg", address: "ул. Ломова, 64", currency: "KZT" },
    { id: "pav-a1", name: "Апартаменты SMART №9", price: 15000, rating: 4.6, type: 'apartment', image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800", address: "ул. Академика Сатпаева, 25", currency: "KZT" },
  ],
  "Усть-Каменогорск": [
    { id: "uk-h1", name: "Hostel 5 Rooms", price: 5500, rating: 4.8, type: 'hostel', image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800", address: "ул. Кабанбай Батыра, 101", currency: "KZT" },
    { id: "uk-a1", name: "Serikbayeva 23", price: 13000, rating: 4.2, type: 'apartment', image: "https://frankfurt.apollo.olxcdn.com/v1/files/se0pzmf0zu92-KZ/image;s=3024x4032", address: "ул. Серикбаева, 23", currency: "KZT" },
  ],
  "Усть-Каменогорск (Оскемен)": [
    { id: "uk-h1", name: "Hostel 5 Rooms", price: 5500, rating: 4.8, type: 'hostel', image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800", address: "ул. Кабанбай Батыра, 101", currency: "KZT" },
    { id: "uk-a1", name: "Serikbayeva 23", price: 13000, rating: 4.2, type: 'apartment', image: "https://frankfurt.apollo.olxcdn.com/v1/files/se0pzmf0zu92-KZ/image;s=3024x4032", address: "ул. Серикбаева, 23", currency: "KZT" },
  ],
  "Костанай": [
    { id: "kos-h1", name: "KostaHostel", price: 4500, rating: 4.7, type: 'hostel', image: "https://lh3.googleusercontent.com/p/AF1QipP5zAonNb-sUaQ_G25FMkFCH43L3H4VvqUvS5Y9=s680-w680-h510-rw", address: "ул. Аль-Фараби, 119", currency: "KZT" },
    { id: "kos-a1", name: "Airbnb Apartment", price: 17000, rating: 5.0, type: 'apartment', image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800", address: "пр. Абая, 156", currency: "KZT" },
  ],
  "Кызылорда": [
    { id: "kyz-h1", name: "Hostel Meruert", price: 4000, rating: 4.3, type: 'hostel', image: "https://i5.photo.2gis.com/photo-gallery/f7b39286-5810-4a5e-94d9-5157a84d9941_450x280.jpg", address: "ул. Айтеке би, 33", currency: "KZT" },
    { id: "kyz-a1", name: "Aray 2", price: 12000, rating: 4.4, type: 'apartment', image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=800", address: "ул. Желтоксан, 17", currency: "KZT" },
  ]
};