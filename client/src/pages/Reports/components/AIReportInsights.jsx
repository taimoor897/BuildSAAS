import { Bot } from "lucide-react";

export default function AIReportInsights({ report }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow">

      <div className="mb-4 flex items-center gap-3">
        <Bot size={34} />
        <h2 className="text-2xl font-bold">
          AI Insights
        </h2>
      </div>

      <ul className="space-y-3">

        <li>
          📁 Total Projects: <b>{report.projects}</b>
        </li>

        <li>
          📦 Materials Available: <b>{report.materials}</b>
        </li>

        <li>
          👷 Registered Workers: <b>{report.workers}</b>
        </li>

        <li>
          💰 Inventory Value:
          <b> Rs. {Number(report.budget).toLocaleString()}</b>
        </li>

      </ul>

    </div>
  );
}