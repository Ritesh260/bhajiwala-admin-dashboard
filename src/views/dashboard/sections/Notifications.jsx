"use client";

import {
  IconBell,
  IconShoppingCart,
  IconPackage,
  IconMessageCircle,
  IconCreditCard,
} from "@tabler/icons-react";

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    desc: "#ORD-1024 placed by Rahul Sharma",
    time: "2 min ago",
    icon: IconShoppingCart,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Payment Successful",
    desc: "₹1,250 received successfully",
    time: "10 min ago",
    icon: IconCreditCard,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Low Stock Alert",
    desc: "Tomato stock is running low",
    time: "35 min ago",
    icon: IconPackage,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    title: "New Review",
    desc: "Customer rated 5 stars ⭐",
    time: "1 hour ago",
    icon: IconMessageCircle,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function Notifications() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <IconBell className="text-green-600" />
        <h2 className="font-bold text-xl">Notifications</h2>
      </div>

      <div className="divide-y divide-gray-100">

        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="p-5 flex gap-4 hover:bg-gray-50 transition"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                <Icon size={22} />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}