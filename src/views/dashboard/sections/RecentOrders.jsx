"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconEye,
} from "@tabler/icons-react";

const orders = [
  {
    id: "#ORD-1001",
    customer: "Rahul Sharma",
    items: 5,
    amount: "₹680",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD-1002",
    customer: "Priya Patel",
    items: 2,
    amount: "₹320",
    payment: "Paid",
    status: "Processing",
  },
  {
    id: "#ORD-1003",
    customer: "Amit Verma",
    items: 8,
    amount: "₹1,240",
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "#ORD-1004",
    customer: "Sneha Joshi",
    items: 3,
    amount: "₹540",
    payment: "Paid",
    status: "Delivered",
  },
];

const statusClasses = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Pending: "bg-orange-100 text-orange-700",
};

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b border-gray-100">

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest customer orders
          </p>

        </div>

        <Link
          href="/dashboard/orders"
          className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
        >
          View All
          <IconArrowRight size={18} />
        </Link>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-100 text-left">

              <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                Order ID
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                Customer
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                Items
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                Amount
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                Payment
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                Status
              </th>

              <th className="px-6 py-4"></th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >

                <td className="px-6 py-5 font-semibold text-gray-900">
                  {order.id}
                </td>

                <td className="px-6 py-5">
                  {order.customer}
                </td>

                <td className="px-6 py-5">
                  {order.items}
                </td>

                <td className="px-6 py-5 font-semibold">
                  {order.amount}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.payment}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusClasses[order.status]
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-green-50 transition"
                  >
                    <IconEye size={18} />
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}