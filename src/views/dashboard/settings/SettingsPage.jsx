"use client";

import { useState } from "react";
import {
    IconUser,
    IconBuildingStore,
    IconTruckDelivery,
    IconCreditCard,
    IconBell,
    IconWorld,
    IconLock,
    IconDeviceFloppy,
} from "@tabler/icons-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        {
            id: "profile",
            label: "My Profile",
            icon: IconUser,
        },
        {
            id: "store",
            label: "Store Information",
            icon: IconBuildingStore,
        },
        {
            id: "delivery",
            label: "Delivery Settings",
            icon: IconTruckDelivery,
        },
        {
            id: "payment",
            label: "Payment Settings",
            icon: IconCreditCard,
        },
        {
            id: "notifications",
            label: "Notifications",
            icon: IconBell,
        },
        {
            id: "seo",
            label: "SEO & Social",
            icon: IconWorld,
        },
        {
            id: "security",
            label: "Security",
            icon: IconLock,
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Settings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your account, store settings and application preferences.
                    </p>

                </div>

                <button
                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition"
                >
                    <IconDeviceFloppy size={20} />
                    Save Changes
                </button>

            </div>

            {/* Layout */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Sidebar */}

                <div className="lg:col-span-3">

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sticky top-24">

                        <div className="mb-5">

                            <h3 className="font-bold text-lg">
                                Settings Menu
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Select a section
                            </p>

                        </div>

                        <div className="space-y-2">

                            {tabs.map((tab) => {

                                const Icon = tab.icon;

                                return (

                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition
                    ${activeTab === tab.id
                                                ? "bg-green-600 text-white"
                                                : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                    >

                                        <Icon size={20} />

                                        <span className="font-medium">
                                            {tab.label}
                                        </span>

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                </div>

                {/* Content */}

                <div className="lg:col-span-9 space-y-6">
                    {/* ================= My Profile ================= */}

                    {activeTab === "profile" && (

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                            <div className="border-b border-gray-100 px-6 py-5">

                                <h2 className="text-2xl font-bold">
                                    My Profile
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Manage your personal information.
                                </p>

                            </div>

                            <div className="p-6">

                                {/* Profile Image */}

                                <div className="flex flex-col lg:flex-row gap-8">

                                    <div className="flex flex-col items-center">

                                        <img
                                            src="https://placehold.co/220x220?text=Profile"
                                            alt="Profile"
                                            className="w-44 h-44 rounded-3xl object-cover border-4 border-green-100"
                                        />

                                        <label className="mt-5">

                                            <input
                                                type="file"
                                                className="hidden"
                                            />

                                            <span className="cursor-pointer rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700 transition">

                                                Change Photo

                                            </span>

                                        </label>

                                        <button
                                            className="mt-3 text-red-600 hover:underline"
                                        >
                                            Remove Photo
                                        </button>

                                    </div>

                                    {/* Form */}

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                defaultValue="Ritesh Mali"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                            />

                                        </div>

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Username
                                            </label>

                                            <input
                                                type="text"
                                                defaultValue="riteshmali"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                            />

                                        </div>

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                defaultValue="admin@bhajiwala.com"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                            />

                                        </div>

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Mobile Number
                                            </label>

                                            <input
                                                type="text"
                                                defaultValue="9876543210"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                            />

                                        </div>

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Role
                                            </label>

                                            <input
                                                type="text"
                                                value="Administrator"
                                                readOnly
                                                className="w-full rounded-xl bg-gray-100 border border-gray-200 px-4 py-3 cursor-not-allowed"
                                            />

                                        </div>

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Date Joined
                                            </label>

                                            <input
                                                type="text"
                                                value="01 January 2026"
                                                readOnly
                                                className="w-full rounded-xl bg-gray-100 border border-gray-200 px-4 py-3 cursor-not-allowed"
                                            />

                                        </div>

                                        <div className="md:col-span-2">

                                            <label className="block text-sm font-medium mb-2">
                                                Bio
                                            </label>

                                            <textarea
                                                rows={5}
                                                defaultValue="Frontend Developer & Administrator of BhajiWala."
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}
                    {/* ================= Store Information ================= */}

                    {activeTab === "store" && (

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                            <div className="border-b border-gray-100 px-6 py-5">

                                <h2 className="text-2xl font-bold">
                                    Store Information
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Manage your store details and branding.
                                </p>

                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Store Name
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue="BhajiWala"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Owner Name
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue="Ritesh Mali"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Support Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="support@bhajiwala.com"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Support Phone
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="+91 9876543210"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium mb-2">
                                        Store Address
                                    </label>

                                    <textarea
                                        rows={4}
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        GST Number
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="27XXXXXXXXXX"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        FSSAI Number
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="FSSAI Number"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Opening Time
                                    </label>

                                    <input
                                        type="time"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Closing Time
                                    </label>

                                    <input
                                        type="time"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium mb-2">
                                        Google Maps Link
                                    </label>

                                    <input
                                        type="url"
                                        placeholder="https://maps.google.com/..."
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                            </div>

                        </div>

                    )}



                    {/* ================= Delivery Settings ================= */}

                    {activeTab === "delivery" && (

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                            <div className="border-b border-gray-100 px-6 py-5">

                                <h2 className="text-2xl font-bold">
                                    Delivery Settings
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Configure delivery preferences.
                                </p>

                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Delivery Charge (₹)
                                    </label>

                                    <input
                                        type="number"
                                        defaultValue="40"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Free Delivery Above (₹)
                                    </label>

                                    <input
                                        type="number"
                                        defaultValue="499"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Delivery Radius (KM)
                                    </label>

                                    <input
                                        type="number"
                                        defaultValue="8"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Estimated Delivery Time (Min)
                                    </label>

                                    <input
                                        type="number"
                                        defaultValue="30"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div className="md:col-span-2 space-y-4">

                                    <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                        <span className="font-medium">
                                            Cash on Delivery
                                        </span>

                                        <input type="checkbox" defaultChecked />

                                    </label>

                                    <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                        <span className="font-medium">
                                            Auto Assign Delivery Partner
                                        </span>

                                        <input type="checkbox" defaultChecked />

                                    </label>

                                    <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                        <span className="font-medium">
                                            Enable Same Day Delivery
                                        </span>

                                        <input type="checkbox" />

                                    </label>

                                </div>

                            </div>

                        </div>

                    )}
                    {/* ================= Payment Settings ================= */}

                    {activeTab === "payment" && (

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                            <div className="border-b border-gray-100 px-6 py-5">

                                <h2 className="text-2xl font-bold">
                                    Payment Settings
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Configure available payment methods.
                                </p>

                            </div>

                            <div className="p-6 space-y-5">

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span className="font-medium">
                                        Cash On Delivery
                                    </span>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />

                                </label>

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span className="font-medium">
                                        UPI Payment
                                    </span>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />

                                </label>

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span className="font-medium">
                                        Razorpay
                                    </span>

                                    <input
                                        type="checkbox"
                                    />

                                </label>

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span className="font-medium">
                                        Wallet Payment
                                    </span>

                                    <input
                                        type="checkbox"
                                    />

                                </label>

                            </div>

                        </div>

                    )}



                    {/* ================= Notifications ================= */}

                    {activeTab === "notifications" && (

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                            <div className="border-b border-gray-100 px-6 py-5">

                                <h2 className="text-2xl font-bold">
                                    Notification Settings
                                </h2>

                            </div>

                            <div className="p-6 space-y-5">

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span>New Order Notification</span>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />

                                </label>

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span>Delivery Assigned</span>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />

                                </label>

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span>Low Stock Alert</span>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />

                                </label>

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span>Email Notification</span>

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />

                                </label>

                                <label className="flex items-center justify-between border rounded-xl px-5 py-4">

                                    <span>SMS Notification</span>

                                    <input
                                        type="checkbox"
                                    />

                                </label>

                            </div>

                        </div>

                    )}



                    {/* ================= SEO & Social ================= */}

                    {activeTab === "seo" && (

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                            <div className="border-b border-gray-100 px-6 py-5">

                                <h2 className="text-2xl font-bold">
                                    SEO & Social Media
                                </h2>

                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium mb-2">
                                        Meta Title
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium mb-2">
                                        Meta Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Facebook URL
                                    </label>

                                    <input
                                        type="url"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Instagram URL
                                    </label>

                                    <input
                                        type="url"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        WhatsApp Number
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        YouTube URL
                                    </label>

                                    <input
                                        type="url"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                    />

                                </div>

                            </div>

                        </div>

                    )}
                    {/* ================= Security ================= */}

                    {activeTab === "security" && (

                        <div className="space-y-6">

                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                                <div className="border-b border-gray-100 px-6 py-5">

                                    <h2 className="text-2xl font-bold">
                                        Security Settings
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        Update your password and account security.
                                    </p>

                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <div className="md:col-span-2">

                                        <label className="block text-sm font-medium mb-2">
                                            Current Password
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Enter current password"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            New Password
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                                        />

                                    </div>

                                </div>

                            </div>



                            {/* Active Sessions */}

                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

                                <div className="border-b border-gray-100 px-6 py-5">

                                    <h2 className="text-xl font-bold">
                                        Active Sessions
                                    </h2>

                                </div>

                                <div className="divide-y divide-gray-100">

                                    {[
                                        {
                                            device: "Windows 11 • Chrome",
                                            location: "Mumbai, India",
                                            status: "Current Session",
                                        },
                                        {
                                            device: "Android • Chrome",
                                            location: "Mumbai, India",
                                            status: "Active",
                                        },
                                    ].map((session, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-6"
                                        >

                                            <div>

                                                <h4 className="font-semibold">
                                                    {session.device}
                                                </h4>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {session.location}
                                                </p>

                                            </div>

                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                                {session.status}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>



                            {/* Action Buttons */}

                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">

                                <div className="flex flex-col sm:flex-row justify-end gap-4">

                                    <button
                                        type="reset"
                                        className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
                                    >
                                        Reset
                                    </button>

                                    <button
                                        type="button"
                                        className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                                    >
                                        Logout From All Devices
                                    </button>

                                    <button
                                        type="button"
                                        className="px-8 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                                    >
                                        Save Changes
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

            );
            </div>
    )
}