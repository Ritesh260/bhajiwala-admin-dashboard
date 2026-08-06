"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const salesData = [
  { name: "Mon", sales: 4200 },
  { name: "Tue", sales: 5800 },
  { name: "Wed", sales: 4900 },
  { name: "Thu", sales: 7600 },
  { name: "Fri", sales: 8900 },
  { name: "Sat", sales: 9800 },
  { name: "Sun", sales: 7200 },
];

export default function SalesChart() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            Sales Overview
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Weekly sales performance
          </p>

        </div>

        <select className="border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-green-600">

          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>

        </select>

      </div>

      {/* Revenue */}

      <div className="mt-6 flex items-end gap-3">

        <h3 className="text-4xl font-bold text-gray-900">
          ₹45,860
        </h3>

        <span className="mb-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          +18.5%
        </span>

      </div>

      {/* Chart */}

      <div className="h-[350px] mt-8">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={salesData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#16A34A"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#16A34A",
              }}
              activeDot={{
                r: 7,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}