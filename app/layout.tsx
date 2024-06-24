import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Muellepiece",
  description: "Landing page de muellepiece",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar/>
          <main>
            {children}
            <SpeedInsights/>
          </main>
        <footer className="mt-auto"><Footer/></footer>
      </body>
    </html>
  );
}
