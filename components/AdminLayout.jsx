"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Building2, Users, User, LogOut, Menu, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home, active: 'admin' },
  { name: "Properties", href: "/admin/properties", icon: Building2, active: 'properties' },
  { name: "Leads / Users", href: "/admin/users", icon: Users, active: 'users' },
  { name: "Profile", href: "/admin/profile", icon: User, active: 'profile' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);        // نیا state
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // نیا state

  let router = useRouter();

  let api = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.post(
          `${api}/api/verify/token`,
          {},
          { withCredentials: true } 
        );

        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.log("Verification failed:", err);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [router, api]);

  let handleLogout = async () => {
    try {
      let res = await axios.post(`${api}/api/logout/user`);
      if(res.data.success) {
        toast.success(res.data.message)
        router.push('/admin/login')
      }
    } catch (err) {
      console.log(err)
    }
  }


  // اگر loading ہے تو loader دکھائیں
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // اگر authenticated نہیں تو کچھ نہ دکھائیں (redirect ہو چکا ہوگا)
  if (!isAuthenticated) {
    return null; // یا ایک چھوٹا سا message
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Modern Stylish Sidebar - Fixed on Desktop, Sheet on Mobile */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900 to-gray-900 text-white p-6 flex flex-col shadow-2xl z-50 rounded-r-2xl">
        <Image src={'/logo.png'} height={150} width={150} className="mb-12" alt="logo" />
        <nav className="flex-1 space-y-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(`/admin/${item.active}`) || (item.active === 'admin' && pathname === '/admin');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-700/50 ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:text-blue-200"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        <Button
          variant="ghost"
          className="text-white ml-1.5 hover:bg-blue-700/50 hover:text-blue-200 rounded-xl"
          onClick={() => {
            handleLogout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
        </nav>
      </aside>

      {/* Mobile Hamburger Menu */}
      <header className="md:hidden flex items-center justify-between p-4 bg-gradient-to-r from-blue-900 to-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-lg">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-gradient-to-b from-blue-900 to-gray-900 text-white p-6 rounded-r-2xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Admin</h1>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)} className="text-white">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="space-y-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(`/admin/${item.active}`) || (item.active === 'admin' && pathname === '/admin');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-700/50 ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:text-blue-200"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <Button
              variant="ghost"
              className="text-white hover:bg-blue-700/50 hover:text-blue-200 w-full mt-auto rounded-xl"
              onClick={() => {
                handleLogout();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content - Adjust for Mobile Header */}
      <main className="flex-1 md:ml-64 mt-16 md:mt-0 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}