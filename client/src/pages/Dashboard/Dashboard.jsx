import { useEffect, useState } from "react";
import {
  FolderKanban,
  Boxes,
  Wallet,
  Users,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsCard from "../Dashboard/StatsCard";
import AIInsights from "../Dashboard/AIInsights";

import { getWorkers } from "../services/workerService";
import { getDashboardStats } from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalBudget: 0,
  });

  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function loadWorkers() {
      try {
        const data = await getWorkers();
        setWorkers(data.workers);
      } catch (err) {
        console.error(err);
      }
    }

    loadWorkers();
  }, []);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      {loading ? (
        <h2 className="mt-10 text-xl">
          Loading dashboard...
        </h2>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Projects"
              value={stats.totalProjects}
              icon={FolderKanban}
              change={`${stats.activeProjects} Active`}
            />

            <StatsCard
              title="Completed"
              value={stats.completedProjects}
              icon={Boxes}
              change="Finished Projects"
            />

            <StatsCard
              title="Budget"
              value={`Rs. ${stats.totalBudget.toLocaleString()}`}
              icon={Wallet}
              change="Total Budget"
            />

            <StatsCard
              title="Workers"
              value={workers.length}
              icon={Users}
              change="Registered Workers"
            />
          </div>

          <div className="mt-8">
            <AIInsights />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}