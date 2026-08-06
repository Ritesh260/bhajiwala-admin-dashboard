"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconMapPin,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";


export default function OrderDetails() {


  const order = {
    id: "ORD001",
    customer: "Ritesh Mali",
    phone: "9876543210",
    address:
      "Andheri East, Mumbai Maharashtra",

    items: [
      {
        name: "Fresh Tomato",
        qty: "2 Kg",
        price: 80,
      },
      {
        name: "Fresh Potato",
        qty: "3 Kg",
        price: 90,
      },
    ],

    subtotal: 170,
    delivery: 30,
    total: 200,

    status: "Delivered",
  };



  return (

    <div className="space-y-6">


      {/* Header */}


      <div>


        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
        >

          <IconArrowLeft size={18}/>

          Back to Orders

        </Link>



        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">


          <div>

            <h1 className="text-3xl font-bold text-gray-900">

              Order #{order.id}

            </h1>


            <p className="text-gray-500 mt-1">

              Order details and delivery information

            </p>


          </div>




          <span className="mt-3 md:mt-0 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

            {order.status}

          </span>



        </div>


      </div>





      {/* Customer & Address */}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* Customer */}


        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <h2 className="text-xl font-bold mb-5">

            Customer Details

          </h2>



          <div className="space-y-4">


            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">

                <IconUser
                  size={20}
                  className="text-green-600"
                />

              </div>


              <div>

                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-semibold">
                  {order.customer}
                </p>

              </div>


            </div>





            <div className="flex items-center gap-3">


              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">

                <IconPhone
                  size={20}
                  className="text-blue-600"
                />

              </div>


              <div>

                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="font-semibold">
                  {order.phone}
                </p>

              </div>


            </div>



          </div>


        </div>





        {/* Address */}


        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <h2 className="text-xl font-bold mb-5">

            Delivery Address

          </h2>


          <div className="flex gap-3">


            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">

              <IconMapPin
                size={20}
                className="text-red-600"
              />

            </div>



            <p className="text-gray-600 leading-relaxed">

              {order.address}

            </p>



          </div>


        </div>



      </div>
            {/* Order Items */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <h2 className="text-xl font-bold mb-6">

          Order Items

        </h2>



        <div className="overflow-x-auto">


          <table className="w-full">


            <thead className="bg-gray-50">


              <tr>


                <th className="px-5 py-4 text-left">
                  Product
                </th>


                <th className="px-5 py-4 text-left">
                  Quantity
                </th>


                <th className="px-5 py-4 text-left">
                  Price
                </th>


              </tr>


            </thead>



            <tbody>


              {order.items.map((item, index) => (


                <tr
                  key={index}
                  className="border-t border-gray-100"
                >


                  <td className="px-5 py-4 font-semibold">

                    {item.name}

                  </td>



                  <td className="px-5 py-4">

                    {item.qty}

                  </td>




                  <td className="px-5 py-4 font-semibold">

                    ₹{item.price}

                  </td>



                </tr>


              ))}



            </tbody>


          </table>


        </div>



      </div>





      {/* Payment Summary */}



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">



        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <h2 className="text-xl font-bold mb-6">

            Payment Summary

          </h2>



          <div className="space-y-4">


            <div className="flex justify-between">

              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-semibold">
                ₹{order.subtotal}
              </span>

            </div>




            <div className="flex justify-between">


              <span className="text-gray-500">
                Delivery Charge
              </span>


              <span className="font-semibold">
                ₹{order.delivery}
              </span>


            </div>




            <div className="border-t pt-4 flex justify-between">


              <span className="text-lg font-bold">
                Total
              </span>


              <span className="text-lg font-bold text-green-600">

                ₹{order.total}

              </span>


            </div>


          </div>


        </div>





        {/* Payment Status */}



        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


          <h2 className="text-xl font-bold mb-6">

            Payment

          </h2>



          <div className="bg-green-100 rounded-2xl p-5 text-center">


            <p className="text-sm text-gray-600">

              Payment Status

            </p>


            <h3 className="text-2xl font-bold text-green-700 mt-2">

              Paid

            </h3>


          </div>



        </div>



      </div>
            {/* Order Timeline */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">


          <h2 className="text-xl font-bold">

            Order Timeline

          </h2>



          <select
            className="border rounded-xl px-4 py-3 outline-none focus:border-green-600"
          >

            <option>
              Pending
            </option>

            <option>
              Confirmed
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





        <div className="space-y-6">



          {[
            {
              title: "Order Placed",
              date: "06 Aug 2026 - 10:30 AM",
              done: true,
            },

            {
              title: "Order Confirmed",
              date: "06 Aug 2026 - 10:45 AM",
              done: true,
            },

            {
              title: "Packed",
              date: "06 Aug 2026 - 11:15 AM",
              done: true,
            },

            {
              title: "Out For Delivery",
              date: "06 Aug 2026 - 12:00 PM",
              done: true,
            },

            {
              title: "Delivered",
              date: "06 Aug 2026 - 01:00 PM",
              done: true,
            },

          ].map((step,index)=>(


            <div
              key={index}
              className="flex items-start gap-4"
            >


              <div
                className={`w-4 h-4 mt-1 rounded-full ${
                  step.done
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              />


              <div>

                <h3 className="font-semibold text-gray-900">

                  {step.title}

                </h3>


                <p className="text-sm text-gray-500">

                  {step.date}

                </p>


              </div>


            </div>


          ))}



        </div>



      </div>





      {/* Action Buttons */}



      <div className="flex flex-col sm:flex-row justify-end gap-4">


        <button
          className="px-6 py-3 rounded-xl border hover:bg-gray-50 transition"
        >

          Print Invoice

        </button>



        <button
          className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
        >

          Update Order

        </button>


      </div>



    </div>

  );

}