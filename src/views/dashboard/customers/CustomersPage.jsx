"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconRefresh,
  IconDownload,
  IconEye,
} from "@tabler/icons-react";


const initialCustomers = [
  {
    id: 1,
    name: "Ritesh Mali",
    email: "ritesh@gmail.com",
    phone: "9876543210",
    orders: 12,
    spent: 4500,
    status: "Active",
    joined: "06 Aug 2026",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9988776655",
    orders: 5,
    spent: 1800,
    status: "Inactive",
    joined: "02 Aug 2026",
  },
];


export default function CustomersPage(){


  const [customers] = useState(initialCustomers);



  const [filters,setFilters] = useState({
    search:"",
    status:"",
  });



  return (

    <div className="space-y-6">



      {/* Header */}


      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Customers

          </h1>



          <p className="text-gray-500 mt-1">

            Manage registered customers

          </p>


        </div>




        <button
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >


          <IconDownload size={20}/>


          Export Customers


        </button>



      </div>






      {/* Filter */}



      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">



          {/* Search */}


          <div>


            <label className="block text-sm font-medium mb-2">

              Search Customer

            </label>


            <input

              type="text"

              placeholder="Name / Email / Phone"

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






          {/* Status */}



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





        {/* Buttons */}



        <div className="flex gap-3 mt-6">



          <button
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl"
          >

            <IconSearch size={18}/>

            Search

          </button>





          <button
            className="flex items-center gap-2 border px-5 py-3 rounded-xl hover:bg-gray-50"
          >

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
                  Customer
                </th>


                <th className="px-5 py-4 text-left">
                  Email
                </th>


                <th className="px-5 py-4 text-left">
                  Phone
                </th>


                <th className="px-5 py-4 text-left">
                  Orders
                </th>


                <th className="px-5 py-4 text-left">
                  Total Spent
                </th>


                <th className="px-5 py-4 text-left">
                  Status
                </th>


                <th className="px-5 py-4 text-left">
                  Joined
                </th>


                <th className="px-5 py-4 text-center">
                  Action
                </th>



              </tr>


            </thead>



            <tbody>
                            {customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >


                {/* Customer Profile */}

                <td className="px-5 py-4">


                  <div className="flex items-center gap-4">


                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">

                      {customer.name.charAt(0)}

                    </div>



                    <div>


                      <h3 className="font-semibold text-gray-900">

                        {customer.name}

                      </h3>



                      <p className="text-sm text-gray-500">

                        Customer #{customer.id}

                      </p>


                    </div>


                  </div>


                </td>





                {/* Email */}


                <td className="px-5 py-4 text-gray-600">


                  {customer.email}


                </td>





                {/* Phone */}


                <td className="px-5 py-4">


                  {customer.phone}


                </td>





                {/* Orders */}


                <td className="px-5 py-4">


                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">


                    {customer.orders} Orders


                  </span>


                </td>





                {/* Total Spent */}


                <td className="px-5 py-4 font-semibold">


                  ₹{customer.spent}


                </td>





                {/* Status */}


                <td className="px-5 py-4">


                  <span

                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      
                      customer.status === "Active"

                      ? "bg-green-100 text-green-700"

                      : "bg-red-100 text-red-600"

                    }`}

                  >


                    {customer.status}


                  </span>


                </td>





                {/* Joined */}


                <td className="px-5 py-4 text-gray-500">


                  {customer.joined}


                </td>






                {/* Action */}


                <td className="px-5 py-4">


                  <div className="flex justify-center">


                    <Link

                      href={`/dashboard/customers/${customer.id}`}

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


          {customers.length === 0 && (

            <div className="py-16 text-center">


              <h3 className="text-xl font-semibold text-gray-900">

                No Customers Found

              </h3>


              <p className="text-gray-500 mt-2">

                No registered customers available.

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

            customers


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