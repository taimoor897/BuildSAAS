import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FolderKanban, Boxes, Users, Wallet } from "lucide-react";
import { getDashboardReport } from "../services/reportService";
import ProjectStatusChart from "./components/ProjectStatusChart";
import BudgetChart from "./components/BudgetChart";
import AIReportInsights from "./components/AIReportInsights";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function Reports() {
  const [report, setReport] = useState({
    projects: 0,
    materials: 0,
    workers: 0,
    budget: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const data = await getDashboardReport();

      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("BuildPilot AI Report", 14, 20);

  doc.setFontSize(12);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    30
  );

  autoTable(doc, {
    startY: 40,
    head: [["Category", "Value"]],
    body: [
      ["Projects", report.projects],
      ["Materials", report.materials],
      ["Workers", report.workers],
      [
        "Inventory Value",
        `Rs. ${Number(report.budget).toLocaleString()}`,
      ],
    ],
  });

  doc.save("BuildPilot_Report.pdf");
};


const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet([
    {
      Projects: report.projects,
      Materials: report.materials,
      Workers: report.workers,
      Budget: report.budget,
    },
  ]);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Report"
  );

  XLSX.writeFile(
    workbook,
    "BuildPilot_Report.xlsx"
  );
};

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Reports & Analytics
            </h1>

            <p className="mt-2 text-slate-500">
              Analyze your projects, inventory, workers and budgets.
            </p>
          </div>

          <div className="flex gap-3">
          <button
  onClick={exportPDF}
  className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
>
  Export PDF
</button>

<button
  onClick={exportExcel}
  className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
>
  Export Excel
</button>
          </div>
        </div>

        {loading ? (
          <h2>Loading report...</h2>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <ReportCard
              title="Projects"
              value={report.projects}
              icon={<FolderKanban size={32} />}
            />

            <ReportCard
              title="Materials"
              value={report.materials}
              icon={<Boxes size={32} />}
            />

            <ReportCard
              title="Workers"
              value={report.workers}
              icon={<Users size={32} />}
            />

            <ReportCard
              title="Inventory Value"
              value={`Rs. ${Number(report.budget).toLocaleString()}`}
              icon={<Wallet size={32} />}
            />
            <ProjectStatusChart report={report} />

            

          </div>

          
        )}

              <div className="grid gap-6 lg:grid-cols-2">

  <BudgetChart report={report} />

  <AIReportInsights report={report} />

</div>

      </div>
    </DashboardLayout>
  );
}

function ReportCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}