"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminProfile() {
  const [loading, setLoading] = useState(false);

  // Form states
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch current username on mount (from backend)
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/api/verify/token`,
          {},
          { withCredentials: true }
        );

        if (res.data.success && res.data.user?.username) {
          setCurrentUsername(res.data.user.username);
        }
      } catch (err) {
        console.error("Failed to fetch admin data", err);
        toast.error("Failed to load profile data");
      }
    };

    fetchAdminData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (newUsername && newUsername.length < 4) {
      toast.error("New username must be at least 4 characters");
      setLoading(false);
      return;
    }

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match");
        setLoading(false);
        return;
      }
      if (newPassword.length < 6) {
        toast.error("New password must be at least 6 characters");
        setLoading(false);
        return;
      }
    }

    if (!currentPassword) {
      toast.error("Current password is required");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        currentPassword,
      };

      if (newUsername && newUsername !== currentUsername) {
        payload.newUsername = newUsername;
      }

      if (newPassword) {
        payload.newPassword = newPassword;
      }

      const res = await axios.post(
        `${API_URL}/api/update/user`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully!");

        // Update current username if changed
        if (newUsername) {
          setCurrentUsername(newUsername);
          setNewUsername("");
        }

        // Clear password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Admin Profile
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Current Username Display */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <Label className="text-gray-600">Current Username</Label>
              <p className="text-xl font-semibold text-gray-800 mt-2">
                {currentUsername || "Loading..."}
              </p>
            </div>

            {/* New Username */}
            <div>
              <Label htmlFor="newUsername">New Username (optional)</Label>
              <Input
                id="newUsername"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Leave blank to keep current"
                className="mt-2"
                disabled={loading}
              />
            </div>

            {/* Current Password */}
            <div>
              <Label htmlFor="currentPassword" >Current Password <span className="text-red-500">*</span></Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className="mt-2"
                disabled={loading}
              />
            </div>

            {/* New Password */}
            <div>
              <Label htmlFor="newPassword">New Password (optional)</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="mt-2"
                disabled={loading}
              />
            </div>

            {/* Confirm New Password */}
            {newPassword && (
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="mt-2"
                  disabled={loading}
                />
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Profile...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}