
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { getProducts } from "@/api/product_api";

import {
  getOfferById,
  createOffer,
  updateOffer,
} from "@/api/offer_apis";

import {
  IconArrowLeft,
  IconPhoto,
  IconTag,
  IconShoppingBag,
  IconCalendar,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";

export default function TodayOfferForm() {
  const params = useParams();
  const router = useRouter();

  const offerId = params?.id;
  const isEdit = Boolean(offerId);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOffer, setLoadingOffer] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productId: "",
    oldPrice: "",
    offerPrice: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    status: "Active",
    featured: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // FETCH PRODUCTS AND OFFER DETAILS
  // ==========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");

        // Get all products
        const productResponse = await getProducts();

        const productList =
          productResponse.products ||
          productResponse.data ||
          [];

        setProducts(productList);

        // Get existing offer for edit page
        if (isEdit && offerId) {
          setLoadingOffer(true);

          const offerResponse = await getOfferById(offerId);

          const offer =
            offerResponse.data ||
            offerResponse.offer ||
            offerResponse;

          const productId =
            typeof offer.productId === "object"
              ? offer.productId?._id
              : offer.productId;

          setFormData({
            productId: productId || "",
            oldPrice: offer.oldPrice ?? "",
            offerPrice: offer.offerPrice ?? "",
            startDate: offer.startDate
              ? String(offer.startDate).slice(0, 10)
              : "",
            endDate: offer.endDate
              ? String(offer.endDate).slice(0, 10)
              : "",
            startTime: offer.startTime || "",
            endTime: offer.endTime || "",
            status: offer.status || "Active",
            featured: offer.featured ?? false,
          });
        }
      } catch (err) {
        console.error("Offer fetch error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Data load nahi ho paaya. Please try again."
        );
      } finally {
        setLoadingProducts(false);
        setLoadingOffer(false);
      }
    };

    fetchData();
  }, [isEdit, offerId]);

  // ==========================================
  // SELECTED PRODUCT
  // ==========================================

  const selectedProduct = products.find(
    (product) => product._id === formData.productId
  );

  // ==========================================
  // PRODUCT CHANGE
  // ==========================================

  const handleProductChange = (e) => {
    const product = products.find(
      (item) => item._id === e.target.value
    );

    setFormData((prev) => ({
      ...prev,
      productId: e.target.value,
      oldPrice: product?.price ?? "",
      offerPrice: product?.discountPrice ?? "",
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // CALCULATE DISCOUNT
  // ==========================================

  const discount =
    Number(formData.oldPrice) > 0 &&
    Number(formData.offerPrice) >= 0
      ? Math.max(
          0,
          Math.round(
            ((Number(formData.oldPrice) -
              Number(formData.offerPrice)) /
              Number(formData.oldPrice)) *
              100
          )
        )
      : 0;

  // ==========================================
  // CREATE / UPDATE OFFER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.productId) {
      setError("Please select a product.");
      return;
    }

    if (Number(formData.oldPrice) <= 0) {
      setError("Original price must be greater than 0.");
      return;
    }

    if (Number(formData.offerPrice) >= Number(formData.oldPrice)) {
      setError("Offer price must be lower than the original price.");
      return;
    }

    if (Number(formData.offerPrice) < 0) {
      setError("Offer price cannot be negative.");
      return;
    }

    if (formData.endDate < formData.startDate) {
      setError("End date cannot be before start date.");
      return;
    }

    if (formData.startDate === formData.endDate &&
        formData.endTime <= formData.startTime) {
      setError("End time must be after start time.");
      return;
    }

    const payload = {
      productId: formData.productId,
      oldPrice: Number(formData.oldPrice),
      offerPrice: Number(formData.offerPrice),
      discount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      status: formData.status,
      featured: formData.featured,
    };

    try {
      setLoading(true);

      if (isEdit) {
        // PUT API
        const response = await updateOffer(offerId, payload);

        setSuccess(
          response.message || "Offer updated successfully!"
        );
      } else {
        // POST API
        const response = await createOffer(payload);

        setSuccess(
          response.message || "Offer created successfully!"
        );

        // Reset form after successful creation
        setFormData({
          productId: "",
          oldPrice: "",
          offerPrice: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          status: "Active",
          featured: false,
        });
      }
    } catch (err) {
      console.error("Offer save error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

  const labelClass =
    "block text-sm font-semibold text-gray-700 mb-2";

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loadingOffer) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <p className="text-gray-600 font-medium">
          Loading offer details...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <Link
          href="/dashboard/offers/today"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 mb-3"
        >
          <IconArrowLeft size={18} />
          Back to Today's Offers
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Today's Offer" : "Add Today's Offer"}
        </h1>

        <p className="text-gray-500 mt-2">
          Select a product and create a limited-time special deal.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
      >

        {/* Main Form */}
        <div className="xl:col-span-2 space-y-6">

          {/* Product Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                <IconShoppingBag size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Product Details
                </h2>
                <p className="text-xs text-gray-500">
                  Choose the product for this offer.
                </p>
              </div>
            </div>

            <label className={labelClass}>
              Select Product *
            </label>

            <select
              name="productId"
              value={formData.productId}
              onChange={handleProductChange}
              className={inputClass}
              required
              disabled={loadingProducts}
            >
              <option value="">
                {loadingProducts
                  ? "Loading products..."
                  : "Choose a product"}
              </option>

              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>

            {!loadingProducts && products.length === 0 && (
              <p className="text-sm text-orange-600 mt-2">
                No products available. Add products first.
              </p>
            )}

            {selectedProduct && (
              <div className="mt-5 flex items-center gap-4 rounded-xl bg-gray-50 border border-gray-100 p-4">
                <div className="w-20 h-20 rounded-xl bg-white border border-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                  {selectedProduct.images?.[0] ? (
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <IconPhoto size={28} className="text-gray-400" />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    SKU: {selectedProduct.sku || "Not available"}
                  </p>

                  <p className="text-sm text-green-600 font-semibold mt-1">
                    Stock: {selectedProduct.stock ?? "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <IconTag size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Offer Pricing
                </h2>
                <p className="text-xs text-gray-500">
                  Set the original and discounted prices.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>
                  Original Price (₹) *
                </label>

                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter original price"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Offer Price (₹) *
                </label>

                <input
                  type="number"
                  name="offerPrice"
                  value={formData.offerPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter offer price"
                  className={inputClass}
                  required
                />
              </div>

            </div>

            <div className="mt-5 rounded-xl bg-green-50 border border-green-100 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Calculated Discount
                </p>

                <p className="text-2xl font-bold text-green-700 mt-1">
                  {discount}% OFF
                </p>
              </div>

              <IconTag size={30} className="text-green-600" />
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <IconCalendar size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Offer Duration
                </h2>

                <p className="text-xs text-gray-500">
                  Set when this offer starts and expires.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>
                  Start Date *
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  End Date *
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || undefined}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Start Time *
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  End Time *
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Offer Settings */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <h2 className="font-bold text-gray-900 mb-5">
              Offer Settings
            </h2>

            <label className={labelClass}>
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <label className="flex items-start gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mt-1 accent-green-600"
                />

                <span>
                  <span className="block text-sm font-semibold text-gray-800">
                    Featured Offer
                  </span>

                  <span className="block text-xs text-gray-500 mt-1">
                    Highlight this deal on the offers page.
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <h2 className="font-bold text-gray-900 mb-4">
              Offer Preview
            </h2>

            <div className="rounded-xl border border-gray-100 overflow-hidden">

              <div className="h-36 bg-green-50 flex items-center justify-center">
                {selectedProduct?.images?.[0] ? (
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="h-full w-full object-contain p-3"
                  />
                ) : (
                  <IconPhoto size={38} className="text-green-300" />
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900">
                  {selectedProduct?.name || "Product Name"}
                </h3>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xl font-bold text-green-600">
                    ₹{formData.offerPrice || "0"}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ₹{formData.oldPrice || "0"}
                  </span>
                </div>

                <span className="inline-block mt-3 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                  {discount}% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl p-3">
              {success}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3">

            <button
              type="submit"
              disabled={loading || loadingProducts}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition"
            >
              <IconDeviceFloppy size={19} />

              {loading
                ? "Please wait..."
                : isEdit
                  ? "Update Offer"
                  : "Save Offer"}
            </button>

            <Link
              href="/dashboard/offers/today"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition"
            >
              <IconX size={19} />
              Cancel
            </Link>

          </div>
        </div>
      </form>
    </div>
  );
}
