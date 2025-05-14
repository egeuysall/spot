"use client";

import React, { useCallback } from "react";
import { EventCard } from "@/components/ui/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/hooks/useEvents";

const Discover: React.FC = () => {
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const segment = "everything";
  const [searchCity, setSearchCity] = React.useState("");
  const [searchCountry, setSearchCountry] = React.useState("");

  const { events: hookEvents, fetchEvents } = useEvents(
    segment,
    searchCity,
    searchCountry,
  );

  const handleSearch = useCallback(() => {
    setSearchCity(city);
    setSearchCountry(country);
  }, [city, country]);

  React.useEffect(() => {
    if (searchCity || searchCountry) {
      fetchEvents();
    }
  }, [searchCity, searchCountry, fetchEvents]);

  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      <section className="space-y-6 ml-4 p-4">
        <h2 className="text-4xl font-bold">Discover Events</h2>
        <aside className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Enter country"
            value={country}
            className="py-4"
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            placeholder="Enter city"
            value={city}
            className="py-4"
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="md:col-span-2 flex justify-center">
            <Button onClick={handleSearch} className="py-4">
              Discover
            </Button>
          </div>
          {hookEvents.length === 0 && (
            <div className="md:col-span-2 flex justify-center">
              <p className="text-center text-gray-500 text-sm md:text-base">
                No events found. Try another city.
              </p>
            </div>
          )}
        </aside>
        {hookEvents.length > 0 && (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {hookEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                image={event.image || "/fallback.jpg"}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Discover;
