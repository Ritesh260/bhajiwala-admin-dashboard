"use client";

import Link from "next/link";
import {
  IconPlus,
  IconCategory,
  IconShoppingCartPlus,
  IconDiscount2,
  IconTruckDelivery,
  IconUsers,
} from "@tabler/icons-react";

const actions = [
  {
    title: "Add Product",
    href: "/dashboard/products/form",
    icon: IconPlus,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Add Category",
    href: "/dashboard/categories/form",
    icon: IconCategory,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: IconShoppingCartPlus,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Coupons",
    href: "/dashboard/coupons/form",
    icon: IconDiscount2,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Delivery",
    href: "/dashboard/delivery",
    icon: IconTruckDelivery,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: IconUsers,
    color: "bg-pink-100 text-pink-600",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-5">

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                <Icon size={28} />
              </div>

              <h3 className="font-semibold mt-4">
                {item.title}
              </h3>
            </Link>
          );
        })}

      </div>

    </div>
  );
}