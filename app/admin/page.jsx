"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Building2, DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { useProperties } from "../context/PropertiesContext";
import { useEffect } from "react";

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
    { title: "Total Sales (2025)", value: `AED ${(totalSales / 1000000).toFixed(1)}M`, icon: DollarSign, href: "/admin" },
    { title: "Total Properties", value: totalProperties, icon: Building2, href: "/admin/properties" },
    { title: "Total Leads", value: leads.length, icon: Users, href: "/admin/users" },
    { title: "Avg Property Price", value: `AED ${ (avgPrice / 1000000).toFixed(1) }M`, icon: TrendingUp, href: "/admin/properties" },
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
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Sales Graph */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Performance 2025</CardTitle>
            <CardDescription>Total sales value per month (AED)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `AED ${(value / 1000000).toFixed(1)}M`} />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}