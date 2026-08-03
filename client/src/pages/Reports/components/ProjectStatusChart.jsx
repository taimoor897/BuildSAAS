import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ProjectStatusChart({ report }) {
  const data = {
    labels: [
      "Projects",
      "Materials",
      "Workers",
    ],
    datasets: [
      {
        label: "Total",
        data: [
          report.projects,
          report.materials,
          report.workers,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        System Overview
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}