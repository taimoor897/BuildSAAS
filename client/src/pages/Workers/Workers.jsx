import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import WorkerCard from "./WorkerCard";
import WorkerModal from "./WorkerModal";
import PaymentModal from "../../components/PaymentModal";
import Swal from "sweetalert2";

import {
  getWorkers,
  deleteWorker,
} from "../services/workerService";

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [paymentWorker, setPaymentWorker] = useState(null);
const [search, setSearch] = useState("");

  const loadWorkers = async () => {
    try {
      setLoading(true);

      const data = await getWorkers();

      setWorkers(data.workers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Worker?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    await deleteWorker(id);

    // Remove the worker immediately from the UI
    setWorkers((prev) =>
      prev.filter((worker) => worker._id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Worker deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete worker.",
    });
  }
};

  const handlePay = (worker) => {
    setPaymentWorker(worker);
    setShowPaymentModal(true);
  };

  const filteredWorkers = workers.filter((worker) => {
    const searchText = search.toLowerCase();
  
    return (
      worker.name.toLowerCase().includes(searchText) ||
      worker.role.toLowerCase().includes(searchText)
    );
  });

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Workers
          </h1>

          <p className="text-slate-500">
            Manage your construction workforce.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedWorker(null);
            setShowModal(true);
          }}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Worker
        </button>
      </div>

      <div className="mb-6">
  <div className="relative max-w-md">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type="text"
      placeholder="Search worker by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 focus:border-blue-600 focus:outline-none"
    />
  </div>
</div>

      {loading ? (
        <h2>Loading workers...</h2>
      ) : filteredWorkers.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          <h2 className="text-2xl font-bold">
            No workers found
          </h2>

          <p className="mt-2 text-slate-500">
            Click "Add Worker" to create your first worker.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredWorkers.map((worker) => (
           <WorkerCard
           key={worker._id}
           worker={worker}
           onEdit={(worker) => {
             setSelectedWorker(worker);
             setShowModal(true);
           }}
           onDelete={handleDelete}
           onPay={handlePay}
         />
          ))}
        </div>
      )}

      <WorkerModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreated={loadWorkers}
        worker={selectedWorker}
      />

<PaymentModal
  open={showPaymentModal}
  worker={paymentWorker}
  onClose={() => {
    setShowPaymentModal(false);
    setPaymentWorker(null);
  }}
/>
    </DashboardLayout>
  );
}