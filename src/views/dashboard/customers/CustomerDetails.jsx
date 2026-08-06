"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";


export default function CustomerDetails(){


  const customer = {

    name:"Ritesh Mali",

    email:"ritesh@gmail.com",

    phone:"9876543210",

    address:
    "Andheri East, Mumbai Maharashtra",

    joined:
    "06 Aug 2026",

    status:"Active",


    stats:{
      orders:12,
      spent:4500,
      average:375,
    }


  };



  return (

    <div className="space-y-6">



      {/* Header */}


      <div>


        <Link
          href="/dashboard/customers"
          className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
        >

          <IconArrowLeft size={18}/>

          Back to Customers


        </Link>



        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">


          <div>


            <h1 className="text-3xl font-bold text-gray-900">

              Customer Details

            </h1>


            <p className="text-gray-500 mt-1">

              View customer information and order history

            </p>


          </div>




          <span className="mt-3 md:mt-0 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">


            {customer.status}


          </span>



        </div>


      </div>





      {/* Profile + Contact */}



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">





        {/* Profile Card */}



        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <h2 className="text-xl font-bold mb-6">

            Profile

          </h2>



          <div className="flex items-center gap-5">


            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700">


              {customer.name.charAt(0)}


            </div>




            <div>


              <h3 className="text-2xl font-bold">

                {customer.name}

              </h3>


              <p className="text-gray-500">

                Joined {customer.joined}

              </p>


            </div>



          </div>



        </div>





        {/* Contact */}



        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <h2 className="text-xl font-bold mb-6">

            Contact Information

          </h2>



          <div className="space-y-5">



            <div className="flex items-center gap-4">


              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">


                <IconMail
                  size={20}
                  className="text-blue-600"
                />


              </div>



              <div>


                <p className="text-sm text-gray-500">

                  Email

                </p>


                <p className="font-semibold">

                  {customer.email}

                </p>


              </div>



            </div>





            <div className="flex items-center gap-4">


              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">


                <IconPhone
                  size={20}
                  className="text-green-600"
                />


              </div>


              <div>


                <p className="text-sm text-gray-500">

                  Phone

                </p>


                <p className="font-semibold">

                  {customer.phone}

                </p>


              </div>


            </div>



          </div>



        </div>


      </div>
            {/* Address */}


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <h2 className="text-xl font-bold mb-6">

          Delivery Address

        </h2>




        <div className="flex items-start gap-4">


          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">


            <IconMapPin

              size={22}

              className="text-red-600"

            />


          </div>




          <p className="text-gray-600 leading-relaxed">

            {customer.address}

          </p>



        </div>



      </div>






      {/* Customer Stats */}



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



        {/* Orders */}



        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <p className="text-gray-500 text-sm">

            Total Orders

          </p>



          <h3 className="text-3xl font-bold mt-3 text-gray-900">

            {customer.stats.orders}

          </h3>



          <p className="text-green-600 text-sm mt-2">

            Completed Orders

          </p>



        </div>







        {/* Spent */}



        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <p className="text-gray-500 text-sm">

            Total Spent

          </p>



          <h3 className="text-3xl font-bold mt-3 text-gray-900">

            ₹{customer.stats.spent}

          </h3>



          <p className="text-green-600 text-sm mt-2">

            Lifetime Purchase

          </p>



        </div>







        {/* Average */}



        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <p className="text-gray-500 text-sm">

            Average Order Value

          </p>



          <h3 className="text-3xl font-bold mt-3 text-gray-900">

            ₹{customer.stats.average}

          </h3>



          <p className="text-green-600 text-sm mt-2">

            Per Order

          </p>



        </div>



      </div>
            {/* Order History */}


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <h2 className="text-xl font-bold mb-6">

          Order History

        </h2>




        <div className="overflow-x-auto">


          <table className="w-full">


            <thead className="bg-gray-50">


              <tr>


                <th className="px-5 py-4 text-left">
                  Order ID
                </th>


                <th className="px-5 py-4 text-left">
                  Date
                </th>


                <th className="px-5 py-4 text-left">
                  Amount
                </th>


                <th className="px-5 py-4 text-left">
                  Status
                </th>


                <th className="px-5 py-4 text-center">
                  Action
                </th>


              </tr>


            </thead>




            <tbody>


              {[
                {
                  id:"ORD001",
                  date:"06 Aug 2026",
                  amount:450,
                  status:"Delivered"
                },

                {
                  id:"ORD002",
                  date:"02 Aug 2026",
                  amount:780,
                  status:"Processing"
                },

              ].map((order,index)=>(


                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >



                  <td className="px-5 py-4 font-semibold text-green-600">

                    #{order.id}

                  </td>




                  <td className="px-5 py-4">

                    {order.date}

                  </td>





                  <td className="px-5 py-4 font-semibold">

                    ₹{order.amount}

                  </td>





                  <td className="px-5 py-4">


                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        
                        order.status==="Delivered"

                        ? "bg-green-100 text-green-700"

                        : "bg-blue-100 text-blue-700"

                      }`}
                    >

                      {order.status}

                    </span>


                  </td>





                  <td className="px-5 py-4">


                    <Link

                      href={`/dashboard/orders/${order.id}`}

                      className="block text-center px-4 py-2 rounded-lg border hover:bg-green-50 text-green-600 font-medium"

                    >

                      View

                    </Link>


                  </td>



                </tr>



              ))}



            </tbody>


          </table>



        </div>



      </div>





      {/* Actions */}


      <div className="flex justify-end gap-4">


        <button

          className="px-6 py-3 rounded-xl border hover:bg-gray-50 transition"

        >

          Block Customer

        </button>




        <button

          className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"

        >

          Save Changes

        </button>


      </div>



    </div>


  );


}