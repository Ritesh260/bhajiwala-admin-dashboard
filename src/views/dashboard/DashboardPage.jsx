import DashboardCards from "./sections/DashboardCards";
import SalesChart from "./sections/SalesChart";
import RevenueChart from "./sections/RevenueChart";
import PieChartCard from "./sections/PieChartCard";
import RecentOrders from "./sections/RecentOrders";
import RecentCustomers from "./sections/RecentCustomers";
import TopProducts from "./sections/TopProducts";
import LowStockProducts from "./sections/LowStockProducts";
import ActivityTimeline from "./sections/ActivityTimeline";
import QuickActions from "./sections/QuickActions";
import Notifications from "./sections/Notifications";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back 👋 Here's what's happening with your store today.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition">
          + Add Product
        </button>

      </div>

      {/* Stats */}

      <DashboardCards />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <PieChartCard />

      </div>

      {/* Revenue */}

      <RevenueChart />

      {/* Orders + Customers */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentOrders />

        <RecentCustomers />

      </div>

      {/* Products + Stock */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <TopProducts />

        <LowStockProducts />

      </div>

      {/* Activity + Notifications */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <ActivityTimeline />

        <Notifications />

      </div>

      {/* Quick Actions */}

      <QuickActions />

    </div>
  );
}