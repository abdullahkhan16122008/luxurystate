"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminProfile() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [savedPass, setSavedPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChange = () => {
    if (currentPass !== "luxury2025") {
      toast.error("Current password wrong");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    localStorage.setItem("adminPassword", newPass);
    toast.success("Password changed successfully!");
  };

  useEffect(() => {
    // Override password if stored
    setSavedPass(localStorage.getItem("adminPassword") || "luxury2025")
  }, [])

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-8">Admin Profile</h1>
        <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
          <div>
            <Label>Current Password</Label>
            <Input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label>New Password</Label>
            <Input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label>Confirm New Password</Label>
            <Input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className="mt-2" />
          </div>
          <Button onClick={handleChange} className="w-full">Change Password</Button>
        </div>
      </div>
    </AdminLayout>
  );
}