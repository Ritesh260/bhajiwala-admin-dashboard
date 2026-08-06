"use client";

import {
  IconCurrencyRupee,
  IconShoppingCart,
  IconPackage,
  IconUsers,
  IconTrendingUp,
} from "@tabler/icons-react";

const stats = [
  {
    id: 1,
    title: "Total Revenue",
    value: "₹1,24,580",
    growth: "+18.4%",
    subtitle: "Compared to last month",
    icon: IconCurrencyRupee,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    id: 2,
    title: "Total Orders",
    value: "1,286",
    growth: "+12.6%",
    subtitle: "Compared to last month",
    icon: IconShoppingCart,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    id: 3,
    title: "Products",
    value: "245",
    growth: "+8.1%",
    subtitle: "Active products",
    icon: IconPackage,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    id: 4,
    title: "Customers",
    value: "865",
    growth: "+22.3%",
    subtitle: "New customers",
    icon: IconUsers,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-3">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
              >
                <Icon
                  size={28}
                  className={item.color}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">

                  <IconTrendingUp
                    size={16}
                    className="text-green-600"
                  />

                </div>

                <span className="font-semibold text-green-600">
                  {item.growth}
                </span>

              </div>

              <span className="text-xs text-gray-400 text-right">
                {item.subtitle}
              </span>

            </div>

            {/* Bottom Progress */}

            <div className="mt-5 h-2 rounded-full bg-gray-100 overflow-hidden">

              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: "75%" }}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
}