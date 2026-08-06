"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconRefresh,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
} from "@tabler/icons-react";

const initialProducts = [
  {
    id: 1,
    image: "https://picsum.photos/80?1",
    name: "Fresh Tomato",
    sku: "PRD001",
    category: "Vegetables",
    price: 40,
    stock: 120,
    status: "Active",
    featured: true,
    created: "01 Aug 2026",
  },
  {
    id: 2,
    image: "https://picsum.photos/80?2",
    name: "Fresh Potato",
    sku: "PRD002",
    category: "Vegetables",
    price: 30,
    stock: 80,
    status: "Inactive",
    featured: false,
    created: "30 Jul 2026",
  },
];

export default function ProductsPage() {
  const [products] = useState(initialProducts);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all your products
          </p>
        </div>

        <Link
          href="/dashboard/products/form"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <IconPlus size={20} />
          Add Product
        </Link>

      </div>

      {/* Search Card */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Search product..."
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <select
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value,
                })
              }
            >
              <option value="">All</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Leafy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
            >
              <option value="">All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

        </div>

        <div className="flex gap-3 mt-6">

          <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl">
            <IconSearch size={18} />
            Search
          </button>

          <button className="flex items-center gap-2 border px-5 py-3 rounded-xl hover:bg-gray-50">
            <IconRefresh size={18} />
            Reset
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-4 text-left">
                  Product
                </th>

                <th className="px-5 py-4 text-left">
                  Category
                </th>

                <th className="px-5 py-4 text-left">
                  Price
                </th>

                <th className="px-5 py-4 text-left">
                  Stock
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-left">
                  Featured
                </th>

                <th className="px-5 py-4 text-left">
                  Created
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>{products.map((product) => (

  <tr
    key={product.id}
    className="border-t hover:bg-gray-50 transition"
  >

    {/* Product */}

    <td className="px-5 py-4">

      <div className="flex items-center gap-4">

        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 rounded-xl object-cover border"
        />

        <div>

          <h3 className="font-semibold text-gray-900">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500">
            SKU : {product.sku}
          </p>

        </div>

      </div>

    </td>

    {/* Category */}

    <td className="px-5 py-4">
      {product.category}
    </td>

    {/* Price */}

    <td className="px-5 py-4 font-semibold">
      ₹{product.price}
    </td>

    {/* Stock */}

    <td className="px-5 py-4">

      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          product.stock < 20
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-700"
        }`}
      >
        {product.stock} Qty
      </span>

    </td>

    {/* Status */}

    <td className="px-5 py-4">

      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          product.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {product.status}
      </span>

    </td>

    {/* Featured */}

    <td className="px-5 py-4">

      {product.featured ? (

        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
          Yes
        </span>

      ) : (

        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
          No
        </span>

      )}

    </td>

    {/* Created */}

    <td className="px-5 py-4 text-gray-500">
      {product.created}
    </td>

    {/* Actions */}

    <td className="px-5 py-4">

      <div className="flex items-center justify-center gap-2">

        <button className="w-9 h-9 rounded-lg border hover:bg-blue-50 transition">
          <IconEye
            size={18}
            className="mx-auto text-blue-600"
          />
        </button>

        <Link
          href={`/dashboard/products/form/${product.id}`}
          className="w-9 h-9 rounded-lg border hover:bg-green-50 transition flex items-center justify-center"
        >
          <IconEdit
            size={18}
            className="text-green-600"
          />
        </Link>

        <button className="w-9 h-9 rounded-lg border hover:bg-red-50 transition">

          <IconTrash
            size={18}
            className="mx-auto text-red-600"
          />

        </button>

      </div>

    </td>

  </tr>

))}
            </tbody>

          </table>

          {/* Empty State */}

          {products.length === 0 && (
            <div className="py-16 text-center">

              <img
                src="/empty.svg"
                alt="No Products"
                className="w-40 mx-auto"
              />

              <h3 className="mt-5 text-xl font-semibold text-gray-800">
                No Products Found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing the search filters or add a new product.
              </p>

              <Link
                href="/dashboard/products/form"
                className="inline-flex mt-6 items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
              >
                <IconPlus size={18} />
                Add Product
              </Link>

            </div>
          )}

        </div>

        {/* Pagination */}

        <div className="border-t border-gray-100 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            Showing
            <span className="font-semibold text-gray-900">
              {" "}1{" "}
            </span>
            to
            <span className="font-semibold text-gray-900">
              {" "}2{" "}
            </span>
            of
            <span className="font-semibold text-gray-900">
              {" "}2{" "}
            </span>
            products
          </p>

          <div className="flex items-center gap-2">

            <button className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
              Previous
            </button>

            <button className="w-10 h-10 rounded-lg bg-green-600 text-white font-semibold">
              1
            </button>

            <button className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}