"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconRefresh,
} from "@tabler/icons-react";

export default function ProductForm() {

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
    unit: "Kg",

    featured: false,
    status: "Active",

    seoTitle: "",
    seoDescription: "",
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  return (

    <div className="space-y-6">

      {/* Header */}

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

            Add Product

          </h1>

          <p className="text-gray-500 mt-1">

            Create a new product for your store.

          </p>

        </div>

      </div>

      {/* Basic Information */}

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
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="">

                Select Category

              </option>

              <option>

                Vegetables

              </option>

              <option>

                Fruits

              </option>

              <option>

                Leafy Vegetables

              </option>

            </select>

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
            {/* Pricing */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

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
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

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
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

        </div>

      </div>

      {/* Inventory */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Inventory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

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

              <option>Kg</option>
              <option>Gram</option>
              <option>Piece</option>
              <option>Dozen</option>
              <option>Bundle</option>

            </select>

          </div>

        </div>

      </div>

      {/* Product Images */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Product Images
        </h2>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl h-60 cursor-pointer hover:border-green-500 transition">

          <input
            type="file"
            multiple
            className="hidden"
          />

          <div className="text-center">

            <p className="text-lg font-semibold text-gray-700">
              Click to Upload Images
            </p>

            <p className="text-sm text-gray-500 mt-2">
              PNG, JPG, WEBP supported
            </p>

          </div>

        </label>

      </div>

      {/* Product Settings */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          Product Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <label className="flex items-center gap-3">

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

              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>

            </select>

          </div>

        </div>

      </div>
            {/* SEO Information */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-xl font-bold mb-6">
          SEO Information
        </h2>

        <div className="space-y-6">

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

      {/* Action Buttons */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

        <div className="flex flex-col sm:flex-row justify-end gap-4">

          <button
            type="reset"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            <IconRefresh size={20} />
            Reset
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          >
            <IconDeviceFloppy size={20} />
            Save Product
          </button>

        </div>

      </div>

    </div>

  );

}