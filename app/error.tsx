import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function ServerError() {
  return (
    <main className="w-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center gap-6">
      <Image
        width={64}
        height={64}
        alt="Logo"
        src="/logos/header-logo.svg"
        className="mx-auto"
      />
      <h2>Oops, something went wrong on our end.</h2>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </main>
  );
}
