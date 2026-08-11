"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconCloudUpload,
  IconPhoto,
  IconX,
  IconRefresh,
} from "@tabler/icons-react";

export default function ImageUpload({
  label = "Upload Image",
  name = "image",
  value = null,
  onChange,
  multiple = false,
  required = false,
  accept = "image/*",
  maxSize = 5,
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const getPreviewUrl = (input) => {
    if (!input) return null;
    if (Array.isArray(input)) {
      const first = input[0];
      if (!first) return null;
      if (typeof first === "string") return first;
      if (first instanceof File) return URL.createObjectURL(first);
      return null;
    }
    if (typeof input === "string") return input;
    if (input instanceof File) return URL.createObjectURL(input);
    return null;
  };

  useEffect(() => {
    setPreview(getPreviewUrl(value));
  }, [value]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const validateFile = (file) => {
    if (!file) return false;

    const size = file.size / 1024 / 1024;

    if (size > maxSize) {
      setError(`Maximum file size is ${maxSize}MB`);
      return false;
    }

    setError("");

    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    const imageURL = URL.createObjectURL(file);

    setPreview(imageURL);

    if (onChange) {
      onChange({
        target: {
          name,
          value: file,
        },
      });
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-3">

      <label className="block text-sm font-semibold text-gray-700">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
        multiple={multiple}
      />
            {!preview ? (

        <div
          onClick={openFilePicker}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();

            setDragging(false);

            const file = e.dataTransfer.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 transition-all duration-300
          ${
            dragging
              ? "border-green-600 bg-green-50"
              : "border-gray-300 hover:border-green-500 hover:bg-gray-50"
          }`}
        >

          <div className="flex flex-col items-center justify-center text-center">

            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full transition
              ${
                dragging
                  ? "bg-green-100"
                  : "bg-gray-100"
              }`}
            >

              <IconCloudUpload
                size={42}
                className={
                  dragging
                    ? "text-green-600"
                    : "text-gray-500"
                }
              />

            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">
              Drag & Drop Image Here
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              PNG, JPG, JPEG, WEBP supported
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Maximum File Size : {maxSize} MB
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openFilePicker();
              }}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Browse Files
            </button>

          </div>

        </div>

      ) : (
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">

          <div className="relative">

            <img
              src={preview}
              alt="Preview"
              className="h-72 w-full object-cover"
            />

            <div className="absolute top-3 right-3">

              <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white shadow">
                Uploaded
              </span>

            </div>

          </div>

          <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

                <IconPhoto
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <h4 className="font-semibold text-gray-800">
                  Image Uploaded Successfully
                </h4>

                <p className="text-sm text-gray-500">
                  Ready to save
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex items-center gap-2 rounded-xl border border-green-600 px-4 py-2 text-green-600 transition hover:bg-green-50"
              >
                <IconRefresh size={18} />
                Replace
              </button>

              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setError("");

                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }

                  if (onChange) {
                    onChange({
                      target: {
                        name,
                        value: null,
                      },
                    });
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
              >
                <IconX size={18} />
                Remove
              </button>

            </div>

          </div>

        </div>
              )}

      {/* Error Message */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Upload Information */}

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

        <h4 className="font-semibold text-gray-800">
          Upload Guidelines
        </h4>

        <ul className="mt-3 space-y-2 text-sm text-gray-600">

          <li>• Supported formats: JPG, JPEG, PNG, WEBP</li>

          <li>• Maximum file size: {maxSize} MB</li>

          <li>• Upload high quality images for best results.</li>

          <li>• Avoid blurry or low resolution images.</li>

        </ul>

      </div>

    </div>

  );

}