
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getCombos,
  deleteCombo,
} from "@/api/combo_apis";

import {
  IconPackage,
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconShoppingBag,
  IconCheck,
  IconClock,
  IconRefresh,
} from "@tabler/icons-react";

export default function ComboOffersPage() {
  const [combos, setCombos] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // =====================================
  // GET ALL COMBOS
  // =====================================

  const fetchCombos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCombos();

      const comboData =
        response?.combos ||
        response?.data?.combos ||
        response?.data ||
        [];

      setCombos(Array.isArray(comboData) ? comboData : []);
    } catch (error) {
      console.error("Fetch Combos Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load combo offers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  // =====================================
  // DELETE COMBO
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this combo offer?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteCombo(id);

      setCombos((prev) =>
        prev.filter((combo) => combo._id !== id)
      );

      alert("Combo offer deleted successfully!");
    } catch (error) {
      console.error("Delete Combo Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete combo offer."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // SEARCH AND STATUS FILTER
  // =====================================

  const filteredCombos = combos.filter((combo) => {
    const title = combo.title || "";

    const matchesSearch = title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      combo.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =====================================
  // STATS
  // =====================================

  const activeCount = combos.filter(
    (combo) => combo.status === "Active"
  ).length;

  const inactiveCount = combos.filter(
    (combo) => combo.status === "Inactive"
  ).length;

  // =====================================
  // UI
  // =====================================

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
              Combo Offers
            </span>

          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Combo Offers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage product combo deals for your customers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={fetchCombos}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <IconRefresh
              size={18}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <Link
            href="/dashboard/offers/combos/form"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <IconPlus size={19} />
            Add New Combo
          </Link>

        </div>
      </div>

      {/* STATS */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Combos
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {combos.length}
              </h2>
            </div>

            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <IconPackage size={25} />
            </div>

          </div>
        </div>

        {/* ACTIVE */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Active Combos
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
                Inactive Combos
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

      {/* TABLE CONTAINER */}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center">

          <div>
            <h2 className="font-bold text-gray-900">
              All Combo Offers
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Manage your product combo deals
            </p>
          </div>

          {/* SEARCH AND FILTER */}

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative">

              <IconSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search combo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 sm:w-56"
              />

            </div>

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
                  Combo
                </th>

                <th className="px-6 py-4 font-semibold">
                  Products
                </th>

                <th className="px-6 py-4 font-semibold">
                  Original Price
                </th>

                <th className="px-6 py-4 font-semibold">
                  Combo Price
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
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center text-sm text-gray-500"
                  >
                    <IconRefresh
                      size={25}
                      className="mx-auto mb-3 animate-spin text-green-600"
                    />

                    Loading combo offers...
                  </td>
                </tr>

              ) : error ? (

                /* ERROR */

                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center"
                  >
                    <p className="font-semibold text-red-500">
                      {error}
                    </p>

                    <button
                      onClick={fetchCombos}
                      className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>

              ) : filteredCombos.length > 0 ? (

                /* COMBO DATA */

                filteredCombos.map((combo) => (

                  <tr
                    key={combo._id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* COMBO DETAILS */}

                    <td className="px-6 py-4">

                      <div className="font-semibold text-gray-900">
                        {combo.title || "Untitled Combo"}
                      </div>

                      <div className="mt-1 max-w-xs truncate text-xs text-gray-500">
                        {combo.description || "No description"}
                      </div>

                    </td>

                    {/* PRODUCTS */}

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {combo.items?.length || 0} Products
                    </td>

                    {/* ORIGINAL PRICE */}

                    <td className="px-6 py-4 text-sm text-gray-500 line-through">
                      ₹{Number(combo.oldPrice || 0).toFixed(2)}
                    </td>

                    {/* COMBO PRICE */}

                    <td className="px-6 py-4 font-semibold text-green-600">
                      ₹{Number(combo.price || 0).toFixed(2)}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          combo.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {combo.status || "Inactive"}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <Link
                          href={`/dashboard/offers/combos/form/${combo._id}`}
                          className="rounded-lg bg-green-50 p-2 text-green-600 hover:bg-green-100"
                          title="Edit Combo"
                        >
                          <IconEdit size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(combo._id)}
                          disabled={deletingId === combo._id}
                          className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete Combo"
                        >
                          {deletingId === combo._id ? (
                            <IconRefresh
                              size={18}
                              className="animate-spin"
                            />
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
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center"
                  >

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <IconShoppingBag size={28} />
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      No Combo Offers Found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {search || statusFilter !== "All"
                        ? "Try changing your search or filter."
                        : "You haven't created any combo offers yet."}
                    </p>

                    {!search && statusFilter === "All" && (
                      <Link
                        href="/dashboard/offers/combos/form"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        <IconPlus size={17} />
                        Create Your First Combo
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
          Showing {filteredCombos.length} of {combos.length} combos
        </div>

      </div>
    </div>
  );
}
