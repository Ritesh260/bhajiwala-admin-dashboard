"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
} from "@tabler/icons-react";
import ImageUpload from "@/components/ImageUpload/ImageUpload";

export default function CategoryForm() {

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent: "",
    shortDescription: "",
    description: "",

    image: "",
    banner: "",

    featured: false,
    status: "Active",

    seoTitle: "",
    seoDescription: "",
  });

const handleImageChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
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

      <div>

        <Link
          href="/dashboard/categories"
          className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
        >

          <IconArrowLeft size={18}/>

          Back to Categories

        </Link>


        <h1 className="text-3xl font-bold text-gray-900 mt-3">

          Add Category

        </h1>


        <p className="text-gray-500 mt-1">

          Create and manage product categories

        </p>


      </div>



      {/* Basic Information */}


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <h2 className="text-xl font-bold mb-6">

          Basic Information

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* Name */}

          <div>

            <label className="block text-sm font-medium mb-2">

              Category Name

            </label>


            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Vegetables"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600"
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
              placeholder="vegetables"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />


          </div>



          {/* Parent Category */}


          <div>

            <label className="block text-sm font-medium mb-2">

              Parent Category

            </label>


            <select
              name="parent"
              value={formData.parent}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >

              <option value="">
                Main Category
              </option>

              <option>
                Vegetables
              </option>

              <option>
                Fruits
              </option>

              <option>
                Grocery
              </option>


            </select>


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
            placeholder="Fresh vegetables category..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 resize-none outline-none focus:border-green-600"
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
            placeholder="Write complete category details..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 resize-none outline-none focus:border-green-600"
          />


        </div>


      </div>


      {/* Images */}

<div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

  <h2 className="text-xl font-bold mb-6">
    Category Images
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <ImageUpload
      label="Category Image"
      name="image"
      value={formData.image}
      onChange={handleImageChange}
      required
    />

    <ImageUpload
      label="Banner Image"
      name="banner"
      value={formData.banner}
      onChange={handleImageChange}
    />

  </div>

</div>




      {/* Category Settings */}


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <h2 className="text-xl font-bold mb-6">

          Category Settings

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">



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

              Featured Category

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
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600"
            >

              <option>
                Active
              </option>


              <option>
                Inactive
              </option>


              <option>
                Draft
              </option>


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
              placeholder="Vegetables | BhajiWala"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600"
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
              className="w-full border border-gray-200 rounded-xl px-4 py-3 resize-none outline-none focus:border-green-600"
            />


          </div>


        </div>


      </div>




      {/* Buttons */}


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


        <div className="flex flex-col sm:flex-row justify-end gap-4">


          <button
            type="reset"
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
          >

            Reset

          </button>



          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white transition font-semibold"
          >

            Save Category

          </button>



        </div>


      </div>



    </div>

  );

}