"use client"
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  let pathname = usePathname();
  return (
    <>
    {pathname.startsWith("/admin") ? null :
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-400 pb-8">
        <div>
          <Image src={'/logo.png'} width={250} height={250} alt='logo' className="" />
          <p className="text-gray-400 my-6">Your trusted partner for luxury real estate in Dubai & UAE.</p>
        </div>
        <div className="">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-6 text-gray-400">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/properties" className="hover:text-white transition">Properties</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
          <p className="text-gray-400 my-6">+971 4 123 4567</p>
          <p className="text-gray-400 my-6">info@luxuryestate.ae</p>
          <p className="text-gray-400">Business Bay, Dubai, UAE</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400"><Facebook className="h-6 w-6" /></a>
            <a href="#" className="hover:text-blue-400"><Instagram className="h-6 w-6" /></a>
            <a href="#" className="hover:text-blue-400"><Twitter className="h-6 w-6" /></a>
            <a href="#" className="hover:text-blue-400"><Youtube className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">
        © 2025 LuxuryEstate. All rights reserved.
      </div>
    </footer>}
    </>

  );
}