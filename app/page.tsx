"use client"
import { url } from "inspector";
import { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherResults from "./components/WeatherResults";

export default function Page() {
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const encodedCity = encodeURIComponent(city);
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
async function getWeather () {
  setLoading (true);
  setError("");
  setWeather(null);
  
try {
  const res = await fetch(`/api/weather?city=${city}`);
  if (!res.ok) {
    setError ("City not found");
    return;
  }
    const data = await res.json();
console.log(data);
setWeather(data);
setCity("");
} catch (error) {
  setError("Error fetching weather data");
}
setLoading(false); 
}
  return (
    <main className="flex flex-col items-center gap-6 mt-6">
   <WeatherForm city={city} setCity={setCity} getWeather={getWeather} />
    {error && <p className="text-red-500">{error}</p>}
    {loading && <p>Loading...</p>}
   {weather && <WeatherResults weather={weather} />}
    </main>
  );
}