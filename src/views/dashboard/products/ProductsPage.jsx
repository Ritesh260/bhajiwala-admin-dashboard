"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconRefresh,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
} from "@tabler/icons-react";

import { getProducts, deleteProduct } from "@/api/product_api";
import { getCategories } from "@/api/category_api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts();

      setProducts(response.products || []);
    } catch (error) {
      console.error("Fetch Products Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.categories || []);
    } catch (error) {
      console.error("Fetch Categories Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  // =========================
  // RESET
  // =========================

  const handleReset = () => {
    const emptyFilters = {
      search: "",
      category: "",
      status: "",
    };

    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = products.filter((product) => {
    const search = appliedFilters.search
      .trim()
      .toLowerCase();

    const productName =
      product.name?.toLowerCase() || "";

    const productSku =
      product.sku?.toLowerCase() || "";

    const matchesSearch =
      !search ||
      productName.includes(search) ||
      productSku.includes(search);

    const productCategory =
      product.category?._id ||
      product.category ||
      "";

    const matchesCategory =
      !appliedFilters.category ||
      productCategory === appliedFilters.category;

    const matchesStatus =
      !appliedFilters.status ||
      product.status === appliedFilters.status;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

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

      {/* ================= SEARCH CARD ================= */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Search */}

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

          {/* Category */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >
              <option value="">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >
              <option value="">
                All Status
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

        <div className="flex gap-3 mt-6">

          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
          >
            <IconSearch size={18} />
            Search
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 border px-5 py-3 rounded-xl hover:bg-gray-50 transition"
          >
            <IconRefresh size={18} />
            Reset
          </button>

        </div>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-5 py-4">
          {error}
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        {loading ? (

          <div className="py-20 text-center">

            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto" />

            <p className="mt-4 text-gray-500">
              Loading products...
            </p>

          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="py-16 text-center">

            <div className="text-5xl mb-4">
              🥬
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
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

        ) : (

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

              <tbody>

                {filteredProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* Product */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            product.images?.[0] ||
                            "/placeholder-product.png"
                          }
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover border"
                        />

                        <div>

                          <h3 className="font-semibold text-gray-900">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            SKU : {product.sku || "-"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Category */}

                    <td className="px-5 py-4">
                      {product.category?.name || "-"}
                    </td>

                    {/* Price */}

                    <td className="px-5 py-4 font-semibold">
                      ₹
                      {product.discountPrice ||
                        product.price ||
                        0}
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
                        {product.stock || 0}{" "}
                        {Array.isArray(product.units) && product.units.length > 0
                          ? product.units.join(", ")
                          : product.unit || "Qty"}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
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

                      {product.createdAt
                        ? new Date(
                            product.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "-"}

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex items-center justify-center gap-2">

                        {/* View */}

                        <Link
                          href={`/dashboard/products/${product._id}`}
                          className="w-9 h-9 rounded-lg border hover:bg-blue-50 transition flex items-center justify-center"
                        >
                          <IconEye
                            size={18}
                            className="text-blue-600"
                          />
                        </Link>

                        {/* Edit */}

                        <Link
                          href={`/dashboard/products/form/${product._id}`}
                          className="w-9 h-9 rounded-lg border hover:bg-green-50 transition flex items-center justify-center"
                        >
                          <IconEdit
                            size={18}
                            className="text-green-600"
                          />
                        </Link>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          className="w-9 h-9 rounded-lg border hover:bg-red-50 transition"
                        >
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

          </div>

        )}

        {/* ================= PAGINATION INFO ================= */}

        {!loading &&
          filteredProducts.length > 0 && (

            <div className="border-t border-gray-100 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

              <p className="text-sm text-gray-500">

                Showing{" "}

                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}

                of{" "}

                <span className="font-semibold text-gray-900">
                  {products.length}
                </span>{" "}
                products

              </p>

            </div>

          )}

      </div>

    </div>
  );
}