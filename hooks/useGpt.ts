"use client";

import { useState, useCallback } from "react";
import { countryCodeMap } from "@/lib/countries";
import type { TicketmasterEvent } from "@/types/ticketmaster";

// Function to get country code from country name
const getCountryCode = (countryName: string): string => {
  return countryCodeMap[countryName] || "US";
};

export const useGpt = (
  city: string = "",
  countryName: string = "United States",
  interests: string[] = [],
  categories: string[] = [],
) => {
  const country = getCountryCode(countryName);
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch events with ChatGPT recommendations
  const fetchEvents = useCallback(
    async (overrideCity?: string) => {
      setLoading(true);
      setError(null);

      const effectiveCity = overrideCity || city;

      try {
        // Step 1: Fetch raw events from Ticketmaster
        const ticketmasterEvents = await fetchTicketmasterEvents(
          effectiveCity,
          country,
          categories,
        );

        if (!ticketmasterEvents || ticketmasterEvents.length === 0) {
          setError("No events found for your search criteria");
          setEvents([]);
          return;
        }

        // Step 2: Send events to ChatGPT for personalized filtering and recommendations
        const personalizedEvents = await getPersonalizedEventsFromGPT(
          ticketmasterEvents,
          interests,
          categories,
          city,
          countryName,
        );

        if (personalizedEvents && personalizedEvents.length > 0) {
          setEvents(personalizedEvents);
        } else {
          setEvents(ticketmasterEvents);
        }
      } catch (error: any) {
        console.error(`Error in event discovery process:`, error);
        setError("Failed to fetch events. Please try again.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    },
    [city, country, interests, categories],
  );

  // Fetch events from Ticketmaster API
  const fetchTicketmasterEvents = async (
    city: string,
    countryCode: string,
    categories: string[],
  ): Promise<TicketmasterEvent[]> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
      console.log("API Key:", apiKey); // Debugging line
      if (!apiKey) {
        throw new Error("Ticketmaster API key is missing");
      }

      // Combine multiple URLs for broader results
      const eventResults: TicketmasterEvent[] = [];
      const seenEventIds = new Set<string>();

      // Create multiple API calls - one general and one per category
      const apiCalls = [];

      // General call first
      let baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=${apiKey}`;

      if (city) {
        baseUrl += `&city=${encodeURIComponent(city)}`;
      }

      if (countryCode) {
        baseUrl += `&countryCode=${countryCode}`;
      }

      // General call
      apiCalls.push(baseUrl);

      // One call per category if provided
      if (categories && categories.length > 0) {
        for (const category of categories) {
          if (category) {
            const categoryUrl = `${baseUrl}&segmentName=${encodeURIComponent(
              category,
            )}`;
            apiCalls.push(categoryUrl);
          }
        }
      }

      // Execute all API calls in parallel
      for (const url of apiCalls) {
        try {
          const res = await fetch(url);

          if (!res.ok) {
            console.warn(`API error: ${res.status}`);
            continue;
          }

          const data = await res.json();

          if (data._embedded?.events) {
            const mappedEvents = data._embedded.events
              .filter((e: any) => !seenEventIds.has(e.id))
              .map((e: any) => {
                seenEventIds.add(e.id);

                return {
                  id: e.id,
                  name: e.name,
                  url: e.url,
                  image: e.images?.[0]?.url || "/fallback.jpg",
                  date: e.dates?.start?.dateTime
                    ? new Date(e.dates.start.dateTime).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )
                    : "Unknown Date",
                  time: e.dates?.start?.localTime
                    ? new Date(
                        `1970-01-01T${e.dates.start.localTime}Z`,
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "",
                  segment: e.classifications?.[0]?.segment?.name || "",
                  genre: e.classifications?.[0]?.genre?.name || "",
                  priceRanges:
                    e.priceRanges?.map((range: any) => ({
                      min: range.min ?? null,
                      max: range.max ?? null,
                      currency: range.currency || "USD",
                    })) || [],
                  city: e._embedded?.venues?.[0]?.city?.name || "",
                  venue: e._embedded?.venues?.[0]?.name || "",
                };
              });

            eventResults.push(...mappedEvents);
          }
        } catch (error) {
          console.error("Error fetching from Ticketmaster:", error);
        }
      }

      // Sort events by date
      eventResults.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      return eventResults;
    } catch (error) {
      console.error("Error fetching Ticketmaster events:", error);
      throw error;
    }
  };

  // Get personalized events from ChatGPT based on Ticketmaster results and user preferences
  const getPersonalizedEventsFromGPT = async (
    rawEvents: TicketmasterEvent[],
    interests: string[],
    categories: string[],
    city: string,
    countryName: string,
  ): Promise<TicketmasterEvent[] | null> => {
    try {
      const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      console.log("OpenAI API Key:", openaiKey); // Debugging line
      if (!openaiKey) {
        console.error("OpenAI API key is missing");
        return null;
      }

      // Number of events to include in the prompt (to avoid token limits)
      const maxEventsToProcess = Math.min(rawEvents.length, 30);
      const eventsToProcess = rawEvents.slice(0, maxEventsToProcess);

      // Build the prompt
      const prompt = `
        I need you to analyze these events and provide personalized recommendations.
        
        USER PREFERENCES:
        - Location: ${city || "Any"}, ${countryName || "Any"}
        - Interests: ${interests.join(", ") || "None specified"}
        - Categories: ${categories.join(", ") || "None specified"}
        
        RAW EVENT DATA:
        ${JSON.stringify(eventsToProcess)}
        
        INSTRUCTIONS:
        1. Analyze the events and select/rerank them based on the user's interests and preferred categories
        2. Return only events that match the user's preferences
        3. If the user has specified interests, prioritize events related to those interests
        4. Return the events in the exact same data structure as provided
        5. You can modify event names or descriptions slightly to better highlight why they match user interests
        6. Return up to ${Math.min(20, maxEventsToProcess)} most relevant events
        
        Return ONLY a valid JSON array of events in the EXACT same structure as the input data. Do not include any additional text or explanation in your response.
      `;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              role: "system",
              content:
                "You are a JSON-only response assistant that returns personalized event recommendations. You NEVER include any text outside of the JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 4000,
          temperature: 0.5,
        }),
      });

      if (!res.ok) {
        throw new Error(`GPT API error: ${res.status}`);
      }

      const data = await res.json();
      const responseContent = data.choices?.[0]?.message?.content.trim();

      if (responseContent) {
        try {
          // Extract JSON from response if needed
          let jsonContent = responseContent;
          if (!responseContent.startsWith("[")) {
            const jsonMatch = responseContent.match(/(\[[\s\S]*\])/);
            if (jsonMatch) {
              jsonContent = jsonMatch[0];
            }
          }

          // Parse the personalized events
          const personalizedEvents = JSON.parse(
            jsonContent,
          ) as TicketmasterEvent[];

          if (
            Array.isArray(personalizedEvents) &&
            personalizedEvents.length > 0
          ) {
            // Ensure all required fields are present
            const validEvents = personalizedEvents.filter(
              (event) => event.id && event.name && event.date && event.segment,
            );

            return validEvents;
          }
        } catch (parseError) {
          console.error("Error parsing GPT response:", parseError);
        }
      }

      return null;
    } catch (error) {
      console.error("Error getting personalized events from GPT:", error);
      return null;
    }
  };

  return {
    events,
    fetchEvents,
    loading,
    error,
  };
};
