import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ProjectInventoryCard from "./ProjectInventoryCard";

import { getProjects } from "../services/projectService";

export default function Inventory() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Project Inventory
        </h1>

        <p className="mt-2 text-slate-500">
          Select a construction project to manage its materials and inventory.
        </p>
      </div>

      {/* Projects */}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-semibold">
            Loading Projects...
          </h2>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          <h2 className="text-2xl font-bold">
            No Projects Found
          </h2>

          <p className="mt-3 text-slate-500">
            Create a project before adding inventory.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectInventoryCard
              key={project._id}
              project={project}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}