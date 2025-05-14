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

  const displayCategories = allCategories;

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

  // Interest input handling
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

  // Custom category handling
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

    fetchEvents(city);
  };

  const filledCategories = Array.from(
    { length: 20 },
    (_, i) => allCategories[i] || null,
  );

  return loading ? (
    <main className="w-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center gap-6">
      <Jelly size={40} speed={0.9} color="#344e41" />
      <p>Loading, please wait...</p>
    </main>
  ) : (
    <main className="container mx-auto px-4 py-8 space-y-12">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold">Find. Explore. Enjoy.</h2>

      {/* Interests Section */}
      <section className="space-y-4">
        <div>
          <p className="font-bold text-lg">Add Interests</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Enter interest (e.g., Jazz, Comedy, Basketball)"
            value={interest}
            onChange={handleInterestChange}
            onKeyDown={handleKeyPress}
            className="h-14"
          />
          <Button
            onClick={addInterest}
            className="md:w-12 md:px-0 bg-primary hover:bg-primary-dark"
          >
            <Plus
              size={iconSize}
              className="hidden md:inline text-secondary-200 "
            />
            <span className="inline md:hidden text-secondary-200">Add</span>
          </Button>
        </div>
        {interests.length > 0 ? (
          <div className="flex flex-wrap gap-2">
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
          <p className="opacity-50 text-sm md:text-base">
            No interests added yet. Try adding your favorite types of events
            above.
          </p>
        )}
      </section>

      {/* aDD Categories section   */}

      <section className="flex flex-col gap-2 mt-4 ">
        <p className="font-bold">Add categories</p>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Enter custom category (e.g., Electronic Dance Music)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleCategoryKeyPress}
            className="h-14"
          />
          <Button onClick={addCustomCategory} className="md:w-12 md:px-0">
            <Plus
              size={iconSize}
              className="md:inline hidden text-secondary-200"
            />
            <span className="inline md:hidden text-secondary-200">Add</span>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="font-bold text-lg">Select Categories</p>

          {/* Grid: 4 rows × 5 cols, with gap */}
          <div className="grid grid-cols-5 grid-rows-4 gap-4 overflow-x-hidden">
            {defaultCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`
          px-3 py-2 text-secondary-200 text-sm rounded-lg  md:text-base font-normal
          ${
            activeCategories.includes(cat.id)
              ? "bg-accent-100"
              : "bg-accent-100 opacity-50"
          }
        `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Location and Search Section */}
      <aside className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Input
          placeholder="Enter country (e.g., United States)"
          value={country}
          className="md:col-span-2 h-14"
          onChange={(e) => setCountry(e.target.value)}
        />
        <Input
          placeholder="Enter city (e.g., Los Angeles)"
          value={city}
          className="md:col-span-2 h-14"
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="md:col-span-1  bg-primary hover:bg-primary-dark"
        >
          {loading ? (
            <span className="opacity-50 text-secondary-200">Searching...</span>
          ) : (
            "Discover"
          )}
        </Button>
      </aside>

      {/* Warnings */}
      {showCategoryWarning && (
        <p className="text-accent-100 font-medium text-sm md:text-base">
          Select at least 2 categories for better recommendations
        </p>
      )}
      {showInterestsWarning && (
        <p className="text-accent-100 font-medium text-sm md:text-base">
          Add at least 2 interests for personalized results
        </p>
      )}

      {/* Results Display */}
      {events.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold mt-6">Events For You</h3>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </main>
  );
};

export default Discover;
