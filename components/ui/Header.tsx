"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import menuItems from "@/lib/headerItems";

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4">
      <motion.div
        className="relative w-full"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <header
          className={`relative backdrop-blur-lg bg-white/75 dark:bg-black/75 py-3 px-4 sm:px-6 rounded-lg flex justify-between items-center transition-shadow duration-200 ${
            scrolled ? "shadow-md" : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex gap-2 items-center flex-shrink-0">
            <Image
              width={24}
              height={24}
              className="transition hover:opacity-75 dark:invert"
              alt="Logo"
              src="/logos/header-logo.svg"
            />
            <span className="font-bold text-lg hidden sm:inline">Astra UI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <span
                key={item.id}
                className="font-medium text-sm text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {item.title}
              </span>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center p-1 -mr-1 text-black dark:text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Optional: Animated Border */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                className="absolute inset-0 rounded-lg border dark:border-neutral-800 border-neutral-200 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </header>
      </motion.div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-black z-40 md:hidden flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-800 border-neutral-200">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex gap-2 items-center"
              >
                <Image
                  width={24}
                  height={24}
                  className="transition hover:opacity-75 dark:invert"
                  alt="Logo"
                  src="/logos/header-logo.svg"
                />
                <span className="font-bold text-lg">Astra UI</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-black dark:text-white"
                aria-label="Close menu"
              >
                <X size={28} /> {/* Use Lucide X icon */}
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.id} className="text-center w-full">
                  <h3 className=" text-black dark:text-white mb-2">
                    {item.title}
                  </h3>
                </div>
              ))}
            </nav>

            {/* Mobile Menu Footer */}
            <div className="py-4 text-center text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
              &copy; {year} Astra UI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
