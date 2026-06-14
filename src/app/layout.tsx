import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";

import Footer from "@/components/Footer/Footer";
import CustomCursor from "@/components/CustomCursor/CustomCursor";

export const metadata: Metadata = {
  title: "Prasanna B | AI & Automation Hub",
  description: "Portfolio of Prasanna B, AI Engineer specializing in Agentic AI, Generative AI workflows, LLM orchestration, Computer Vision, and end-to-end Automation.",
  keywords: ["AI Engineer", "Automation Engineer", "Python Developer", "Agentic AI", "LLM", "Generative AI", "Computer Vision", "Prasanna B", "Coimbatore"],
  openGraph: {
    title: "Prasanna B | AI & Automation Hub",
    description: "Building intelligent AI products, Agentic workflows, and end-to-end ML platforms.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
