"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Building, Info, Phone } from "lucide-react";
import { useProperties } from "@/app/context/PropertiesContext";

export function MobileMenu({ isOpen, setIsOpen }) {

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuItems = [
        { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
        { href: "/properties", label: "Properties", icon: <Building className="h-5 w-5" /> },
        { href: "/about", label: "About", icon: <Info className="h-5 w-5" /> },
        { href: "/contact", label: "Contact", icon: <Phone className="h-5 w-5" /> },
    ];

    return (
        <>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white via-white to-gray-50 z-50 shadow-2xl md:hidden overflow-hidden transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-110 z-10"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-20 animate-pulse" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-100 rounded-full opacity-20 animate-pulse delay-300" />
                </div>

                {/* Menu Content */}
                <div className="relative h-full pt-24 px-6">
                    {/* Header */}
                    <div className="mb-12 transform transition-all duration-500 delay-100">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Dubai Properties
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">Luxury Living Experience</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-2">
                        {menuItems.map((item, index) => (
                            <div
                                key={item.href}
                                className={`transform transition-all duration-300 hover:translate-x-2 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                                    }`}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="group flex items-center space-x-3 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-100"
                                >
                                    <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <span className="text-lg font-medium text-gray-800 group-hover:text-blue-600">
                                        {item.label}
                                    </span>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </nav>

                </div>
            </div>
        </>
    );
}