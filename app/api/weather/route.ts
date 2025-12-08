const WEATHER_KEY = process.env.WEATHER_KEY;
export async function GET(request: Request) {
  const url = new URL(request.url);
  const city = url.searchParams.get("city") 
  if (!city) {
    return new Response(JSON.stringify({ error: "City parameter is required" }), { status: 400 });
  }

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}&units=metric`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}