"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Users, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home, active: 'admin' },
  { name: "Properties", href: "/admin/properties", icon: Building2, active: 'properties' },
  { name: "Leads / Users", href: "/admin/users", icon: Users, active: 'users' },
  { name: "Profile", href: "/admin/profile", icon: User, active: 'profile' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col z-50">
        <h1 className="text-2xl font-bold mb-12">LuxuryEstate Admin</h1>
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(`/admin/${item.active}`) || (item.active === 'admin' && pathname === '/admin');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <Button
          variant="ghost"
          className="text-white hover:bg-gray-800"
          onClick={() => {
            localStorage.removeItem("adminLoggedIn");
            window.location.href = "/admin";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Main Content - Left margin for fixed sidebar */}
      <div className="flex-1 ml-64 p-8">
        {children}
      </div>
    </div>
  );
}