import Link from "next/link";
import {
  IconClock,
  IconTicket,
  IconPackage,
  IconCalendar,
  IconArrowRight,
  IconPlus,
  IconTag,
} from "@tabler/icons-react";

const offerSections = [
  {
    title: "Today's Offers",
    description: "Manage flash deals, product discounts and limited-time offers.",
    href: "/dashboard/offers/today",
    addHref: "/dashboard/offers/today/form",
    icon: IconClock,
    color: "bg-orange-100 text-orange-600",
    label: "Flash Deals",
  },
  {
    title: "Discount Coupons",
    description: "Create coupon codes and manage customer discount benefits.",
    href: "/dashboard/offers/discounts",
    addHref: "/dashboard/offers/discounts/form",
    icon: IconTicket,
    color: "bg-green-100 text-green-600",
    label: "Coupons",
  },
  {
    title: "Combo Offers",
    description: "Create vegetable combo packs with special bundle prices.",
    href: "/dashboard/offers/combos",
    addHref: "/dashboard/offers/combos/form",
    icon: IconPackage,
    color: "bg-blue-100 text-blue-600",
    label: "Value Packs",
  },
  {
    title: "Seasonal Offers",
    description: "Manage seasonal collections, banners and special deals.",
    href: "/dashboard/offers/seasonal",
    addHref: "/dashboard/offers/seasonal/form",
    icon: IconCalendar,
    color: "bg-purple-100 text-purple-600",
    label: "Seasonal Deals",
  },
];

export default function OffersPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <IconTag size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Marketing Management
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Offer Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your offers, coupons and promotional deals.
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold">
            Grow Your Sales With Special Offers
          </h2>

          <p className="text-green-50 mt-3 leading-7">
            Create attractive deals, provide discount coupons and manage
            combo packages to give your customers more reasons to shop.
          </p>
        </div>
      </div>

      {/* Section Cards */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Manage Offers
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select a section to manage its offers.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-5">
          {offerSections.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                    {item.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-5">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 leading-6 mt-2 min-h-12">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <Link
                    href={item.href}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition"
                  >
                    Manage
                    <IconArrowRight size={17} />
                  </Link>

                  <Link
                    href={item.addHref}
                    className="flex items-center justify-center gap-2 border border-gray-200 hover:border-green-600 hover:text-green-600 text-gray-700 px-4 py-3 rounded-xl text-sm font-semibold transition"
                  >
                    <IconPlus size={17} />
                    Add New
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
