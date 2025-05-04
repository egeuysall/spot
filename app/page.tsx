import React from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Enter your city"
            type="text"
            autoComplete="address-level2"
            className="form-input col-span-1 md:col-span-3"
          />
          <Link href="/try" className="flex w-full md:col-span-1">
            <Button className="w-full">Try</Button>
          </Link>
        </div>
      </section>
      <section className="w-full flex flex-col gap-4">
        <h2>Tailored for You</h2>
        <aside className="grid md:grid-cols-2 gap-4">
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
        <h2>Reach out</h2>
        <ContactForm />
      </section>
    </main>
  );
};

export default Home;
