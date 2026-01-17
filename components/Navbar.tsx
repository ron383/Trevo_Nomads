"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Планирование", href: "/" },
    { name: "Профиль", href: "/profile" },
    { name: "Отзывы", href: "/reviews" }, // ДОБАВЛЕНО: Ссылка на страницу отзывов
    { name: "О проекте", href: "/about" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <nav className="w-full bg-black/40 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Левая часть: Логотип и Навигация */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-indigo-500/30 group-hover:border-indigo-500 transition-colors bg-gray-900">
              <Image 
                src="/logo.png" 
                alt="Logo"
                fill
                priority 
                className="object-cover"
                sizes="48px"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-tight italic">
              Trevo <span className="text-indigo-500">Nomads</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all relative py-2 ${
                  pathname === link.href
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Правая часть: Статус и Выход */}
        <button 
          onClick={handleSignOut}
          className="text-xs font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-all active:scale-95"
        >
          Выйти
        </button>
      </div>
    </nav>
  );
}