"use client";
interface WeatherFormProps {
    city: string;
    setCity: (city: string) => void;
    getWeather: () => void;
}

export default function WeatherForm({ city, setCity, getWeather }: { city: string; setCity: (city: string) => void; getWeather: () => void }) {
return (
    <div className="flex flex-col items-center gap-4">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" className="border border-gray-400 rounded-lg px-4 py-2 w-64"/>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover: bg-orange-600 active: scale-95 transition font-medium" onClick={getWeather}>Отримати погоду</button>
    </div>
);
};