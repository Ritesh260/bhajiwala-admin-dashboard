"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/views/dashboard/sections/sidebar";
import Topbar from "@/views/dashboard/sections/Topbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  // Authentication check hone tak
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F8FAF5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />

          <p className="text-sm font-medium text-gray-500">
            Checking authentication...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF5]">

      {/* Sidebar */}

      <aside className="hidden lg:block fixed left-0 top-0 w-72 h-screen border-r border-gray-200 bg-white z-40">
        <Sidebar />
      </aside>


      {/* Main Content */}

      <div className="lg:ml-72 min-h-screen flex flex-col">

        {/* Topbar */}

        <header className="sticky top-0 z-30 bg-[#F8FAF5]/80 backdrop-blur-md border-b border-gray-200">
          <Topbar />
        </header>


        {/* Page Content */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}