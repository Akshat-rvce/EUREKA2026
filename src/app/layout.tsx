import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://eureka-2026.vercel.app/"),
  title: "EUREKA ’26 | National Project Expo | RVCE Bengaluru",
  description:
    "EUREKA ’26 is the National Project Expo organised by the Department of Electrical & Electronics Engineering at RV College of Engineering, Bengaluru, on 28 November 2026.",
  keywords: [
    "EUREKA 26",
    "EUREKA RVCE",
    "RV College of Engineering National Project Expo",
    "National Project Expo Bangalore",
    "EEE RVCE Expo 2026",
    "Student Engineering Projects Bengaluru",
    "Clean Energy Engineering Projects",
    "Smart Mobility EV Competition",
    "AIoT Edge Engineering Expo",
    "Unstop EUREKA 2026",
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
    title: "EUREKA ’26 — National Project Expo | RVCE",
    description:
      "Explore five engineering tracks at EUREKA ’26, the National Project Expo at RV College of Engineering, Bengaluru, on 28 November 2026.",
    url: "https://eureka-2026.vercel.app/",
    siteName: "EUREKA '26 RVCE",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/eureka-logo.png",
        width: 1024,
        height: 1024,
        alt: "EUREKA ’26 logo, RVCE National Project Expo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EUREKA ’26 | National Project Expo | RVCE",
    description: "National Project Expo at RV College of Engineering, Bengaluru, on 28 November 2026.",
    images: ["/images/eureka-logo.png"],
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
    "@type": "Event",
    "name": "EUREKA ’26 — National Project Expo",
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
      "National Project Expo organised by the Department of Electrical & Electronics Engineering at RV College of Engineering, Bengaluru.",
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
    <html lang="en" className="scroll-smooth">
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
