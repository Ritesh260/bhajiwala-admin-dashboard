"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconRefresh,
  IconEye,
  IconDownload,
} from "@tabler/icons-react";


const initialOrders = [
  {
    id: "ORD001",
    customer: "Ritesh Mali",
    items: 3,
    amount: 450,
    payment: "Paid",
    status: "Delivered",
    date: "06 Aug 2026",
  },
  {
    id: "ORD002",
    customer: "Rahul Sharma",
    items: 5,
    amount: 780,
    payment: "Pending",
    status: "Processing",
    date: "05 Aug 2026",
  },
];


export default function OrdersPage() {


  const [orders] = useState(initialOrders);


  const [filters, setFilters] = useState({
    search: "",
    payment: "",
    status: "",
  });



  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Orders
          </h1>


          <p className="text-gray-500 mt-1">
            Manage customer orders and delivery status
          </p>


        </div>



        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition">


          <IconDownload size={20}/>

          Export Orders


        </button>



      </div>




      {/* Filter Card */}


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


          {/* Search */}

          <div>


            <label className="block text-sm font-medium mb-2">
              Order ID / Customer
            </label>


            <input
              type="text"
              placeholder="Search order..."
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




          {/* Payment */}


          <div>


            <label className="block text-sm font-medium mb-2">
              Payment Status
            </label>


            <select
              value={filters.payment}
              onChange={(e)=>
                setFilters({
                  ...filters,
                  payment:e.target.value
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="">
                All
              </option>

              <option>
                Paid
              </option>

              <option>
                Pending
              </option>

              <option>
                Failed
              </option>


            </select>


          </div>





          {/* Order Status */}


          <div>


            <label className="block text-sm font-medium mb-2">
              Order Status
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
                Pending
              </option>


              <option>
                Processing
              </option>


              <option>
                Packed
              </option>


              <option>
                Out For Delivery
              </option>


              <option>
                Delivered
              </option>


              <option>
                Cancelled
              </option>


            </select>


          </div>


        </div>




        {/* Buttons */}


        <div className="flex gap-3 mt-6">


          <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl">


            <IconSearch size={18}/>

            Search


          </button>



          <button className="flex items-center gap-2 border px-5 py-3 rounded-xl hover:bg-gray-50">


            <IconRefresh size={18}/>

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
                  Order ID
                </th>


                <th className="px-5 py-4 text-left">
                  Customer
                </th>


                <th className="px-5 py-4 text-left">
                  Items
                </th>


                <th className="px-5 py-4 text-left">
                  Amount
                </th>


                <th className="px-5 py-4 text-left">
                  Payment
                </th>


                <th className="px-5 py-4 text-left">
                  Status
                </th>


                <th className="px-5 py-4 text-left">
                  Date
                </th>


                <th className="px-5 py-4 text-center">
                  Action
                </th>


              </tr>


            </thead>



            <tbody>
                            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >


                {/* Order ID */}

                <td className="px-5 py-4">

                  <span className="font-semibold text-green-600">

                    #{order.id}

                  </span>

                </td>



                {/* Customer */}

                <td className="px-5 py-4">

                  <div>

                    <h3 className="font-semibold text-gray-900">

                      {order.customer}

                    </h3>


                    <p className="text-sm text-gray-500">

                      Customer

                    </p>

                  </div>

                </td>



                {/* Items */}

                <td className="px-5 py-4">

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">

                    {order.items} Items

                  </span>

                </td>




                {/* Amount */}

                <td className="px-5 py-4 font-semibold">

                  ₹{order.amount}

                </td>




                {/* Payment */}

                <td className="px-5 py-4">


                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.payment === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >

                    {order.payment}

                  </span>


                </td>





                {/* Status */}

                <td className="px-5 py-4">


                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      
                      order.status === "Delivered"
                      ? "bg-green-100 text-green-700"

                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"

                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"

                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-600"

                      : "bg-purple-100 text-purple-700"

                    }`}
                  >

                    {order.status}

                  </span>


                </td>





                {/* Date */}

                <td className="px-5 py-4 text-gray-500">

                  {order.date}

                </td>





                {/* Action */}

                <td className="px-5 py-4">


                  <div className="flex justify-center">


                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-green-50 flex items-center justify-center transition"
                    >

                      <IconEye
                        size={19}
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


          {orders.length === 0 && (

            <div className="py-16 text-center">


              <h3 className="text-xl font-semibold text-gray-900">

                No Orders Found

              </h3>


              <p className="text-gray-500 mt-2">

                No customer orders available right now.

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

            orders


          </p>





          <div className="flex items-center gap-2">


            <button
              className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
            >

              Previous

            </button>




            <button
              className="w-10 h-10 rounded-lg bg-green-600 text-white font-semibold"
            >

              1

            </button>





            <button
              className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
            >

              Next

            </button>


          </div>



        </div>



      </div>


    </div>


  );

}