"use client";

import Link from "next/link";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconPackage,
} from "@tabler/icons-react";

const products = [
  {
    id: 1,
    name: "Fresh Tomato",
    category: "Vegetables",
    stock: 8,
    minStock: 50,
    status: "Critical",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200",
  },
  {
    id: 2,
    name: "Potato",
    category: "Vegetables",
    stock: 18,
    minStock: 60,
    status: "Low",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200",
  },
  {
    id: 3,
    name: "Spinach",
    category: "Leafy",
    stock: 12,
    minStock: 40,
    status: "Critical",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200",
  },
  {
    id: 4,
    name: "Carrot",
    category: "Vegetables",
    stock: 22,
    minStock: 70,
    status: "Low",
    image:
      "https://images.unsplash.com/photo-1447175008436-170170753d52?w=200",
  },
];

export default function LowStockProducts() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b border-gray-100">

        <div>

          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">

            <IconAlertTriangle
              size={22}
              className="text-orange-500"
            />

            Low Stock Products

          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Products that need to be restocked
          </p>

        </div>

        <Link
          href="/dashboard/products"
          className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
        >
          View All
          <IconArrowRight size={18} />
        </Link>

      </div>

      {/* Products */}

      <div className="p-6 space-y-5">

        {products.map((item) => {

          const percent = Math.min(
            (item.stock / item.minStock) * 100,
            100
          );

          return (

            <div
              key={item.id}
              className="rounded-2xl border border-gray-100 p-4 hover:shadow-md transition"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.category}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Critical"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                  {/* Stock */}

                  <div className="mt-4 flex justify-between text-sm">

                    <span className="text-gray-500">
                      Stock
                    </span>

                    <span className="font-semibold">
                      {item.stock} / {item.minStock}
                    </span>

                  </div>

                  {/* Progress */}

                  <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">

                    <div
                      className={`h-full rounded-full ${
                        item.status === "Critical"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                      style={{
                        width: `${percent}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="mt-5 flex justify-between items-center">

                <div className="flex items-center gap-2 text-gray-500 text-sm">

                  <IconPackage size={18} />

                  Restock Recommended

                </div>

                <button className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition">

                  Restock

                </button>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}