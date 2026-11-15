
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getOffers,
  deleteOffer,
} from "@/api/offer_apis";

import {
  IconArrowLeft,
  IconEdit,
  IconShoppingBag,
  IconTag,
  IconBox,
  IconPhoto,
  IconStar,
  IconPlus,
  IconSearch,
  IconTrash,
  IconClock,
} from "@tabler/icons-react";

export default function TodayOffersPage() {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // GET ALL OFFERS API
  // ==========================================

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOffers();

      if (response.success) {
        setOffers(response.data || []);
      } else {
        setError(response.message || "Failed to fetch offers.");
      }
    } catch (error) {
      console.error("Get Offers Error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to fetch offers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // ==========================================
  // DELETE OFFER API
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const response = await deleteOffer(id);

      if (response.success) {
        alert("Offer deleted successfully!");

        // Refresh offers after deletion
        await fetchOffers();
      } else {
        alert(response.message || "Failed to delete offer.");
      }
    } catch (error) {
      console.error("Delete Offer Error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to delete offer."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // SEARCH & STATUS FILTER
  // ==========================================

  const filteredOffers = offers.filter((offer) => {
    const productName =
      offer.productId?.name || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const currentStatus =
      offer.displayStatus || offer.status;

    const matchesStatus =
      statusFilter === "All" ||
      currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ==========================================
  // STATISTICS
  // ==========================================

  const activeOffers = offers.filter(
    (item) => item.displayStatus === "Active"
  ).length;

  const expiredOffers = offers.filter(
    (item) => item.displayStatus === "Expired"
  ).length;

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

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <Link
            href="/dashboard/offers"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 mb-3"
          >
            <IconArrowLeft size={18} />
            Back to Offer Management
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Today's Offers
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your daily flash deals and limited-time product offers.
          </p>
        </div>

        <Link
          href="/dashboard/offers/today/form"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <IconPlus size={20} />
          Add Today's Offer
        </Link>

      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Offers</p>
            <IconTag className="text-green-600" size={22} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            {offers.length}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Active Offers</p>
            <IconStar className="text-green-600" size={22} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            {activeOffers}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Expired Offers</p>
            <IconClock className="text-orange-500" size={22} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            {expiredOffers}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Products on Offer</p>
            <IconShoppingBag className="text-blue-600" size={22} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            {offers.length}
          </h2>
        </div>

      </div>

      {/* OFFERS LIST */}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        {/* TOOLBAR */}

        <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              All Today's Offers
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              View and manage your flash deals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="relative">
              <IconSearch
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search offers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-56 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-green-500 text-sm"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-green-500 text-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Expired">Expired</option>
            </select>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="m-5 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
            <button
              onClick={fetchOffers}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-gray-50">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Old Price</th>
                <th className="px-6 py-4">Offer Price</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-gray-500">
                    Loading offers...
                  </td>
                </tr>
              ) : filteredOffers.length > 0 ? (

                filteredOffers.map((offer) => {

                  const productName =
                    offer.productId?.name || "Unknown Product";

                  const currentStatus =
                    offer.displayStatus || offer.status;

                  return (
                    <tr key={offer._id} className="hover:bg-gray-50">

                      {/* PRODUCT */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
                            <IconPhoto
                              size={20}
                              className="text-green-600"
                            />
                          </div>

                          <span className="font-semibold text-gray-800">
                            {productName}
                          </span>

                        </div>
                      </td>

                      {/* OLD PRICE */}

                      <td className="px-6 py-4 text-gray-500">
                        ₹{offer.oldPrice}
                      </td>

                      {/* OFFER PRICE */}

                      <td className="px-6 py-4 font-semibold text-green-600">
                        ₹{offer.offerPrice}
                      </td>

                      {/* DISCOUNT */}

                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-700">
                          {offer.discount}%
                        </span>
                      </td>

                      {/* EXPIRY */}

                      <td className="px-6 py-4 text-gray-500">
                        {formatDate(offer.endDate)}
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            currentStatus === "Active"
                              ? "bg-green-100 text-green-700"
                              : currentStatus === "Expired"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {currentStatus}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end items-center gap-2">

                          <Link
                            href={`/dashboard/offers/today/form/${offer._id}`}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                            title="Edit Offer"
                          >
                            <IconEdit size={19} />
                          </Link>

                          <button
                            onClick={() => handleDelete(offer._id)}
                            disabled={deletingId === offer._id}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-50"
                            title="Delete Offer"
                          >
                            {deletingId === offer._id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <IconTrash size={19} />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">

                    <div className="flex flex-col items-center">

                      <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                        <IconBox size={32} className="text-green-600" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900">
                        No Offers Found
                      </h3>

                      <p className="text-sm text-gray-500 mt-2 max-w-sm">
                        {search || statusFilter !== "All"
                          ? "No offers match your search or selected status."
                          : "You haven't added any today's offers yet. Create your first offer to get started."}
                      </p>

                      {!search && statusFilter === "All" && (
                        <Link
                          href="/dashboard/offers/today/form"
                          className="mt-5 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition"
                        >
                          <IconPlus size={18} />
                          Create First Offer
                        </Link>
                      )}

                    </div>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="px-5 py-4 border-t border-gray-200 text-sm text-gray-500">
          Showing {filteredOffers.length} of {offers.length} offers
        </div>

      </div>

    </div>
  );
}
