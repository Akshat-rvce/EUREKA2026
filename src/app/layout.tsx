import type { Metadata, Viewport } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eureka26.rvce.edu.in"),
  title: "EUREKA '26 | National Project Expo-cum-Hackathon | RVCE Bangalore",
  description:
    "Official website for EUREKA '26 — The flagship National Project Expo-cum-Hackathon by the Dept. of Electronics & Electrical Engineering, RV College of Engineering (RVCE), Bangalore on Nov 28, 2026. ₹1,00,000+ Prize Pool across 5 futuristic tracks.",
  keywords: [
    "EUREKA 26",
    "EUREKA RVCE",
    "RV College of Engineering Hackathon",
    "National Project Expo Bangalore",
    "EEE RVCE Expo 2026",
    "Hardware Hackathon Bangalore",
    "Clean Energy Hackathon",
    "Smart Mobility EV Competition",
    "AIoT Edge Hackathon",
    "Unstop Hackathon 2026",
  ],
  authors: [{ name: "Dept. of Electronics & Electrical Engineering, RVCE" }],
  creator: "RVCE EEE Department",
  publisher: "RV College of Engineering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "EUREKA '26 — National Project Expo-cum-Hackathon | RVCE",
    description:
      "Join India's premier engineering showcase on Nov 28, 2026 at RVCE Bangalore. 5 Tracks, 500+ Innovators, ₹1 Lakh+ Prizes, Industry Jury.",
    url: "https://eureka26.rvce.edu.in",
    siteName: "EUREKA '26 RVCE",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EUREKA '26 National Project Expo-cum-Hackathon RVCE Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EUREKA '26 | National Project Expo-cum-Hackathon | RVCE",
    description: "Flagship National Engineering Expo & Hackathon at RVCE Bangalore on Nov 28, 2026.",
    images: ["/og-image.png"],
    creator: "@rvce_eureka",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://eureka26.rvce.edu.in",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0618",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Event Data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hackathon",
    "name": "EUREKA '26 — National Project Expo-cum-Hackathon",
    "startDate": "2026-11-28T09:00:00+05:30",
    "endDate": "2026-11-28T19:00:00+05:30",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Dept. of Electronics & Electrical Engineering, RVCE",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mysuru Road, RV Vidyanikethan Post",
        "addressLocality": "Bengaluru",
        "postalCode": "560059",
        "addressRegion": "Karnataka",
        "addressCountry": "IN",
      },
    },
    "organizer": {
      "@type": "Organization",
      "name": "Dept. of Electronics & Electrical Engineering, RVCE",
      "url": "https://rvce.edu.in",
    },
    "description":
      "A premier national level project exhibition and hackathon bringing 500+ innovators across India together.",
    "offers": {
      "@type": "Offer",
      "price": "400",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://unstop.com/p/eureka-26-national-expo-cum-hackathon-rvce-bangalore-2026",
      "validFrom": "2026-09-01T00:00:00+05:30",
    },
  };

  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#FFD166] selection:text-black">
        <div className="grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
