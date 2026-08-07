"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconPlus,
  IconSearch,
  IconRefresh,
  IconEye,
} from "@tabler/icons-react";

const initialDeliveryPartners = [
  {
    id: 1,
    name: "Aman Patel",
    phone: "9876543210",
    vehicle: "Bike",
    area: "Andheri East",
    orders: 8,
    rating: 4.9,
    status: "Active",
    available: "Available",
  },
  {
    id: 2,
    name: "Rahul Yadav",
    phone: "9988776655",
    vehicle: "Scooter",
    area: "Jogeshwari",
    orders: 4,
    rating: 4.8,
    status: "Inactive",
    available: "Busy",
  },
];

export default function DeliveryPage() {
  const [partners] = useState(initialDeliveryPartners);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    vehicle: "",
  });

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Delivery Partners
          </h1>

          <p className="text-gray-500 mt-1">
            Manage delivery partners and assignments
          </p>

        </div>

        <Link
          href="/dashboard/delivery/form"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >

          <IconPlus size={20} />

          Add Partner

        </Link>

      </div>

      {/* Search Filter */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Search */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Search
            </label>

            <input
              type="text"
              placeholder="Name / Phone"
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

          {/* Vehicle */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Vehicle
            </label>

            <select
              value={filters.vehicle}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  vehicle: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="">
                All
              </option>

              <option>
                Bike
              </option>

              <option>
                Scooter
              </option>

              <option>
                Cycle
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
                  Partner
                </th>

                <th className="px-5 py-4 text-left">
                  Phone
                </th>

                <th className="px-5 py-4 text-left">
                  Vehicle
                </th>

                <th className="px-5 py-4 text-left">
                  Area
                </th>

                <th className="px-5 py-4 text-left">
                  Orders
                </th>

                <th className="px-5 py-4 text-left">
                  Rating
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-left">
                  Availability
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>
                            {partners.map((partner) => (

              <tr
                key={partner.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >


                {/* Partner */}


                <td className="px-5 py-4">


                  <div className="flex items-center gap-4">


                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">

                      {partner.name.charAt(0)}

                    </div>



                    <div>


                      <h3 className="font-semibold text-gray-900">

                        {partner.name}

                      </h3>


                      <p className="text-sm text-gray-500">

                        Delivery Partner

                      </p>


                    </div>


                  </div>


                </td>




                {/* Phone */}


                <td className="px-5 py-4">

                  {partner.phone}

                </td>





                {/* Vehicle */}


                <td className="px-5 py-4">


                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">

                    {partner.vehicle}

                  </span>


                </td>





                {/* Area */}


                <td className="px-5 py-4 text-gray-600">

                  {partner.area}

                </td>





                {/* Orders */}


                <td className="px-5 py-4">


                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">

                    {partner.orders} Orders

                  </span>


                </td>





                {/* Rating */}


                <td className="px-5 py-4">


                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">

                    ⭐ {partner.rating}

                  </div>


                </td>





                {/* Status */}


                <td className="px-5 py-4">


                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      partner.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >

                    {partner.status}

                  </span>


                </td>





                {/* Availability */}


                <td className="px-5 py-4">


                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      partner.available === "Available"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >

                    {partner.available}

                  </span>


                </td>





                {/* Action */}


                <td className="px-5 py-4">


                  <div className="flex items-center justify-center gap-2">


                    <Link
                      href={`/dashboard/delivery/form/${partner.id}`}
                      className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-blue-50 flex items-center justify-center transition"
                    >

                      ✏️

                    </Link>



                    <Link
                      href={`/dashboard/delivery/${partner.id}`}
                      className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-green-50 flex items-center justify-center transition"
                    >

                      <IconEye
                        size={18}
                        className="text-green-600"
                      />

                    </Link>


                  </div>


                </td>


              </tr>

            ))}
                        </tbody>

          </table>



          {/* Empty State */}

          {partners.length === 0 && (

            <div className="py-16 text-center">

              <h3 className="text-xl font-semibold text-gray-900">
                No Delivery Partners Found
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first delivery partner to start assigning orders.
              </p>

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

            delivery partners

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