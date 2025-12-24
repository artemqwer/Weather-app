"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// --- Фікс для іконок Leaflet у Next.js ---
// Без цього маркер може бути невидимим або битим
const iconFix = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

type MapProps = {
  lat: number;
  lon: number;
};

export default function Map({ lat, lon }: MapProps) {
  
  useEffect(() => {
    iconFix();
  }, []);

  return (
    // key={`${lat}-${lon}`} змушує мапу перемалюватися, коли координати змінюються
    <MapContainer
      key={`${lat}-${lon}`} 
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          Тут ваша погода! <br /> {lat}, {lon}
        </Popup>
      </Marker>
    </MapContainer>
  );
}