import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav";
import WaveMesh from "@/app/components/WaveMesh";
import { getTheme } from "@/app/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICO Work Orders",
  description: "Property maintenance work order dashboard — ICO Real Estate Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = getTheme();

  return (
    <html lang="en" data-theme={theme}>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {theme === "glass" && <WaveMesh />}
        <Nav />
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
