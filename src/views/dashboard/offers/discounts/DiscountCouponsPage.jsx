
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getCoupons,
  deleteCoupon,
} from "@/api/coupon_apis";

import {
  IconTicket,
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconPercentage,
  IconCheck,
  IconClock,
} from "@tabler/icons-react";

export default function DiscountCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // GET ALL COUPONS
  // ==========================================

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCoupons();

      if (response.success) {
        setCoupons(response.coupons || []);
      } else {
        setError(response.message || "Failed to fetch coupons.");
      }
    } catch (error) {
      console.error("Fetch Coupons Error:", error);

      setError(
        error.response?.data?.message ||
        "Something went wrong while fetching coupons."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ==========================================
  // DELETE COUPON
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const response = await deleteCoupon(id);

      if (response.success) {
        setCoupons((prev) =>
          prev.filter((coupon) => coupon._id !== id)
        );

        alert("Coupon deleted successfully!");
      } else {
        alert(response.message || "Failed to delete coupon.");
      }
    } catch (error) {
      console.error("Delete Coupon Error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong while deleting coupon."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // SEARCH + STATUS FILTER
  // ==========================================

  const filteredCoupons = coupons.filter((coupon) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (coupon.code || "").toLowerCase().includes(searchText) ||
      (coupon.title || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      coupon.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ==========================================
  // STATISTICS
  // ==========================================

  const activeCount = coupons.filter(
    (coupon) => coupon.status === "Active"
  ).length;

  const inactiveCount = coupons.filter(
    (coupon) => coupon.status === "Inactive"
  ).length;

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // DISCOUNT DISPLAY
  // ==========================================

  const getDiscountLabel = (coupon) => {
    if (coupon.discountType === "free-delivery") {
      return "Free Delivery";
    }

    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`;
    }

    return `₹${coupon.discountValue}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/dashboard/offers"
              className="hover:text-green-600"
            >
              Offer Management
            </Link>

            <span>/</span>

            <span className="text-gray-800">
              Discount Coupons
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Discount Coupons
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage discount coupons for your customers.
          </p>
        </div>

        <Link
          href="/dashboard/offers/discounts/form"
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <IconPlus size={19} />
          Add New Coupon
        </Link>
      </div>

      {/* STATS */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Coupons
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {coupons.length}
              </h2>
            </div>

            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <IconTicket size={25} />
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Active Coupons
              </p>

              <h2 className="mt-2 text-2xl font-bold text-green-600">
                {activeCount}
              </h2>
            </div>

            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <IconCheck size={25} />
            </div>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Inactive Coupons
              </p>

              <h2 className="mt-2 text-2xl font-bold text-orange-500">
                {inactiveCount}
              </h2>
            </div>

            <div className="rounded-xl bg-orange-50 p-3 text-orange-500">
              <IconClock size={25} />
            </div>
          </div>
        </div>
      </div>

      {/* COUPONS TABLE */}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center">
          <div>
            <h2 className="font-bold text-gray-900">
              All Coupons
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Manage your promotional coupon codes
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}

            <div className="relative">
              <IconSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search coupon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 sm:w-56"
              />
            </div>

            {/* STATUS FILTER */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">

            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Coupon
                </th>

                <th className="px-6 py-4 font-semibold">
                  Discount
                </th>

                <th className="px-6 py-4 font-semibold">
                  Min. Order
                </th>

                <th className="px-6 py-4 font-semibold">
                  Valid Till
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {/* LOADING */}

              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-100 border-t-green-600"></div>

                      <p className="mt-3 text-sm text-gray-500">
                        Loading coupons...
                      </p>
                    </div>
                  </td>
                </tr>

              ) : error ? (

                /* ERROR */

                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <p className="font-semibold text-red-500">
                      {error}
                    </p>

                    <button
                      onClick={fetchCoupons}
                      className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>

              ) : filteredCoupons.length > 0 ? (

                /* COUPON DATA */

                filteredCoupons.map((coupon) => (
                  <tr
                    key={coupon._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* COUPON */}

                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">
                        {coupon.code}
                      </div>

                      <div className="mt-1 text-xs text-gray-500">
                        {coupon.title}
                      </div>
                    </td>

                    {/* DISCOUNT */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-semibold text-green-600">
                        {coupon.discountType === "percentage" && (
                          <IconPercentage size={16} />
                        )}

                        {getDiscountLabel(coupon)}
                      </div>
                    </td>

                    {/* MINIMUM ORDER */}

                    <td className="px-6 py-4 text-sm text-gray-700">
                      ₹{coupon.minOrderAmount ?? 0}
                    </td>

                    {/* VALID TILL */}

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(coupon.endDate)}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          coupon.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {coupon.status}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">

                        {/* EDIT */}

                        <Link
                          href={`/dashboard/offers/discounts/form/${coupon._id}`}
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                          title="Edit Coupon"
                        >
                          <IconEdit size={18} />
                        </Link>

                        {/* DELETE */}

                        <button
                          onClick={() => handleDelete(coupon._id)}
                          disabled={deletingId === coupon._id}
                          className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete Coupon"
                        >
                          {deletingId === coupon._id ? (
                            <span className="block h-[18px] w-[18px] animate-spin rounded-full border-2 border-red-200 border-t-red-600"></span>
                          ) : (
                            <IconTrash size={18} />
                          )}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))

              ) : (

                /* EMPTY STATE */

                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <IconTicket size={28} />
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      No Coupons Found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {search || statusFilter !== "All"
                        ? "Try changing your search or filter."
                        : "You haven't created any discount coupons yet."}
                    </p>

                    {!search && statusFilter === "All" && (
                      <Link
                        href="/dashboard/offers/discounts/form"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        <IconPlus size={17} />
                        Create Your First Coupon
                      </Link>
                    )}
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* FOOTER */}

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
          Showing {loading ? 0 : filteredCoupons.length} of {coupons.length} coupons
        </div>

      </div>
    </div>
  );
}
