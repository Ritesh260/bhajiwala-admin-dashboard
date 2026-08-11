
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconRefresh,
} from "@tabler/icons-react";

import ImageUpload from "@/components/ImageUpload/ImageUpload";

import {
  getCategories,
} from "@/api/category_api";

import {
  createProduct,
  updateProduct,
  getProductById,
} from "@/api/product_api";

export default function ProductForm({ id }) {
  const router = useRouter();

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    brand: "",

    shortDescription: "",
    description: "",

    price: "",
    discountPrice: "",
    costPrice: "",

    sku: "",
    stock: "",
unitValue: 1,
unit: "Kg",

variants: [],


    images: [],

    featured: false,
    status: "Active",

    seoTitle: "",
    seoDescription: "",
  });

  // ==========================================
  // STATES
  // ==========================================

  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(false);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        setError("");

        const response = await getProductById(id);
        const product = response.product || response;

        setFormData({
          name: product.name || "",
          slug: product.slug || "",
          category:
            product.category?._id ||
            product.category ||
            "",
          brand: product.brand || "",
          shortDescription: product.shortDescription || "",
          description: product.description || "",
          price:
            product.price !== undefined
              ? product.price
              : "",
          discountPrice:
            product.discountPrice !== undefined
              ? product.discountPrice
              : "",
          costPrice:
            product.costPrice !== undefined
              ? product.costPrice
              : "",
          sku: product.sku || "",
          stock:
  product.stock !== undefined
    ? product.stock
    : "",

unitValue:
  product.unitValue !== undefined
    ? product.unitValue
    : 1,

unit: product.unit || "Kg",
variants: Array.isArray(product.variants)
  ? product.variants
  : [],
          images: product.images || [],
          featured: Boolean(product.featured),
          status: product.status || "Active",
          seoTitle: product.seoTitle || "",
          seoDescription: product.seoDescription || "",
        });
      } catch (error) {
        console.error("Failed to load product details:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load product details"
        );
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await getCategories();

        setCategories(
          response.categories || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch categories:",
          error
        );

        setError(
          "Failed to load categories"
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ==========================================
  // HANDLE IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Array.isArray(value)
        ? value
        : value
        ? [value]
        : [],
    }));
  };

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
  setFormData((prev) => {
    const variants = [...prev.variants];

    variants[index] = {
      ...variants[index],
      [field]:
        field === "unitValue" || field === "price"
          ? value
          : value,
    };

    return {
      ...prev,
      variants,
    };
  });
};

const addVariant = () => {
  setFormData((prev) => ({
    ...prev,
    variants: [
      ...prev.variants,
      {
        unitValue: "",
        unit: "Kg",
        price: "",
      },
    ],
  }));
};

const removeVariant = (index) => {
  setFormData((prev) => ({
    ...prev,
    variants: prev.variants.filter(
      (_, i) => i !== index
    ),
  }));
};

  // ==========================================
  // RESET FORM
  // ==========================================

  const handleReset = () => {
    setFormData({
      name: "",
      slug: "",
      category: "",
      brand: "",

      shortDescription: "",
      description: "",

      price: "",
      discountPrice: "",
      costPrice: "",

      sku: "",
      stock: "",
unitValue: 1,
unit: "Kg",
variants: [],

      images: [],

      featured: false,
      status: "Active",

      seoTitle: "",
      seoDescription: "",
    });

    setError("");
  };

  // ==========================================
  // SUBMIT PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ========================================
      // VALIDATION
      // ========================================

      if (!formData.name.trim()) {
        throw new Error(
          "Product name is required"
        );
      }

      if (!formData.slug.trim()) {
        throw new Error(
          "Product slug is required"
        );
      }

      if (!formData.category) {
        throw new Error(
          "Please select a category"
        );
      }

      if (
        formData.price === "" ||
        Number(formData.price) < 0
      ) {
        throw new Error(
          "Valid selling price is required"
        );
      }

      // ========================================
      // FORM DATA
      // ========================================

      const data = new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "slug",
        formData.slug
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "brand",
        formData.brand
      );

      data.append(
        "shortDescription",
        formData.shortDescription
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "discountPrice",
        formData.discountPrice
      );

      data.append(
        "costPrice",
        formData.costPrice
      );

      data.append(
        "sku",
        formData.sku
      );

      data.append(
  "stock",
  formData.stock
);

data.append(
  "unitValue",
  formData.unitValue
);

data.append(
  "unit",
  formData.unit
);
data.append(
  "variants",
  JSON.stringify(formData.variants)
);
      data.append(
        "featured",
        String(formData.featured)
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "seoTitle",
        formData.seoTitle
      );

      data.append(
        "seoDescription",
        formData.seoDescription
      );

      // ========================================
      // MULTIPLE IMAGES
      // ========================================

      if (
        formData.images &&
        formData.images.length > 0
      ) {
        formData.images.forEach(
          (image) => {
            if (image instanceof File) {
              data.append(
                "images",
                image
              );
            }
          }
        );
      }

      // ========================================
      // API CALL
      // ========================================

      const response = id
        ? await updateProduct(id, data)
        : await createProduct(data);

      console.log(
        id ? "Product Updated:" : "Product Created:",
        response
      );

      alert(
        id
          ? "Product updated successfully"
          : "Product created successfully"
      );

      // ========================================
      // REDIRECT
      // ========================================

      router.push(
        "/dashboard/products"
      );

    } catch (error) {
      console.error(
        "Create Product Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create product";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
          >
            <IconArrowLeft size={18} />

            Back to Products
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h1>

          <p className="text-gray-500 mt-1">
            {isEditMode
              ? "Update product details."
              : "Create a new product for your store."}
          </p>

        </div>

      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ========================================
          BASIC INFORMATION
      ======================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Fresh Tomato"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* Slug */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="fresh-tomato"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* Category */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loadingCategories}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600 disabled:bg-gray-100"
            >

              <option value="">
                {loadingCategories
                  ? "Loading categories..."
                  : "Select Category"}
              </option>

              {!loadingCategories &&
                categories.map(
                  (category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  )
                )}

            </select>

            {!loadingCategories &&
              categories.length === 0 && (
                <p className="text-xs text-red-500 mt-2">
                  No categories found. Create a category first.
                </p>
              )}

          </div>

          {/* Brand */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="BhajiWala"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

        </div>

        {/* Short Description */}

        <div className="mt-6">

          <label className="block text-sm font-medium mb-2">
            Short Description
          </label>

          <textarea
            rows={3}
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Write a short product description..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:border-green-600"
          />

        </div>

        {/* Description */}

        <div className="mt-6">

          <label className="block text-sm font-medium mb-2">
            Full Description
          </label>

          <textarea
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write complete product details..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:border-green-600"
          />

        </div>

      </div>

      {/* ========================================
          PRICING
      ======================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Selling Price */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Selling Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* Discount Price */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Discount Price
            </label>

            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* Cost Price */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Cost Price
            </label>

            <input
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

        </div>

      </div>

      {/* ========================================
          INVENTORY
      ======================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Inventory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* SKU */}

          <div>

            <label className="block text-sm font-medium mb-2">
              SKU
            </label>

            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="SKU001"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* Stock */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="100"
              min="0"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>
          {/* Unit Value */}

<div>

  <label className="block text-sm font-medium mb-2">
    Quantity Per Unit
  </label>

  <input
    type="number"
    name="unitValue"
    value={formData.unitValue}
    onChange={handleChange}
    placeholder="1"
    min="0.001"
    step="0.001"
    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
  />

  <p className="text-xs text-gray-500 mt-2">
    Example: 1 Kg, 500 Gram, 1 Piece
  </p>

</div>

          {/* Unit */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Unit
            </label>

            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="Kg">
                Kg
              </option>

              <option value="Gram">
                Gram
              </option>

              <option value="Piece">
                Piece
              </option>

              <option value="Dozen">
                Dozen
              </option>

              <option value="Bundle">
                Bundle
              </option>

            </select>

          </div>

        </div>

        {/* PRODUCT VARIANTS */}

<div className="mt-8 pt-8 border-t border-gray-100">

  <div className="flex items-center justify-between mb-5">

    <div>
      <h3 className="text-lg font-bold text-gray-900">
        Product Variants
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Add different quantities and prices for this product.
      </p>
    </div>

    <button
      type="button"
      onClick={addVariant}
      className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
    >
      + Add Variant
    </button>

  </div>

  {formData.variants.length === 0 ? (
    <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
      No variants added yet.
    </div>
  ) : (
    <div className="space-y-4">

      {formData.variants.map((variant, index) => (

        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 bg-gray-50 rounded-2xl border border-gray-100"
        >

          {/* Quantity */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Quantity
            </label>

            <input
              type="number"
              min="0.001"
              step="0.001"
              value={variant.unitValue}
              onChange={(e) =>
                handleVariantChange(
                  index,
                  "unitValue",
                  e.target.value
                )
              }
              placeholder="500"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* Unit */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Unit
            </label>

            <select
              value={variant.unit}
              onChange={(e) =>
                handleVariantChange(
                  index,
                  "unit",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="Gram">
                Gram
              </option>

              <option value="Kg">
                Kg
              </option>

              <option value="Piece">
                Piece
              </option>

              <option value="Dozen">
                Dozen
              </option>

              <option value="Bundle">
                Bundle
              </option>

            </select>

          </div>

          {/* Price */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={variant.price}
              onChange={(e) =>
                handleVariantChange(
                  index,
                  "price",
                  e.target.value
                )
              }
              placeholder="40"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* Remove */}

          <button
            type="button"
            onClick={() => removeVariant(index)}
            className="w-full md:w-auto px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition"
          >
            Remove
          </button>

        </div>

      ))}

    </div>
  )}

</div>

      </div>

      {/* ========================================
          PRODUCT IMAGES
      ======================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Product Images
        </h2>

        <ImageUpload
          label="Product Images"
          name="images"
          value={formData.images}
          onChange={handleImageChange}
          multiple={true}
          required
        />

      </div>

      {/* ========================================
          PRODUCT SETTINGS
      ======================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Product Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Featured */}

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 accent-green-600"
            />

            <span className="font-medium">
              Featured Product
            </span>

          </label>

          {/* Status */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

              <option value="Draft">
                Draft
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ========================================
          SEO
      ======================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          SEO Information
        </h2>

        <div className="space-y-6">

          {/* SEO Title */}

          <div>

            <label className="block text-sm font-medium mb-2">
              SEO Title
            </label>

            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              placeholder="Fresh Tomato | BhajiWala"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

          {/* SEO Description */}

          <div>

            <label className="block text-sm font-medium mb-2">
              SEO Description
            </label>

            <textarea
              rows={4}
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              placeholder="Write SEO friendly description..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none outline-none focus:border-green-600"
            />

          </div>

        </div>

      </div>

      {/* ========================================
          ACTION BUTTONS
      ======================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <div className="flex flex-col sm:flex-row justify-end gap-4">

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
          >
            <IconRefresh size={20} />

            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition disabled:bg-green-400 disabled:cursor-not-allowed"
          >

            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                Saving...
              </>
            ) : (
              <>
                <IconDeviceFloppy size={20} />

                Save Product
              </>
            )}

          </button>

        </div>

      </div>

    </form>
  );
}

