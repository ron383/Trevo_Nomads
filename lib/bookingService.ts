import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";

export interface Booking {
  id?: string;
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
  hotel: any;
  transport: any;
  totalPrice?: number;
  createdAt: any;
}

export const saveBooking = async (bookingData: Omit<Booking, "id" | "createdAt">) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding booking: ", error);
    throw error;
  }
};

export const getUserBookings = async (userId: string) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return [];
  }
};
