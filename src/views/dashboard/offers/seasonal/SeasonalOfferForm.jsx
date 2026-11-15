
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  createSeasonalOffer,
  getSeasonalOfferById,
  updateSeasonalOffer,
} from "@/api/seasonal_apis";

import {
  IconArrowLeft,
  IconPhoto,
  IconX,
  IconCalendar,
  IconRefresh,
} from "@tabler/icons-react";

const initialForm = {
  title: "",
  description: "",
  badge: "",
  image: "",
  startDate: "",
  endDate: "",
  status: "Active",
  featured: false,
};

export default function SeasonalOfferForm() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;
  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const year = parsedDate.getFullYear();
    const month = String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      parsedDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ==========================================
  // GET OFFER BY ID
  // ==========================================

  useEffect(() => {
    if (!isEdit) {
      setFetching(false);
      return;
    }

    let isMounted = true;

    const fetchOffer = async () => {
      try {
        setFetching(true);
        setError("");

        const response = await getSeasonalOfferById(id);

        const offer =
          response?.offer ||
          response?.data?.offer ||
          response?.data ||
          response;

        if (!offer || !isMounted) return;

        setForm({
          title: offer.title || "",
          description: offer.description || "",
          badge: offer.badge || "",
          image: offer.image || "",
          startDate: formatDate(offer.startDate),
          endDate: formatDate(offer.endDate),
          status: offer.status || "Active",
          featured: Boolean(offer.featured),
        });

        setPreview(offer.image || "");
      } catch (err) {
        console.error("Seasonal Offer Fetch Error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            "Unable to load seasonal offer."
          );
        }
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    };

    fetchOffer();

    return () => {
      isMounted = false;
    };
  }, [id, isEdit]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // ==========================================
  // HANDLE IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");

    setImageFile(file);

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);

    setPreview((previousPreview) => {
      if (previousPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(previousPreview);
      }

      return imageUrl;
    });
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(null);
    setPreview("");

    setForm((prev) => ({
      ...prev,
      image: "",
    }));

    setError("");
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Title validation
    if (!form.title.trim()) {
      setError("Please enter offer title.");
      return;
    }

    // Date validation
    if (
      form.startDate &&
      form.endDate &&
      new Date(form.endDate) < new Date(form.startDate)
    ) {
      setError("End date cannot be before start date.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description);
      formData.append("badge", form.badge);
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      formData.append("status", form.status);
      formData.append("featured", String(form.featured));

      // New image upload
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (!form.image && isEdit) {
        // Tell backend to remove existing image
        formData.append("removeImage", "true");
      }

      // CREATE
      if (isEdit) {
        await updateSeasonalOffer(id, formData);
      } else {
        await createSeasonalOffer(formData);
      }

      router.push("/dashboard/offers/seasonal");
      router.refresh();
    } catch (err) {
      console.error("Seasonal Offer Save Error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to save seasonal offer. Please try again."
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
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <IconRefresh
            size={30}
            className="mx-auto animate-spin text-green-600"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading seasonal offer...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* HEADER */}

      <div className="flex items-center gap-3">

        <Link
          href="/dashboard/offers/seasonal"
          className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
        >
          <IconArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Seasonal Offer" : "Add Seasonal Offer"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {isEdit
              ? "Update your seasonal campaign details."
              : "Create a new seasonal promotional campaign."}
          </p>
        </div>

      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* MAIN DETAILS */}

          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-xl border border-gray-200 bg-white p-5">

              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Offer Information
              </h2>

              <div className="space-y-4">

                {/* TITLE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Offer Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Example: Diwali Special Offer"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your seasonal offer..."
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                {/* BADGE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Offer Badge
                  </label>

                  <input
                    type="text"
                    name="badge"
                    value={form.badge}
                    onChange={handleChange}
                    placeholder="Example: Diwali Special / Summer Sale"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

              </div>
            </div>

            {/* IMAGE */}

            <div className="rounded-xl border border-gray-200 bg-white p-5">

              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Offer Image
              </h2>

              {preview ? (

                <div className="relative w-full max-w-sm">

                  <img
                    src={preview}
                    alt="Offer preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                    title="Remove Image"
                  >
                    <IconX size={18} />
                  </button>

                </div>

              ) : (

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-5 py-10 hover:border-green-500">

                  <IconPhoto size={35} className="text-gray-400" />

                  <p className="mt-3 text-sm font-medium text-gray-700">
                    Click to upload image
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP (Max 5 MB)
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

              )}

              {preview && (
                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">

                  Change Image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>
              )}

            </div>

          </div>

          {/* SETTINGS */}

          <div className="space-y-6">

            <div className="rounded-xl border border-gray-200 bg-white p-5">

              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Campaign Settings
              </h2>

              <div className="space-y-4">

                {/* START DATE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-2">
                      <IconCalendar size={17} />
                      Start Date
                    </span>
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                {/* END DATE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    min={form.startDate || undefined}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                {/* STATUS */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* FEATURED */}

                <div className="rounded-lg bg-green-50 p-3">

                  <label className="flex cursor-pointer items-center gap-3">

                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="h-4 w-4 accent-green-600"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Featured Offer
                    </span>

                  </label>

                  <p className="mt-2 text-xs text-gray-500">
                    Highlight this offer on the website.
                  </p>

                </div>

              </div>
            </div>

            {/* PREVIEW */}

            <div className="rounded-xl border border-gray-200 bg-white p-5">

              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                Offer Preview
              </h2>

              <div className="rounded-lg bg-gray-50 p-4">

                <p className="text-lg font-bold text-gray-900">
                  {form.title || "Your Offer Title"}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {form.description ||
                    "Your offer description will appear here."}
                </p>

                {form.badge && (
                  <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {form.badge}
                  </span>
                )}

                {preview && (
                  <img
                    src={preview}
                    alt="Seasonal offer"
                    className="mt-4 h-32 w-full rounded-lg object-cover"
                  />
                )}

              </div>
            </div>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* BUTTONS */}

        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">

          <Link
            href="/dashboard/offers/seasonal"
            className="rounded-lg border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <IconRefresh size={18} className="animate-spin" />
            )}

            {loading
              ? "Saving..."
              : isEdit
              ? "Update Offer"
              : "Create Offer"}
          </button>

        </div>

      </form>
    </div>
  );
}
