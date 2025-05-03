// Global CSS
import "@/styles/globals.css";

// External Libraries
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Fonts
import { dmSans, dmMono, merriweather } from "@/lib/fonts";

// Dates
import { priceValidUntilString, currentDate } from "@/utils/date";

// Internal Components
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import LayoutWrapper from "@/components/LayoutWrapper";

async function getProduct() {
  return {
    name: "Spot: Find and Discover Local Events You’ll Actually Love, Curated Just for You",
    image: "/og-links.jpg",
    description:
      "Discover local events you’ll actually love with Spot. Get personalized recommendations for concerts, meetups, and experiences curated just for you, anytime and anywhere.",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  // Fetch data needed for metadata
  const product = await getProduct();

  return {
    title: {
      default: product.name,
      template: "%s | Spot",
    },
    description: product.description,
    metadataBase: new URL("https://www.spot.egeuysal.com/"),
    authors: [{ name: "Ege Uysal" }],
    keywords: [
      "local event suggestions",
      "AI-powered event discovery",
      "personalized event suggestions",
      "activities near me",
      "free activities near me",
      "event search app",
      "top local events finder",
      "event recommendations by location",
      "Spot event discovery app",
      "find events by category",
      "local event alerts",
      "event planner app",
      "personalized event calendar",
      "events near me today",
      "event discovery app USA",
      "events based on interests",
      "find things to do near you",
      "unique local events",
      "top events near me",
      "local happenings near me",
    ],
    openGraph: {
      title: product.name,
      description: product.description,
      url: "https://www.spot.egeuysal.com/",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: "Spot Logo",
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: product.name,
    },
    twitter: {
      card: "summary_large_image",
      site: "@egecreates",
      title: product.name,
      description: product.description,
      images: [product.image],
      creator: "@egeuysall",
    },
    icons: {
      icon: [
        { url: "/icon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/icon.ico",
    },
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.spot.egeuysal.com/",
    },
    applicationName: "Spot",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
    },
    other: {
      appleMobileWebAppCapable: "yes",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const product = await getProduct();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://www.spot.egeuysal.com/${product.image}`,
    description: product.description,
    url: "https://www.spot.egeuysal.com/",
    dateModified: currentDate,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.spot.egeuysal.com/",
      priceValidUntil: priceValidUntilString,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: "0",
            maxValue: "0",
            unitCode: "HUR",
          },
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    sameAs: [
      "https://twitter.com/egecreates",
      "https://www.linkedin.com/in/egeuysal",
      "https://www.instagram.com/egeuysalo",
    ],
  };

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${dmSans.variable} ${merriweather.variable} ${dmMono.variable} pb-18`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="w-full h-full flex-center">
        <LayoutWrapper jsonLdData={jsonLd}>
          <main className="w-[90vw] md:w-[92.5vw] lg:w-[95vw]">
            <div className="mb-32 w-full">
              <Header />
            </div>
            <Analytics />
            {children}
            <SpeedInsights />
            <aside className="w-full mt-24">
              <Footer />
            </aside>
          </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
