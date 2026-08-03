import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../../pages/Dashboard/Sidebar";
import Topbar from "../../pages/Dashboard/Topbar";

export default function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">


      {/* Desktop Sidebar */}

      <div className="sticky top-0 hidden h-screen md:block">
  <Sidebar />
</div>



      {/* Mobile Sidebar Overlay */}

      {sidebarOpen && (

        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >

          <div
            className="h-full w-72 bg-white"
            onClick={(e) => e.stopPropagation()}
          >

            <Sidebar />

          </div>

        </div>

      )}



      {/* Main Content */}

      <div className="flex-1">


        {/* Mobile Header */}

        <div className="flex items-center gap-4 bg-white p-4 shadow md:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl bg-slate-100 p-2 hover:bg-slate-200"
          >
            <Menu size={24} />
          </button>


          <h1 className="text-xl font-bold text-blue-600">
            BuildPilot AI
          </h1>

        </div>



        {/* Existing Topbar */}

        <Topbar />


        <main className="p-4 md:p-8">

          {children}

        </main>


      </div>

    </div>
  );
}