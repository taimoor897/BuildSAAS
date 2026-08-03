import { LogOut, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { downloadBackup } from "../services/backupService";
import NotificationBell from "../../components/NotificationBell";
import Swal from "sweetalert2";


export default function Topbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();



  const handleLogout = () => {

    logout();

    navigate("/");

  };

  const confirmLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    background: "#ffffff",
    customClass: {
      popup: "rounded-2xl",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      handleLogout();
    }
  });
};



  const handleBackup = async () => {

    try {

      const data = await downloadBackup();


      const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        {
          type: "application/json",
        }
      );


      const url = URL.createObjectURL(blob);


      const link = document.createElement("a");


      link.href = url;


      link.download = `BuildPilot-Backup-${
        new Date().toISOString().split("T")[0]
      }.json`;



      document.body.appendChild(link);


      link.click();


      document.body.removeChild(link);


      URL.revokeObjectURL(url);


    } catch (err) {

      console.error(err);

      alert("Backup failed.");

    }

  };



  return (

    <header className="
      flex
      flex-col
      gap-4
      rounded-2xl
      bg-white
      p-5
      shadow-sm
      md:flex-row
      md:items-center
      md:justify-between
    ">


      <div>

        <h2 className="text-3xl font-bold">

          Welcome {user?.name} 👋

        </h2>


        <p className="text-slate-500">

          Here's what's happening on your projects today.

        </p>


      </div>



      <div
  className="
    flex
    w-full
    flex-col
    gap-3
    sm:w-auto
    sm:flex-row
    sm:flex-wrap
    sm:items-center
    sm:justify-end
  "
>


{user?.role === "Manager" && (
  <>
   <button
  onClick={handleBackup}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-blue-600
    px-4
    py-2
    font-medium
    text-white
    hover:bg-blue-700
    sm:w-auto
  "
>
  <Download size={18} />
  <span className="hidden sm:inline">Backup</span>
</button>


    <div
  className="
    flex
    w-full
    justify-center
    sm:w-auto
    sm:justify-start
  "
>
  <NotificationBell />
</div>
  </>
)}




<div className="flex items-center justify-center gap-3 rounded-xl bg-slate-100 px-3 py-2">
  <div
    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-blue-600
      font-bold
      text-white
    "
  >
    {user?.name?.charAt(0)?.toUpperCase()}
  </div>

  <div className="hidden sm:flex sm:flex-col sm:justify-center">
    <p className="font-semibold text-slate-800 leading-none">
      {user?.name}
    </p>
  </div>
</div>





     <button
  onClick={confirmLogout}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-red-600
    px-4
    py-2
    font-medium
    text-white
    hover:bg-red-700
    sm:w-auto
  "
>
  <LogOut size={18} />
  <span className="hidden sm:inline">Logout</span>
</button>
</div>



      



    </header>

  );

}