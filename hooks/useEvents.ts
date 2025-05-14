"use client";

import { useState, useCallback } from "react";
import type { TicketmasterEvent } from "../types/ticketmaster";
import { countryCodeMap } from "@/lib/countries";

// Function to get country code from country name
const getCountryCode = (countryName: string): string => {
  return countryCodeMap[countryName];
};

export const useEvents = (
  segment: string = "everything",
  city: string = "",
  countryName: string = "United States",
) => {
  const country = getCountryCode(countryName);
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?size=50&countryCode=${country}${
          segment !== "everything" ? `&segmentName=${segment}` : ""
        }${city ? `&city=${city}` : ""}&apikey=${
          process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY
        }`,
      );

      if (!res.ok) {
        throw new Error("There is an issue fetching events.");
      }

      const data = await res.json();
      console.log(data);

      const mapped =
        data._embedded?.events?.map((e: any) => ({
          id: e.id,
          name: e.name,
          url: e.url,
          image: e.images?.[0]?.url || "/fallback.jpg",
          date: e.dates.start.dateTime
            ? new Date(e.dates.start.dateTime).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Unknown Date",
          time: e.dates.start.localTime
            ? new Date(
                `1970-01-01T${e.dates.start.localTime}Z`,
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })
            : "",
          segment: e.classifications?.[0]?.segment?.name || "",
          genre: e.classifications?.[0]?.genre?.name || "",
          // This part handles price ranges directly from the event data.
          priceRanges:
            e.priceRanges?.map((range: any) => ({
              min: range.min ?? null,
              max: range.max ?? null,
              currency: range.currency || "USD", // Default to USD if currency is not available
            })) || [],
          city: e._embedded?.venues?.[0]?.city?.name || "",
          venue: e._embedded?.venues?.[0]?.name || "",
        })) || [];

      // Sort events by date
      mapped.sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      setEvents(mapped || []);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }, [segment, city, country]);

  return { events, fetchEvents };
};
