"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconStarFilled,
  IconTrendingUp,
} from "@tabler/icons-react";

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200",
    name: "Fresh Tomato",
    category: "Vegetables",
    sales: 542,
    revenue: "₹48,620",
    rating: 4.9,
    progress: 92,
    badge: "Best Seller",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=200",
    name: "Organic Potato",
    category: "Vegetables",
    sales: 418,
    revenue: "₹36,240",
    rating: 4.8,
    progress: 84,
    badge: "Popular",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200",
    name: "Fresh Apple",
    category: "Fruits",
    sales: 386,
    revenue: "₹42,180",
    rating: 4.9,
    progress: 78,
    badge: "Trending",
  },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b border-gray-100">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Top Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Best selling products this month
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

      <div className="p-6 space-y-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="flex gap-4 items-start"
          >

            {/* Image */}

            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-2xl object-cover border border-gray-100"
            />

            {/* Content */}

            <div className="flex-1">

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-bold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {product.category}
                  </p>

                </div>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  {product.badge}
                </span>

              </div>

              {/* Stats */}

              <div className="flex flex-wrap items-center gap-5 mt-4 text-sm">

                <div className="flex items-center gap-1">

                  <IconStarFilled
                    size={16}
                    className="text-yellow-500"
                  />

                  <span className="font-semibold">
                    {product.rating}
                  </span>

                </div>

                <div>
                  <span className="text-gray-500">
                    Sales:
                  </span>{" "}
                  <strong>{product.sales}</strong>
                </div>

                <div>
                  <span className="text-gray-500">
                    Revenue:
                  </span>{" "}
                  <strong>{product.revenue}</strong>
                </div>

                <div className="flex items-center gap-1 text-green-600">

                  <IconTrendingUp size={16} />

                  <span className="font-semibold">
                    {product.progress}%
                  </span>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{
                    width: `${product.progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}