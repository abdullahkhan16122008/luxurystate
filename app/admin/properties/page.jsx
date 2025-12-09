"use client";

import { useEffect, useState } from "react";
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
import { Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useProperties } from "@/app/context/PropertiesContext";
import AdminLayout from "@/components/AdminLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
    // const [properties, updateProperties] = useProperties();
    const [properties, setProperties] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        propertyStatus: "",
        status: "",
        images: "",
        page: "",
        lat: "",
        lng: ""
    });
    const [filters, setFilters] = useState({
        search: "",
        type: "",
        status: "",
        propertyStatus: "",
        minPrice: "",
        maxPrice: "",
        bedrooms: ""
    });

    let api = process.env.NEXT_PUBLIC_API_URL;

    let fetchProperties = async () => {
        let api = process.env.NEXT_PUBLIC_API_URL;
        try {
            let res = await axios.post(`${api}/api/get/all/properties/admin`);
            if (res.data.success) {
                setProperties(res.data.properties)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchProperties();
    }, [])

    const filteredProperties = properties.filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.location.toLowerCase().includes(filters.search.toLowerCase());
        const matchesType = !filters.type || p.type === filters.type;
        const matchesStatus = !filters.status || p.status === filters.status;
        const matchesPropertyStatus = !filters.propertyStatus || p.propertyStatus === filters.propertyStatus;
        const matchesMinPrice = !filters.minPrice || p.price >= Number(filters.minPrice);
        const matchesMaxPrice = !filters.maxPrice || p.price <= Number(filters.maxPrice);
        const matchesBedrooms = !filters.bedrooms || p.bedrooms >= Number(filters.bedrooms);

        return matchesSearch && matchesType && matchesStatus && matchesPropertyStatus && matchesMinPrice && matchesMaxPrice && matchesBedrooms;
    });

    const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
    const avgPrice = properties?.length !== undefined ? Math.round(properties.reduce((acc, p) => acc + p.price, 0) / properties?.length / 1000000) : 0;

    const handleSave = async () => {
        const formData = new FormData();

        formData.append("id", editingProperty?._id || "");
        formData.append("title", form.title);
        formData.append("price", form.price);
        formData.append("location", form.location);
        formData.append("type", form.type);
        formData.append("bedrooms", form.bedrooms);
        formData.append("bathrooms", form.bathrooms);
        formData.append("area", form.area);
        formData.append("unit", form.unit);
        formData.append("propertyStatus", form.propertyStatus);
        formData.append("status", form.status);
        formData.append("features", form.features);
        formData.append("description", form.description);
        formData.append("lat", form.lat);
        formData.append("lng", form.lng);

        // multiple images
        for (let image of selectedFiles) {
            formData.append("images", image);
        }

        let url = editingProperty
            ? `${api}/api/edit/property`
            : `${api}/api/add/property`;

        try {
            const response = await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                setProperties(response.data.properties);
                toast.success(editingProperty ? "Property Updated Successfully!" : "Property Added Successfully!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProperty = async (id) => {
        // updateProperties(properties.filter(p => p.id !== id));
        let api = process.env.NEXT_PUBLIC_API_URL;
        try {
            let res = await axios.post(`${api}/api/delete/property/admin`, { id });
            if (res.data.success) {
                setProperties(res.data.properties)
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log(err)
        }
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

    const totalSoldValue = properties
        .filter(p => p.status === "Sold")
        .reduce((acc, p) => acc + p.price, 0);

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
                            <div className="text-3xl font-bold">{properties?.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Total Sales Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{(totalSoldValue / 1000000).toFixed(1)}M AEDM AED</div>
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
                            <div className="text-3xl font-bold text-green-600">{properties?.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Custom Filters (Non-Shadcn Design) */}
                <div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Custom Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <input
                            type="text"
                            placeholder="Search title/location..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="col-span-2 h-12 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition duration-300 shadow-sm hover:shadow-md"
                        />
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="h-12 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition duration-300 shadow-sm hover:shadow-md appearance-none bg-white"
                        >
                            <option value="">All Types</option>
                            <option value="Villa">Villa</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Apartment">Apartment</option>
                            {/* Add more types from your data */}
                        </select>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="h-12 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition duration-300 shadow-sm hover:shadow-md appearance-none bg-white"
                        >
                            <option value="">All Status</option>
                            <option value="Hot">Hot</option>
                            <option value="Featured">Featured</option>
                            <option value="Sold">Sold</option>
                            <option value="Rented">Rented</option>
                        </select>
                        <select
                            value={filters.propertyStatus}
                            onChange={(e) => setFilters({ ...filters, propertyStatus: e.target.value })}
                            className="h-12 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition duration-300 shadow-sm hover:shadow-md appearance-none bg-white"
                        >
                            <option value="">All Property Status</option>
                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            className="h-12 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition duration-300 shadow-sm hover:shadow-md"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            className="h-12 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition duration-300 shadow-sm hover:shadow-md"
                        />
                        <input
                            type="number"
                            placeholder="Min Bedrooms"
                            value={filters.bedrooms}
                            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                            className="h-12 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition duration-300 shadow-sm hover:shadow-md"
                        />
                    </div>
                </div>
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
                                <div className="space-y-6 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                placeholder="e.g., Palm Jumeirah Beachfront Villa"
                                                value={form.title}
                                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="price">Price (AED)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="e.g., 28500000"
                                                value={form.price}
                                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                placeholder="e.g., Palm Jumeirah, Dubai"
                                                value={form.location}
                                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="type">Property Type</Label>
                                            <Input
                                                id="type"
                                                placeholder="e.g., Villa"
                                                value={form.type}
                                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                                        {/* Property Status - For Sale / For Rent */}
                                        <div>
                                            <Label htmlFor="propertyStatus">Property Status</Label>
                                            <Select
                                                value={form.propertyStatus}
                                                onValueChange={(value) => setForm({ ...form, propertyStatus: value })}
                                            >
                                                <SelectTrigger id="propertyStatus" className="mt-2 min-w-full min-h-12">
                                                    <SelectValue placeholder="Select property status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="For Sale">For Sale</SelectItem>
                                                    <SelectItem value="For Rent">For Rent</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Status - Hot / Featured / None */}
                                        <div>
                                            <Label htmlFor="status">Listing Status</Label>
                                            <Select
                                                value={form.status}
                                                onValueChange={(value) => setForm({ ...form, status: value })}
                                            >
                                                <SelectTrigger id="status" className="mt-2 min-w-full min-h-12">
                                                    <SelectValue placeholder="None" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="None">None</SelectItem>
                                                    <SelectItem value="Hot">🔥 Hot Offer</SelectItem>
                                                    <SelectItem value="Featured">⭐ Featured</SelectItem>
                                                    <SelectItem value="Sold">🏆 Sold</SelectItem>
                                                    <SelectItem value="Rented">🔒 Rented</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* </div> */}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="bedrooms">Bedrooms</Label>
                                            <Input
                                                id="bedrooms"
                                                type="number"
                                                placeholder="e.g., 6"
                                                value={form.bedrooms}
                                                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="bathrooms">Bathrooms</Label>
                                            <Input
                                                id="bathrooms"
                                                type="number"
                                                placeholder="e.g., 8"
                                                value={form.bathrooms}
                                                onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="area">Area</Label>
                                            <Input
                                                id="area"
                                                type="number"
                                                placeholder="e.g., 12000"
                                                value={form.area}
                                                onChange={(e) => setForm({ ...form, area: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="page">Page</Label>
                                        <Input
                                            id="page"
                                            type="number"
                                            placeholder="e.g., 1"
                                            value={form.page}
                                            onChange={(e) => setForm({ ...form, page: e.target.value })}
                                            className="mt-2 h-12"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="unit">Unit</Label>
                                        <Input
                                            id="unit"
                                            placeholder="e.g., sqft"
                                            value={form.unit}
                                            onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                            className="mt-2 h-12"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="features">Features (comma-separated)</Label>
                                        <Textarea
                                            id="features"
                                            placeholder="e.g., Private Pool, Beach Access, Cinema Room"
                                            value={form.features}
                                            onChange={(e) => setForm({ ...form, features: e.target.value })}
                                            rows={3}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="e.g., Ultra-luxury 6-bedroom beachfront villa..."
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            rows={4}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label>Upload Property Images</Label>
                                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files);
                                                    setSelectedFiles(files);
                                                }}

                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label htmlFor="image-upload" className="cursor-pointer">
                                                <div className="text-blue-600 font-medium text-lg">Click to upload images</div>
                                                <p className="text-gray-500 mt-1">or drag and drop (multiple allowed)</p>
                                            </label>
                                        </div>

                                        {/* Image Previews */}
                                        {form.images && (
                                            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                                                {form.images.split("\n").filter(Boolean).map((url, i) => (
                                                    <div key={i} className="relative group">
                                                        <img src={url} alt={`Preview ${i + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                                                        <button
                                                            onClick={() => {
                                                                const newImages = form.images.split("\n").filter((_, index) => index !== i).join("\n");
                                                                setForm({ ...form, images: newImages });
                                                            }}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="lat">Latitude</Label>
                                            <Input
                                                id="lat"
                                                type="number"
                                                step="any"
                                                placeholder="e.g., 25.1153"
                                                value={form.lat}
                                                onChange={(e) => setForm({ ...form, lat: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lng">Longitude</Label>
                                            <Input
                                                id="lng"
                                                type="number"
                                                step="any"
                                                placeholder="e.g., 55.1391"
                                                value={form.lng}
                                                onChange={(e) => setForm({ ...form, lng: e.target.value })}
                                                className="mt-2 h-12"
                                            />
                                        </div>
                                    </div>

                                    <Button onClick={handleSave} className="w-full mt-6">
                                        {editingProperty ? "Update Property" : "Add Property"}
                                    </Button>
                                </div>
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
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProperties?.map((p) => (
                                <TableRow key={p._id}>
                                    <TableCell>{p._id}</TableCell>
                                    <TableCell className="font-medium max-w-xs truncate">{p?.title}</TableCell>
                                    <TableCell>{(p?.price / 1000000).toFixed(1)}M AED</TableCell>
                                    <TableCell>{p?.location}</TableCell>
                                    <TableCell>{p?.type}</TableCell>
                                    <TableCell>
                                        {p?.status === "Hot" && "🔥 Hot"}
                                        {p?.status === "Featured" && "⭐ Featured"}
                                        {p?.status === "Sold" && "🏆 Sold"}
                                        {p?.status === "Rented" && "🔒 Rented"}
                                        {!p?.status || p?.status === "None" ? "-" : ""}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => setSelectedProperty(p)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
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
                                                    <AlertDialogAction onClick={() => deleteProperty(p._id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Property Details Modal - 90% Width, No Shadcn Dialog, Fully Custom & Unique Design */}
                    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${selectedProperty ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/70"
                            onClick={() => setSelectedProperty(null)}
                        />

                        {/* Modal Container - 90% Width */}
                        {selectedProperty && (
                            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                                {/* Close Button */}
                                {/* <button
                                    onClick={() => setSelectedProperty(null)}
                                    className="absolute top-6 right-6 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg"
                                >
                                    <X className="h-6 w-6 text-gray-800" />
                                </button> */}

                                {/* Header - Title + Price Badge */}
                                <div className="bg-blue-900 text-white p-5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                    <div className="relative z-10">
                                        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">{selectedProperty.title}</h2>
                                        <div className="flex items-center gap-6">
                                            <span className="text-2xl font-bold">
                                                {(selectedProperty.price / 1000000).toFixed(1)}M AED
                                            </span>
                                            <span className="backdrop-blur rounded-full text-xl font-medium">
                                                {selectedProperty.propertyStatus} {selectedProperty.status !== "None" && `• ${selectedProperty.status}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Scrollable Body */}
                                <div className="max-h-[80vh] overflow-y-auto p-8 md:p-12 space-y-10">
                                    {/* Images Carousel - Custom Stylish */}
                                    {selectedProperty.images && selectedProperty.images.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Property Gallery</h3>
                                            <div className="relative group">
                                                <div className="overflow-hidden rounded-2xl shadow-xl">
                                                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                                                        {selectedProperty.images.map((img, i) => (
                                                            <div key={i} className="w-full flex-shrink-0">
                                                                <img
                                                                    src={img}
                                                                    alt={`Property ${i + 1}`}
                                                                    className="w-full h-96 md:h-[500px] object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Custom Navigation Arrows */}
                                                {selectedProperty.images.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedProperty.images.length - 1 : prev - 1)}
                                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all hover:scale-110"
                                                        >
                                                            <ChevronLeft className="h-7 w-7 text-gray-800" />
                                                        </button>
                                                        <button
                                                            onClick={() => setCurrentImageIndex(prev => (prev + 1) % selectedProperty.images.length)}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all hover:scale-110"
                                                        >
                                                            <ChevronRight className="h-7 w-7 text-gray-800" />
                                                        </button>
                                                    </>
                                                )}

                                                {/* Dots Indicator */}
                                                {selectedProperty.images.length > 1 && (
                                                    <div className="flex justify-center gap-2 mt-6">
                                                        {selectedProperty.images.map((_, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => setCurrentImageIndex(i)}
                                                                className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === i ? "bg-blue-600 w-10" : "bg-gray-400"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Key Details Grid */}
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Property Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md">
                                                <p className="text-gray-600 font-medium">Location</p>
                                                <p className="text-xl font-bold text-gray-800">{selectedProperty.location}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-md">
                                                <p className="text-gray-600 font-medium">Type</p>
                                                <p className="text-xl font-bold text-gray-800">{selectedProperty.type}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-md">
                                                <p className="text-gray-600 font-medium">Size</p>
                                                <p className="text-xl font-bold text-gray-800">{selectedProperty.area} {selectedProperty.unit}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-md">
                                                <p className="text-gray-600 font-medium">Bedrooms</p>
                                                <p className="text-xl font-bold text-gray-800">{selectedProperty.bedrooms} Bedrooms</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-md">
                                                <p className="text-gray-600 font-medium">Bathrooms</p>
                                                <p className="text-xl font-bold text-gray-800">{selectedProperty.bathrooms} Bathrooms</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-md">
                                                <p className="text-gray-600 font-medium">Listing Status</p>
                                                <p className="text-xl font-bold text-gray-800">
                                                    {selectedProperty.status === "Hot" && "🔥 Hot Offer"}
                                                    {selectedProperty.status === "Featured" && "⭐ Featured"}
                                                    {selectedProperty.status === "Sold" && "🏆 Sold"}
                                                    {selectedProperty.status === "Rented" && "🔒 Rented"}
                                                    {selectedProperty.status === "None" && "Standard"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    {selectedProperty.features && selectedProperty.features.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Features</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {selectedProperty.features.map((feat, i) => (
                                                    <span key={i} className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow">
                                                        {feat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Description</h3>
                                        <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
                                            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                                {selectedProperty.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Custom Location Card (No Map - Stylish Alternative) */}
                                    {selectedProperty.lat && selectedProperty.lng && (
                                        <div>
                                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Location</h3>
                                            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                                                <div className="absolute inset-0 bg-black/20"></div>
                                                <div className="relative z-10 text-center">
                                                    <MapPin className="h-16 w-16 mx-auto mb-4" />
                                                    <h4 className="text-2xl font-bold mb-2">{selectedProperty.location}</h4>
                                                    <p className="opacity-90">Prime location in Dubai's most prestigious community</p>
                                                    <div className="mt-6 flex justify-center gap-8 text-lg">
                                                        <div>
                                                            <p className="text-blue-300">Latitude</p>
                                                            <p className="text-xl font-bold">{selectedProperty.lat}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-blue-300">Longitude</p>
                                                            <p className="text-xl font-bold">{selectedProperty.lng}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}