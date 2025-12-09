"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Building2, DollarSign, LayoutDashboard, Settings, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { useProperties } from "../context/PropertiesContext";
import { useEffect, useState } from "react";

const salesData = [
  { month: "Jan", sales: 120000000 },
  { month: "Feb", sales: 180000000 },
  { month: "Mar", sales: 150000000 },
  { month: "Apr", sales: 220000000 },
  { month: "May", sales: 280000000 },
  { month: "Jun", sales: 320000000 },
  { month: "Jul", sales: 290000000 },
  { month: "Aug", sales: 350000000 },
  { month: "Sep", sales: 410000000 },
  { month: "Oct", sales: 380000000 },
  { month: "Nov", sales: 450000000 },
  { month: "Dec", sales: 520000000 },
];

export default function AdminDashboard() {
  const [properties] = useProperties();
  let [ leads, setLeads ] = useState([])
  
  useEffect(() => {
    setLeads(JSON.parse(localStorage.getItem("luxuryLeads") || "[]"))
  }, [])
  const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalProperties = properties.length;
  const avgPrice = properties.length ? Math.round(properties.reduce((acc, p) => acc +p.price, 0) / properties.length) : 0;

  const stats = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Properties", icon: Building2, href: "/admin/properties" },
    { title: "Leads", icon: Users, href: "/admin/users" },
    { title: "Profile", icon: Settings, href: "/admin/profile" },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Link href={stat.href} key={i}>
                <Card className="hover:shadow-xl transition cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.title}</div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}