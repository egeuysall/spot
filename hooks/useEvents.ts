"use client";

import { useState, useEffect, useCallback } from "react";
import type { TicketmasterEvent } from "../types/ticketmaster";

export const useEvents = (
  segment: string = "everything",
  city: string = ""
) => {
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?size=200&countryCode=US${
          segment !== "everything" ? `&segmentName=${segment}` : ""
        }${city ? `&city=${city}` : ""}&apikey=${
          process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY
        }`
      );

      if (!res.ok) {
        throw new Error("There is an issue fetching events.");
      }

      const data = await res.json();

      const mapped = data._embedded?.events.map((e: any) => ({
        id: e.id,
        name: e.name,
        url: e.url,
        image: e.images?.[0]?.url || "",
        date: new Date(e.dates.start.dateTime).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: e.dates.start.localTime
          ? new Date(
              `1970-01-01T${e.dates.start.localTime}Z`
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })
          : "",
        segment: e.classifications?.[0]?.segment?.name || "",
        genre: e.classifications?.[0]?.genre?.name || "",
        priceMin: e.priceRanges?.[0]?.min ?? null,
        priceMax: e.priceRanges?.[0]?.max ?? null,
        city: e._embedded?.venues?.[0]?.city?.name || "",
        venue: e._embedded?.venues?.[0]?.name || "",
      }));

      mapped.sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setEvents(mapped || []);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }, [segment, city]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events };
};
