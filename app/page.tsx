import React from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";

// Next.js components
import Link from "next/link";

// Custom features and logic
import { features } from "@/lib/features";

// Page sections and components
import StartNewsletter from "@/components/StartNewsletter";
import ContactForm from "@/components/ContactForm";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col gap-20">
      <section className="w-full flex flex-col gap-4">
        <h1>Discover Events You&apos;ll Actually Love with Spot.</h1>
        <p>
          AI-powered event recommendations based on your vibe and interests.
        </p>
        <div className="flex gap-4">
          <Link href="/get-started" className="flex w-full md:w-auto">
            <Button className="w-full button py-5.5 px-3.5 text-base font-bold">
              Get started
            </Button>
          </Link>
        </div>
      </section>
      <section className="w-full flex flex-col gap-4">
        <h2>Tailored for You</h2>
        <aside className="grid md:grid-cols-2 gap-4 mt-4">
          {features.map((feature) => {
            return (
              <div className="col-span-2 md:col-span-1 w-full" key={feature.id}>
                <Card {...feature} />
              </div>
            );
          })}
        </aside>
      </section>
      <section className="w-full flex flex-col gap-4">
        <h2>Stay in the loop</h2>
        <StartNewsletter />
      </section>
      <section className="w-full flex flex-col gap-4">
        <h2>React out</h2>
        <ContactForm />
      </section>
    </main>
  );
};

export default Home;
