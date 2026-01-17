"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase"; // Убедитесь, что путь верный
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  // 1. Загрузка отзывов в реальном времени
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(docs);
    });
    return () => unsubscribe();
  }, []);

  // 2. Функция отправки отзыва
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newReview.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "reviews"), {
        text: newReview,
        rating: rating,
        userName: user.displayName || "Анонимный кочевник",
        userPhoto: user.photoURL || "",
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      setNewReview("");
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Не удалось сохранить отзыв.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-center italic text-indigo-500">Отзывы номадов</h1>

        {/* Форма отзыва */}
        {user ? (
          <form onSubmit={handleSubmit} className="bg-[#111218] border border-white/5 p-6 rounded-[2rem] space-y-4">
            <h3 className="text-xl font-bold">Оставить отзыв</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} type="button" 
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-600"}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Поделитесь вашими впечатлениями о поездке..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-indigo-500 outline-none h-32"
            />
            <button
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all disabled:opacity-50"
            >
              {loading ? "Отправка..." : "Опубликовать"}
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-500">Войдите, чтобы оставить отзыв.</p>
        )}

        {/* Список отзывов */}
        <div className="grid gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-[#111218] border border-white/5 p-6 rounded-[2rem] hover:border-white/10 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-xl font-bold text-indigo-400">
                  {rev.userName[0]}
                </div>
                <div>
                  <h4 className="font-bold">{rev.userName}</h4>
                  <div className="flex text-yellow-500 text-xs">
                    {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}