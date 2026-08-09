"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconRefresh,
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

import { getCategories } from "@/api/category_api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCategories();

      if (data.success) {
        setCategories(data.categories || []);
      } else {
        setError(data.message || "Failed to load categories");
      }
    } catch (error) {
      console.error("Categories Fetch Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD CATEGORIES
  // ==========================================

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==========================================
  // FILTER CATEGORIES
  // ==========================================

  const filteredCategories = categories.filter((category) => {
    const searchMatch = category.name
      ?.toLowerCase()
      .includes(filters.search.toLowerCase());

    const statusMatch =
      !filters.status ||
      category.status === filters.status;

    return searchMatch && statusMatch;
  });

  // ==========================================
  // RESET FILTER
  // ==========================================

  const handleReset = () => {
    setFilters({
      search: "",
      status: "",
    });
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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

          {/* Search */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>

            <input
              type="text"
              placeholder="Search category..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />

          </div>


          {/* Status */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="">
                All
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

              <option value="Draft">
                Draft
              </option>

            </select>

          </div>

        </div>


        {/* Filter Buttons */}

        <div className="flex gap-3 mt-6">

          <button
            onClick={fetchCategories}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
          >
            <IconSearch size={18} />
            Search
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 border border-gray-200 px-5 py-3 rounded-xl hover:bg-gray-50 transition"
          >
            <IconRefresh size={18} />
            Reset
          </button>

        </div>

      </div>


      {/* Error */}

      {error && (

        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4">
          {error}
        </div>

      )}


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


            <tbody>

              {/* Loading */}

              {loading && (

                <tr>

                  <td
                    colSpan="7"
                    className="px-5 py-16 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <div className="w-10 h-10 border-4 border-green-100 border-t-green-600 rounded-full animate-spin" />

                      <p className="text-gray-500">
                        Loading categories...
                      </p>

                    </div>

                  </td>

                </tr>

              )}


              {/* Categories */}

              {!loading &&
                filteredCategories.map((category) => (

                  <tr
                    key={category._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* Category */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-4">

                        {category.image ? (

                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-14 h-14 rounded-xl object-cover border"
                          />

                        ) : (

                          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-green-600 font-bold">
                            {category.name?.charAt(0)}
                          </div>

                        )}

                        <div>

                          <h3 className="font-semibold text-gray-900">
                            {category.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Category #{category._id.slice(-6)}
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

                      {category.parent?.name || "-"}

                    </td>


                    {/* Products */}

                    <td className="px-5 py-4">

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        0 Products
                      </span>

                    </td>


                    {/* Status */}

                    <td className="px-5 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          category.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : category.status === "Inactive"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {category.status}
                      </span>

                    </td>


                    {/* Created */}

                    <td className="px-5 py-4 text-gray-500">

                      {formatDate(category.createdAt)}

                    </td>


                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex items-center justify-center gap-2">

                        {/* View */}

                        <button
                          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-blue-50 flex items-center justify-center transition"
                        >

                          <IconEye
                            size={18}
                            className="text-blue-600"
                          />

                        </button>


                        {/* Edit */}

                        <Link
                          href={`/dashboard/categories/form/${category._id}`}
                          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-green-50 flex items-center justify-center transition"
                        >

                          <IconEdit
                            size={18}
                            className="text-green-600"
                          />

                        </Link>


                        {/* Delete */}

                        <button
                          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-red-50 flex items-center justify-center transition"
                        >

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

          {!loading &&
            filteredCategories.length === 0 && (

              <div className="py-16 text-center">

                <h3 className="text-xl font-semibold text-gray-900">
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

        {!loading && filteredCategories.length > 0 && (

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-gray-100">

            <p className="text-sm text-gray-500">

              Showing{" "}

              <span className="font-semibold text-gray-900">
                {filteredCategories.length}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-gray-900">
                {categories.length}
              </span>{" "}

              categories

            </p>

          </div>

        )}

      </div>

    </div>
  );
}