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
      "Smarter event matching that adapts to your mood, style, time, and city—without extra searching.",
  },
  {
    id: 2,
    icon: locationIcon,
    featureName: "Hyper-Local Filtering",
    featureDesc:
      "Instantly find things to do nearby with real-world filters for time, weather, and location.",
  },
  {
    id: 3,
    icon: sparklesIcon,
    featureName: "Smart Event Summaries",
    featureDesc:
      "Every event auto-transformed with tags, clarity, and spark using Spot's GPT-powered brain.",
  },
  {
    id: 4,
    icon: mobileIcon,
    featureName: "Beautiful Mobile UI",
    featureDesc:
      "Designed with Tailwind and Astra UI for a native, smooth, gorgeous feel on all devices.",
  },
];
