"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconPhone,
  IconMail,
  IconMapPin,
  IconStar,
  IconTruckDelivery,
  IconEdit,
} from "@tabler/icons-react";

export default function DeliveryDetails() {

  const partner = {

    id: 1,

    name: "Aman Patel",

    phone: "9876543210",

    email: "aman@gmail.com",

    status: "Active",

    rating: 4.9,

    deliveries: 856,

    vehicle: "Honda Activa",

    vehicleNumber: "MH02AB1234",

    area: "Andheri East",

    address:
      "A-101, Green Residency, Andheri East, Mumbai",

    profile:
      "https://placehold.co/300x300",

  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/dashboard/delivery"
            className="inline-flex items-center gap-2 text-green-600 hover:underline"
          >

            <IconArrowLeft size={18} />

            Back

          </Link>

          <h1 className="text-3xl font-bold mt-4">

            Delivery Partner Details

          </h1>

        </div>

        <Link
          href={`/dashboard/delivery/form/${partner.id}`}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >

          <IconEdit size={18} />

          Edit Partner

        </Link>

      </div>



      {/* Profile Card */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <div className="flex flex-col lg:flex-row gap-8">

          <img
            src={partner.profile}
            alt={partner.name}
            className="w-36 h-36 rounded-3xl object-cover border"
          />

          <div className="flex-1">

            <div className="flex items-center gap-4">

              <h2 className="text-3xl font-bold">

                {partner.name}

              </h2>

              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700">

                {partner.status}

              </span>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div className="flex items-center gap-3">

                <IconPhone size={20} />

                {partner.phone}

              </div>

              <div className="flex items-center gap-3">

                <IconMail size={20} />

                {partner.email}

              </div>

              <div className="flex items-center gap-3">

                <IconMapPin size={20} />

                {partner.area}

              </div>

              <div className="flex items-center gap-3">

                <IconStar size={20} />

                {partner.rating} Rating

              </div>

            </div>

          </div>

          <div className="w-full lg:w-60">

            <div className="rounded-2xl bg-green-50 p-5">

              <div className="flex items-center gap-3">

                <IconTruckDelivery
                  size={26}
                  className="text-green-600"
                />

                <div>

                  <p className="text-sm text-gray-500">

                    Total Deliveries

                  </p>

                  <h3 className="text-3xl font-bold">

                    {partner.deliveries}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
            {/* Information Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Vehicle Information */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Vehicle Information
            </h2>

          </div>

          <div className="p-6 space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Vehicle Type
              </span>

              <span className="font-semibold">
                Scooter
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Brand
              </span>

              <span className="font-semibold">
                {partner.vehicle}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Vehicle Number
              </span>

              <span className="font-semibold">
                {partner.vehicleNumber}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                RC Number
              </span>

              <span className="font-semibold">
                RC987654321
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                License Number
              </span>

              <span className="font-semibold">
                MH1420240001234
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Insurance Expiry
              </span>

              <span className="font-semibold text-green-600">
                15 Dec 2027
              </span>

            </div>

          </div>

        </div>



        {/* Address */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Address Information
            </h2>

          </div>

          <div className="p-6 space-y-4">

            <div>

              <p className="text-gray-500 text-sm">
                Complete Address
              </p>

              <p className="font-medium mt-1">
                {partner.address}
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>

                <p className="text-gray-500 text-sm">
                  Area
                </p>

                <p className="font-medium">
                  {partner.area}
                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">
                  City
                </p>

                <p className="font-medium">
                  Mumbai
                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">
                  State
                </p>

                <p className="font-medium">
                  Maharashtra
                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">
                  Pincode
                </p>

                <p className="font-medium">
                  400069
                </p>

              </div>

            </div>

          </div>

        </div>



        {/* Bank Details */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Bank Details
            </h2>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            <div>

              <p className="text-gray-500 text-sm">
                Account Holder
              </p>

              <p className="font-semibold">
                Aman Patel
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Bank
              </p>

              <p className="font-semibold">
                State Bank of India
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Account Number
              </p>

              <p className="font-semibold">
                ********4589
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                IFSC
              </p>

              <p className="font-semibold">
                SBIN0001234
              </p>

            </div>

          </div>

        </div>

      </div>
            {/* Documents */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

        <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Documents
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Uploaded verification documents.
            </p>

          </div>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            Verified
          </span>

        </div>

        <div className="p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {[
              {
                title: "Profile Photo",
                image: "https://placehold.co/400x300?text=Profile",
              },
              {
                title: "Aadhaar Front",
                image: "https://placehold.co/400x300?text=Aadhaar+Front",
              },
              {
                title: "Aadhaar Back",
                image: "https://placehold.co/400x300?text=Aadhaar+Back",
              },
              {
                title: "License Front",
                image: "https://placehold.co/400x300?text=License+Front",
              },
              {
                title: "License Back",
                image: "https://placehold.co/400x300?text=License+Back",
              },
              {
                title: "RC Book",
                image: "https://placehold.co/400x300?text=RC+Book",
              },
              {
                title: "Insurance",
                image: "https://placehold.co/400x300?text=Insurance",
              },
            ].map((doc) => (

              <div
                key={doc.title}
                className="rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >

                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">

                  <h4 className="font-semibold">
                    {doc.title}
                  </h4>

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      Verified
                    </span>

                    <button className="text-green-600 text-sm font-medium hover:underline">
                      View
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>



      {/* Performance */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">

        <div className="bg-white rounded-2xl border border-gray-100 p-5">

          <p className="text-sm text-gray-500">
            Rating
          </p>

          <h3 className="text-3xl font-bold mt-2">
            ⭐ 4.9
          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">

          <p className="text-sm text-gray-500">
            Deliveries
          </p>

          <h3 className="text-3xl font-bold mt-2">
            856
          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">

          <p className="text-sm text-gray-500">
            Active Orders
          </p>

          <h3 className="text-3xl font-bold mt-2">
            4
          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">

          <p className="text-sm text-gray-500">
            Cancelled
          </p>

          <h3 className="text-3xl font-bold mt-2">
            12
          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">

          <p className="text-sm text-gray-500">
            Earnings
          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-600">
            ₹45,860
          </h3>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">

          <p className="text-sm text-gray-500">
            Success Rate
          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-600">
            98%
          </h3>

        </div>

      </div>
            {/* Assigned Orders */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="border-b border-gray-100 px-6 py-5">

          <h2 className="text-xl font-bold">
            Assigned Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Current and recent assigned deliveries.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Order ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Area
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {[
                {
                  id: "#ORD1021",
                  customer: "Rahul Sharma",
                  area: "Andheri East",
                  amount: "₹420",
                  status: "On The Way",
                },
                {
                  id: "#ORD1022",
                  customer: "Neha Patel",
                  area: "Powai",
                  amount: "₹310",
                  status: "Delivered",
                },
                {
                  id: "#ORD1023",
                  customer: "Vikas Singh",
                  area: "Jogeshwari",
                  amount: "₹690",
                  status: "Pending",
                },
              ].map((order) => (

                <tr
                  key={order.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {order.id}
                  </td>

                  <td className="px-6 py-4">
                    {order.customer}
                  </td>

                  <td className="px-6 py-4">
                    {order.area}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    {order.amount}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>



      {/* Activity Timeline */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

        <div className="border-b border-gray-100 px-6 py-5">

          <h2 className="text-xl font-bold">
            Activity Timeline
          </h2>

        </div>

        <div className="p-6">

          <div className="space-y-6">

            {[
              {
                title: "Joined BhajiWala",
                date: "15 Jan 2026",
              },
              {
                title: "Completed First Delivery",
                date: "16 Jan 2026",
              },
              {
                title: "Completed 100 Deliveries",
                date: "05 Feb 2026",
              },
              {
                title: "Completed 500 Deliveries",
                date: "20 Apr 2026",
              },
              {
                title: "Last Delivery Completed",
                date: "Today • 7:15 PM",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex gap-4"
              >

                <div className="flex flex-col items-center">

                  <div className="w-4 h-4 rounded-full bg-green-600"></div>

                  {index !== 4 && (
                    <div className="w-[2px] flex-1 bg-green-200 mt-2"></div>
                  )}

                </div>

                <div>

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.date}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}