import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function BudgetChart({ report }) {
  const data = {
    labels: [
      "Inventory Value",
      "Remaining",
    ],
    datasets: [
      {
        data: [
          report.budget,
          report.budget * 0.25,
        ],
      },
    ],
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        Budget Overview
      </h2>

      <Pie data={data} />
    </div>
  );
}