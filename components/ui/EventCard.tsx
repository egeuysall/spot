import React from "react";
import Link from "next/link";
import Image from "next/image";

import type { TicketmasterEvent } from "@/types/ticketmaster";

export const EventCard: React.FC<TicketmasterEvent> = ({
  name,
  url,
  image,
  date,
  time,
  segment,
  genre,
  priceRanges,
  city,
  venue,
}) => {
  // Ensure priceRanges is always an array
  const safePriceRanges = Array.isArray(priceRanges) ? priceRanges : [];

  return (
    <Link href={url} className="w-full">
      <section className="rounded-lg flex flex-col gap-3 bg-primary-200 p-6 w-full">
        <Image
          alt={`${name} image`}
          width={360}
          height={360}
          src={image}
          className="object-cover rounded-lg h-auto w-auto"
          quality={20}
          priority={false}
        />
        <div>
          <h4>{name}</h4>
          <p className="opacity-50 text-sm md:text-base w-full">
            {date}, {time} &#8226; {city}, {venue}
          </p>
        </div>
        <p className="w-full">
          This event falls under the <strong>{segment.toLowerCase()}</strong>{" "}
          segment and is categorized as a <strong>{genre.toLowerCase()}</strong>{" "}
          event. For more details, visit{" "}
          <span className="underline text-primary-300 hover:opacity-50 transition duration-200">
            {url.length > 40 ? `${url.slice(0, 24)}...` : url}
          </span>
        </p>
        <p className="text-sm md:text-base font-bold">
          {safePriceRanges.length > 0
            ? safePriceRanges.map((range, index) => (
                <span key={index}>
                  ${range.min} - ${range.max} {range.currency}
                  {index < safePriceRanges.length - 1 && " | "}
                </span>
              ))
            : "Pricing information is unavailable."}
        </p>
      </section>
    </Link>
  );
};
