"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useProperties } from "@/app/context/PropertiesContext";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import Alert from "./Alert";

export default function Navbar() {
  let [ isOpen, setIsOpen ] = useState();
  let pathname = usePathname();
  let handleBurger = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            {pathname.startsWith("/admin") ? "" : <Image src="/logo.png" alt="LuxuryEstate" width={150} height={150} />}
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link href="/properties" className="text-gray-700 hover:text-blue-600 transition">Properties</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => {
                handleBurger();
              }
              }>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
      <Alert />
    </header>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>

  );
}