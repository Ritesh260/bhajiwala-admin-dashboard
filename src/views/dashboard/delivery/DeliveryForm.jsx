"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function DeliveryForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    status: "Active",

    address: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",

    vehicleType: "",
    vehicleBrand: "",
    vehicleNumber: "",
    rcNumber: "",
    licenseNumber: "",
    insuranceExpiry: "",

    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    upiId: "",

    workingFrom: "",
    workingTo: "",

    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            Back to Delivery Partners
          </Link>

          <h1 className="text-3xl font-bold mt-4">
            Delivery Partner
          </h1>

          <p className="text-gray-500 mt-2">
            Add or update delivery partner details.
          </p>

        </div>

      </div>

      <form className="space-y-6">

        {/* Personal Information */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold text-gray-900">
              Personal Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Basic information about the delivery partner.
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium mb-2">
                Full Name *
              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Mobile Number *
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Date of Birth
              </label>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

            </div>

          </div>

        </div>

        {/* Address */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Address Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Delivery partner's residential address.
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="md:col-span-2">

              <label className="block text-sm font-medium mb-2">
                Address
              </label>

              <textarea
                rows={4}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Complete Address..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none focus:border-green-600 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Landmark
              </label>

              <input
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Near Metro Station"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Area
              </label>

              <input
                type="text"
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Andheri East"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-green-600 outline-none"
              />

            </div>
                        <div>

              <label className="block text-sm font-medium mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Mumbai"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                State
              </label>

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Maharashtra"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="400069"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

          </div>

        </div>



        {/* Vehicle Information */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Vehicle Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Delivery partner vehicle details.
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium mb-2">
                Vehicle Type
              </label>

              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              >

                <option value="">Select Vehicle</option>
                <option>Bike</option>
                <option>Scooter</option>
                <option>Cycle</option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Vehicle Brand
              </label>

              <input
                type="text"
                name="vehicleBrand"
                value={form.vehicleBrand}
                onChange={handleChange}
                placeholder="Honda / TVS / Hero"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Vehicle Number
              </label>

              <input
                type="text"
                name="vehicleNumber"
                value={form.vehicleNumber}
                onChange={handleChange}
                placeholder="MH-02-AB-1234"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                RC Number
              </label>

              <input
                type="text"
                name="rcNumber"
                value={form.rcNumber}
                onChange={handleChange}
                placeholder="RC Number"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Driving License Number
              </label>

              <input
                type="text"
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
                placeholder="DLXXXXXXXXXXXX"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Insurance Expiry
              </label>

              <input
                type="date"
                name="insuranceExpiry"
                value={form.insuranceExpiry}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

          </div>

        </div>
                {/* Documents */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Documents
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Upload all required verification documents.
            </p>

          </div>

          <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {[
                "Profile Photo",
                "Aadhaar Front",
                "Aadhaar Back",
                "Driving License Front",
                "Driving License Back",
                "RC Book",
                "Insurance Copy",
              ].map((item) => (

                <div
                  key={item}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-green-500 transition cursor-pointer"
                >

                  <input
                    type="file"
                    className="hidden"
                    id={item}
                  />

                  <label
                    htmlFor={item}
                    className="cursor-pointer block text-center"
                  >

                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">

                      <span className="text-3xl">
                        📁
                      </span>

                    </div>

                    <h4 className="font-semibold text-gray-900">

                      {item}

                    </h4>

                    <p className="text-sm text-gray-500 mt-2">

                      Drag & Drop

                    </p>

                    <p className="text-xs text-gray-400">

                      or click to browse

                    </p>

                    <p className="text-xs text-gray-400 mt-2">

                      PNG • JPG • WEBP

                    </p>

                  </label>

                </div>

              ))}

            </div>

          </div>

        </div>
                {/* Bank Details */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Bank Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Payment settlement information.
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium mb-2">
                Account Holder
              </label>

              <input
                type="text"
                name="accountHolder"
                value={form.accountHolder}
                onChange={handleChange}
                placeholder="Account Holder Name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Bank Name
              </label>

              <input
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                placeholder="State Bank of India"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Account Number
              </label>

              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="XXXXXXXXXXXX"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                IFSC Code
              </label>

              <input
                type="text"
                name="ifsc"
                value={form.ifsc}
                onChange={handleChange}
                placeholder="SBIN0001234"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block text-sm font-medium mb-2">
                UPI ID
              </label>

              <input
                type="text"
                name="upiId"
                value={form.upiId}
                onChange={handleChange}
                placeholder="name@upi"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

          </div>

        </div>



        {/* Working Information */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Working Information
            </h2>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium mb-2">
                Working From
              </label>

              <input
                type="time"
                name="workingFrom"
                value={form.workingFrom}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Working To
              </label>

              <input
                type="time"
                name="workingTo"
                value={form.workingTo}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block text-sm font-medium mb-3">
                Assigned Areas
              </label>

              <div className="flex flex-wrap gap-3">

                {[
                  "Andheri East",
                  "Andheri West",
                  "Jogeshwari",
                  "Goregaon",
                  "Powai",
                  "Sakinaka",
                ].map((area) => (

                  <label
                    key={area}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 cursor-pointer hover:border-green-600"
                  >

                    <input type="checkbox" />

                    <span>{area}</span>

                  </label>

                ))}

              </div>

            </div>

          </div>

        </div>



        {/* Admin Notes */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold">
              Admin Notes
            </h2>

          </div>

          <div className="p-6">

            <textarea
              rows={5}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Write internal notes..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
            />

          </div>

        </div>
                {/* Action Buttons */}

        <div className="sticky bottom-0 bg-white border border-gray-100 rounded-3xl shadow-sm p-5">

          <div className="flex flex-col sm:flex-row justify-end gap-4">

            <Link
              href="/dashboard/delivery"
              className="px-6 py-3 rounded-xl border border-gray-300 text-center font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </Link>

            <button
              type="reset"
              className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Save Delivery Partner
            </button>

          </div>

        </div>

      </form>

    </div>

  );

}