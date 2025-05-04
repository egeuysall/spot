"use client";

import React from "react";
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

  const handleSearch = () => {
    setSearchCity(city);
    setSearchCountry(country);
  };

  React.useEffect(() => {
    if (searchCity || searchCountry) {
      fetchEvents();
    }
  }, [searchCity, searchCountry, fetchEvents]);

  return (
    <main className="flex flex-col gap-20">
      <section className="w-full flex flex-col gap-4">
        <h2>Upcoming Events</h2>
        <aside className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <Input
            placeholder="Enter country"
            value={country}
            className="col-span-2"
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            placeholder="Enter city"
            value={city}
            className="col-span-2"
            onChange={(e) => setCity(e.target.value)}
          />
          <Button className="col-span-1" onClick={handleSearch}>
            Discover
          </Button>
        </aside>
        {hookEvents.length > 0 ? (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {hookEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                image={event.image || "/fallback.jpg"}
              />
            ))}
          </ul>
        ) : (
          <p className="opacity-50 text-sm md:text-base">
            No events found. Try another city.
          </p>
        )}
      </section>
    </main>
  );
};

export default Discover;
