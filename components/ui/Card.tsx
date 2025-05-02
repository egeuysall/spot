import React from "react";
import type { FeaturesProps } from "@/types/landing";

export const Card: React.FC<FeaturesProps> = ({
  icon,
  featureName,
  featureDesc,
}) => {
  return (
    <section className="bg-primary-200 flex flex-col rounded-lg py-5 px-6">
      <div className="icon-container mb-1 text-primary-500">{icon}</div>
      <strong>
        <p>{featureName}</p>
      </strong>
      <p className="w-full">{featureDesc}</p>
    </section>
  );
};
