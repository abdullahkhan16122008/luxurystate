import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { PropertiesProvider } from "./context/PropertiesContext";
import { MobileMenu } from "@/components/MobileMenu"
import { SearchFiltersProvider } from "./context/SearchFiltersContext";

export const metadata = {
  title: "LuxuryEstate - Dubai Luxury Properties",
  description: "Find your dream luxury property in Dubai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900"
      suppressHydrationWarning
      >
        <PropertiesProvider>
          <SearchFiltersProvider>
          <Navbar />
          {/* <MobileMenu /> */}
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
          </SearchFiltersProvider>
        </PropertiesProvider>
      </body>
    </html>
  );
}