import { Building2, MapPin, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectInventoryCard({ project }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {project.name}
          </h2>

          <p className="mt-3 flex items-center gap-2 text-slate-600">
            <Building2 size={18} />
            {project.client}
          </p>

          <p className="mt-2 flex items-center gap-2 text-slate-600">
            <MapPin size={18} />
            {project.location}
          </p>

        </div>

        <div className="rounded-full bg-blue-100 p-3">
          <Package className="text-blue-600" />
        </div>

      </div>

      <button
        onClick={() =>
          navigate(`/inventory/${project._id}`)
        }
        className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        View Inventory
      </button>

    </div>
  );
}