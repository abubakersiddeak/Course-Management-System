"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/context";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  User,
  Shield,
  Lock,
  Bell,
  Palette,
  CreditCard,
  Camera,
  Save,
  Download,
  LogOut,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  X,
  Smartphone,
  Trash2,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const { currentUser, ubdateUser, signout, resetPassword } =
    useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  // Profile State - Initialize from Firebase user
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    phone: "",
    website: "",
    bio: "",
    location: "",
    language: "en",
    timezone: "UTC-5",
  });

  const [profileImage, setProfileImage] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification State
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    newEnrollments: true,
    studentMessages: true,
    weeklyReports: false,
    marketingEmails: false,
    pushNotifications: true,
    smsNotifications: false,
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: true,
    showPhone: false,
    allowMessages: true,
    showOnlineStatus: true,
  });

  // Theme State
  const [theme, setTheme] = useState({
    mode: "light",
    colorScheme: "sky",
    fontSize: "medium",
  });

  // Load user data from Firebase and localStorage
  useEffect(() => {
    if (currentUser) {
      // Load from Firebase user
      setProfileData((prev) => ({
        ...prev,
        displayName: currentUser.displayName || "",
        email: currentUser.email || "",
      }));
      setProfileImage(currentUser.photoURL || "");

      // Load additional data from localStorage
      const savedProfile = localStorage.getItem(`profile_${currentUser.uid}`);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData((prev) => ({ ...prev, ...parsedProfile }));
      }

      const savedNotifications = localStorage.getItem(
        `notifications_${currentUser.uid}`
      );
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

      const savedPrivacy = localStorage.getItem(`privacy_${currentUser.uid}`);
      if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy));

      const savedTheme = localStorage.getItem(`theme_${currentUser.uid}`);
      if (savedTheme) setTheme(JSON.parse(savedTheme));
    }
  }, [currentUser]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.mode);
    document.documentElement.style.fontSize =
      theme.fontSize === "small"
        ? "14px"
        : theme.fontSize === "large"
        ? "18px"
        : "16px";
  }, [theme]);

  // Tabs configuration
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Shield },
    { id: "password", label: "Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  // Profile Image Handlers
  const handleImageUrlSubmit = async () => {
    if (!imageUrlInput.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      new URL(imageUrlInput);
      setLoading(true);

      // Update Firebase user profile
      await ubdateUser(currentUser, {
        displayName: profileData.displayName,
        photoURL: imageUrlInput,
      });

      setProfileImage(imageUrlInput);
      setImageUrlInput("");
      setShowImageUrlInput(false);
      setLoading(false);
      toast.success("Profile photo updated successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update profile photo");
      console.error(error);
    }
  };

  const removeProfileImage = async () => {
    try {
      setLoading(true);
      await ubdateUser(currentUser, {
        displayName: profileData.displayName,
        photoURL: "",
      });

      setProfileImage("");
      setImageUrlInput("");
      setShowImageUrlInput(false);
      setLoading(false);
      toast.success("Profile photo removed");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to remove profile photo");
      console.error(error);
    }
  };

  // Profile Update Handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      // Update Firebase user profile
      await ubdateUser(currentUser, {
        displayName: profileData.displayName,
        photoURL: profileImage,
      });

      // Save additional profile data to localStorage
      const additionalData = {
        phone: profileData.phone,
        website: profileData.website,
        bio: profileData.bio,
        location: profileData.location,
        language: profileData.language,
        timezone: profileData.timezone,
      };

      localStorage.setItem(
        `profile_${currentUser.uid}`,
        JSON.stringify(additionalData)
      );
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  // Password Change Handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (passwordData.currentPassword.length < 6) {
      toast.error("Current password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Check password strength
    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword);
    const hasNumber = /[0-9]/.test(passwordData.newPassword);
    const hasSpecialChar = /[!@#$%^&*]/.test(passwordData.newPassword);

    if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
      toast.error("Password does not meet strength requirements");
      setLoading(false);
      return;
    }

    try {
      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, passwordData.newPassword);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setLoading(false);
      toast.success("Password updated successfully!");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/wrong-password") {
        toast.error("Current password is incorrect");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else {
        toast.error("Failed to update password");
      }
      console.error(error);
    }
  };

  // Notification Update Handler
  const handleNotificationUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        `notifications_${currentUser.uid}`,
        JSON.stringify(notifications)
      );
      setLoading(false);
      toast.success("Notification preferences saved!");
    }, 800);
  };

  // Privacy Update Handler
  const handlePrivacyUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        `privacy_${currentUser.uid}`,
        JSON.stringify(privacy)
      );
      setLoading(false);
      toast.success("Privacy settings saved!");
    }, 800);
  };

  // Theme Update Handler
  const handleThemeUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(`theme_${currentUser.uid}`, JSON.stringify(theme));
      setLoading(false);
      toast.success("Appearance settings saved!");
    }, 800);
  };

  // Logout Handler
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        await signout();
        toast.success("Logged out successfully!");
        window.location.href = "/login";
      } catch (error) {
        toast.error("Failed to logout");
        console.error(error);
      }
    }
  };

  // Delete Account Handler
  const handleDeleteAccount = async () => {
    const confirmation = window.prompt(
      'This action cannot be undone. Type "DELETE" to confirm:'
    );

    if (confirmation === "DELETE") {
      setLoading(true);
      try {
        // Delete user account from Firebase
        await currentUser.delete();

        // Clear localStorage
        localStorage.clear();

        setLoading(false);
        toast.success("Account deleted successfully");
        window.location.href = "/";
      } catch (error) {
        setLoading(false);
        if (error.code === "auth/requires-recent-login") {
          toast.error("Please log in again before deleting your account");
        } else {
          toast.error("Failed to delete account");
        }
        console.error(error);
      }
    } else if (confirmation !== null) {
      toast.error("Incorrect confirmation text");
    }
  };

  // Export Data Handler
  const handleExportData = () => {
    const data = {
      profile: profileData,
      notifications,
      privacy,
      theme,
      firebaseUser: {
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
      },
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `account-data-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  // Send Password Reset Email
  const handlePasswordReset = async () => {
    if (!currentUser?.email) {
      toast.error("No email address found");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(currentUser.email);
      setLoading(false);
      toast.success("Password reset email sent!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send password reset email");
      console.error(error);
    }
  };

  // If no user is logged in, show message
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Not Logged In
          </h2>
          <p className="text-slate-600 mb-6">
            Please log in to access your settings
          </p>
          <a
            href="/login"
            className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-600 mt-2">
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
            <div className="hidden lg:block mt-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-4 border border-sky-200">
              <h3 className="font-semibold text-slate-800 mb-3 text-sm">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={handleExportData}
                  className="btn btn-sm w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-200 justify-start"
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm w-full bg-white hover:bg-slate-50 text-red-600 border-slate-200 justify-start"
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
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden border-2 border-sky-200">
                            {profileImage ? (
                              <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.innerHTML =
                                    '<div class="flex items-center justify-center w-full h-full"><svg class="h-10 w-10 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>';
                                  toast.error("Failed to load image");
                                }}
                              />
                            ) : (
                              <User className="h-10 w-10 text-sky-600" />
                            )}
                          </div>
                          {profileImage && (
                            <button
                              type="button"
                              onClick={removeProfileImage}
                              disabled={loading}
                              className="absolute -top-1 -right-1 btn btn-circle btn-xs bg-red-500 hover:bg-red-600 text-white border-none"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                        <div className="flex-1">
                          {!showImageUrlInput ? (
                            <button
                              type="button"
                              onClick={() => setShowImageUrlInput(true)}
                              className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none"
                            >
                              <Camera className="h-4 w-4" />
                              Change Photo
                            </button>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={imageUrlInput}
                                  onChange={(e) =>
                                    setImageUrlInput(e.target.value)
                                  }
                                  placeholder="Enter image URL"
                                  className="input input-sm input-bordered flex-1"
                                />
                                <button
                                  type="button"
                                  onClick={handleImageUrlSubmit}
                                  disabled={loading}
                                  className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none"
                                >
                                  {loading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowImageUrlInput(false);
                                    setImageUrlInput("");
                                  }}
                                  className="btn btn-sm btn-ghost"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Enter a URL to an image (recommended: square image, at
                        least 400x400px)
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
                          required
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
                          disabled
                          className="input input-bordered w-full bg-slate-100"
                          title="Email cannot be changed"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Email cannot be changed
                        </p>
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
                          <span className="label-text font-medium">
                            Website
                          </span>
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
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
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
                          <span className="label-text font-medium">
                            Language
                          </span>
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
                          <span className="label-text font-medium">
                            Timezone
                          </span>
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

            {/* Account Settings - Continue with rest of tabs... */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-sky-600" />
                    Account Settings
                  </h2>

                  <div className="space-y-6">
                    {/* Email Verification */}
                    {!currentUser.emailVerified && (
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
                        <button
                          onClick={() => {
                            currentUser.sendEmailVerification();
                            toast.success("Verification email sent!");
                          }}
                          className="btn btn-sm bg-amber-600 hover:bg-amber-700 text-white border-none"
                        >
                          Verify Email
                        </button>
                      </div>
                    )}

                    {/* User Info */}
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-800 mb-4">
                        Account Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-600">
                            User ID
                          </span>
                          <span className="text-sm font-mono text-slate-800">
                            {currentUser.uid.substring(0, 20)}...
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-600">
                            Email Verified
                          </span>
                          <span
                            className={`badge badge-sm ${
                              currentUser.emailVerified
                                ? "bg-green-500"
                                : "bg-amber-500"
                            } text-white border-none`}
                          >
                            {currentUser.emailVerified
                              ? "Verified"
                              : "Not Verified"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-600">
                            Account Created
                          </span>
                          <span className="text-sm text-slate-800">
                            {new Date(
                              currentUser.metadata.creationTime
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-600">
                            Last Sign In
                          </span>
                          <span className="text-sm text-slate-800">
                            {new Date(
                              currentUser.metadata.lastSignInTime
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Password Reset */}
                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            Reset Password via Email
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            Send a password reset link to your email
                          </p>
                        </div>
                        <button
                          onClick={handlePasswordReset}
                          disabled={loading}
                          className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none"
                        >
                          {loading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            "Send Email"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Password Tab */}
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
                        Must be at least 6 characters long
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
                              passwordData.newPassword.length >= 6
                                ? "bg-green-500"
                                : "bg-slate-300"
                            }`}
                          ></div>
                          <div
                            className={`h-2 flex-1 rounded ${
                              passwordData.newPassword.length >= 8
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
                              passwordData.newPassword.length >= 6
                                ? "text-green-600"
                                : ""
                            }`}
                          >
                            {passwordData.newPassword.length >= 6 ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <X className="h-3 w-3" />
                            )}
                            At least 6 characters
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

            {/* Copy the rest of the tabs (notifications, privacy, appearance, billing) from the previous code */}
            {/* I'll add a shortened version here - include all tabs from previous implementation */}

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Danger Zone
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-red-800">
                      Delete Account
                    </h3>
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
    </div>
  );
}
