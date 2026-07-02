"use client";

import { useEffect, useState } from "react";

const ROUTES = [
  { from: "GRU", to: "GIG" },
  { from: "GRU", to: "CNF" },
  { from: "GRU", to: "CWB" },
  { from: "GRU", to: "POA" },
  { from: "GRU", to: "BSB" },
  { from: "GRU", to: "SSA" },
  { from: "GRU", to: "REC" },
  { from: "GRU", to: "FOR" },
  { from: "GRU", to: "MAO" },
];

export function FiliaisFlightMap() {
  const [Mod, setMod] = useState<null | typeof import("./flightcn-flight-routes")>(null);

  useEffect(() => {
    let alive = true;
    import("./flightcn-flight-routes").then((m) => {
      if (alive) setMod(m);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!Mod) {
    return (
      <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-primary/5" />
    );
  }

  const { Map, FlightRoutes } = Mod;

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl border border-primary/15 bg-background shadow-elegant aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/3]">
        <div className="absolute inset-0">
          <Map center={[-52, -14]} zoom={3.1}>
            <FlightRoutes
              routes={ROUTES}
              color="oklch(0.42 0.15 18)"
              showAirports
              showLabel
              hoverEffect
              tripType="one-way"
              lineStyle="dash"
              animate={{ duration: 6000 }}
            />
          </Map>
        </div>
      </div>
    </div>
  );
}