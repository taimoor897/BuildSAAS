export default function WorkerCard({
  worker,
  onEdit,
  onDelete,
  onPay,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold">
            {worker.name}
          </h2>

          <p className="text-blue-600 font-medium">
            {worker.role}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            worker.status === "Active"
              ? "bg-green-100 text-green-700"
              : worker.status === "On Leave"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {worker.status}
        </span>

      </div>


      <div className="mt-5 space-y-2 text-sm text-slate-600">

  {worker.phone ? (
  <a
    href={`https://wa.me/${worker.phone.replace(/\D/g, "")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="
      group
      flex
      items-center
      gap-3
      w-fit
      rounded-xl
      bg-green-50
      px-4
      py-2
      text-green-700
      font-semibold
      transition-all
      hover:bg-green-100
      hover:shadow-sm
    "
  >
    <div className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      bg-green-500
      text-white
      transition-transform
      group-hover:scale-110
    ">
      💬
    </div>

    <span>
      {worker.phone}
    </span>
  </a>
) : (
  <p className="text-slate-400">
    📞 No phone number
  </p>
)}

        <p>
          🪪 {worker.cnic || "-"}
        </p>

        <p>
          📧 {worker.email || "-"}
        </p>

        <p>
          🏗 {worker.assignedProject || "Not Assigned"}
        </p>

        <p>
          💰 Rs.{" "}
          {Number(worker.salary).toLocaleString()}
          {" / "}
          {worker.employmentType}
        </p>

      </div>


      <div className="mt-6 grid grid-cols-3 gap-3">

        <button
          onClick={() => onEdit(worker)}
          className="rounded-xl bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Edit
        </button>


        <button
          onClick={() => onDelete(worker._id)}
          className="rounded-xl bg-red-600 py-2 text-white hover:bg-red-700"
        >
          Delete
        </button>


        <button
          onClick={() => onPay(worker)}
          className="rounded-xl bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Pay Now
        </button>

      </div>

    </div>
  );
}