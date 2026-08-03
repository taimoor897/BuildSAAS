import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Boxes,
  Wallet,
  FileText,
  Bot,
  Users,
  Settings,
  Map,
  
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";


const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
    managerOnly: true,
  },
  {
    icon: FolderKanban,
    label: "Projects",
    path: "/projects",
    managerOnly: true,
  },
  {
    icon: Map,
    label: "Site Intelligence",
    path: "/site-intelligence",
    managerOnly: true,
  },
  {
    icon: Boxes,
    label: "Inventory",
    path: "/inventory",
  },


  {
    icon: Bot,
    label: "AI Assistant",
    path: "/ai",
    managerOnly: true,
  },
  {
    icon: Users,
    label: "Workers",
    path: "/workers",
    managerOnly: true,
  },
  {
    icon: FileText,
    label: "Invoices",
    path: "/invoices",
    managerOnly: true,
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
    managerOnly: true,
  },
];


export default function Sidebar() {

  const location = useLocation();

  const { user } = useAuth();


  const visibleMenu = menu.filter((item) => {

    if(item.managerOnly && user?.role === "Worker"){
      return false;
    }

    return true;

  });


  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-slate-200 bg-white">

      <div className="border-b p-6">

        <h1 className="text-2xl font-bold text-blue-600">
          BuildPilot AI
        </h1>

        <p className="text-sm text-slate-500">
          Construction Management
        </p>

      </div>


      <nav className="flex-1 p-4">

        {visibleMenu.map((item)=>{

          const active = location.pathname === item.path;


          return (

            <Link
              key={item.label}
              to={item.path}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >

              <item.icon size={20}/>

              <span className="font-medium">
                {item.label}
              </span>

            </Link>

          );

        })}

      </nav>

    </aside>
  );
}