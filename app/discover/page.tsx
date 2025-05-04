"use client";

import React from "react";
import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "@/components/ui/EventCard";
import { Input } from "@/components/ui/input";

const Discover: React.FC = () => {
  const { events } = useEvents();
  const [city, setCity] = React.useState("");
  const filteredEvents = events.filter((event) =>
    city ? event.city.toLowerCase().includes(city.toLowerCase()) : true,
  );

  return (
    <main className="flex flex-col gap-20">
      <section className="w-full flex flex-col gap-4">
        <h2>Upcoming Events</h2>
        <Input
          placeholder="Enter city (US)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {filteredEvents.length > 0 ? (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
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
