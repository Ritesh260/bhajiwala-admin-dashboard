
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getSeasonalOffers,
  deleteSeasonalOffer,
} from "@/api/seasonal_apis";

import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconCalendar,
  IconTag,
} from "@tabler/icons-react";

export default function SeasonalOffersPage() {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // =====================================
  // GET ALL SEASONAL OFFERS
  // =====================================

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSeasonalOffers();

      if (response.success) {
        setOffers(response.offers || []);
      } else {
        setError(response.message || "Failed to fetch seasonal offers");
      }
    } catch (err) {
      console.error("Fetch Seasonal Offers Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to fetch seasonal offers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // =====================================
  // DELETE SEASONAL OFFER
  // =====================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this seasonal offer?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await deleteSeasonalOffer(id);

      if (response.success) {
        setOffers((prev) =>
          prev.filter((offer) => offer._id !== id)
        );

        alert("Seasonal offer deleted successfully!");
      } else {
        alert(response.message || "Failed to delete offer");
      }
    } catch (err) {
      console.error("Delete Seasonal Offer Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete seasonal offer"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // SEARCH + STATUS FILTER
  // =====================================

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.title?.toLowerCase().includes(search.toLowerCase()) ||
      offer.badge?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || offer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =====================================
  // STATISTICS
  // =====================================

  const activeOffers = offers.filter(
    (offer) => offer.status === "Active"
  ).length;

  const inactiveOffers = offers.filter(
    (offer) => offer.status === "Inactive"
  ).length;

  // =====================================
  // DATE FORMAT
  // =====================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Seasonal Offers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage festival and seasonal promotional campaigns.
          </p>
        </div>

        <Link
          href="/dashboard/offers/seasonal/form"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          <IconPlus size={19} />
          Add Seasonal Offer
        </Link>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}

          <button
            onClick={fetchOffers}
            className="ml-3 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Offers</p>
            <IconTag className="text-green-600" size={22} />
          </div>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {loading ? "..." : offers.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Active Offers</p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {loading ? "..." : activeOffers}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Inactive Offers</p>

          <h2 className="mt-2 text-2xl font-bold text-gray-700">
            {loading ? "..." : inactiveOffers}
          </h2>
        </div>

      </div>

      {/* FILTERS */}

      <div className="flex flex-col gap-3 sm:flex-row">

        <div className="relative flex-1">
          <IconSearch
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search seasonal offers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px] text-left">

            <thead className="bg-gray-50">
              <tr className="text-xs uppercase text-gray-500">
                <th className="px-5 py-4">Offer</th>
                <th className="px-5 py-4">Badge</th>
                <th className="px-5 py-4">Start Date</th>
                <th className="px-5 py-4">End Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading ? (

                <tr>
                  <td colSpan="6" className="px-5 py-14 text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

                    <p className="mt-3 text-sm text-gray-500">
                      Loading seasonal offers...
                    </p>
                  </td>
                </tr>

              ) : filteredOffers.length > 0 ? (

                filteredOffers.map((offer) => (

                  <tr key={offer._id} className="hover:bg-gray-50">

                    {/* OFFER */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        {offer.image ? (
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                            <IconCalendar
                              size={22}
                              className="text-green-600"
                            />
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-gray-900">
                            {offer.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {offer.description || "No description"}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* BADGE */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {offer.badge || "-"}
                    </td>

                    {/* START DATE */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {formatDate(offer.startDate)}
                    </td>

                    {/* END DATE */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {formatDate(offer.endDate)}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          offer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">

                        <Link
                          href={`/dashboard/offers/seasonal/form/${offer._id}`}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <IconEdit size={19} />
                        </Link>

                        <button
                          onClick={() => handleDelete(offer._id)}
                          disabled={deletingId === offer._id}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete"
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

                ))

              ) : (

                <tr>
                  <td colSpan="6" className="px-5 py-14 text-center">

                    <IconCalendar
                      size={38}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 font-medium text-gray-700">
                      No seasonal offers found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {search || statusFilter !== "All"
                        ? "Try changing your search or filter."
                        : "Add your first seasonal offer to get started."}
                    </p>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}
