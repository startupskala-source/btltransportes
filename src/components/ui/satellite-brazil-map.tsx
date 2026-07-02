"use client";

import { useEffect, useRef } from "react";

export interface SatPin {
  city: string;
  uf: string;
  lat: number;
  lng: number;
  hq?: boolean;
}

interface Props {
  pins: SatPin[];
  color?: string;
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

function ensureLeafletCSS() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-leaflet="1"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = LEAFLET_CSS;
  link.setAttribute("data-leaflet", "1");
  document.head.appendChild(link);
}

export function SatelliteBrazilMap({ pins, color = "#7a1f2b" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    ensureLeafletCSS();

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      // Brazil bounds
      const bounds = L.latLngBounds(
        L.latLng(-34.0, -74.0),
        L.latLng(5.5, -34.0),
      );

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
        worldCopyJump: false,
      });
      mapRef.current = map;

      // Esri World Imagery (satellite)
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 18,
          attribution:
            "Imagery © Esri, Maxar, Earthstar Geographics",
        },
      ).addTo(map);

      // Labels overlay (country/state names)
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18, opacity: 0.9 },
      ).addTo(map);

      map.fitBounds(bounds, { padding: [20, 20] });

      const hq = pins.find((p) => p.hq);

      // Connection lines (HQ -> others)
      if (hq) {
        pins
          .filter((p) => !p.hq)
          .forEach((p) => {
            L.polyline(
              [
                [hq.lat, hq.lng],
                [p.lat, p.lng],
              ],
              {
                color,
                weight: 2.5,
                opacity: 0.95,
                dashArray: "6 6",
              },
            ).addTo(map);
          });
      }

      // Pins
      pins.forEach((p) => {
        const size = p.hq ? 18 : 14;
        const html = `
          <div style="position:relative;width:${size}px;height:${size}px;">
            ${p.hq ? `<span style="position:absolute;inset:-10px;border-radius:9999px;background:${color};opacity:.25;animation:btlPulse 2.2s ease-out infinite;"></span>` : ""}
            <span style="position:absolute;inset:0;border-radius:9999px;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.55);"></span>
          </div>
          <div style="position:absolute;left:${size + 8}px;top:50%;transform:translateY(-50%);font-family:Barlow,sans-serif;font-weight:800;font-size:${p.hq ? 14 : 12}px;letter-spacing:.06em;color:#fff;text-shadow:0 0 3px #000,0 0 6px #000;white-space:nowrap;">${p.uf}</div>
        `;
        const icon = L.divIcon({
          className: "btl-pin",
          html,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
        L.marker([p.lat, p.lng], { icon }).addTo(map)
          .bindPopup(`<strong>${p.city}/${p.uf}</strong>${p.hq ? " · Matriz" : ""}`);
      });

      const onResize = () => map.invalidateSize();
      window.addEventListener("resize", onResize);
      setTimeout(onResize, 200);

      (map as any)._btlCleanup = () => window.removeEventListener("resize", onResize);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        try { (mapRef.current as any)._btlCleanup?.(); } catch {}
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [pins, color]);

  return (
    <>
      <style>{`
        @keyframes btlPulse {
          0% { transform: scale(.6); opacity: .6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .btl-pin { overflow: visible !important; }
        .leaflet-container { background: #0a0a0a; font-family: inherit; }
      `}</style>
      <div ref={containerRef} className="h-full w-full" />
    </>
  );
}

export default SatelliteBrazilMap;
