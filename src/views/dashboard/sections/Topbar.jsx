"use client";

import { useState } from "react";
import {
  IconMenu2,
  IconSearch,
  IconBell,
  IconMoon,
  IconSun,
  IconMaximize,
  IconChevronDown,
  IconUserCircle,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-20 bg-[#F8FAF5]/90 backdrop-blur-xl border-b border-gray-200 px-4 lg:px-8 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        {/* Mobile Menu */}

        <button className="lg:hidden w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition">

          <IconMenu2 size={22} />

        </button>

        {/* Search */}

        <div className="hidden md:flex items-center w-80 bg-white border border-gray-200 rounded-2xl px-4 py-3">

          <IconSearch
            size={20}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="ml-3 w-full bg-transparent outline-none text-sm"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        {/* Theme */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-11 h-11 rounded-xl bg-white border border-gray-200 hover:bg-green-50 transition flex items-center justify-center"
        >

          {darkMode ? (
            <IconSun size={21} />
          ) : (
            <IconMoon size={21} />
          )}

        </button>

        {/* Full Screen */}

        <button
          className="hidden sm:flex w-11 h-11 rounded-xl bg-white border border-gray-200 hover:bg-green-50 transition items-center justify-center"
        >

          <IconMaximize size={20} />

        </button>

        {/* Notification */}

        <button
          className="relative w-11 h-11 rounded-xl bg-white border border-gray-200 hover:bg-green-50 transition flex items-center justify-center"
        >

          <IconBell size={20} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-3 py-2 hover:bg-green-50 transition"
          >

            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div className="hidden md:block text-left">

              <h4 className="font-semibold text-sm">
                Admin
              </h4>

              <p className="text-xs text-gray-500">
                Super Admin
              </p>

            </div>

            <IconChevronDown size={18} />

          </button>

          {profileOpen && (

            <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

              <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50">

                <IconUserCircle size={20} />

                My Profile

              </button>

              <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50">

                <IconSettings size={20} />

                Settings

              </button>

              <button className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50">

                <IconLogout size={20} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}