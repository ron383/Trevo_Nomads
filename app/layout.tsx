"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Импортируем компонент Image


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Скрываем Navbar на странице авторизации
  const isAuthPage = pathname === "/auth";

  return (
    <html lang="ru">
      <head>
        <title>Trevo Nomads</title>
        <meta name="description" content="Enjoy your holiday" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <AuthProvider>
          {/* Если вы хотите, чтобы логотип был частью Navbar, 
              лучше вставить его внутри компонента Navbar.tsx.
              Ниже приведен пример, как это будет выглядеть в коде Navbar. */}
          {!isAuthPage && <Navbar />}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}