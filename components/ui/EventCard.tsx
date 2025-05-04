"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import type { TicketmasterEvent } from "@/types/ticketmaster";
import { HeartPlus } from "lucide-react";
import { HeartMinus } from "lucide-react";
import { iconSize } from "@/utils/design";

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
  const [liked, setLiked] = useState(false);

  const safePriceRanges = Array.isArray(priceRanges) ? priceRanges : [];

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <section className="rounded-lg flex flex-col gap-3 bg-primary-200 p-6 w-full">
      <Link href={url} className="w-full">
        <Image
          alt={`${name} image`}
          width={360}
          height={360}
          src={image}
          className="object-cover rounded-lg w-full"
          quality={20}
          priority={false}
        />
      </Link>
      <div className="flex items-center">
        <section>
          <h5 className="w-full">{name}</h5>
          <p className="opacity-50 text-sm md:text-base w-full">
            {date}, {time} &#8226; {city}, {venue}
          </p>
        </section>
        <button className="text-primary-500" onClick={handleLike}>
          {liked ? (
            <HeartMinus size={iconSize} />
          ) : (
            <HeartPlus size={iconSize} />
          )}
        </button>
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
  );
};
