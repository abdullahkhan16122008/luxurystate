import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { PropertiesProvider } from "./context/PropertiesContext";

export const metadata = {
  title: "LuxuryEstate - Dubai Luxury Properties",
  description: "Find your dream luxury property in Dubai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <PropertiesProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </PropertiesProvider>
      </body>
    </html>
  );
}