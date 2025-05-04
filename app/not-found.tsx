import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="w-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center gap-6">
      <Image
        width={64}
        height={64}
        alt="Page not found icon"
        src="/logos/header-icon.svg"
        className="mx-auto"
      />
      <h2>Sorry, we couldn&apos;t find that page.</h2>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </main>
  );
}
