import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CustomCursor from "@/components/CustomCursor/CustomCursor";

export const metadata: Metadata = {
  title: "Prasanna B | Python Developer, Robotics Engineer, AI ML Engineer & AI ML Developer",
  description: "Portfolio of Prasanna B, AI Engineer, Python Developer, Robotics Engineer, and AI/ML Developer. Specializing in Agentic AI, Computer Vision, RAG, and automation pipelines.",
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
  keywords: [
    "Prasanna B",
    "Prasanna B Python Developer",
    "Prasanna B Robotics Engineer",
    "Prasanna B AI ML Engineer",
    "Prasanna B AI ML Developer",
    "AI Engineer Coimbatore",
    "Robotics Engineer Coimbatore",
    "Python AI Developer",
    "Agentic AI Portfolio",
    "Prasanna B"
  ],
  alternates: {
    canonical: "https://prasannab.in"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Prasanna B | AI Engineer, Python Developer & Robotics Engineer",
    description: "Building intelligent AI products, Agentic workflows, and end-to-end ML platforms.",
    url: "https://prasannab.in",
    siteName: "Prasanna B Portfolio",
    locale: "en_US",
    type: "profile",
    firstName: "Prasanna",
    lastName: "B",
    username: "prasannab4362",
    images: [
      {
        url: "https://prasannab.in/logo.jpg",
        width: 800,
        height: 800,
        alt: "Prasanna B Logo",
      }
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prasanna B",
    "alternateName": "Prasanna Balaji",
    "url": "https://prasannab.in",
    "image": "https://prasannab.in/logo.jpg",
    "sameAs": [
      "https://github.com/prasannab4362",
      "https://www.linkedin.com/in/prasanna-balaji18/"
    ],
    "jobTitle": "AI Engineer & Python Developer & Robotics Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Creative Bees"
    },
    "description": "Prasanna B is an AI Engineer, Python Developer, Robotics Engineer, and AI/ML Developer specializing in Agentic workflows, computer vision, LangChain, RAG, and automation pipelines.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Agentic AI",
      "Robotics",
      "Computer Vision",
      "Python Development",
      "Web Automation"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
