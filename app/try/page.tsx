"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/ui/EventCard";
import { Jelly } from "ldrs/react";
import "ldrs/react/Jelly.css";

import { useGpt } from "@/hooks/useGpt";

import { iconSize } from "@/utils/design";
import type { CategoryType } from "@/types/tryTypes";
import { defaultCategories } from "@/lib/tryData";

import { Plus, X } from "lucide-react";

const Discover: React.FC = () => {
  // State for location
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchCountry, setSearchCountry] = useState<string>("");

  // State for interests
  const [interests, setInterests] = useState<string[]>([]);
  const [interest, setInterest] = useState<string>("");

  // State for categories
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  // State for warnings
  const [showCategoryWarning, setShowCategoryWarning] =
    useState<boolean>(false);
  const [showInterestsWarning, setShowInterestsWarning] =
    useState<boolean>(false);

  // Combine default and custom categories
  const allCategories = [...defaultCategories, ...customCategories];

  // Hook for getting events
  const { events, fetchEvents, loading } = useGpt(
    searchCity,
    searchCountry,
    interests,
    activeCategories
      .map((id) => {
        const category = allCategories.find((c) => c.id === id);
        return category ? category.name : "";
      })
      .filter(Boolean),
  );

  // Add interest handling
  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim().endsWith(",")) {
      const trimmed = value.trim().slice(0, -1);
      if (trimmed) {
        addInterestToList(trimmed);
      }
      setInterest("");
    } else {
      setInterest(value);
    }
  };

  const addInterestToList = (text: string) => {
    const trimmed = text.trim();
    if (trimmed) {
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      // Check for duplicates (case-insensitive)
      if (
        !interests.some((i) => i.toLowerCase() === capitalized.toLowerCase())
      ) {
        setInterests((prev) => [...prev, capitalized]);
      }
    }
  };

  const addInterest = () => {
    addInterestToList(interest);
    setInterest("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest();
    }
  };

  // Add custom category
  const addCustomCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed) {
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      const newId = `custom-${Date.now()}`;
      const newCustomCategory = {
        id: newId,
        name: capitalized,
        segment: capitalized.toLowerCase(),
      };

      // Check if category already exists
      if (
        !allCategories.some(
          (cat) => cat.name.toLowerCase() === capitalized.toLowerCase(),
        )
      ) {
        setCustomCategories((prev) => [...prev, newCustomCategory]);
        setActiveCategories((prev) => [...prev, newId]);
      }

      setNewCategory("");
    }
  };

  const handleCategoryKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomCategory();
    }
  };

  // Remove interest
  const removeInterest = (index: number) => {
    setInterests((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setActiveCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  // Remove custom category
  const removeCustomCategory = (categoryId: string) => {
    setCustomCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    setActiveCategories((prev) => prev.filter((id) => id !== categoryId));
  };

  // Handle search
  const handleSearch = () => {
    setSearchCity(city);
    setSearchCountry(country);

    // Show minimal warnings if needed
    let showWarnings = false;

    if (activeCategories.length < 2 && allCategories.length === 0) {
      setShowCategoryWarning(true);
      setTimeout(() => setShowCategoryWarning(false), 5000);
      showWarnings = true;
    }

    if (interests.length < 2) {
      setShowInterestsWarning(true);
      setTimeout(() => setShowInterestsWarning(false), 5000);
      showWarnings = true;
    }

    if (showWarnings) return;

    // If just showing warnings but still have some input, proceed anyway
    fetchEvents(city);
  };

  return (
    <>
      {loading ? (
        <main className="w-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center gap-6">
          <Jelly size={40} speed={0.9} color="#344e41" />
          <p>Loading, please wait...</p>
        </main>
      ) : (
        <main className="flex flex-col gap-20">
          <section className="w-full flex flex-col gap-4">
            <h2>Find. Explore. Enjoy.</h2>

            {/* Interest input section */}
            <section className="flex flex-col gap-2">
              <div>
                <p className="font-bold">Add interests</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Enter interest (e.g., jazz, comedy, basketball)"
                  value={interest}
                  onChange={handleInterestChange}
                  onKeyDown={handleKeyPress}
                />
                <Button onClick={addInterest} className="md:w-12 md:px-0">
                  <Plus
                    size={iconSize}
                    className="md:inline hidden text-secondary-200"
                  />
                  <span className="inline md:hidden text-secondary-200">
                    Add
                  </span>
                </Button>
              </div>
            </section>

            {/* Interests display */}
            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {interests.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-accent-100 rounded-lg px-2 py-1 flex items-center gap-1"
                  >
                    <span className="text-secondary-200 text-sm md:text-base">
                      {item}
                    </span>
                    <button
                      onClick={() => removeInterest(idx)}
                      aria-label={`Remove ${item}`}
                    >
                      <X size={iconSize - 10} className="text-secondary-200" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="opacity-50 text-sm md:text-base mb-2">
                No interests added yet. Try adding your favorite types of events
                above.
              </p>
            )}

            {/* Custom category input */}
            <section className="flex flex-col gap-2 mt-4">
              <p className="font-bold">Add categories</p>
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Enter custom category (e.g., Electronic Dance Music)"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={handleCategoryKeyPress}
                />
                <Button onClick={addCustomCategory} className="md:w-12 md:px-0">
                  <Plus
                    size={iconSize}
                    className="md:inline hidden text-secondary-200"
                  />
                  <span className="inline md:hidden text-secondary-200">
                    Add
                  </span>
                </Button>
              </div>
            </section>

            {/* Categories section */}
            <section className="flex flex-col gap-4">
              <p className="font-bold">Select categories</p>
              <div className="flex overflow-x-auto gap-4">
                {defaultCategories.map(({ id, name }) => (
                  <Button
                    key={id}
                    onClick={() => toggleCategory(id)}
                    className={`${
                      activeCategories.includes(id)
                        ? "bg-accent-100"
                        : "bg-accent-100 opacity-50"
                    } text-secondary-200 text-sm md:text-base font-normal !px-2 !py-1`}
                  >
                    {name}
                  </Button>
                ))}

                {customCategories.map(({ id, name }) => (
                  <div key={id} className="flex items-center">
                    <Button
                      onClick={() => toggleCategory(id)}
                      className={`${
                        activeCategories.includes(id)
                          ? "bg-accent-100"
                          : "bg-accent-100 opacity-50"
                      } text-secondary-200 text-sm md:text-base font-normal !px-2 !py-1 flex !gap-1`}
                    >
                      {name}
                      <X
                        size={iconSize - 10}
                        aria-label={`Remove ${name} category`}
                        onClick={() => removeCustomCategory(id)}
                      />
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            {/* Location and search section */}
            <aside className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Input
                placeholder="Enter country (e.g., United States)"
                value={country}
                className="md:col-span-2"
                onChange={(e) => setCountry(e.target.value)}
              />
              <Input
                placeholder="Enter city (e.g., Los Angeles)"
                value={city}
                className="md:col-span-2"
                onChange={(e) => setCity(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="bg-primary hover:bg-primary-dark"
              >
                {loading ? (
                  <span className="opacity-50 text-secondary-200">
                    Searching...
                  </span>
                ) : (
                  "Discover"
                )}
              </Button>
            </aside>

            {/* Warnings */}
            {showCategoryWarning && (
              <p className="text-accent-100 font-medium text-sm md:text-base mt-2">
                Select at least 2 categories for better recommendations
              </p>
            )}
            {showInterestsWarning && (
              <p className="text-accent-100 font-medium text-sm md:text-base mt-2">
                Add at least 2 interests for personalized results
              </p>
            )}

            {/* Results display */}
            {!loading && events.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mt-6">Events For You</h3>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      {...event}
                      image={event.image || "/fallback.jpg"}
                    />
                  ))}
                </ul>
              </>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default Discover;
