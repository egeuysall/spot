import React from "react";

import { Sparkles, MapPin, Brain, Smartphone } from "lucide-react";
import { iconSize } from "@/utils/design";
import type { FeaturesProps } from "@/types/landing";

const aiIcon = React.createElement(Brain, { size: iconSize });
const locationIcon = React.createElement(MapPin, { size: iconSize });
const sparklesIcon = React.createElement(Sparkles, { size: iconSize });
const mobileIcon = React.createElement(Smartphone, { size: iconSize });

export const features: FeaturesProps[] = [
  {
    id: 1,
    icon: aiIcon,
    featureName: "AI-Powered Suggestions",
    featureDesc:
      "Matches your vibe, style, and time using Spot's smart, AI-driven brain.",
  },
  {
    id: 2,
    icon: locationIcon,
    featureName: "Hyper-Local Filtering",
    featureDesc:
      "Filters nearby events by time, weather, and real-world conditions fast.",
  },
  {
    id: 3,
    icon: sparklesIcon,
    featureName: "Smart Event Summaries",
    featureDesc:
      "Each event gets instant clarity with tags using GPT-powered insights.",
  },
  {
    id: 4,
    icon: mobileIcon,
    featureName: "Beautiful Mobile UI",
    featureDesc:
      "Built with Astra UI for a fast, smooth, and stunning native app feel.",
  },
];
