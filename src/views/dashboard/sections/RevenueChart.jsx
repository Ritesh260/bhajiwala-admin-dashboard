"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  IconTrendingUp,
  IconCurrencyRupee,
} from "@tabler/icons-react";

const revenueData = [
  { month: "Jan", revenue: 28000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 42000 },
  { month: "Apr", revenue: 39000 },
  { month: "May", revenue: 51000 },
  { month: "Jun", revenue: 56000 },
  { month: "Jul", revenue: 63000 },
  { month: "Aug", revenue: 59000 },
  { month: "Sep", revenue: 72000 },
  { month: "Oct", revenue: 81000 },
  { month: "Nov", revenue: 91000 },
  { month: "Dec", revenue: 105000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Revenue Analytics
          </h2>

          <p className="text-gray-500 mt-1">
            Monthly revenue performance
          </p>

        </div>

        <select className="w-fit border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-green-600">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Revenue
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹7.4L
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">

              <IconCurrencyRupee
                className="text-white"
                size={24}
              />

            </div>

          </div>

        </div>

        <div className="bg-blue-50 rounded-2xl p-5">

          <p className="text-sm text-gray-500">
            Avg. Order Value
          </p>

          <h3 className="text-3xl font-bold mt-2">
            ₹468
          </h3>

        </div>

        <div className="bg-orange-50 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-green-600">

            <IconTrendingUp size={22} />

            <span className="font-semibold">
              +23.8%
            </span>

          </div>

          <p className="text-gray-500 mt-3">
            Growth from last year
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[380px] mt-10">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={revenueData}>

            <defs>

              <linearGradient
                id="greenGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#16A34A"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#16A34A"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16A34A"
              strokeWidth={4}
              fill="url(#greenGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}