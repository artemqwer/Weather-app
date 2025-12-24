"use client";

import React from "react";

// Описуємо типи пропсів, щоб TypeScript не сварився
type WeatherFormProps = {
  city: string;
  setCity: (city: string) => void;
  getWeather: (e: React.FormEvent) => void; // Вказуємо, що це функція, яка приймає подію форми
};

const WeatherForm = ({ city, setCity, getWeather }: WeatherFormProps) => {
  return (
    <form onSubmit={getWeather} className="flex w-full max-w-md items-center space-x-2">
      <input
        type="text"
        placeholder="Введіть місто (напр. Київ)"
        className="flex-1 p-2 border border-gray-300 rounded-lg text-Orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Пошук
      </button>
    </form>
  );
};

export default WeatherForm;