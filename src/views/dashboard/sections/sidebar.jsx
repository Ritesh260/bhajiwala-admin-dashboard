"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IconChevronDown,
  IconChevronRight,
  IconLeaf,
} from "@tabler/icons-react";

import dashboardMenu from "@/data/dashboardMenu";

export default function Sidebar() {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState({
    Products: true,
  });

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex flex-col h-full">

      {/* Logo */}

      <div className="h-20 border-b border-gray-200 flex items-center px-6">

        <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center">

          <IconLeaf
            size={24}
            className="text-white"
          />

        </div>

        <div className="ml-3">

          <h2 className="text-xl font-bold text-gray-900">
            BhajiWala
          </h2>

          <p className="text-sm text-gray-500">
            Admin Panel
          </p>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        <div className="space-y-2">

          {dashboardMenu.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              const isOpen = openMenus[item.title];

              return (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden"
                >

                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-green-50 transition"
                  >

                    <div className="flex items-center gap-3">

                      <Icon
                        size={22}
                        className="text-green-600"
                      />

                      <span className="font-medium text-gray-700">
                        {item.title}
                      </span>

                    </div>

                    {isOpen ? (
                      <IconChevronDown size={18} />
                    ) : (
                      <IconChevronRight size={18} />
                    )}

                  </button>

                  {isOpen && (

                    <div className="ml-8 mt-2 space-y-1">

                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        const active =
                          pathname === child.href;

                        return (
                          <Link
                            key={child.title}
                            href={child.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                              active
                                ? "bg-green-100 text-green-700 font-semibold"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >

                            <ChildIcon size={18} />

                            {child.title}

                          </Link>
                        );
                      })}

                    </div>

                  )}

                </div>
              );
            }

            const active = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                  active
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >

                <Icon
                  size={22}
                  className="text-green-600"
                />

                {item.title}

              </Link>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-gray-200 p-5">

        <div className="rounded-2xl bg-green-50 p-4">

          <p className="text-sm font-semibold text-green-700">
            BhajiWala Admin
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Version 1.0.0
          </p>

        </div>

      </div>

    </div>
  );
}