import { useEffect, useState } from "react";

import ProjectModal from "../Dashboard/ProjectModal";
import ProjectCard from "../Dashboard/ProjectCard";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ClientInvoiceModal from "../../components/ClientInvoiceModal";
import Swal from "sweetalert2";

import {
  getProjects,
  deleteProject,
} from "../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

const [invoiceProject, setInvoiceProject] = useState(null);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Project?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    await deleteProject(id);

    setProjects((prev) =>
      prev.filter((project) => project._id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Project deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Failed to delete project.",
    });
  }
};

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);



  const handleInvoice = (project) => {
    console.log("Invoice clicked:", project);
  
    setInvoiceProject(project);
    setShowInvoiceModal(true);
  };


 const filteredProjects = projects.filter((project) => {
  const matchesSearch = project.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesYear =
    selectedYear === "All" ||
    project.year === Number(selectedYear);

  return matchesSearch && matchesYear;
});
  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Projects
          </h1>

          <p className="text-slate-500">
            Manage all your construction projects.
          </p>
          <input
  type="text"
  placeholder="Search project..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 lg:w-80"
/>
        </div>

        <button
          onClick={() => {
            setSelectedProject(null);
            setShowModal(true);
          }}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + New Project
        </button>
      </div>

   <div className="relative w-48">
  <select
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
    className="
      w-full
      appearance-none
      bg-white
      border border-slate-200
      text-slate-700
      font-semibold
      rounded-2xl
      px-5 py-3
      shadow-sm
      cursor-pointer
      transition-all
      hover:border-blue-400
      hover:shadow-md
      focus:outline-none
      focus:ring-4
      focus:ring-blue-100
      focus:border-blue-500
    "
  >
    <option value="All">📅 All Years</option>

    {[...new Set(projects.map(p => p.year))]
      .sort((a, b) => b - a)
      .map(year => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
  </select>

  {/* Custom arrow */}
  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
    ▼
  </div>
</div>

      {loading ? (
        <h2>Loading projects...</h2>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold">
            No projects yet
          </h2>

          <p className="mt-2 text-slate-500">
            Click "New Project" to create your first project.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onInvoice={handleInvoice}
            />
          ))}
        </div>
      )}

      <ProjectModal
        open={showModal}
        project={selectedProject}
        onClose={handleCloseModal}
        onCreated={loadProjects}
      />

<ClientInvoiceModal
    open={showInvoiceModal}
    project={invoiceProject}
    onClose={() => setShowInvoiceModal(false)}
/>
    </DashboardLayout>
  );
}