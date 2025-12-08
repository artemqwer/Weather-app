"use client";
export default function WeatherResults({ weather }: { weather: any }) {
    
    if (!weather || !weather.main || !weather.weather) {
       return (
        <div className="text-red-500 text-center mt-4 border border-gray-400 rounded-lg px-4 py-2 w-64 items-center flex flex-col gap-4 mt-4">No weather data available</div>
       ) 
    }
    const city: string = weather.name;
    const temperature: number = weather.main.temp;
    const desc = weather.weather[0].description;

    return (
        <div className=" border border-gray-400 rounded-lg px-4 py-2 w-64 items-center flex flex-col gap-4 mt-4">
            <h2>Weather in {city}</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Description: {desc}</p>
        </div>
    );
}