
import {
  createProject,
  updateProject,
} from "../services/projectService";
import { useEffect, useState } from "react";

export default function ProjectModal({
  open,
  onClose,
  onCreated,
  project,
}) {
const [form, setForm] = useState({
  name: "",
  client: "",
  clientPhone: "",
  location: "",
  description: "",
  year: new Date().getFullYear(),
  budget: "",
  progress: 0,
  status: "Planning",
});

useEffect(() => {
  if (project) {
    setForm({
      name: project.name || "",
      client: project.client || "",
      clientPhone: project.clientPhone || "",
      location: project.location || "",
      description: project.description || "",
      budget: project.budget || "",
      progress: project.progress || 0,
      status: project.status || "Planning",
      year: project.year || new Date().getFullYear(),
    });
  } else {
    setForm({
      name: "",
      client: "",
      clientPhone: "",
      location: "",
      description: "",
      year: new Date().getFullYear(),
      budget: "",
      progress: 0,
      status: "Planning",
    });
  }
}, [project]);
  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  const payload = {
  ...form,
  budget: Number(form.budget),
  progress: Number(form.progress),
  year: Number(form.year),
};

if (project) {
  await updateProject(project._id, payload);
} else {
  await createProject(payload);
}

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create project.");
    }
  };

  

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3">

  <div className="
    w-full
    max-w-4xl
    max-h-[90vh]
    overflow-y-auto
    rounded-2xl
    bg-white
    shadow-2xl
  ">

      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {project ? "Edit Project" : "Create New Project"}
          </h2>
          <p className="mt-1 text-slate-500">
            Add a new construction project.
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-3xl text-slate-400 hover:text-black"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Project Name
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Client
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
              name="client"
              value={form.client}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Location
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Budget (PKR)
            </label>

            <input
              type="number"
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
              name="budget"
              value={form.budget}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Progress (%)
            </label>

            <input
              type="number"
              name="progress"
              value={form.progress}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
  <label className="mb-2 block font-medium">
    Client Phone
  </label>

  <input
    type="text"
    name="clientPhone"
    placeholder="923001234567"
    value={form.clientPhone}
    onChange={handleChange}
    className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    Project Year
  </label>

  <input
    type="number"
    name="year"
    value={form.year}
    onChange={handleChange}
    className="w-full rounded-xl border p-3"
    min="2000"
    max="2100"
  />
</div>

   

        </div>

        <div className="mt-6">
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {project ? "Update Project" : "Create Project"}
          </button>
        </div>

      </form>

    </div>
  </div>
);
}