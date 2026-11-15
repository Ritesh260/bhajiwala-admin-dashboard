"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  IconArrowLeft,
  IconTicket,
  IconDeviceFloppy,
} from "@tabler/icons-react";

import {
  getCouponById,
  createCoupon,
  updateCoupon,
} from "@/api/coupon_apis";

// ==========================================
// INITIAL FORM
// ==========================================

const initialForm = {
  code: "",
  title: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  minOrderAmount: "",
  maxDiscount: "",
  startDate: "",
  endDate: "",
  usageLimit: "",
  status: "Active",
};

// ==========================================
// COMPONENT
// ==========================================

export default function DiscountCouponForm() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  // ==========================================
  // GET SINGLE COUPON FOR EDIT
  // ==========================================

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchCoupon = async () => {
      try {
        setFetching(true);
        setError("");

        const response = await getCouponById(id);

        const coupon =
          response.coupon ||
          response.data ||
          response;

        if (!coupon || !coupon._id) {
          throw new Error("Coupon not found");
        }

        if (!isMounted) return;

        setFormData({
          code: coupon.code || "",
          title: coupon.title || "",
          description: coupon.description || "",

          discountType:
            coupon.discountType || "percentage",

          discountValue:
            coupon.discountValue ?? "",

          minOrderAmount:
            coupon.minOrderAmount ?? "",

          maxDiscount:
            coupon.maxDiscount ?? "",

          startDate: coupon.startDate
            ? new Date(coupon.startDate)
                .toISOString()
                .split("T")[0]
            : "",

          endDate: coupon.endDate
            ? new Date(coupon.endDate)
                .toISOString()
                .split("T")[0]
            : "",

          usageLimit:
            coupon.usageLimit ?? "",

          status:
            coupon.status || "Active",
        });

      } catch (err) {
        console.error("Fetch Coupon Error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Coupon details load nahi ho payi."
          );
        }

      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    };

    fetchCoupon();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    if (!formData.code.trim()) {
      return "Coupon code is required.";
    }

    if (!formData.title.trim()) {
      return "Coupon title is required.";
    }

    if (
      formData.discountType !== "free-delivery" &&
      (
        formData.discountValue === "" ||
        Number(formData.discountValue) <= 0
      )
    ) {
      return "Please enter a valid discount value.";
    }

    if (
      formData.discountType === "percentage" &&
      Number(formData.discountValue) > 100
    ) {
      return "Percentage discount cannot exceed 100%.";
    }

    if (Number(formData.minOrderAmount || 0) < 0) {
      return "Minimum order amount cannot be negative.";
    }

    if (
      formData.maxDiscount !== "" &&
      Number(formData.maxDiscount) < 0
    ) {
      return "Maximum discount cannot be negative.";
    }

    if (
      formData.usageLimit !== "" &&
      (
        Number(formData.usageLimit) < 1 ||
        !Number.isInteger(Number(formData.usageLimit))
      )
    ) {
      return "Usage limit must be a positive whole number.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) <
        new Date(formData.startDate)
    ) {
      return "End date cannot be before start date.";
    }

    return "";
  };

  // ==========================================
  // CREATE / UPDATE COUPON
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        code: formData.code.trim().toUpperCase(),

        title: formData.title.trim(),

        description: formData.description.trim(),

        discountType: formData.discountType,

        discountValue:
          formData.discountType === "free-delivery"
            ? 0
            : Number(formData.discountValue),

        minOrderAmount: Number(
          formData.minOrderAmount || 0
        ),

        maxDiscount:
          formData.discountType === "percentage" &&
          formData.maxDiscount !== ""
            ? Number(formData.maxDiscount)
            : null,

        startDate: formData.startDate || null,

        endDate: formData.endDate || null,

        usageLimit:
          formData.usageLimit !== ""
            ? Number(formData.usageLimit)
            : null,

        status: formData.status,
      };

      let response;

      // UPDATE EXISTING COUPON
      if (isEdit) {
        response = await updateCoupon(id, payload);

        alert(
          response.message ||
          "Coupon updated successfully!"
        );

      } else {
        // CREATE NEW COUPON
        response = await createCoupon(payload);

        alert(
          response.message ||
          "Coupon created successfully!"
        );
      }

      // REDIRECT TO COUPON LIST
      router.push("/dashboard/offers/discounts");

      router.refresh();

    } catch (err) {
      console.error("Save Coupon Error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Coupon save nahi ho paya. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-600">
        Loading coupon details...
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-7">

        <Link
          href="/dashboard/offers/discounts"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600"
        >
          <IconArrowLeft size={18} />
          Back to Coupons
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit
            ? "Edit Discount Coupon"
            : "Create Discount Coupon"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? "Update your existing coupon details."
            : "Create a new promotional coupon for your customers."}
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* MAIN FORM */}

          <div className="space-y-6 lg:col-span-2">

            {/* BASIC INFORMATION */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-green-50 p-3 text-green-600">
                  <IconTicket size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Basic Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Enter coupon details
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Coupon Code *
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="WELCOME20"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm uppercase outline-none focus:border-green-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Coupon Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Welcome Offer"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />

                </div>

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe this coupon offer..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />

                </div>

              </div>

            </div>

            {/* DISCOUNT SETTINGS */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 font-bold text-gray-900">
                Discount Settings
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Discount Type *
                  </label>

                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  >

                    <option value="percentage">
                      Percentage (%)
                    </option>

                    <option value="fixed">
                      Fixed Amount (₹)
                    </option>

                    <option value="free-delivery">
                      Free Delivery
                    </option>

                  </select>

                </div>

                {formData.discountType !== "free-delivery" && (

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Discount Value *
                    </label>

                    <input
                      type="number"
                      name="discountValue"
                      value={formData.discountValue}
                      onChange={handleChange}
                      min="1"
                      placeholder="20"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                    />

                  </div>

                )}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Minimum Order Amount (₹)
                  </label>

                  <input
                    type="number"
                    name="minOrderAmount"
                    value={formData.minOrderAmount}
                    onChange={handleChange}
                    min="0"
                    placeholder="299"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />

                </div>

                {formData.discountType === "percentage" && (

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Maximum Discount (₹)
                    </label>

                    <input
                      type="number"
                      name="maxDiscount"
                      value={formData.maxDiscount}
                      onChange={handleChange}
                      min="0"
                      placeholder="100"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                    />

                  </div>

                )}

              </div>

            </div>

            {/* VALIDITY */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 font-bold text-gray-900">
                Coupon Validity
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate || undefined}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Usage Limit
                  </label>

                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    placeholder="100"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />

                  <p className="mt-1 text-xs text-gray-400">
                    Leave empty for unlimited usage.
                  </p>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* COUPON PREVIEW */}

          <div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <h2 className="mb-5 font-bold text-gray-900">
                Coupon Preview
              </h2>

              <div className="rounded-2xl border-2 border-dashed border-green-200 bg-green-50 p-5">

                <div className="mb-4 flex items-center justify-between">

                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    BhajiWala Offer
                  </span>

                  <IconTicket
                    size={24}
                    className="text-green-600"
                  />

                </div>

                <h3 className="break-words text-xl font-extrabold text-gray-900">
                  {formData.code || "COUPON CODE"}
                </h3>

                <p className="mt-2 text-sm font-semibold text-green-700">
                  {formData.title || "Your Coupon Title"}
                </p>

                <div className="my-4 border-t border-dashed border-green-200" />

                <p className="text-2xl font-extrabold text-green-700">

                  {formData.discountType === "free-delivery"
                    ? "FREE DELIVERY"
                    : formData.discountType === "percentage"
                    ? `${formData.discountValue || 0}% OFF`
                    : `₹${formData.discountValue || 0} OFF`}

                </p>

                <p className="mt-2 text-xs text-gray-600">
                  {formData.description ||
                    "Coupon description will appear here."}
                </p>

                <p className="mt-4 text-xs text-gray-500">
                  Minimum order: ₹
                  {formData.minOrderAmount || 0}
                </p>

              </div>

              <div className="mt-5 rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Coupon Status
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    formData.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {formData.status}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ERROR MESSAGE */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>

        )}

        {/* ACTION BUTTONS */}

        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">

          <Link
            href="/dashboard/offers/discounts"
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <IconDeviceFloppy size={18} />

            {loading
              ? "Saving..."
              : isEdit
              ? "Update Coupon"
              : "Save Coupon"}

          </button>

        </div>

      </form>

    </div>
  );
}