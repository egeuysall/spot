import React from "react";
import Link from "next/link";
import { Globe, Github, Mail } from "lucide-react";
import { year } from "@/utils/date";
import { iconSize } from "@/utils/design";

const Footer: React.FC = () => {
  return (
    <footer className="w-[90vw] md:w-[92.5vw] lg:w-[95vw] bg-primary-200 rounded-lg py-8 px-6 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto">
        <div className="flex flex-col gap-2">
          <h6 className="footer-text font-bold">Spot</h6>

          <div className="flex flex-col gap-1">
            <p className="footer-text w-full">Design. Build. Empower.</p>
            <p className="footer-text">&copy; {year} Spot</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h6 className="footer-text font-bold">Resources</h6>

          <nav>
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="mailto:hello@egeuysal.com" className="footer-text">
                  Contact us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <h6 className="footer-text font-bold">Connect</h6>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.spot.egeuysal.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="inline-flex items-center justify-center w-auto"
            >
              <Globe size={iconSize} className="text-primary-400" />
            </Link>
            <Link
              href="https://github.com/egeuysall/spot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center w-auto"
            >
              <Github size={iconSize} className="text-primary-400" />
            </Link>
            <Link
              href="mailto:hello@egeuysal.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="inline-flex items-center justify-center w-auto"
            >
              <Mail size={iconSize} className="text-primary-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
