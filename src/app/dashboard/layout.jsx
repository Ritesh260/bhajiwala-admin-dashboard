import Sidebar from "@/views/dashboard/sections/sidebar";
import Topbar from "@/views/dashboard/sections/Topbar";

export default function DashboardLayout({ children }) {

  return (
    <div className="min-h-screen bg-[#F8FAF5]">

      <aside className="hidden lg:block fixed left-0 top-0 w-72 h-screen border-r border-gray-200 bg-white z-40">
        <Sidebar />
      </aside>

      <div className="lg:ml-72 min-h-screen flex flex-col">

        <header className="sticky top-0 z-30 bg-[#F8FAF5]/80 backdrop-blur-md border-b border-gray-200">
          <Topbar />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}