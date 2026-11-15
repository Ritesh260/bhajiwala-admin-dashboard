
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { getProducts } from "@/api/product_api";

import {
  getComboById,
  createCombo,
  updateCombo,
} from "@/api/combo_apis";

import {
  IconArrowLeft,
  IconPackage,
  IconDeviceFloppy,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";

// ==========================================
// INITIAL FORM
// ==========================================

const initialForm = {
  title: "",
  description: "",
  items: [],
  oldPrice: "",
  price: "",
  image: "",
  startDate: "",
  endDate: "",
  status: "Active",
  featured: false,
};

export default function ComboOfferForm() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;
  const isEdit = Boolean(id);

  // ==========================================
  // STATES
  // ==========================================

  const [formData, setFormData] = useState(initialForm);

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // HELPER: PRODUCT PRICE
  // ==========================================

  const getProductPrice = (product) => {
    if (product.price !== undefined && product.price !== null) {
      return Number(product.price) || 0;
    }

    if (product.variants?.length > 0) {
      const variant = product.variants[0];

      return Number(
        variant.price ??
        variant.sellingPrice ??
        variant.finalPrice ??
        0
      );
    }

    return 0;
  };

  // ==========================================
  // HELPER: PRODUCT NAME
  // ==========================================

  const getProductName = (product) => {
    return product.name || product.title || "Unnamed Product";
  };

  // ==========================================
  // HELPER: FORMAT DATE
  // ==========================================

  const formatDateForInput = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ==========================================
  // FETCH PRODUCTS + COMBO DETAILS
  // ==========================================

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setFetching(true);
        setError("");

        // GET PRODUCTS
        const productResponse = await getProducts();

        const productList =
          productResponse.products ||
          productResponse.data?.products ||
          [];

        if (!isMounted) return;

        setProducts(productList);

        // EDIT MODE: GET SINGLE COMBO
        if (id) {
          const response = await getComboById(id);

          const combo =
            response.combo ||
            response.data?.combo ||
            response.data ||
            response;

          if (!isMounted) return;

          const normalizedItems = (combo.items || []).map((item) => ({
            product: item.product?._id || item.product,
            name:
              item.name ||
              item.product?.name ||
              item.product?.title ||
              "Product",
            price: Number(item.price || 0),
            quantity: Number(item.quantity || 1),
          }));

          setFormData({
            title: combo.title || "",
            description: combo.description || "",
            items: normalizedItems,
            oldPrice: combo.oldPrice ?? "",
            price: combo.price ?? "",
            image: combo.image || "",
            startDate: formatDateForInput(combo.startDate),
            endDate: formatDateForInput(combo.endDate),
            status: combo.status || "Active",
            featured: Boolean(combo.featured),
          });

          setImagePreview(combo.image || "");
        }
      } catch (err) {
        console.error("Combo loading error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            "Products ya combo details load nahi ho paye."
          );
        }
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // ==========================================
  // CALCULATE ORIGINAL PRICE
  // ==========================================

  const calculateOldPrice = (items) => {
    return items.reduce((total, item) => {
      return (
        total +
        Number(item.price || 0) * Number(item.quantity || 1)
      );
    }, 0);
  };

  // ==========================================
  // ADD PRODUCT TO COMBO
  // ==========================================

  const handleAddProduct = () => {
    setError("");

    if (!selectedProductId) {
      setError("Please select a product.");
      return;
    }

    const product = products.find(
      (item) => item._id === selectedProductId
    );

    if (!product) {
      setError("Selected product nahi mila.");
      return;
    }

    const alreadyAdded = formData.items.some(
      (item) => item.product === product._id
    );

    if (alreadyAdded) {
      setError("Ye product already combo mein added hai.");
      return;
    }

    const productPrice = getProductPrice(product);

    const updatedItems = [
      ...formData.items,
      {
        product: product._id,
        name: getProductName(product),
        price: productPrice,
        quantity: 1,
      },
    ];

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      oldPrice: calculateOldPrice(updatedItems),
    }));

    setSelectedProductId("");
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const handleRemoveProduct = (index) => {
    const updatedItems = formData.items.filter(
      (_, itemIndex) => itemIndex !== index
    );

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      oldPrice: calculateOldPrice(updatedItems),
    }));
  };

  // ==========================================
  // UPDATE PRODUCT QUANTITY
  // ==========================================

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = formData.items.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            quantity: Math.max(1, Number(quantity) || 1),
          }
        : item
    );

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      oldPrice: calculateOldPrice(updatedItems),
    }));
  };

  // ==========================================
  // HANDLE IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size 5MB se kam honi chahiye.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // ==========================================
  // HANDLE FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // TITLE VALIDATION
    if (!formData.title.trim()) {
      setError("Combo title required hai.");
      return;
    }

    // PRODUCTS VALIDATION
    if (formData.items.length === 0) {
      setError("Kam se kam ek product select karo.");
      return;
    }

    // PRICE VALIDATION
    if (!formData.price || Number(formData.price) <= 0) {
      setError("Valid combo price enter karo.");
      return;
    }

    if (Number(formData.price) >= Number(formData.oldPrice)) {
      setError("Combo price original price se kam hona chahiye.");
      return;
    }

    // DATE VALIDATION
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      setError("End date start date se pehle nahi ho sakti.");
      return;
    }

    try {
      setLoading(true);

      // CREATE FORMDATA FOR IMAGE UPLOAD
      const payload = new FormData();

      payload.append("title", formData.title.trim());
      payload.append("description", formData.description);

      payload.append(
        "items",
        JSON.stringify(
          formData.items.map((item) => ({
            product: item.product,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity),
          }))
        )
      );

      payload.append("price", String(Number(formData.price)));
      payload.append("startDate", formData.startDate);
      payload.append("endDate", formData.endDate);
      payload.append("status", formData.status);
      payload.append("featured", String(formData.featured));

      // NEW IMAGE
      if (imageFile) {
        payload.append("image", imageFile);
      }

      // IMAGE REMOVAL FLAG
      if (isEdit && !imagePreview && !imageFile) {
        payload.append("removeImage", "true");
      }

      // CREATE OR UPDATE API
      let response;

      if (isEdit) {
        response = await updateCombo(id, payload);
      } else {
        response = await createCombo(payload);
      }

      if (!response.success) {
        throw new Error(
          response.message || "Combo save nahi ho paya."
        );
      }

      alert(
        isEdit
          ? "Combo offer updated successfully!"
          : "Combo offer created successfully!"
      );

      router.push("/dashboard/offers/combos");
    } catch (err) {
      console.error("Combo save error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Combo save nahi ho paya."
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
        Loading combo details...
      </div>
    );
  }

  // ==========================================
  // DISCOUNT CALCULATION
  // ==========================================

  const discount =
    Number(formData.oldPrice) > 0 && Number(formData.price) > 0
      ? Math.round(
          ((Number(formData.oldPrice) - Number(formData.price)) /
            Number(formData.oldPrice)) *
            100
        )
      : 0;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-7">
        <Link
          href="/dashboard/offers/combos"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600"
        >
          <IconArrowLeft size={18} />
          Back to Combo Offers
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Combo Offer" : "Create Combo Offer"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add products and create an attractive combo deal.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* MAIN FORM */}

          <div className="space-y-6 lg:col-span-2">

            {/* BASIC INFORMATION */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 font-bold text-gray-900">
                Basic Information
              </h2>

              <div className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Combo Title *
                  </label>

                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Daily Essentials Combo"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your combo offer..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

              </div>
            </div>

            {/* PRODUCT SELECTION */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 font-bold text-gray-900">
                Select Combo Products
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row">

                <select
                  value={selectedProductId}
                  onChange={(e) =>
                    setSelectedProductId(e.target.value)
                  }
                  className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                >
                  <option value="">Select a product</option>

                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {getProductName(product)} - ₹
                      {getProductPrice(product)}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Add Product
                </button>

              </div>

              {products.length === 0 && (
                <p className="mt-3 text-xs text-orange-600">
                  No products available. Please add products first.
                </p>
              )}

              {/* SELECTED PRODUCTS */}

              <div className="mt-5 space-y-3">

                {formData.items.map((item, index) => (
                  <div
                    key={item.product || index}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        ₹{item.price} per item
                      </p>
                    </div>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-500"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100"
                      title="Remove product"
                    >
                      <IconX size={18} />
                    </button>
                  </div>
                ))}

                {formData.items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
                    No products added yet.
                  </div>
                )}

              </div>

              <p className="mt-4 text-sm text-gray-500">
                Original total:{" "}
                <span className="font-bold text-gray-900">
                  ₹{formData.oldPrice || 0}
                </span>
              </p>
            </div>

            {/* COMBO PRICING */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 font-bold text-gray-900">
                Combo Pricing
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Original Price (₹)
                  </label>

                  <input
                    type="number"
                    value={formData.oldPrice}
                    readOnly
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Combo Price (₹) *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                    placeholder="199"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

              </div>

              <div className="mt-4 rounded-xl bg-green-50 p-4">
                <p className="text-sm text-green-700">
                  Customer Savings
                </p>

                <p className="mt-1 text-xl font-bold text-green-700">
                  ₹
                  {Math.max(
                    0,
                    Number(formData.oldPrice || 0) -
                      Number(formData.price || 0)
                  )}{" "}
                  ({discount}% OFF)
                </p>
              </div>
            </div>

            {/* OFFER VALIDITY */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 font-bold text-gray-900">
                Offer Validity
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    min={formData.startDate || undefined}
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <label className="flex cursor-pointer items-center gap-3 self-end rounded-xl border border-gray-200 p-3">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featured: e.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-green-600"
                  />

                  <span className="text-sm font-semibold text-gray-700">
                    Featured Combo
                  </span>
                </label>

              </div>
            </div>

          </div>

          {/* IMAGE SECTION */}

          <div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <h2 className="mb-5 font-bold text-gray-900">
                Combo Image
              </h2>

              <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-center hover:border-green-500">

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Combo preview"
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <>
                    <IconPhoto size={35} className="text-gray-400" />

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                      Upload Combo Image
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG up to 5MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>

              <p className="mt-3 text-xs text-gray-400">
                Recommended: landscape image for combo banner.
              </p>

              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove Image
                </button>
              )}

            </div>
          </div>

        </div>

        {/* ERROR MESSAGE */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* FORM ACTIONS */}

        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">

          <Link
            href="/dashboard/offers/combos"
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconDeviceFloppy size={18} />

            {loading
              ? "Saving..."
              : isEdit
              ? "Update Combo"
              : "Save Combo"}
          </button>

        </div>
      </form>
    </div>
  );
}
