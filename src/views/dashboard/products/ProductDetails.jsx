"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconEdit,
  IconShoppingBag,
  IconTag,
  IconDollarSign,
  IconBox,
  IconPhoto,
  IconStar,
} from "@tabler/icons-react";

import { getProductById } from "@/api/product_api";

export default function ProductDetails({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);
        setProduct(response.product || response);
      } catch (error) {
        console.error("Failed to load product details:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load product details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-8 shadow-sm">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const imageSrc =
    product.images?.[0] ||
    (typeof product.images === "string" ? product.images : null) ||
    "/placeholder-product.png";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
          >
            <IconArrowLeft size={18} />
            Back to Products
          </Link>

          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 mt-1">View full product information.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/dashboard/products/form/${id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700 transition"
          >
            <IconEdit size={18} />
            Edit Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <img
            src={imageSrc}
            alt={product.name}
            className="h-72 w-full rounded-3xl object-cover"
          />

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-500">
              <IconTag size={18} />
              <span>{product.category?.name || "Uncategorized"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <IconShoppingBag size={18} />
              <span>{product.brand || "Brand not specified"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <IconBox size={18} />
              <span>
                SKU: {product.sku || "-"} • Stock: {product.stock || 0} {product.unit || "Qty"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <IconStar size={18} />
              <span>{product.featured ? "Featured product" : "Regular product"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Pricing & Status</h2>
                <p className="text-sm text-gray-500 mt-1">Key pricing and availability information.</p>
              </div>
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  product.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : product.status === "Draft"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {product.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Price</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">₹{product.price || 0}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Discount Price</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">₹{product.discountPrice || 0}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Cost Price</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">₹{product.costPrice || 0}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Available Stock</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{product.stock || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
            <div className="mt-5 space-y-4 text-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {product.description || "No description available."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Short Description</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {product.shortDescription || "No short description provided."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">SEO Title</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {product.seoTitle || "Not set"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">SEO Description</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {product.seoDescription || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product.images && product.images.length > 1 && (
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">More Images</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {product.images.slice(1).map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${product.name} ${index + 2}`}
                className="h-48 w-full rounded-3xl object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
