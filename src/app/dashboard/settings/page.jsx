"use client";

import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Palette,
  Mail,
  Smartphone,
  Save,
  Camera,
  X,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  LogOut,
  Plus,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function SettingsPage() {
  const { currentUser, signout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    currentUser?.photoURL || null
  );

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    bio: "",
    website: "",
    location: "",
    timezone: "UTC-5",
    language: "en",
  });

  // Password Settings State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    newEnrollments: true,
    studentMessages: true,
    weeklyReports: false,
    marketingEmails: false,
    pushNotifications: true,
    smsNotifications: false,
  });

  // Privacy Settings State
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showOnlineStatus: true,
  });

  // Theme Settings State
  const [theme, setTheme] = useState({
    mode: "light",
    colorScheme: "sky",
    fontSize: "medium",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Shield },
    { id: "password", label: "Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  // Handle Profile Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
  };

  // Handle Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Profile Updated:", profileData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password Changed");
      alert("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  // Handle Notification Settings Update
  const handleNotificationUpdate = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Notifications Updated:", notifications);
      alert("Notification preferences saved!");
    } catch (error) {
      console.error("Error updating notifications:", error);
      alert("Failed to update notifications");
    } finally {
      setLoading(false);
    }
  };

  // Handle Privacy Settings Update
  const handlePrivacyUpdate = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Privacy Updated:", privacy);
      alert("Privacy settings saved!");
    } catch (error) {
      console.error("Error updating privacy:", error);
      alert("Failed to update privacy settings");
    } finally {
      setLoading(false);
    }
  };

  // Handle Theme Update
  const handleThemeUpdate = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Theme Updated:", theme);
      alert("Appearance settings saved!");
    } catch (error) {
      console.error("Error updating theme:", error);
      alert("Failed to update appearance");
    } finally {
      setLoading(false);
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmed) {
      const doubleConfirm = confirm(
        "This will permanently delete all your data. Are you absolutely sure?"
      );

      if (doubleConfirm) {
        setLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          console.log("Account Deleted");
          alert("Account deleted successfully");
          // Redirect to home or login
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("Failed to delete account");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Settings
        </h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-sky-50 text-sky-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions - Mobile Hidden */}
          <div className="hidden lg:block mt-6 bg-linear-to-br from-sky-50 to-sky-100 rounded-xl p-4 border border-sky-200">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="btn btn-sm w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-200">
                <Download className="h-4 w-4" />
                Export Data
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-sm w-full bg-white hover:bg-slate-50 text-red-600 border-slate-200"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-sky-600" />
                  Profile Information
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Profile Image */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Profile Photo
                      </span>
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden border-2 border-sky-200">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-10 w-10 text-sky-600" />
                          )}
                        </div>
                        {profileImage && (
                          <button
                            type="button"
                            onClick={removeProfileImage}
                            className="absolute -top-1 -right-1 btn btn-circle btn-xs bg-red-500 hover:bg-red-600 text-white border-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <label className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none cursor-pointer">
                          <Camera className="h-4 w-4" />
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        {profileImage && (
                          <button
                            type="button"
                            onClick={removeProfileImage}
                            className="btn btn-sm btn-outline text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Recommended: Square image, at least 400x400px
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Full Name
                        </span>
                      </label>
                      <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            displayName: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        placeholder="john@example.com"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  {/* Phone and Website */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Phone Number
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+1 (555) 000-0000"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Website</span>
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            website: e.target.value,
                          })
                        }
                        placeholder="https://yourwebsite.com"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Bio</span>
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                      rows="4"
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Location</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          location: e.target.value,
                        })
                      }
                      placeholder="City, Country"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Language and Timezone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Language</span>
                      </label>
                      <select
                        value={profileData.language}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            language: e.target.value,
                          })
                        }
                        className="select select-bordered w-full"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Timezone</span>
                      </label>
                      <select
                        value={profileData.timezone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            timezone: e.target.value,
                          })
                        }
                        className="select select-bordered w-full"
                      >
                        <option value="UTC-5">EST (UTC-5)</option>
                        <option value="UTC-6">CST (UTC-6)</option>
                        <option value="UTC-7">MST (UTC-7)</option>
                        <option value="UTC-8">PST (UTC-8)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC+1">CET (UTC+1)</option>
                      </select>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-sky-600" />
                  Account Settings
                </h2>

                <div className="space-y-6">
                  {/* Email Verification */}
                  <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-amber-800">
                          Verify Your Email
                        </h3>
                        <p className="text-sm text-amber-700 mt-1">
                          Please verify your email address to access all
                          features
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-sm bg-amber-600 hover:bg-amber-700 text-white border-none">
                      Verify Email
                    </button>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  {/* Connected Accounts */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-800 mb-4">
                      Connected Accounts
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">G</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">Google</p>
                            <p className="text-xs text-slate-500">Connected</p>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline text-red-600 border-red-300">
                          Disconnect
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">GH</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">GitHub</p>
                            <p className="text-xs text-slate-500">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <button className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sessions */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-800">
                        Active Sessions
                      </h3>
                      <button className="btn btn-sm btn-ghost text-red-600">
                        Sign Out All Devices
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Smartphone className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-800">
                              Current Session
                            </p>
                            <p className="text-xs text-slate-600">
                              Chrome on Windows • New York, USA
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Last active: Just now
                            </p>
                          </div>
                        </div>
                        <span className="badge badge-sm bg-green-500 text-white border-none">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Password Settings */}
          {activeTab === "password" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-sky-600" />
                  Change Password
                </h2>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Current Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        placeholder="Enter current password"
                        className="input input-bordered w-full pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        New Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="Enter new password"
                        className="input input-bordered w-full pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Confirm New Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm new password"
                        className="input input-bordered w-full pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordData.newPassword && (
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        Password Strength
                      </p>
                      <div className="flex gap-1 mb-2">
                        <div
                          className={`h-2 flex-1 rounded ${
                            passwordData.newPassword.length >= 8
                              ? "bg-green-500"
                              : "bg-slate-300"
                          }`}
                        ></div>
                        <div
                          className={`h-2 flex-1 rounded ${
                            passwordData.newPassword.length >= 10
                              ? "bg-green-500"
                              : "bg-slate-300"
                          }`}
                        ></div>
                        <div
                          className={`h-2 flex-1 rounded ${
                            /[A-Z]/.test(passwordData.newPassword) &&
                            /[0-9]/.test(passwordData.newPassword)
                              ? "bg-green-500"
                              : "bg-slate-300"
                          }`}
                        ></div>
                        <div
                          className={`h-2 flex-1 rounded ${
                            /[!@#$%^&*]/.test(passwordData.newPassword)
                              ? "bg-green-500"
                              : "bg-slate-300"
                          }`}
                        ></div>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600">
                        <li
                          className={`flex items-center gap-2 ${
                            passwordData.newPassword.length >= 8
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {passwordData.newPassword.length >= 8 ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          At least 8 characters
                        </li>
                        <li
                          className={`flex items-center gap-2 ${
                            /[A-Z]/.test(passwordData.newPassword)
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {/[A-Z]/.test(passwordData.newPassword) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          One uppercase letter
                        </li>
                        <li
                          className={`flex items-center gap-2 ${
                            /[0-9]/.test(passwordData.newPassword)
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {/[0-9]/.test(passwordData.newPassword) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          One number
                        </li>
                        <li
                          className={`flex items-center gap-2 ${
                            /[!@#$%^&*]/.test(passwordData.newPassword)
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {/[!@#$%^&*]/.test(passwordData.newPassword) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          One special character
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-sky-600" />
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">
                      Email Notifications
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="font-medium text-slate-800">
                            Course Updates
                          </p>
                          <p className="text-sm text-slate-600">
                            Notifications about your course updates
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.courseUpdates}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              courseUpdates: e.target.checked,
                            })
                          }
                          className="toggle toggle-sky"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="font-medium text-slate-800">
                            New Enrollments
                          </p>
                          <p className="text-sm text-slate-600">
                            Get notified when students enroll
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.newEnrollments}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              newEnrollments: e.target.checked,
                            })
                          }
                          className="toggle toggle-sky"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="font-medium text-slate-800">
                            Student Messages
                          </p>
                          <p className="text-sm text-slate-600">
                            Messages from your students
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.studentMessages}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              studentMessages: e.target.checked,
                            })
                          }
                          className="toggle toggle-sky"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="font-medium text-slate-800">
                            Weekly Reports
                          </p>
                          <p className="text-sm text-slate-600">
                            Summary of your weekly activity
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReports}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              weeklyReports: e.target.checked,
                            })
                          }
                          className="toggle toggle-sky"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="font-medium text-slate-800">
                            Marketing Emails
                          </p>
                          <p className="text-sm text-slate-600">
                            Tips, feature updates, and offers
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.marketingEmails}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              marketingEmails: e.target.checked,
                            })
                          }
                          className="toggle toggle-sky"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-slate-800">
                      Other Notifications
                    </h3>

                    <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800">
                          Push Notifications
                        </p>
                        <p className="text-sm text-slate-600">
                          Real-time browser notifications
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.pushNotifications}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            pushNotifications: e.target.checked,
                          })
                        }
                        className="toggle toggle-sky"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800">
                          SMS Notifications
                        </p>
                        <p className="text-sm text-slate-600">
                          Important updates via text message
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.smsNotifications}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            smsNotifications: e.target.checked,
                          })
                        }
                        className="toggle toggle-sky"
                      />
                    </label>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <button
                      onClick={handleNotificationUpdate}
                      disabled={loading}
                      className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-sky-600" />
                  Privacy Settings
                </h2>

                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Profile Visibility
                      </span>
                    </label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          profileVisibility: e.target.value,
                        })
                      }
                      className="select select-bordered w-full"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="students">Students Only</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-2">
                      Control who can see your profile information
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-800">
                      Contact Information
                    </h3>

                    <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800">
                          Show Email Address
                        </p>
                        <p className="text-sm text-slate-600">
                          Make your email visible on your profile
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacy.showEmail}
                        onChange={(e) =>
                          setPrivacy({
                            ...privacy,
                            showEmail: e.target.checked,
                          })
                        }
                        className="toggle toggle-sky"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800">
                          Show Phone Number
                        </p>
                        <p className="text-sm text-slate-600">
                          Make your phone number visible
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacy.showPhone}
                        onChange={(e) =>
                          setPrivacy({
                            ...privacy,
                            showPhone: e.target.checked,
                          })
                        }
                        className="toggle toggle-sky"
                      />
                    </label>
                  </div>

                  {/* Interaction Settings */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-slate-800">
                      Interaction Settings
                    </h3>

                    <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800">
                          Allow Messages
                        </p>
                        <p className="text-sm text-slate-600">
                          Let students send you direct messages
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacy.allowMessages}
                        onChange={(e) =>
                          setPrivacy({
                            ...privacy,
                            allowMessages: e.target.checked,
                          })
                        }
                        className="toggle toggle-sky"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800">
                          Show Online Status
                        </p>
                        <p className="text-sm text-slate-600">
                          Display when youre online
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacy.showOnlineStatus}
                        onChange={(e) =>
                          setPrivacy({
                            ...privacy,
                            showOnlineStatus: e.target.checked,
                          })
                        }
                        className="toggle toggle-sky"
                      />
                    </label>
                  </div>

                  {/* Data & Privacy */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-slate-800">
                      Data & Privacy
                    </h3>

                    <button className="btn btn-outline w-full justify-start">
                      <Download className="h-4 w-4" />
                      Download My Data
                    </button>

                    <button className="btn btn-outline w-full justify-start">
                      <Trash2 className="h-4 w-4" />
                      Request Data Deletion
                    </button>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <button
                      onClick={handlePrivacyUpdate}
                      disabled={loading}
                      className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-sky-600" />
                  Appearance Settings
                </h2>

                <div className="space-y-6">
                  {/* Theme Mode */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Theme Mode</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTheme({ ...theme, mode: "light" })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          theme.mode === "light"
                            ? "border-sky-600 bg-sky-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-full h-20 bg-white border border-slate-200 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Light</p>
                      </button>

                      <button
                        onClick={() => setTheme({ ...theme, mode: "dark" })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          theme.mode === "dark"
                            ? "border-sky-600 bg-sky-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-full h-20 bg-slate-800 border border-slate-700 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Dark</p>
                      </button>

                      <button
                        onClick={() => setTheme({ ...theme, mode: "auto" })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          theme.mode === "auto"
                            ? "border-sky-600 bg-sky-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-full h-20 bg-linear-to-r from-white to-slate-800 border border-slate-200 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Auto</p>
                      </button>
                    </div>
                  </div>

                  {/* Color Scheme */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Color Scheme
                      </span>
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { name: "Sky", color: "bg-sky-600" },
                        { name: "Purple", color: "bg-purple-600" },
                        { name: "Green", color: "bg-green-600" },
                        { name: "Orange", color: "bg-orange-600" },
                      ].map((scheme) => (
                        <button
                          key={scheme.name}
                          onClick={() =>
                            setTheme({
                              ...theme,
                              colorScheme: scheme.name.toLowerCase(),
                            })
                          }
                          className={`p-4 border-2 rounded-lg transition-all ${
                            theme.colorScheme === scheme.name.toLowerCase()
                              ? "border-slate-800"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-full h-12 ${scheme.color} rounded mb-2`}
                          ></div>
                          <p className="text-xs font-medium text-center">
                            {scheme.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Font Size</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["small", "medium", "large"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setTheme({ ...theme, fontSize: size })}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            theme.fontSize === size
                              ? "border-sky-600 bg-sky-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <p
                            className={`font-medium text-center capitalize ${
                              size === "small"
                                ? "text-xs"
                                : size === "medium"
                                ? "text-sm"
                                : "text-base"
                            }`}
                          >
                            {size}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <button
                      onClick={handleThemeUpdate}
                      disabled={loading}
                      className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save Appearance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-sky-600" />
                  Billing & Payments
                </h2>

                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="p-4 bg-linear-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          Pro Plan
                        </h3>
                        <p className="text-sm text-slate-600">
                          Billed monthly • Next payment on Jan 15, 2025
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-sky-600">$29</p>
                        <p className="text-xs text-slate-600">/month</p>
                      </div>
                    </div>
                    <button className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none">
                      Upgrade Plan
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-800">
                        Payment Methods
                      </h3>
                      <button className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none">
                        <Plus className="h-4 w-4" />
                        Add Method
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-linear-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">
                              •••• •••• •••• 4242
                            </p>
                            <p className="text-xs text-slate-600">
                              Expires 12/2025
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="badge badge-sm bg-green-500 text-white border-none">
                            Default
                          </span>
                          <button className="btn btn-ghost btn-sm btn-circle">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-4">
                      Billing History
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Invoice</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Dec 15, 2024</td>
                            <td>Pro Plan - Monthly</td>
                            <td>$29.00</td>
                            <td>
                              <span className="badge badge-sm bg-green-500 text-white border-none">
                                Paid
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-ghost btn-xs">
                                <Download className="h-3 w-3" />
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Nov 15, 2024</td>
                            <td>Pro Plan - Monthly</td>
                            <td>$29.00</td>
                            <td>
                              <span className="badge badge-sm bg-green-500 text-white border-none">
                                Paid
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-ghost btn-xs">
                                <Download className="h-3 w-3" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Danger Zone
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-red-800">Delete Account</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Permanently delete your account and all your data
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
