import { MapPin, Building2, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onInvoice,
}) {
  const colors = {
    Planning: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    "On Hold": "bg-red-100 text-red-700",
  };



  const navigate = useNavigate();

 const milestones = project.milestones || [];

const completedMilestones = milestones.filter(
  (m) => m.completed
).length;

const progress =
  milestones.length > 0
    ? Math.round(
        (completedMilestones / milestones.length) * 100
      )
    : 0;

    const displayStatus =
  progress === 100
    ? "Completed"
    : project.status;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {project.name}
          </h2>

          <p className="mt-1 flex items-center gap-2 text-slate-500">
            <Building2 size={16} />
            {project.client}
          </p>

          <p className="mt-2 flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            {project.location}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            colors[project.status] || "bg-gray-100"
          }`}
        >
          {displayStatus}
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-6 flex items-center gap-2 font-semibold">
        <Wallet size={18} />
        Rs. {project.budget?.toLocaleString()}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
      <button
  onClick={() => onEdit(project)}
  className="w-full rounded-xl bg-blue-600 py-2 text-white hover:bg-blue-700"
>
  Edit
</button>

<button
  onClick={() => onDelete(project._id)}
  className="w-full rounded-xl bg-red-600 py-2 text-white hover:bg-red-700"
>
  Delete
</button>

<button
  onClick={() => onInvoice(project)}
  className="w-full rounded-xl bg-green-600 py-2 text-white hover:bg-green-700"
>
  Invoice
</button>

<button
  onClick={() => navigate(`/projects/${project._id}`)}
  className="w-full rounded-xl bg-slate-700 py-2 text-white hover:bg-slate-800"
>
  Open Project
</button>
      </div>
    </div>
  );
}