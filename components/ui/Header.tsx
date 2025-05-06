"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, FC } from "react";
import { Menu, X } from "lucide-react";
import menuItems from "@/lib/headerItems";
import { year } from "@/utils/date";
import { iconSize } from "@/utils/design";

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="fixed top-6 left-0 right-0 z-10 flex justify-center px-9 md:px-7 w-full">
      <div className="w-full">
        <header className="backdrop-blur-lg bg-primary-200/75 py-3.5 px-6 rounded-lg flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex gap-2 items-center flex-shrink-0">
            <Image
              width={iconSize}
              height={iconSize}
              className="transition hover:opacity-75 "
              alt="Logo"
              src="/logos/header-icon.svg"
            />
            <span className="font-bold text-base hidden md:flex">Spot</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <span key={item.id} className="text-base transition duration-200">
                <Link href={item.link} className="text-base">
                  {item.title}
                </Link>
              </span>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center text-primary-400"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={iconSize} /> : <Menu size={iconSize} />}
          </button>
        </header>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-primary-100 z-40 md:hidden flex flex-col">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-primary-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex gap-2 items-center"
            >
              <Image
                width={iconSize}
                height={iconSize}
                className="transition hover:opacity-75"
                alt="Logo"
                src="/logos/header-icon.svg"
              />
              <span className="font-bold text-base">Spot</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 "
              aria-label="Close menu"
            >
              <X size={iconSize} className="text-primary-400" />{" "}
              {/* Use Lucide X icon */}
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id} className="text-center w-full">
                <Link href={item.link}>
                  <h3 className="mb-2">{item.title}</h3>
                </Link>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="py-4 text-center text-sm text-primary-400 border-t border-primary-200">
            &copy; {year} Spot
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
