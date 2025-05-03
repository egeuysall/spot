"use client";

import React from "react";
import { Jelly } from "ldrs/react";
import "ldrs/react/Jelly.css";

export default function Loading() {
  return (
    <main className="w-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center gap-6">
      <Jelly size={40} speed={0.9} color="#344e41" />
      <p>Loading, please wait...</p>
    </main>
  );
}
