export default function MaterialCard({
  material,
  onDelete,
  onEdit,
}) {
  const lowStock =
    material.quantity <= material.lowStockLimit;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">
          {material.name}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            lowStock
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {lowStock ? "Low Stock" : "In Stock"}
        </span>

      </div>

      <div className="mt-6 space-y-2 text-slate-600">

        <p>
          📦 {material.quantity} {material.unit}
        </p>

        <p>
          💰 Rs. {material.costPerUnit}
        </p>

        <p>
          🚚 {material.supplier}
        </p>

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onEdit(material)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(material._id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Delete
        </button>

      </div>

    </div>
  );
}