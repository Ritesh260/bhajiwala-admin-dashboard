"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconEye,
} from "@tabler/icons-react";

const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    orders: 18,
    spent: "₹12,580",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@gmail.com",
    phone: "+91 9988776655",
    orders: 9,
    spent: "₹5,640",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit@gmail.com",
    phone: "+91 9090909090",
    orders: 4,
    spent: "₹2,120",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/100?img=22",
  },
  {
    id: 4,
    name: "Sneha Joshi",
    email: "sneha@gmail.com",
    phone: "+91 9871204587",
    orders: 24,
    spent: "₹18,960",
    status: "VIP",
    avatar: "https://i.pravatar.cc/100?img=41",
  },
];

const statusClasses = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-600",
  VIP: "bg-purple-100 text-purple-700",
};

export default function RecentCustomers() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b border-gray-100">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Recent Customers
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest registered customers
          </p>
        </div>

        <Link
          href="/dashboard/customers"
          className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
        >
          View All
          <IconArrowRight size={18} />
        </Link>

      </div>

      {/* List */}

      <div className="divide-y divide-gray-100">

        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between p-5 hover:bg-gray-50 transition"
          >
            {/* Left */}

            <div className="flex items-center gap-4">

              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>

                <h4 className="font-semibold text-gray-900">
                  {customer.name}
                </h4>

                <p className="text-sm text-gray-500">
                  {customer.email}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {customer.phone}
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="hidden lg:flex items-center gap-6">

              <div className="text-center">

                <p className="text-xs text-gray-400">
                  Orders
                </p>

                <h4 className="font-semibold">
                  {customer.orders}
                </h4>

              </div>

              <div className="text-center">

                <p className="text-xs text-gray-400">
                  Spent
                </p>

                <h4 className="font-semibold">
                  {customer.spent}
                </h4>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[customer.status]}`}
              >
                {customer.status}
              </span>

              <Link
                href={`/dashboard/customers/${customer.id}`}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-green-50 transition"
              >
                <IconEye size={18} />
              </Link>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}