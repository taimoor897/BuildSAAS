import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import MaterialCard from "./MaterialCard";
import MaterialModal from "./MaterialModal";
import Swal from "sweetalert2";

import {
  getProjectMaterials,
  deleteMaterial,
} from "../services/materialService";

import { getProject } from "../services/projectService";

export default function ProjectInventory() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [materials, setMaterials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [search, setSearch] = useState("");

  const loadInventory = async () => {
    try {
      setLoading(true);

      const projectData = await getProject(projectId);
      setProject(projectData.project);
      console.log("PROJECT FROM API:", projectData.project);

      const materialData =
        await getProjectMaterials(projectId);

      setMaterials(materialData.materials);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [projectId]);

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Material?",
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
    await deleteMaterial(id);

    setMaterials((prev) =>
      prev.filter((material) => material._id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Material deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete material.",
    });
  }
};

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = filteredMaterials.reduce(
    (sum, material) =>
      sum +
      Number(material.quantity || 0) *
        Number(material.costPerUnit || 0),
    0
  );

  const lowStock = filteredMaterials.filter(
    (m) => m.quantity <= m.lowStockLimit
  ).length;

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            {project?.name}
          </h1>

          <p className="text-slate-500">
            {project?.client} • {project?.location}
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedMaterial(null);
            setShowModal(true);
          }}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Material
        </button>

      </div>

      {/* Stats */}

      <div className="mb-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-slate-500">
            Materials
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {filteredMaterials.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-slate-500">
            Inventory Value
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            Rs. {totalValue.toLocaleString()}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-slate-500">
            Low Stock
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-600">
            {lowStock}
          </h2>

        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search materials..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full rounded-xl border p-4"
      />

      {/* Materials */}

      {loading ? (
        <h2>Loading inventory...</h2>
      ) : filteredMaterials.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          No materials found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredMaterials.map((material) => (
            <MaterialCard
              key={material._id}
              material={material}
              onDelete={handleDelete}
              onEdit={(material) => {
                setSelectedMaterial(material);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      )}

      <MaterialModal
        open={showModal}
        material={selectedMaterial}
        project={project}
        onClose={() => setShowModal(false)}
        onCreated={loadInventory}
      />
    </DashboardLayout>
  );
}