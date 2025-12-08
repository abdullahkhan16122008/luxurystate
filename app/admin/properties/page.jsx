"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useProperties } from "@/app/context/PropertiesContext";
import AdminLayout from "@/components/AdminLayout";

const salesData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 180 },
  { month: "Mar", sales: 150 },
  { month: "Apr", sales: 220 },
  { month: "May", sales: 280 },
  { month: "Jun", sales: 320 },
  { month: "Jul", sales: 290 },
  { month: "Aug", sales: 350 },
  { month: "Sep", sales: 410 },
  { month: "Oct", sales: 380 },
  { month: "Nov", sales: 450 },
  { month: "Dec", sales: 520 },
];

export default function AdminProperties() {
  const [properties, updateProperties] = useProperties();
  const [open, setOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    unit: "sqft",
    features: "",
    description: "",
    images: "",
    lat: "",
    lng: ""
  });

  const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const avgPrice = properties.length ? Math.round(properties.reduce((acc, p) => acc + p.price, 0) / properties.length / 1000000) : 0;

  const handleSave = () => {
    const featuresArray = form.features.split(",").map(f => f.trim()).filter(Boolean);
    const imagesArray = form.images.split("\n").map(i => i.trim()).filter(Boolean);

    const newProperty = {
      id: editingProperty ? editingProperty.id : Date.now(),
      title: form.title,
      price: Number(form.price),
      location: form.location,
      type: form.type,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      unit: form.unit,
      features: featuresArray,
      description: form.description,
      images: imagesArray,
      lat: Number(form.lat),
      lng: Number(form.lng)
    };

    if (editingProperty) {
      updateProperties(properties.map(p => p.id === editingProperty.id ? newProperty : p));
      toast.success("Property updated successfully!");
    } else {
      updateProperties([...properties, newProperty]);
      toast.success("Property added successfully!");
    }

    setOpen(false);
    setEditingProperty(null);
    setForm({
      title: "",
      price: "",
      location: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      unit: "sqft",
      features: "",
      description: "",
      images: "",
      lat: "",
      lng: ""
    });
  };

  const deleteProperty = (id) => {
    updateProperties(properties.filter(p => p.id !== id));
    toast.success("Property deleted");
  };

  const startEdit = (property) => {
    setEditingProperty(property);
    setForm({
      title: property.title,
      price: property.price,
      location: property.location,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      unit: property.unit,
      features: property.features.join(", "),
      description: property.description,
      images: property.images.join("\n"),
      lat: property.lat,
      lng: property.lng
    });
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Properties Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{properties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Sales Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSales}M AED</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgPrice}M AED</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{properties.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Graph */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Sales Performance 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Add Button + Properties Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Properties</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="mr-2 h-5 w-5" /> Add New Property
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
                </DialogHeader>
                {/* Full form same as before - copy from previous message */}
                {/* ... (same form code) ... */}
                <Button onClick={handleSave} className="w-full mt-6">
                  {editingProperty ? "Update Property" : "Add Property"}
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Beds</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{p.title}</TableCell>
                  <TableCell>{(p.price / 1000000).toFixed(1)}M AED</TableCell>
                  <TableCell>{p.location}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell>{p.bedrooms}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" onClick={() => startEdit(p)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Property?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProperty(p.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}