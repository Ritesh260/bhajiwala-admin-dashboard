"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconRefresh,
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

const initialCategories = [
  {
    id: 1,
    image: "https://picsum.photos/60?1",
    name: "Vegetables",
    slug: "vegetables",
    parent: "-",
    products: 25,
    status: "Active",
    created: "01 Aug 2026",
  },
  {
    id: 2,
    image: "https://picsum.photos/60?2",
    name: "Fruits",
    slug: "fruits",
    parent: "-",
    products: 18,
    status: "Inactive",
    created: "30 Jul 2026",
  },
];

export default function CategoriesPage() {

  const [categories] = useState(initialCategories);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all product categories
          </p>

        </div>

        <Link
          href="/dashboard/categories/form"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <IconPlus size={20} />
          Add Category
        </Link>

      </div>

      {/* Search Filter */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>

            <input
              type="text"
              placeholder="Search category..."
              value={filters.search}
              onChange={(e)=>
                setFilters({
                  ...filters,
                  search:e.target.value
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={filters.status}
              onChange={(e)=>
                setFilters({
                  ...filters,
                  status:e.target.value
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="">
                All
              </option>

              <option>
                Active
              </option>

              <option>
                Inactive
              </option>

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
                  Category
                </th>

                <th className="px-5 py-4 text-left">
                  Slug
                </th>

                <th className="px-5 py-4 text-left">
                  Parent
                </th>

                <th className="px-5 py-4 text-left">
                  Products
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-left">
                  Created
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>            {categories.map((category) => (

              <tr
                key={category.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >

                {/* Category */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        {category.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Category #{category.id}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Slug */}

                <td className="px-5 py-4">

                  <span className="text-gray-700">
                    {category.slug}
                  </span>

                </td>

                {/* Parent */}

                <td className="px-5 py-4">

                  {category.parent}

                </td>

                {/* Products */}

                <td className="px-5 py-4">

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">

                    {category.products} Products

                  </span>

                </td>

                {/* Status */}

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      category.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {category.status}
                  </span>

                </td>

                {/* Created */}

                <td className="px-5 py-4 text-gray-500">

                  {category.created}

                </td>

                {/* Actions */}

                <td className="px-5 py-4">

                  <div className="flex items-center justify-center gap-2">

                    <button className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-blue-50 flex items-center justify-center transition">

                      <IconEye
                        size={18}
                        className="text-blue-600"
                      />

                    </button>

                    <Link
                      href={`/dashboard/categories/form/${category.id}`}
                      className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-green-50 flex items-center justify-center transition"
                    >

                      <IconEdit
                        size={18}
                        className="text-green-600"
                      />

                    </Link>

                    <button className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-red-50 flex items-center justify-center transition">

                      <IconTrash
                        size={18}
                        className="text-red-600"
                      />

                    </button>

                  </div>

                </td>

              </tr>

            ))}
                        </tbody>

          </table>

          {/* Empty State */}

          {categories.length === 0 && (

            <div className="py-16 text-center">

              <img
                src="/empty.svg"
                alt="No Categories"
                className="w-40 mx-auto"
              />

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                No Categories Found
              </h3>

              <p className="mt-2 text-gray-500">
                Create your first category to get started.
              </p>

              <Link
                href="/dashboard/categories/form"
                className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
              >
                <IconPlus size={18} />
                Add Category
              </Link>

            </div>

          )}

        </div>

        {/* Pagination */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-gray-100">

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
            categories
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