"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IconEye,
  IconEyeOff,
  IconMail,
  IconLock,
  IconArrowRight,
  IconLeaf,
} from "@tabler/icons-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
const router = useRouter();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Invalid email or password"
      );
    }

    localStorage.setItem("adminToken", data.token);

    if (data.admin) {
      localStorage.setItem(
        "adminData",
        JSON.stringify(data.admin)
      );
    }

    router.push("/dashboard");

  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#f6fbf6] flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-6xl bg-white rounded-[32px] overflow-hidden shadow-xl border border-green-100">

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[680px]">

          {/* ================= LEFT SIDE ================= */}

          <div className="relative min-h-[420px] lg:min-h-full overflow-hidden">

            <Image
              src="/images/login-vegetables.png"
              alt="Fresh vegetables at BhajiWala Mart"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Image Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-900/20 to-transparent" />

            {/* Branding */}

            <div className="absolute top-7 left-7 right-7 flex items-center justify-between">

              <div className="flex items-center gap-3">

               <div className="w-11 h-11 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
  <IconLeaf
    size={24}
    className="text-white"
  />
</div>

                <div>

                  <h1 className="text-xl font-bold">
  <span className="text-black">Bhaji</span>
  <span className="text-green-600">Wala</span>
</h1>
                  <p className="text-xs text-white/80">
                    Fresh Vegetable Mart
                  </p>

                </div>

              </div>

            </div>


            {/* Bottom Content */}

            <div className="absolute bottom-8 left-7 right-7 text-white">

              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm mb-4">

                🥬 Fresh Every Day

              </span>

              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">

                Freshness you can
                <br />
                trust, every day.

              </h2>

              <p className="text-white/80 mt-3 max-w-md text-sm sm:text-base">

                Manage your vegetables, orders, customers
                and deliveries from one powerful dashboard.

              </p>

            </div>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

            <div className="w-full max-w-md">

              {/* Header */}

              <div className="mb-8">

                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-5">

                  <IconLeaf
                    size={28}
                    className="text-green-600"
                  />

                </div>

                <p className="text-sm font-semibold text-green-600 mb-2">
                  BHajiWala ADMIN
                </p>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Welcome back 👋
                </h2>

                <p className="text-gray-500 mt-2">
                  Sign in to manage your store.
                </p>

              </div>


              {/* Login Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <IconMail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@bhajiwala.com"
                      required
                      className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <div className="relative">

                    <IconLock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showPassword ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}

                    </button>

                  </div>

                </div>


                {/* Remember */}

                <div className="flex items-center gap-3">

                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 accent-green-600"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Remember me
                  </label>

                </div>
{error && (
  <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}

                {/* Login Button */}

                <button
  type="submit"
  disabled={loading}
  className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-green-600/20"
>
  {loading ? (
    <>
      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      Signing in...
    </>
  ) : (
    <>
      Login to Dashboard
      <IconArrowRight size={20} />
    </>
  )}
</button>

              </form>


              {/* Footer */}

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">

                <p className="text-xs text-gray-400">
                  © {new Date().getFullYear()} BhajiWala.
                  Admin Dashboard
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}