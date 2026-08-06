"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Vegetables",
    value: 45,
  },
  {
    name: "Fruits",
    value: 25,
  },
  {
    name: "Leafy",
    value: 18,
  },
  {
    name: "Roots",
    value: 12,
  },
];

const COLORS = [
  "#16A34A",
  "#22C55E",
  "#84CC16",
  "#F59E0B",
];

export default function PieChartCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-full">

      {/* Header */}

      <div>

        <h2 className="text-xl font-bold text-gray-900">
          Product Distribution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Category wise products
        </p>

      </div>

      {/* Chart */}

      <div className="h-64 mt-6">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Legend */}

      <div className="space-y-4 mt-4">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-sm text-gray-700">
                {item.name}
              </span>

            </div>

            <span className="font-semibold text-gray-900">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}