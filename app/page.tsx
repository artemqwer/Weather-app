"use client";

import { useState } from "react";
import dynamic from "next/dynamic"; // 1. Імпортуємо dynamic
import ImageComp from "./components/ImageComp";
import WeatherForm from "./components/WeatherForm";
import WeatherResults from "./components/WeatherResults";

// 2. Імпортуємо мапу динамічно і вимикаємо SSR (Server Side Rendering)
// Це вирішує проблему "window is not defined"
const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => <p className="text-gray-500">Завантаження мапи...</p>,
});

export default function Page() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null); // Можна додати тип, якщо є
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getWeather(e: any) {
    if (e) e.preventDefault(); // Запобігає перезавантаженню, якщо викликається з форми
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Використовуємо encodeURIComponent для міст з пробілами (наприклад "New York")
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!res.ok) {
        setError("Місто не знайдено / City not found");
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      console.log(data);
      setWeather(data);
      setCity("");
    } catch (error) {
      setError("Помилка отримання даних / Error fetching weather data");
    }
    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center gap-6 mt-6 p-4">
      <ImageComp />
      
      <WeatherForm city={city} setCity={setCity} getWeather={getWeather} />
      
      {error && <p className="text-red-500 font-bold">{error}</p>}
      
      {loading && <p className="text-orange-500">Loading...</p>}
      
      {weather && (
        <div className="flex flex-col items-center w-full max-w-2xl gap-6">
          {/* Компонент результатів погоди */}
          <WeatherResults weather={weather} />

          {/* 3. Виводимо мапу, ТІЛЬКИ якщо є координати */}
          {weather.coord && (
            <div className="w-full h-[400px] border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <Map lat={weather.coord.lat} lon={weather.coord.lon} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}